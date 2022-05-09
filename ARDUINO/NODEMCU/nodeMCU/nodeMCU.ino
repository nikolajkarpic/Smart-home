#include "AiEsp32RotaryEncoder.h"
#include "Arduino.h"
#include <LedControl.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include "numbers.h"
#include <ArduinoJson.h>

ESP8266WebServer server;

char *ssid = "Karpic company limited 2";
char *password = "wi#fi545";

int DIN = 16; // D0

int CS = 5; // D1

int CLK = 4; // D2
LedControl lc = LedControl(DIN, CLK, CS, 0);

const int IMAGES_LEN = sizeof(IMAGES) / 8;
/*
connecting Rotary encoder

Rotary encoder side    MICROCONTROLLER side
-------------------    ---------------------------------------------------------------------
CLK (A pin)            any microcontroler intput pin with interrupt -> in this example pin 32
DT (B pin)             any microcontroler intput pin with interrupt -> in this example pin 21
SW (button pin)        any microcontroler intput pin with interrupt -> in this example pin 25
GND - to microcontroler GND
VCC                    microcontroler VCC (then set ROTARY_ENCODER_VCC_PIN -1)

***OR in case VCC pin is not free you can cheat and connect:***
VCC                    any microcontroler output pin - but set also ROTARY_ENCODER_VCC_PIN 25
                        in this example pin 25

*/
#if defined(ESP8266)
#define ROTARY_ENCODER_A_PIN 14
#define ROTARY_ENCODER_B_PIN 12
#define ROTARY_ENCODER_BUTTON_PIN 13
#else
#define ROTARY_ENCODER_A_PIN 32
#define ROTARY_ENCODER_B_PIN 21
#define ROTARY_ENCODER_BUTTON_PIN 25
#endif
#define ROTARY_ENCODER_VCC_PIN -1 /* 27 put -1 of Rotary encoder Vcc is connected directly to 3,3V; else you can use declared output pin for powering rotary encoder */

// depending on your encoder - try 1,2 or 4 to get expected behaviour
//#define ROTARY_ENCODER_STEPS 1
//#define ROTARY_ENCODER_STEPS 2
#define ROTARY_ENCODER_STEPS 4

#define THERMISTOR_PIN A0

float t = 0.0;
float h = 0.0;
float newT;
float tempC;
int i = 0;

#define READ_TEMP_TIME 1000
#define TIME_PREF_TEMP_SHOWS 800
unsigned long lastTimePrefTempChanged = 0;
unsigned long lastTimeTempRead = 0;
int currentTemp = 27;
int preffetedTemp = 27;
String prefTempS = "";
String currentTempS = "";

unsigned char prefTempChanged = 0;

// instead of changing here, rather change numbers above
AiEsp32RotaryEncoder rotaryEncoder = AiEsp32RotaryEncoder(ROTARY_ENCODER_A_PIN, ROTARY_ENCODER_B_PIN, ROTARY_ENCODER_BUTTON_PIN, ROTARY_ENCODER_VCC_PIN, ROTARY_ENCODER_STEPS);

void rotary_onButtonClick()
{
  static unsigned long lastTimePressed = 0;
  // ignore multiple press in that time milliseconds
  if (millis() - lastTimePressed < 500)
  {
    return;
  }
  lastTimePressed = millis();
  Serial.print("button pressed ");
  Serial.print(millis());
  Serial.println(" milliseconds after restart");
}

void rotary_loop()
{
  // dont print anything unless value changed
  if (rotaryEncoder.encoderChanged())
  {
    prefTempChanged = 1;
    lastTimePrefTempChanged = millis();
    preffetedTemp = rotaryEncoder.readEncoder();
    displayImage(IMAGES[rotaryEncoder.readEncoder()]);
    if (++i >= IMAGES_LEN)
    {
      i = 0;
    }
    Serial.println(rotaryEncoder.readEncoder());
  }
  if (rotaryEncoder.isEncoderButtonClicked())
  {
    rotary_onButtonClick();
  }
}

void IRAM_ATTR readEncoderISR()
{
  rotaryEncoder.readEncoder_ISR();
}

void handleRoot()
{
  server.send(200, "text/plain", "hello from esp8266!\r\n");
}

void hello()
{
  server.send(204, "HiIIya");
}

void setPrefTemp () {
  String dataFromReq = server.arg("plain");
  DynamicJsonDocument jBuffer(512);
  DeserializationError error = deserializeJson(jBuffer, dataFromReq);
  if(error){
     Serial.print(F("Error parsing JSON "));
        Serial.println(error.c_str());
 
        String msg = error.c_str();
 
        server.send(400, F("text/html"),
                "Error in parsin json body! <br>" + msg);
    }
  else{
    JsonObject postObj = jBuffer.as<JsonObject>();
    if (postObj.containsKey("PT")){
      lastTimePrefTempChanged = millis();
      prefTempChanged = 1;
      preffetedTemp = postObj["PT"].as<int>();
      rotaryEncoder.setEncoderValue(preffetedTemp);
      server.send(200,"text/plain","GOT THE DATA!");
      }
    }

  
  }

void getPrefTemp()
{
  prefTempS = "PT:" + String(preffetedTemp);
  server.send(200, "text/plain", prefTempS);
}

void getCurrentTemp (){
  currentTempS = "CT:" + String(int(tempC));
  server.send(200, "text/plain", currentTempS);
}


void setup()
{
  Serial.begin(9600);

  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266"))
  {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);
  server.on("/hello", hello);
  server.on("/getPrefTemp", getPrefTemp);
  server.on("/setPrefTemp", setPrefTemp);
  server.on("/getCurrentTemp", getCurrentTemp);
  server.begin();

  lc.shutdown(0, false); // The MAX72XX is in power-saving mode on startup

  lc.setIntensity(0, 15); // Set the brightness to maximum value

  lc.clearDisplay(0); // and clear the display

  rotaryEncoder.begin();
  rotaryEncoder.setup(readEncoderISR);
  bool circleValues = false;
  rotaryEncoder.setBoundaries(0, 49, circleValues); // minValue, maxValue, circleValues true|false (when max go to min and vice versa)
  rotaryEncoder.setEncoderValue(27);
  rotaryEncoder.setAcceleration(20); // or set the value - larger number = more accelearation; 0 or 1 means disabled acceleration
}

void displayImage(const byte *image)
{
  for (int i = 0; i < 8; i++)
  {
    for (int j = 0; j < 8; j++)
    {
      lc.setLed(0, i, j, bitRead(image[i], 7 - j));
    }
  }
}

void loop()
{
  server.handleClient();
  MDNS.update();
  // in loop call your custom function which will process rotary encoder values

  if (millis() - lastTimePrefTempChanged > TIME_PREF_TEMP_SHOWS && prefTempChanged)
  {
    displayImage(IMAGES[int(tempC)]);
    if (++i >= IMAGES_LEN)
    {
      i = 0;
    }
    prefTempChanged = 0;
  }

  if (millis() - lastTimeTempRead > READ_TEMP_TIME)
  {
    int tempReading = analogRead(THERMISTOR_PIN);

    double tempK = log(10000.0 * ((1024.0 / tempReading - 1)));
    tempK = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * tempK * tempK)) * tempK); //  Temp Kelvin
    tempC = tempK - 273.15;
    tempC = tempC * (0.66); // Convert Kelvin to Celcius

    lastTimeTempRead = millis();
    displayImage(IMAGES[int(tempC)]);
    if (++i >= IMAGES_LEN)
    {
      i = 0;
    }
  }
  rotary_loop();
  //  Serial.println(int(tempC));
}
