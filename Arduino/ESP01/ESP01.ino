#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h> // Biblioteca do sistema de arquivos SPIFFS
#include <Wire.h>
//#include <LiquidCrystal_I2C.h>

//LiquidCrystal_I2C lcd(0x27,16,2);

const char* ssid = "B-SMART";
const char* password = "paulino123";
IPAddress staticIP(192, 168, 7, 9);
IPAddress gateway(192, 168, 7, 1);
IPAddress subnet(255, 255, 255, 0);

ESP8266WebServer server(80);
void pagina(){
  File file = SPIFFS.open("/index.html", "r");
    if (!file) {
      Serial.println("Falha ao abrir o arquivo index.html");
      server.send(404, "text/plain", "Arquivo não encontrado");
      return;
    }
    server.streamFile(file, "text/html");
    file.close();
}
void setup() {
  Serial.begin(115200);
  pinMode(0, OUTPUT);
   digitalWrite(0, LOW); 
 // lcd.init();
  //lcd.backlight();
   // lcd.setCursor(0,0);
    //lcd.print("Lampada Apagada");

  // Conectar-se à rede Wi-Fi com IP estático
  WiFi.begin(ssid, password);
  WiFi.config(staticIP, gateway, subnet);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  Serial.println("Conectado ao WiFi");

  // Montar o sistema de arquivos SPIFFS
  if (!SPIFFS.begin()) {
    Serial.println("Falha ao montar o sistema de arquivos SPIFFS");
    return;
  }
  Serial.println("Sistema de arquivos SPIFFS montado");

  // Definir rota para o arquivo index.html
  server.on("/", HTTP_GET, [](){
      pagina();
  });

   server.on("/on", HTTP_GET, [](){
    digitalWrite(0, HIGH); 
    //lcd.clear();
    //lcd.setCursor(0,0);
    //lcd.print("Lampada ligada");
     Serial.println("Ligada");
      pagina();
    });

     server.on("/off", HTTP_GET, [](){
      digitalWrite(0, LOW); 
      // lcd.clear();
    //lcd.setCursor(0,0);
    //lcd.print("Lampada Apagada");
      Serial.println("Apagou");
      pagina();
    });

  server.begin();
}

void loop() {
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  
  server.handleClient();
}
