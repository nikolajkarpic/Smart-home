#include <SPI.h> //spi for RFID communication
#include <MFRC522.h>
#include <Keypad.h>
#include <Servo.h>

#define BAUD_RATE 9600

#define RST_PIN 9 // Configurable, see typical pin layout above
#define SS_PIN 10 // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

#define NEW_UID            \
  {                        \
    0xDE, 0xAD, 0xBE, 0xEF \
  }

MFRC522::MIFARE_Key key;

// LED indicators for keypad PIN
#define led1 4
#define led2 5
#define led3 8
#define led4 7

// servo Pin
#define SERVO_PIN 6
#define LOCKED_POSITION 90
#define UNLOCKED_POSITION 0
Servo doorLock;
int doorLockPosition = LOCKED_POSITION;

String passCode = "PIN:"; // String that holds pass
String serialCommand;     // serial in data string

const byte ROWS = 4; // four rows
const byte COLS = 4; // four columns

unsigned char ledArray[4] = {0, 0, 0, 0}; // LED array
unsigned char passEntered = 0;            // pin entered, four digits pressed on keypad
unsigned char locked = 1;                 // door locked
unsigned char ledOn = 1;                  // LED manipulation via SERIAL
unsigned char rfidEnable = 1;             // enabling RFID via serial
char pass[] = "0000";                     // holds pin
int keyNum = 0;                           // nuber of times keys have been pressed
unsigned char pinEnable = 1;

char customKey; // keypad value

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
  doorLock.attach(SERVO_PIN);
  doorLock.write(doorLockPosition);

  Serial.begin(BAUD_RATE); // enableing serial
  pinMode(led1, OUTPUT);   // setting pin mode to output
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  SPI.begin();        // enabling spi communication for RFID
  mfrc522.PCD_Init(); // initialising RFID object

  for (byte i = 0; i < 6; i++)
  {
    key.keyByte[i] = 0xFF;
  }
}

void loop()
{
  // comands from serial
  if (Serial.available() > 0)
  {
    serialCommand = Serial.readString();
    if (serialCommand == "U")
    {
      locked = 0;
      // Serial.println("otkljuco");
    }
    if (serialCommand == "L")
    {
      locked = 1;
      // Serial.println("zakljuco");
    }
    if (serialCommand == "L1")
    {

      ledOn = 1;
    }

    if (serialCommand == "L0")
    {
      ledOn = 0;
      // Serial.println("LED OFF");
    }
    if (serialCommand == "R1")
    {
      rfidEnable = 1;
      // Serial.println("omogucio rfid");
    }
    if (serialCommand == "R0")
    {
      rfidEnable = 0;
      // Serial.println("onemogucio rfid");
    }
    if (serialCommand == "P1")
    {
      pinEnable = 1;
    }
    if (serialCommand == "P0")
    {
      pinEnable = 0;
    }
    if (serialCommand == "E")
    {
      pinEnable = 1;
      rfidEnable = 1;
      ledOn = 1;
      locked = 1;
    }
    serialCommand = "";
  }

  // Working kaypad logic.

  customKey = customKeypad.getKey();

  if (customKey && pinEnable)
  {
    // Serial.println(customKey);

    if (passEntered)
    {
      ledArray[1] = 0;
      ledArray[2] = 0;
      ledArray[3] = 0;
      ledArray[0] = 0;
    }
    pass[keyNum] = customKey;
    ledArray[keyNum] = 1;
    passEntered = 0;
    keyNum++;
  }

  if (keyNum == 4)
  {
    passEntered = 1;
    passCode = passCode + pass;
    Serial.println(passCode);
    passCode = "PIN:";
    pinEnable = 0;
    rfidEnable = 0;
    keyNum = 0;
  }

  if (passEntered)
  {
    if (ledOn)
    {
      ledArray[1] = 1;
      ledArray[2] = 1;
      ledArray[3] = 1;
      ledArray[0] = 1;
    }
    else
    {
      ledArray[1] = 0;
      ledArray[2] = 0;
      ledArray[3] = 0;
      ledArray[0] = 0;
    }
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

  if (ledArray[0])
  {
    digitalWrite(led1, HIGH);
  }
  else
  {
    digitalWrite(led1, LOW);
  }
  if (ledArray[1])
  {
    digitalWrite(led2, HIGH);
  }
  else
  {
    digitalWrite(led2, LOW);
  }
  if (ledArray[2])
  {
    digitalWrite(led3, HIGH);
  }
  else
  {
    digitalWrite(led3, LOW);
  }
  if (ledArray[3])
  {
    digitalWrite(led4, HIGH);
  }
  else
  {
    digitalWrite(led4, LOW);
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
