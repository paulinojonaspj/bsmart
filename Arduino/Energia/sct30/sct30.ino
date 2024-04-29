#include <EmonLib.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <IRremoteESP8266.h>
#include <IRrecv.h>
#include <IRutils.h>

#include <DHT22.h>
//define pin data
#define pinDATA 4 // SDA, or almost any other I/O pin

DHT22 dht22(pinDATA); 

const char *ssid = "B-SMART";       // Coloque o SSID da sua rede WiFi
const char *password = "paulino123"; // Coloque a senha da sua rede WiFi
const char *url = "http://192.168.7.10:8080/api/v1/consumo";

const char *url2 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=2&ligado=0";
const char *url3 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=3&ligado=0";
const char *url4 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=4&ligado=0";
const char *url5 = "http://192.168.7.10:8080/api/v1/bsmart/ligar?id=5&ligado=0";

EnergyMonitor SCT013;

const int pinSCT = A0;     // Pino analógico conectado ao SCT-013
const double tensao = 225.0;
double potencia;

const byte ledLigado = 14;   // Vermelho  D5
const byte ledWifi = 12;     // Verde  D6
const byte ledConsumo = 13;   // Azul   D7


// Defina o pino do receptor IR
const uint16_t kRecvPin = 5; // Pino D22 no ESP32

// Crie um objeto receptor IR
IRrecv irrecv(kRecvPin);

// Crie um objeto para armazenar os resultados da leitura
decode_results results;

WiFiClient client; // Objeto WiFiClient para usar com HTTPClient

void setup()
{
    SCT013.current(pinSCT, 0.9);

    pinMode(ledLigado, OUTPUT);
    pinMode(ledWifi, OUTPUT);
    pinMode(ledConsumo, OUTPUT);

    digitalWrite(ledLigado, HIGH);
       
    Serial.begin(9600);

  irrecv.enableIRIn(); // Inicie o receptor IR
  
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        digitalWrite(ledLigado, HIGH);
        digitalWrite(ledWifi, LOW);
        digitalWrite(ledConsumo, LOW);
        delay(1000);
        Serial.println("Conectando ao WiFi...");
    }
    delay(2000);
    digitalWrite(ledConsumo, LOW);
    digitalWrite(ledLigado, LOW);
    digitalWrite(ledWifi, HIGH);
    Serial.println("Conectado ao WiFi");
}
int considera=1;
void loop()
{
    double Irms = SCT013.calcIrms(1480);   // Calcula o valor da Corrente
    
    potencia = Irms * tensao;          // Calcula o valor da Potencia Instantanea    

    if (potencia > 0.5) {
      if(considera>5){
        digitalWrite(ledWifi, LOW);
        digitalWrite(ledLigado, LOW);
        digitalWrite(ledConsumo, HIGH);
    
        HTTPClient http;
        http.begin(client, url); // Modificado para fornecer o objeto WiFiClient como parâmetro
        http.addHeader("Content-Type", "application/json");
        String requestBody = "{\"tipo\": \"ENERGIA\", \"localizacao\": \"WC\", \"quantidade\": " + String(potencia+3.5) + "}";
        http.POST(requestBody);
        http.end();
      }
      considera++;
    } else {
      considera=1;
        digitalWrite(ledConsumo, LOW);
        digitalWrite(ledWifi, HIGH);
        digitalWrite(ledLigado, LOW);
    }
    
    Serial.print("Corrente = ");
    Serial.print(Irms);
    Serial.println(" A");
    
    Serial.print("Potencia = ");
    Serial.print(potencia);
    Serial.println(" W");

    if (irrecv.decode(&results)) { // Verifique se há um sinal IR recebido
    Serial.println(results.value, HEX); // Imprima o valor hexadecimal do código recebido

    if (results.value == 0xFF629D) {
      Serial.println("INTERRUPTOR 2"); // Imprima "olá" se o código for FF629D
        HTTPClient http;
        http.begin(client,url2);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 

      if (results.value == 0xFFE21D) {
      Serial.println("INTERRUPTOR 3"); // Imprima "olá" se o código for FF629D
       HTTPClient http;
        http.begin(client,url3);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 

      if (results.value == 0xFF22DD) {
      Serial.println("INTERRUPTOR 4"); // Imprima "olá" se o código for FF629D
       HTTPClient http;
        http.begin(client,url4);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 

      if (results.value == 0xFF02FD) {
      Serial.println("INTERRUPTOR 5"); // Imprima "olá" se o código for FF629D
       HTTPClient http;
        http.begin(client,url5);
        http.addHeader("Content-Type", "application/json");
        http.GET();
        http.end();
    } 
 
    
    irrecv.resume(); // Reinicie o receptor IR para receber o próximo sinal
  }
 
 
  float t = dht22.getTemperature();
  float h = dht22.getHumidity();

  if (dht22.getLastError() != dht22.OK) {
    Serial.print("last error :");
    Serial.println(dht22.getLastError());
  }

  Serial.print("h=");Serial.print(h,1);Serial.print("\t");
  Serial.print("t=");Serial.println(t,1);
     delay(1000);
   
}
