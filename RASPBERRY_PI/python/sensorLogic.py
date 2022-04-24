from re import L
from time import sleep
from urllib import request
import serial
import requests
import json
from datetime import datetime


def chehkTime(timeT):
    nowT = datetime.now().second
    # print(nowT, " ", timeT)
    if (abs(int(nowT) - int(timeT)) >= 5):
        return True


def splitStringToDict(sensorData):
    sensorData = sensorData[:-2]
    sensorData = sensorData.split('|')
    digitalPins = sensorData[0].split()
    analoguePins = sensorData[1].split()
    digitalPinsDict = {}
    analoguePinsDict = {}
    print(digitalPins)
    print(analoguePins)

    for data in digitalPins:
        [key, value] = data.split(':')
        digitalPinsDict[key] = (int(value))

    for data in analoguePins:
        [key, value] = data.split(':')
        analoguePinsDict[key] = (float(value))

    return [digitalPinsDict, analoguePinsDict]

# doesnt work as of now... implement class bassed structure.


def doorLogic(newData, oldData):
    if(newData == oldData):
        return
    command = ""
    value = ""
    print(newData)
    [command, value] = newData[:-2].split(':')
    return(command, value)


def readFromFIle():
    file = open('file.txt', 'r')
    oldData = ''
    newData = file.read()
    if (newData == oldData):
        return
    print(newData)
    oldData = newData
    file.close()


def main():
    nowT = datetime.now().second
    serialPort = serial.Serial('COM5', baudrate=9600)
    serialString = ""  # Used to hold data coming over UART
    data = ""
    dataFromHttp = ""
    digitalPinsDict = {}
    analoguePinsDict = {}
    newData = ""
    oldData = ""
    com = ""
    val = ""
    while 1:
        # readFromFIle()
        # Wait until there is data waiting in the serial buffer
        if serialPort.in_waiting > 0:

            # place holder for sending data to database / backend
            # dataFromHttp = requests.get(
            #     'https://jsonplaceholder.typicode.com/posts')
            # print(dataFromHttp.text)
            # Read data out of the buffer until a carraige return / new line is found
            serialString = serialPort.readline()

            try:
                newData = serialString.decode("Ascii")
            except:
                pass
            try:
                print(serialString.decode("Ascii"))

            except:
                pass
            # if(newData[0] == 'D'):
            #     [digitalPinsDict, analoguePinsDict] = splitStringToDict(
            #         newData)
            try:
                [com, val] = doorLogic(newData, oldData)
            except:
                pass
            jsonFile = open(r"C:\FTN\Diplomsi rad\misc\users.json")
            jsonData = json.load(jsonFile)
            for key, value in jsonData.items():
                if (str(val) == value['PIN'] or str(val) == value['RFID']):
                    waitNumBytes = serialPort.write(b'L0')
                    print(waitNumBytes)
                    print(serialPort.in_waiting)
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    print(key + " je usao u kucu!")
                    serialPort.flush()
                    waitNumBytes = serialPort.write(b'U')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPort.flush()
                # sleep(0.2)
                    val = 0

            jsonFile.close()
            # afted you're done testing enable this, so that the server doesnt send unnesccecary data
            # if(newData == oldData):
            #     continue
            # print(digitalPinsDict)
            # print(analoguePinsDict)

        # serialPort.write('A'.encode())
        if(chehkTime(nowT)):
            waitNumBytes = serialPort.write(b'E')
            for x in range(0, waitNumBytes * 8):
                sleep(0.02)
            serialPort.flush()
            nowT = datetime.now().second
            print("eneblovao sve ulaze")

        oldData = newData


main()
