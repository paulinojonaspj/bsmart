#include "SD.h"
#include "SPI.h"

File file;
String url;
String tipo;
String local;

void setup() {
  Serial.begin(9600);
  
  // Inicializa o cartão SD com a porta CS definida como 5
  if(!SD.begin(5)){
    Serial.println("Falha ao montar o cartão SD");
    return;
  }
  
  // Abre o arquivo "bsmart.txt" para leitura
  file = SD.open("/bsmart.txt");
  
  // Verifica se o arquivo foi aberto corretamente
  if(!file){
    Serial.println("Falha ao abrir o arquivo");
    return;
  }
  
  // Lê o conteúdo das três primeiras linhas do arquivo
  if(file.available()){
    url = file.readStringUntil('\n');
  }
  if(file.available()){
    tipo = file.readStringUntil('\n');
  }
  if(file.available()){
    local = file.readStringUntil('\n');
  }
  
  // Fecha o arquivo
  file.close();
  
  // Imprime as variáveis no console serial
    Serial.println("-----");
  Serial.println("url: " + url);
  Serial.println("tipo: " + tipo);
  Serial.println("local: " + local);
}

void loop() {
  // Nada no loop neste exemplo
}
