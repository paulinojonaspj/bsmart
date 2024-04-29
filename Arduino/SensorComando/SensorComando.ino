#include <IRremoteESP8266.h>
#include <IRrecv.h>
#include <IRutils.h>

#include <WiFi.h>
#include <HTTPClient.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);

const char *ssid = "B-SMART";       // Coloque o SSID da sua rede WiFi
const char *password = "paulino123";   // Coloque a senha da sua rede WiFi
const char *url2 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=2&ligado=0";
const char *url3 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=3&ligado=0";
const char *url4 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=4&ligado=0";
const char *url5 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=5&ligado=0";

byte ledLigado    = 5;
byte ledWifi    = 17;
byte ledAgua    = 18;


// Defina o pino do receptor IR
const uint16_t kRecvPin = 23; // Pino D22 no ESP32

// Crie um objeto receptor IR
IRrecv irrecv(kRecvPin);

// Crie um objeto para armazenar os resultados da leitura
decode_results results;

void setup() {
 
     pinMode(ledLigado, OUTPUT);
     pinMode(ledWifi, OUTPUT);
     pinMode(ledAgua, OUTPUT);

     lcd.init();
     lcd.backlight();
     lcd.clear();
     lcd.setCursor(0,0);
     lcd.print("20 kWh - 200 E");

     lcd.setCursor(0,1);
     lcd.print("20 L  -  200 E");

  digitalWrite(ledLigado, HIGH);

         // Conectar ao WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(ledLigado, HIGH);
    digitalWrite(ledWifi, LOW);
    digitalWrite(ledAgua, LOW);
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  delay(2000);
    digitalWrite(ledAgua, LOW);
    digitalWrite(ledLigado, LOW);
    digitalWrite(ledWifi, HIGH);
  Serial.println("Conectado ao WiFi");
  Serial.begin(115200); // Inicie a comunicação serial
  irrecv.enableIRIn(); // Inicie o receptor IR
}

void loop() {
  if (irrecv.decode(&results)) { // Verifique se há um sinal IR recebido
    Serial.println(results.value, HEX); // Imprima o valor hexadecimal do código recebido

    if (results.value == 0xFF629D) {
      Serial.println("INTERRUPTOR 2"); // Imprima "olá" se o código for FF629D
        HTTPClient http;
        http.begin(url2);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 

      if (results.value == 0xFFE21D) {
      Serial.println("INTERRUPTOR 3"); // Imprima "olá" se o código for FF629D
       HTTPClient http;
        http.begin(url3);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 

      if (results.value == 0xFF22DD) {
      Serial.println("INTERRUPTOR 4"); // Imprima "olá" se o código for FF629D
       HTTPClient http;
        http.begin(url4);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 

      if (results.value == 0xFF02FD) {
      Serial.println("INTERRUPTOR 5"); // Imprima "olá" se o código for FF629D
       HTTPClient http;
        http.begin(url5);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 
 
    
    irrecv.resume(); // Reinicie o receptor IR para receber o próximo sinal
  }
  delay(100); // Aguarde um curto período para evitar leituras repetidas
}
