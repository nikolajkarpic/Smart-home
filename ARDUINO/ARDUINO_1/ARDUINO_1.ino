#include <SPI.h> //spi for RFID communication
#include <MFRC522.h>
#include <Keypad.h>
#include <Servo.h>
//#include <ServoTimer2.h>

#define BAUD_RATE 9600
#define LED_ON_PERION 300UL // ms on after button pressed

#define IN_OPTION_ACCEPTED_0 1850UL // times for GREEN LED ON after RFID/PIN accepeted
#define IN_OPTION_ACCEPTED_1 2200UL
#define IN_OPTION_ACCEPTED_2 2750UL

#define IN_OPTION_DENIED 1500UL // Time RED LED is on after denied comand

#define AUTOMATIC_LOCK_TIME 10 * 1000UL // Time after which lock locks itself after UA comand

#define RST_PIN 9 // Configurable, see typical pin layout above
#define SS_PIN 10 // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

#define NEW_UID            \
  {                        \
    0xDE, 0xAD, 0xBE, 0xEF \
  }

MFRC522::MIFARE_Key key;

// LED indicators for keypad PIN
#define GREEN_LED 7
#define RED_LED 8

// servo Pin
#define SERVO_PIN 6
//#define LOCKED_POSITION 1500
//#define UNLOCKED_POSITION 750
// ServoTimer2 doorLock;
// servo timer 1
#define LOCKED_POSITION 90
#define UNLOCKED_POSITION 0
Servo doorLock;
int doorLockPosition = LOCKED_POSITION;

unsigned long timeNow;                         // Time at the begining of the loop
unsigned long lastTimeLed = millis();          // Last time Green led was on.
unsigned long lastTImeUnlocked = millis();     // Last time lock was unlocked
unsigned long lastTimeUnlockedLed0 = millis(); // green led times for accepted pin/rfid
unsigned long lastTimeUnlockedLed1 = millis(); // green led times for accepted pin/rfid
unsigned long lastTimeUnlockedLed2 = millis(); // green led times for accepted pin/rfid
unsigned long lastTimeDenied = millis();       // Last time pin/rfid was denied

String passCode = "PIN:"; // String that holds pass
String serialCommand;     // serial in data string

const byte ROWS = 4; // four rows
const byte COLS = 4; // four columns

unsigned char ledArray[4] = {0, 0, 0, 0}; // LED array
unsigned char locked = 1;                 // door locked
unsigned char greenLedOn = 0;             // LED manipulation via SERIAL
unsigned char rfidEnable = 1;             // enabling RFID via serial
unsigned char pinEndCharEntered = 0;      // chechs wether last input char was #
unsigned char charPressed = 0;            // 1 when kaypad pressed fot timers
unsigned char denied = 0;                 // when rfid or pin is invcalid
unsigned char unlockLedEnable0 = 0;       // enables time for green led on || acepted pin/rfid
unsigned char unlockLedEnable1 = 0;       // enables time for green led off || acepted pin/rfid
unsigned char unlockLedEnable2 = 0;       // enables time for green led on || accepted pin/rfid
unsigned char automaticLockEn = 0;       // enables automatic lock time
String pass = "";                         // holds pin
int keyNum = 0;                           // nuber of times keys have been pressed
unsigned char pinEnable = 1;              // enables pin input
char customKey;                           // keypad value

// define the cymbols on the buttons of the keypads
char hexaKeys[ROWS][COLS] = {
    {'1', '2', '3', 'A'},
    {'4', '5', '6', 'B'},
    {'7', '8', '9', 'C'},
    {'*', '0', '#', 'D'}};
byte rowPins[ROWS] = {A0, A1, A2, A3}; // connect to the row pinouts of the keypad
byte colPins[COLS] = {A4, A5, 3, 2};   // connect to the column pinouts of the keypad

// initialize an instance of class NewKeypad
Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS);

void setup()
{
  doorLock.attach(SERVO_PIN);       // attaches servo to the SERVO_PIN
  doorLock.write(doorLockPosition); // sets initial position

  Serial.begin(BAUD_RATE);    // enableing serial
  pinMode(GREEN_LED, OUTPUT); // pin mode for green led
  pinMode(RED_LED, OUTPUT);   // pin mode for red led
  SPI.begin();                // enabling spi communication for RFID
  mfrc522.PCD_Init();         // initialising RFID object

  for (byte i = 0; i < 6; i++)
  {
    key.keyByte[i] = 0xFF;
  }
}

