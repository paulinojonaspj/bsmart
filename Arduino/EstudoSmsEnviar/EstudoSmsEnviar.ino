#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <Wire.h>

const char *ssid = "B-SMART";       // Coloque o SSID da sua rede WiFi
const char *password = "paulino123";   // Coloque a senha da sua rede WiFi
IPAddress staticIP(192, 168, 7, 30); 
IPAddress gateway(192, 168, 7, 1);
IPAddress subnet(255, 255, 255, 0);


HardwareSerial gsmSerial(1); // Usando RX0 (GPIO3) e TX0 (GPIO1)

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
  
    Serial.begin(115200); // Inicia a comunicação serial com o monitor serial
    WiFi.begin(ssid, password);
      WiFi.config(staticIP, gateway, subnet);

      while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  Serial.println("Conectado ao WiFi");
server.on("/", HTTP_GET, []() {
   pagina();
  });

    server.on("/enviar", HTTP_POST, handleEnviar);

    server.begin();
  
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
   while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  server.handleClient();
 
 delay(1000); 
}

void handleEnviar() {
    if (server.hasArg("numero") && server.hasArg("msg")) {
        String numero = server.arg("numero");
        String msg = server.arg("msg");
        clearFullSMSIfNeeded();
        sendSMS(numero.c_str(), msg.c_str());
        Serial.println("enviado");

        server.send(200, "text/plain", "Mensagem enviada com sucesso!");
    } else {
        server.send(400, "text/plain", "Campos 'numero' e 'msg' são necessários.");
    }
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
}
  
void clearFullSMSIfNeeded() {
    Serial.println("Verificando se a memória de mensagens SMS está cheia...");
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
    sendATCommand("AT+CMGF=1");
    Serial.println("Enviando SMS para " + phoneNumber + "...");
    sendATCommand("AT+CMGS=\"" + phoneNumber + "\"");
    delay(1000);
    gsmSerial.print(message);
    delay(100);
    gsmSerial.write(26); // Envia o caractere Ctrl+Z para indicar o fim da mensagem
    delay(1000);
    Serial.println("SMS enviado.");
}
