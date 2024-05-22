#include <Arduino.h>

HardwareSerial gsmSerial(1); // Usando RX0 (GPIO3) e TX0 (GPIO1)

void setup() {
    Serial.begin(115200); // Inicia a comunicação serial com o monitor serial
    gsmSerial.begin(115200, SERIAL_8N1, 1, 3); // Inicia a comunicação serial com o módulo GSM

    delay(1000);

    Serial.println("Configurando o módulo GSM...");
    delay(2000);

    sendATCommand("AT"); // Testa a comunicação com o módulo GSM

    // Configura para o modo de texto para envio de SMS
    sendATCommand("AT+CMGF=1");

    Serial.println("Configuração concluída.");
}

void loop() {
   //sendATCommand("AT+CMGD=1,4");
  // clearFullSMSIfNeeded();
    // Envia um SMS a cada 10 segundos
   // sendSMS("+351938137218", "Este é um exemplo de mensagem SMS enviada pelo Arduino!");
    // showLastReceivedNaoLidaSMS();  

       delay(5000);
}

void sendATCommand(String command) {
   // Limpa o buffer serial antes de enviar o comando
    while (gsmSerial.available() > 0) {
        gsmSerial.read();
    }
  
    // Envie o comando AT para o módulo GSM
    gsmSerial.println(command);

    // Aguarda um tempo para a resposta chegar
    delay(1000);

    // Inicia a leitura da resposta
    String response = "";
    while (gsmSerial.available() > 0) {
        char c = gsmSerial.read();
        response += c;
    }

  
    // Verifica se a subpalavra "pa" está presente na resposta
    if (response.indexOf("pa") != -1) {
         gsmSerial.println("Tem"); // A subpalavra "pa" está presente
    } 
  // gsmSerial.println(command);
  
   //
   delay(1000);
    /*
    while (gsmSerial.available()) {
      
         //Serial.write(gsmSerial.read());
     
       
    }
   */
    
}

void showLastReceivedNaoLidaSMS() {
   // gsmSerial.x\ln("Verificando a última mensagem SMS não lida...");
    // Envia o comando AT para listar todas as mensagens SMS não lidas
    sendATCommand("AT+CMGL=\"REC UNREAD\"");
  //gsmSerial.println("AT+CMGL=\"REC UNREAD\"");
    // Aguarda a resposta do módulo GSM
    delay(2000);

    /* Verifica se há uma resposta disponível
    while (gsmSerial.available()) {
       String response = gsmSerial.readStringUntil('\n');

        // Se a linha começar com "+CMGL", então é o começo de uma mensagem SMS
        if (response.startsWith("+CMGL:")) {
            // Descartamos a primeira linha, que contém informações sobre a mensagem
            gsmSerial.readStringUntil('\n');
            // Leitura e exibição do conteúdo da mensagem
            String messageContent = gsmSerial.readStringUntil('\n');
            
            //gsmSerial.print("Última mensagem SMS não lida: " + messageContent);
              
        
        }
    }  
*/

   // Serial.println("Fim das mensagens SMS não lidas.");
}
void showLastReceivedSMS() {
    Serial.println("Verificando a última mensagem recebida...");

    // Envia o comando AT para listar todas as mensagens recebidas
    sendATCommand("AT+CMGL=\"ALL\"");

    // Aguarda a resposta do módulo GSM
    delay(2000);

    // Verifica se há uma resposta disponível
    while (gsmSerial.available()) {
        String response = gsmSerial.readStringUntil('\n');

        // Se a linha começar com "+CMGL", então é o começo de uma mensagem SMS
        if (response.startsWith("+CMGL:")) {
            // Descartamos a primeira linha, que contém informações sobre a mensagem
            gsmSerial.readStringUntil('\n');
            // Leitura e exibição do conteúdo da mensagem
            String messageContent = gsmSerial.readStringUntil('\n');
            Serial.println("Última mensagem recebida: " + messageContent);
        }
    }

    Serial.println("Fim das mensagens.");
}
void clearFullSMSIfNeeded() {
    Serial.println("Verificando se a memória de mensagens SMS está cheia...");

    // Envia o comando AT para listar as mensagens SMS
  //  sendATCommand("AT+CMGL=\"ALL\"");

    // Aguarda a resposta do módulo GSM
   // delay(2000);

    // Verifica se há uma resposta disponível
    bool memoryFull = false;
    while (gsmSerial.available()) {
        String response = gsmSerial.readStringUntil('\n');
        if (response.indexOf("+CMS ERROR: 500") != -1) {
            memoryFull = true;
            break;
        }
    }

    // Se a memória estiver cheia, limpa todas as mensagens SMS
    if (memoryFull) {
        Serial.println("A memória de mensagens SMS está cheia. Limpando todas as mensagens...");
        sendATCommand("AT+CMGD=1,4"); // Comando para limpar todas as mensagens SMS
        delay(2000);
        Serial.println("Todas as mensagens SMS foram limpas.");
    } else {
        Serial.println("A memória de mensagens SMS não está cheia. Nenhuma ação necessária.");
    }
}


void sendSMS(String phoneNumber, String message) {
    Serial.println("Enviando SMS para " + phoneNumber + "...");
    
    sendATCommand("AT+CMGS=\"" + phoneNumber + "\"");
    delay(1000);

    gsmSerial.print(message);
    delay(100);
    gsmSerial.write(26); // Envia o caractere Ctrl+Z para indicar o fim da mensagem
    delay(1000);

    Serial.println("SMS enviado.");
}