void loop()
{
  timeNow = millis(); // gets time at the beggining of the loop
  // comands from serial
  if (Serial.available() > 0)
  {
    serialCommand = Serial.readString();
    if (serialCommand == "UA") // unlocks and relocks after set amount of time (AUTOMATIC_LOCK_TIME)
    {
      locked = 0;
      greenLedOn = 1;
      unlockLedEnable0 = 1;
      automaticLockEn = 1;
      pinEnable = 1;
      rfidEnable = 1;
      lastTImeUnlocked = timeNow;
      lastTimeUnlockedLed0 = timeNow;
      lastTimeUnlockedLed1 = timeNow;
      lastTimeUnlockedLed2 = timeNow;
      // Serial.println("otkljuco");
    }
    if (serialCommand == "U") // unlocks and keeps the door unlocked untill lock command is recieved
    {
      locked = 0;
      greenLedOn = 1;
      unlockLedEnable0 = 1;
      pinEnable = 1;
      rfidEnable = 1;
      lastTimeUnlockedLed0 = timeNow;
      lastTimeUnlockedLed1 = timeNow;
      lastTimeUnlockedLed2 = timeNow;
      // Serial.println("otkljuco");
    }
    if (serialCommand == "L") // locks
    {
      locked = 1;
    }
    if (serialCommand == "L1") // turns on green led
    {

      greenLedOn = 1;
    }

    if (serialCommand == "L0") // turns off green led
    {
      greenLedOn = 0;
      // Serial.println("LED OFF");
    }
    if (serialCommand == "R1") // enables rfid
    {
      rfidEnable = 1;
    }
    if (serialCommand == "R0") // disables rfid
    {
      rfidEnable = 0;
    }
    if (serialCommand == "P1") // enables PIN
    {
      pinEnable = 1;
    }
    if (serialCommand == "P0") // disables PIN
    {
      pinEnable = 0;
    }
    if (serialCommand == "E") // emab;es all input comands
    {
      pinEnable = 1;
      rfidEnable = 1;
    }
    if (serialCommand == "D") // denied acces, turns on red led
    {
      denied = 1;
      locked = 1;
      pinEnable = 1;
      rfidEnable = 1;
      lastTimeDenied = timeNow;
    }
    serialCommand = ""; // resets serial command
  }

  // Working kaypad logic.

  customKey = customKeypad.getKey(); // gets a char from keypad

  if (customKey && pinEnable)
  {
    lastTimeLed = timeNow;
    greenLedOn = 1;
    charPressed = 1;
    // Serial.println(customKey);
    if (customKey == '#')
    {
      pinEndCharEntered = 1;
    }
    else
    {
      pass += customKey;
      keyNum++;
    }
  }

  if (pinEndCharEntered) // after end char entered send pin to serial
  {
    passCode = passCode + pass;
    Serial.println(passCode);
    passCode = "PIN:";
    pinEnable = 0;
    rfidEnable = 0;
    keyNum = 0;
    pass = "";
    pinEndCharEntered = 0;
  }

  if (charPressed)
  {
    if (timeNow - lastTimeLed >= LED_ON_PERION)
    {
      greenLedOn = 0;
      charPressed = 0;
    }
  }

  if (automaticLockEn && timeNow - lastTImeUnlocked >= AUTOMATIC_LOCK_TIME)
  {
    locked = 1;
    automaticLockEn = 0;
    // Serial.println(timeNow);
  }

  if (unlockLedEnable0 && (timeNow - lastTimeUnlockedLed0 >= IN_OPTION_ACCEPTED_0))
  {
    greenLedOn = 0;
    unlockLedEnable1 = 1;
    unlockLedEnable0 = 0;
    // Serial.println(timeNow);
  }

  if (unlockLedEnable1 && (timeNow - lastTimeUnlockedLed1 >= IN_OPTION_ACCEPTED_1))
  {
    greenLedOn = 1;
    unlockLedEnable1 = 0;
    unlockLedEnable2 = 1;
    // Serial.println(timeNow);
  }
  if (unlockLedEnable2 && (timeNow - lastTimeUnlockedLed2 >= IN_OPTION_ACCEPTED_2))
  {
    greenLedOn = 0;
    unlockLedEnable2 = 0;
    //    unlockLedEnable0 = 0;
    // Serial.println(timeNow);
  }

  if (denied)
  {
    digitalWrite(RED_LED, HIGH);
    if (timeNow - lastTimeDenied >= IN_OPTION_DENIED)
    {
      Serial.println(timeNow - lastTimeDenied);

      denied = 0;
      // Serial.println(timeNow);
    }
  }
  else
  {
    digitalWrite(RED_LED, LOW);
  }

  if (locked)
  {
    doorLockPosition = LOCKED_POSITION;
    doorLock.write(doorLockPosition);
  }
  else
  {
    doorLockPosition = UNLOCKED_POSITION;
    doorLock.write(doorLockPosition);
  }

  if (greenLedOn) // enables all leds when its 1
  {

    digitalWrite(GREEN_LED, HIGH);
  }
  else
  {
    digitalWrite(GREEN_LED, LOW);
  }

  if (rfidEnable)
  {
    if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial())
    {
      return;
    }
    else
    {

      Serial.print(F("RFID:"));
      for (byte i = 0; i < mfrc522.uid.size; i++)
      {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
      }
      Serial.println();
      rfidEnable = 0;
      pinEnable = 0;
    }
  }
}
