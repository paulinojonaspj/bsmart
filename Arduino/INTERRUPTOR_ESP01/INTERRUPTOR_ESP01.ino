#include <EmonLib.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
 
const char *ssid = "B-SMART";         // Coloque o SSID da sua rede WiFi
const char *password = "paulino123"; // Coloque a senha da sua rede WiFi
const char *url1 = "http://192.168.7.10:8080/api/v1/bsmart/interruptor/5";     
const byte i1 = 0;     // interruptor 1
WiFiClient client; // Objeto WiFiClient para usar com HTTPClient

void setup()
{
    pinMode(i1, OUTPUT);
    digitalWrite(i1, LOW);

    Serial.begin(9600);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Conectando ao WiFi...");
    }
    delay(2000);
 
    Serial.println("Conectado ao WiFi");
}

void loop()
{
        HTTPClient http;
        http.begin(client, url1); // Modificado para fornecer o objeto WiFiClient como parâmetro
         int httpCode= http.GET();
         
      if (httpCode > 0) {  // Verificar o código de status
    
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();  // Obter resposta do servidor
           if(payload!="1"){
                Serial.println("SALA AC - I 1 DESLIGADO");
                digitalWrite(i1,HIGH);
          }else{
                Serial.println("SALA AC - I 1 LIGADO");
             digitalWrite(i1, LOW);
          }
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
        http.end();
      
      delay(1000);
}
