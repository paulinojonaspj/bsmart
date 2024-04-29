#include <EmonLib.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
 
const char *ssid = "B-SMART";         // Coloque o SSID da sua rede WiFi
const char *password = "paulino123"; // Coloque a senha da sua rede WiFi
const char *url1 = "http://192.168.7.10:8080/api/v1/bsmart/interruptor/2";  //SALA AC     
const char *url2 = "http://192.168.7.10:8080/api/v1/bsmart/interruptor/3";  //SALA LÂMPADA

const byte ledLigado = 14;   // Vermelho  D5
const byte ledWifi = 12;     // Verde  D6
const byte ledConsumo = 13;   // Azul   D7

const byte i1 = 4;     // interruptor 1
const byte i2 = 5;   //  // interruptor 2
const int aproximacao=15;
const int presenca=2;
int cont=0;
int ligou=0;
WiFiClient client; // Objeto WiFiClient para usar com HTTPClient

void setup()
{
   
    pinMode(ledLigado, OUTPUT);
    pinMode(ledWifi, OUTPUT);
    pinMode(ledConsumo, OUTPUT);
    pinMode(i1, OUTPUT);
    pinMode(i2, OUTPUT);

    pinMode(aproximacao, INPUT);
    pinMode(presenca, INPUT);

    digitalWrite(i1, LOW);
    digitalWrite(i2, LOW);
    digitalWrite(ledLigado, HIGH);
       
    Serial.begin(9600);

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

void loop()
{
  int valor=digitalRead(presenca);
  Serial.print(valor);
    
        HTTPClient http;
        http.begin(client, url1); // Modificado para fornecer o objeto WiFiClient como parâmetro
         int httpCode= http.GET();
         
      if (httpCode > 0) {  // Verificar o código de status
    
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();  // Obter resposta do servidor
           if(payload!="1" || digitalRead(aproximacao)!=0){
               // Serial.println("SALA AC - I 1 DESLIGADO");
                digitalWrite(i1,HIGH);
          }else{
            if(digitalRead(aproximacao)==0){
              //  Serial.println("SALA AC - I 1 LIGADO");
                digitalWrite(i1, LOW);
            }
          }
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
        http.end();

      http.begin(client, url2); // Modificado para fornecer o objeto WiFiClient como parâmetro
      httpCode= http.GET();
         
      if (httpCode > 0) {  // Verificar o código de status
        

        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();  // Obter resposta do servidor
          
          if((payload!="1" || valor==0) && cont>60){
             cont=0;
             ligou=0;
             digitalWrite(i2, HIGH);
            // Serial.println("SALA LÂMPADA - I 2 DESLIGADO");
          }else{
            if(valor==1){
              ligou=1;
            }
            if((valor==1 || cont<=60) && ligou == 1){
            // Serial.println("SALA LÂMPADA - I 2 LIGADO");
             digitalWrite(i2, LOW);
             cont++;
               //delay(60000);
            }
          
          }
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
        http.end();
      
      delay(1000);
}
