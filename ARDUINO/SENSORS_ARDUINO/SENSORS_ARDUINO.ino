#include <MQ7.h>
#include <SimpleDHT.h>

// for DHT11,
//      VCC: 5V or 3V
//      GND: GND
//      DATA: 2
#define pinDHT11 2
SimpleDHT11 dht11;

#define A_PIN A2
#define VOLTAGE 5

#define LIGHT_0 13 // LIGHTS LED PINS
#define LIGHT_1 12
#define LIGHT_2 7
#define LIGHT_3 6

unsigned char light0 = 0; // LIGHTS control variables
unsigned char light1 = 0;
unsigned char light2 = 0;
unsigned char light3 = 0;

#define TEMP_CONTROL_MAX_VALUE 255
#define HEAT_PIN 11
#define COOL_PIN 10
#define PIRPIN 4

#define pushButton 8
#define motorControl 9

MQ7 mq7(A_PIN, VOLTAGE);
unsigned long lastMillis;
#define SENSOR_PERIOD 1000

float heatProcent = 0;
float coolProcent = 0;

unsigned char heatOn = 0;
unsigned char coolOn = 0;

String serialCommand;

byte temperature = 0;
byte humidity = 0;
byte data[40] = {0};

void setup()
{
    Serial.begin(9600);
    Serial.println("Calibrating MQ7");
    // mq7.calibrate(); // calculates R0
    Serial.println("Calibration done!");
    pinMode(PIRPIN, INPUT);
    // output for heating control
    pinMode(HEAT_PIN, OUTPUT);

    pinMode(COOL_PIN, OUTPUT);

    // output for lioghts

    pinMode(LIGHT_0, OUTPUT);
    pinMode(LIGHT_1, OUTPUT);
    pinMode(LIGHT_2, OUTPUT);
    pinMode(LIGHT_3, OUTPUT);

    // make the pushbutton's pin an input:

    pinMode(pushButton, INPUT);

    // make the transistor's pin an output:

    pinMode(motorControl, OUTPUT);
}

void loop()
{

    if (millis() - lastMillis >= SENSOR_PERIOD)
    {
        Serial.println(millis() - lastMillis);
        lastMillis = millis();
        sensorToSerial((int)temperature, (int)humidity);
    }

    serialInControls();
    controlAC();
    lightControl();

    if (dht11.read(pinDHT11, &temperature, &humidity, data))
    {
        // Serial.print("Read DHT11 failed");
        delay(50);
        return;
    }
}

void sensorToSerial(int temperature, int humidity)
{
    Serial.print("T:");
    Serial.print((int)temperature);
    Serial.print(" ");
    Serial.print("H:");
    Serial.print((int)humidity);
    Serial.print(" ");
    Serial.print("MQ7:");
    Serial.print(mq7.readPpm());
    Serial.print(" ");
    Serial.print("PIR:");
    Serial.print(digitalRead(PIRPIN));
    Serial.println(" ");
}

void lightControl()
{
    if (light0)
    {
        digitalWrite(LIGHT_0, HIGH);
    }
    else
    {
        digitalWrite(LIGHT_0, LOW);
    }

    if (light1)
    {
        digitalWrite(LIGHT_1, HIGH);
    }
    else
    {
        digitalWrite(LIGHT_1, LOW);
    }
    if (light2)
    {
        digitalWrite(LIGHT_2, HIGH);
    }
    else
    {
        digitalWrite(LIGHT_2, LOW);
    }
    if (light3)
    {
        digitalWrite(LIGHT_3, HIGH);
    }
    else
    {
        digitalWrite(LIGHT_3, LOW);
    }
}

void controlAC()
{
    if (coolOn)
    {
        analogWrite(COOL_PIN, (int)(coolProcent * TEMP_CONTROL_MAX_VALUE));
    }
    else
    {
        analogWrite(COOL_PIN, 0);
    }

    if (heatOn)
    {
        analogWrite(HEAT_PIN, (int)(heatProcent * TEMP_CONTROL_MAX_VALUE));
    }
    else
    {
        analogWrite(HEAT_PIN, 0);
    }
}

void serialInControls()
{
    if (Serial.available() > 0)
    {
        serialCommand = Serial.readString();
        if (serialCommand.charAt(0) == 'C') // cooling control
        {
            if (serialCommand.charAt(1) == "0")
            {
                coolOn = 0;
            }
            else
            {
                coolOn = 1;
                serialCommand.remove(0, 2);
                coolProcent = serialCommand.toFloat();
            }
        }
        if (serialCommand.charAt(0) == 'H') // heating control
        {
            if (serialCommand.charAt(1) == "0")
            {
                heatOn = 0;
            }
            else
            {
                heatOn = 1;
                serialCommand.remove(0, 2);
                heatProcent = serialCommand.toFloat();
            }
        }
        if (serialCommand == "Q1")
        {
            light0 = 1;
        }
        if (serialCommand == "Q0")
        {
            light0 = 0;
        }

        if (serialCommand == "W1")
        {
            light1 = 1;
        }
        if (serialCommand == "W0")
        {
            light1 = 0;
        }

        if (serialCommand == "E1")
        {
            light2 = 1;
        }
        if (serialCommand == "E0")
        {
            light2 = 0;
        }

        if (serialCommand == "R1")
        {
            light3 = 1;
        }
        if (serialCommand == "R0")
        {
            light3 = 0;
        }

        serialCommand = "";
    }
}