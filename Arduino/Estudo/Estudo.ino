#include <WiFiManager.h>         // Inclui a biblioteca WiFiManager
#include <WiFi.h>               // Inclui a biblioteca WiFi

void setup() {
  Serial.begin(115200);         // Inicializa a comunicação serial
  WiFiManager wifiManager;      // Cria uma instância de WiFiManager

  // Reset o ESP32 para limpar as configurações de Wi-Fi salvas anteriormente
 // wifiManager.resetSettings();

  // Tentativa de conectar à rede Wi-Fi salva, se houver
 // wifiManager.autoConnect("ESP32-Config");
  // Tentar conectar com as credenciais WiFi salvas
  if (!wifiManager.autoConnect("ESP32AP")) {
    Serial.println("Falha ao conectar e tempo esgotado. Reiniciando...");
    ESP.restart();
    delay(1000);
  }

  Serial.println("Conectado com sucesso ao Wi-Fi!");

  // Mostra o endereço IP atribuído ao ESP32
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Aqui você pode adicionar o código do seu programa
}
