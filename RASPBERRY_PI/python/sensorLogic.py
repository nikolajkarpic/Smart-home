from re import L
from urllib import request
import serial
import requests
from setuptools import Command


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
    comand = ""
    value = ""
    [Command, value] = newData.split(:)
    print(Command, value)


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
    serialPort = serial.Serial('COM4', baudrate=9600)
    serialString = ""  # Used to hold data coming over UART
    data = ""
    dataFromHttp = ""
    digitalPinsDict = {}
    analoguePinsDict = {}
    newData = ""
    oldData = ""
    while 1:
        readFromFIle()
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
            if(newData[0] == 'D'):
                [digitalPinsDict, analoguePinsDict] = splitStringToDict(
                    newData)

            # afted you're done testing enable this, so that the server doesnt send unnesccecary data
            # if(newData == oldData):
            #     continue
            print(digitalPinsDict)
            print(analoguePinsDict)
            try:
                print(serialString.decode("Ascii"))

            except:
                pass
        serialPort.write('A'.encode())

        oldData = newData


main()
