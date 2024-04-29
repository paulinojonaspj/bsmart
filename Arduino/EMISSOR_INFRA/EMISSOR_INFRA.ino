#include <IRremote.h>

#define IR_LED_PIN 0  // Pino IR conectado ao ESP32

IRsend irsend(IR_LED_PIN);  // Objeto para envio de sinais IR

void setup() {
  Serial.begin(115200);
    Serial.println("Código enviado: EF08F7");
}

void loop() {
  // Código a ser enviado
  unsigned long irCode = 0xEF08F7;

  // Envia o código IR
  irsend.sendNEC(irCode, 32);
  Serial.println("Código enviado: EF30CF");
    
  delay(100);  // Aguarda 10 segundos antes de enviar novamente
}
