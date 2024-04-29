#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <Wire.h>

const char* ssid = "FamiliaJonas2";
const char* password = "123456789";
IPAddress staticIP(192, 168, 1, 154);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);

WebServer server(80);

void pagina() {
  File file = SPIFFS.open("/index.html", "r");
  if (!file) {
    Serial.println("Falha ao abrir o arquivo index.html");
    server.send(404, "text/plain", "Arquivo nao encontrado");
    return;
  }
  server.streamFile(file, "text/html");
  file.close();
}

void setup() {
  Serial.begin(115200);
  pinMode(14, OUTPUT);


  // Conectar-se à rede Wi-Fi com IP estático
  WiFi.begin(ssid, password);
  WiFi.config(staticIP, gateway, subnet);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  Serial.println("Conectado ao WiFi");

  // Montar o sistema de arquivos SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("Falha ao montar o sistema de arquivos SPIFFS");
    return;
  }
  Serial.println("Sistema de arquivos SPIFFS montado");

  // Definir rota para o arquivo index.html
  server.on("/", HTTP_GET, []() {
    pagina();
  });

  server.on("/on", HTTP_GET, []() {
    digitalWrite(14, HIGH);
    pagina();
  });

  server.on("/off", HTTP_GET, []() {
    digitalWrite(14, LOW);
   
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
