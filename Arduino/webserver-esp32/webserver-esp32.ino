#include <WiFi.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 4

OneWire oneWire(ONE_WIRE_BUS);

// Inicializa o objeto DallasTemperature
DallasTemperature sensors(&oneWire);

const char *ssid = "B-SMART";       // Coloque o SSID da sua rede WiFi
const char *password = "paulino123";   // Coloque a senha da sua rede WiFi
const char *url = "http://192.168.7.10:8080/api/v1/consumo";
//const char *url = "http://192.168.7.100:8080/api/v1/consumo";

byte statusLed    = 13;

byte ledLigado    = 5;
byte ledWifi    = 17;
byte ledAgua    = 18;
float escala=300;
String requestBody="";

byte sensorInterrupt = digitalPinToInterrupt(2);  // Use the appropriate interrupt pin for ESP32
byte sensorPin       = 2;

// The hall-effect flow sensor outputs approximately 4.5 pulses per second per
// litre/minute of flow.
float calibrationFactor = 4.5;

volatile byte pulseCount;

float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;

unsigned long totalMilliLitres2;

unsigned long oldTime;

void setup()
{

     pinMode(statusLed, OUTPUT);
     pinMode(ledLigado, OUTPUT);
     pinMode(ledWifi, OUTPUT);
     pinMode(ledAgua, OUTPUT);

       digitalWrite(ledLigado, HIGH);
       
  digitalWrite(statusLed, HIGH);  // We have an active-low LED attached

  pinMode(sensorPin, INPUT_PULLUP);  // Enable internal pull-up resistor for ESP32

  digitalWrite(ledLigado, HIGH);
  // Initialize a serial connection for reporting values to the host
  Serial.begin(9600);
 sensors.begin();

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

  // Fazer a requisição HTTP

  /* 
  Serial.println("Enviando requisição...");
int httpCode = http.GET();


  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Resposta da requisição:");
    Serial.println(payload);
  } else {
    Serial.printf("Falha na requisição HTTP. Código de erro: %d\n", httpCode);
  }
   http.end();
  */
  
  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  totalMilliLitres2=0;
  oldTime           = 0;

  // The Hall-effect sensor is connected to pin 2 which uses interrupt 0.
  // Configured to trigger on a FALLING state change (transition from HIGH
  // state to LOW state)
  attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
}

/**
 * Main program loop
 */
void loop()
{
    sensors.requestTemperatures();
   float tempC = sensors.getTempCByIndex(0);
   escala=tempC;
  
  // Se a leitura for inválida, exibe uma mensagem de erro
  if (tempC == -127.00) {
     escala=300;
    Serial.println("Erro ao ler o sensor.");
  }  
  
  if ((millis() - oldTime) > 1000)  // Only process counters once per second
  {
    // Disable the interrupt while calculating flow rate and sending the value to
    // the host
    detachInterrupt(sensorInterrupt);

    // Because this loop may not complete in exactly 1 second intervals we calculate
    // the number of milliseconds that have passed since the last execution and use
    // that to scale the output. We also apply the calibrationFactor to scale the output
    // based on the number of pulses per second per units of measure (litres/minute in
    // this case) coming from the sensor.
    flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;

    // Note the time this processing pass was executed. Note that because we've
    // disabled interrupts the millis() function won't actually be incrementing right
    // at this point, but it will still return the value it was set to just before
    // interrupts went away.
    oldTime = millis();

    // Divide the flow rate in litres/minute by 60 to determine how many litres have
    // passed through the sensor in this 1 second interval, then multiply by 1000 to
    // convert to millilitres.
    flowMilliLitres = (flowRate / 60) * 1000;

    // Add the millilitres passed in this second to the cumulative total
    totalMilliLitres += flowMilliLitres;
    totalMilliLitres2+=flowMilliLitres;

    unsigned int frac;

    // Print the flow rate for this second in litres / minute
    Serial.print("Flow rate: ");
    Serial.println(int(flowRate));  // Print the integer part of the variable

    if(int(flowRate)>0){
       digitalWrite(ledWifi, LOW);
       digitalWrite(ledLigado, LOW);
       digitalWrite(ledAgua, HIGH);
    
        HTTPClient http;
        http.begin(url);
        http.addHeader("Content-Type", "application/json");
        http.begin(url);
        http.addHeader("Content-Type", "application/json");
        if(escala==300){
             requestBody = "{\"tipo\": \"AGUA\", \"localizacao\": \"CENTRAL\", \"escala\": \"\", \"quantidade\": " + String(totalMilliLitres) + "}";
             Serial.println("Escala: - ");
        }else if(escala>40){
             requestBody = "{\"tipo\": \"AGUA\", \"localizacao\": \"CENTRAL\", \"escala\": \"Muito quente\", \"quantidade\": " + String(totalMilliLitres) + "}";
                Serial.println("Escala: Muito Quente "+String(tempC)+" C");
        }else if(escala >= 30 && escala <= 40){
             requestBody = "{\"tipo\": \"AGUA\", \"localizacao\": \"CENTRAL\", \"escala\": \"Quente\", \"quantidade\": " + String(totalMilliLitres) + "}";
                Serial.println("Escala: Quente"+String(tempC)+" C");
        }else if(escala >= 20 && escala < 30){
             requestBody = "{\"tipo\": \"AGUA\", \"localizacao\": \"CENTRAL\", \"escala\": \"Normal\", \"quantidade\": " + String(totalMilliLitres) + "}";
                Serial.println("Escala: Normal "+String(tempC)+" C");
        }else if(escala >= 10 && escala < 20){
             requestBody = "{\"tipo\": \"AGUA\", \"localizacao\": \"CENTRAL\", \"escala\": \"Fria\", \"quantidade\": " + String(totalMilliLitres) + "}";
                Serial.println("Escala: Fria "+String(tempC)+" C");
        }else{ 
             requestBody = "{\"tipo\": \"AGUA\", \"localizacao\": \"CENTRAL\", \"escala\": \"Muito fria\", \"quantidade\": " + String(totalMilliLitres) + "}";
                Serial.println("Escala: Muito fria " +String(tempC)+" C");
        }
       
        
        http.POST(requestBody);
        totalMilliLitres=0;
        http.end();
    }else{
      digitalWrite(ledAgua,LOW);
      digitalWrite(ledWifi, HIGH);
      digitalWrite(ledLigado,LOW);
    }
 
    
    Serial.print("L/min");
    Serial.print("\t");  // Print tab space

    // Print the cumulative total of litres flowed since starting
    Serial.print("Output Liquid Quantity: ");
    Serial.print(totalMilliLitres2);
    Serial.println("mL");
    Serial.print("\t");  // Print tab space
    Serial.print(totalMilliLitres2 / 1000);
    Serial.print("L");

    // Reset the pulse counter so we can start incrementing again
    pulseCount = 0;

    // Enable the interrupt again now that we've finished sending output
    attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
  }
}

/*
Insterrupt Service Routine
 */
void pulseCounter()
{
  // Increment the pulse counter
  pulseCount++;
}
