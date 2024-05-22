#include <SoftwareSerial.h>

SoftwareSerial gsmSerial(7, 8); // RX, TX

void setup() {
  Serial.begin(9600);   // Inicializa a comunicação serial com o computador
  gsmSerial.begin(9600); // Inicializa a comunicação serial com o módulo GSM

  delay(3000); // Aguarda a inicialização do módulo GSM (pode variar dependendo do módulo)
}

void loop() {
  sendSMS("+351934968956", "Mensagem de teste");

  delay(15000); // Aguarda 5 segundos antes de enviar o próximo SMS
}

void sendSMS(String phoneNumber, String message) {
  gsmSerial.println("AT"); // Envia comando AT para verificar a conexão com o módulo GSM
  delay(1000);

  gsmSerial.println("AT+CMGF=1"); // Configura o módulo GSM para o modo de envio de SMS
  delay(1000);

  gsmSerial.print("AT+CMGS=\"");
  gsmSerial.print(phoneNumber);
  gsmSerial.println("\""); // Envia o número de telefone para o qual você deseja enviar a mensagem
  delay(1000);

  gsmSerial.print(message);
  gsmSerial.write(26); // Envia o caractere CTRL+Z para indicar o final da mensagem
  delay(1000);
}
