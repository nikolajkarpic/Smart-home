from distutils.command.check import check
from re import L
from time import sleep
from tkinter.tix import Tree
from urllib import request
import serial
import requests
import json
from datetime import datetime


def chehkTime(time, period):
    nowT = datetime.now().second
    # print(nowT, " ", timeT)
    if (abs(int(nowT) - int(time)) >= period):
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


def calculateTempPWM(currentTemp, preferredTemp):  # returns [coolPWM, heatPWM]

    if(currentTemp - preferredTemp >= 5):
        return[1, 0]
    if(currentTemp - preferredTemp <= -5):
        return[0, 1]
    value = (currentTemp - preferredTemp)/5
    if (value >= 0):
        return[abs(value), 0]
    else:
        return[0, abs(value)]


def doorLogic(newData):
    command = ""
    value = ""
    [command, value] = newData[:-2].split(':')
    return(command, value)


def main():
    currentTime = datetime.now().second
    lastTimeCheckCommands = datetime.now().second
    serialPortDoor = serial.Serial('COM5', baudrate=9600)
    serialString = ""  # Used to hold data coming over UART
    data = ""
    dataFromHttp = ""
    digitalPinsDict = {}
    analoguePinsDict = {}
    commands = ""
    newData = ""
    oldData = ""
    jsonCommandFile = open(
        r"C:\FTN\Diplomsi rad\misc\commandRecieved.json")
    jsonCommandData = json.load(jsonCommandFile)
    jsonCommandFile.close()
    com = ""
    val = ""
    newCommandRecieved = False
    roomCommands = []
    accesAllowed = ""
    user = ""
    while 1:
        currentTime = datetime.now().second
        if(chehkTime(lastTimeCheckCommands, 1)):
            # instead of opening the json file, it should http request the data from database
            jsonCommandFile = open(
                r"C:\FTN\Diplomsi rad\misc\commandRecieved.json")
            newjsonCommandData = json.load(jsonCommandFile)
            if(newjsonCommandData != jsonCommandData):
                newCommandRecieved = True  # sets it so that script knows it recieved new commands
                # checks wethers new commnad is temp
                if(newjsonCommandData["COMMANDS"]["PREFERRED_TEMPERATURE"] != jsonCommandData["COMMANDS"]["PREFERRED_TEMPERATURE"]):
                    newTemp = newjsonCommandData.get(
                        "COMMANDS").get('PREFERRED_TEMPERATURE')
                else:
                    newTemp = None

                # Gets changes in rooms
                for key in newjsonCommandData["COMMANDS"]["ROOMS"]:
                    try:
                        if(newjsonCommandData["COMMANDS"]["ROOMS"][key] != jsonCommandData["COMMANDS"]["ROOMS"][key]):
                            print(newjsonCommandData["COMMANDS"]["ROOMS"][key])
                            for roomStat in newjsonCommandData["COMMANDS"]["ROOMS"][key]:
                                if (newjsonCommandData["COMMANDS"]["ROOMS"][key][roomStat] != jsonCommandData["COMMANDS"]["ROOMS"][key][roomStat]):
                                    roomChage = [
                                        key, {roomStat: newjsonCommandData["COMMANDS"]["ROOMS"][key][roomStat]}]

                            roomCommands.append(roomChage)
                    except:  # adds new room if it wasnt in the old data base
                        jsonCommandData["COMMANDS"]["ROOMS"][key] = {
                            "LIGHTS": False, "PREFERRED_TEMPERATURE": None}
                        roomCommands.append([key, {"LIGHTS": False}])

                # locks or unlocks door
                if(newjsonCommandData["COMMANDS"]["DOOR"] != jsonCommandData["COMMANDS"]["DOOR"]):
                    doorLocked = newjsonCommandData["COMMANDS"]["DOOR"]
                    print(doorLocked)
                else:
                    doorLocked = None
            else:
                newCommandRecieved = False
            jsonCommandData = newjsonCommandData
            lastTimeCheckCommands = datetime.now().second

        if(newCommandRecieved):
            if(doorLocked != None):
                if(doorLocked):
                    serialPortDoor.flush()
                    waitNumBytes = serialPortDoor.write(b'L')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortDoor.flush()
                else:
                    serialPortDoor.flush()
                    waitNumBytes = serialPortDoor.write(b'U')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortDoor.flush()
            if(newTemp != None):
                print(calculateTempPWM(27, newTemp))
            newCommandRecieved = False
            # first you have to fix second arduino
            # if(roomCommands != []):
            #     for [room, command] in roomCommands:
            #         if(room == "BED_ROOM_0"):
            #             if (command.get("LIGHTS")):
            #                 serialPortDoor.flush()
            #                 waitNumBytes = serialPortDoor.write(b'Q1')
            #                 for x in range(0, waitNumBytes * 8):
            #                     sleep(0.02)
            #                 serialPortDoor.flush()
            #             else:
            #                 serialPortDoor.flush()
            #                 waitNumBytes = serialPortDoor.write(b'Q0')
            #                 for x in range(0, waitNumBytes * 8):
            #                     sleep(0.02)
            #                 serialPortDoor.flush()

        # Wait until there is data waiting in the serial buffer
        if serialPortDoor.in_waiting > 0:

            # place holder for sending data to database / backend
            # dataFromHttp = requests.get(
            #     'https://jsonplaceholder.typicode.com/posts')
            # print(dataFromHttp.text)
            # Read data out of the buffer until a carraige return / new line is found
            serialString = serialPortDoor.readline()

            try:
                newData = serialString.decode("Ascii")
            except:
                pass
            # if(newData[0] == 'D'):
            #     [digitalPinsDict, analoguePinsDict] = splitStringToDict(
            #         newData)
            try:
                [com, val] = doorLogic(newData)
            except:
                pass
            jsonFile = open(r"C:\FTN\Diplomsi rad\misc\users.json")
            jsonData = json.load(jsonFile)
            for key, value in jsonData.items():
                if ((com == "PIN" and str(val) == value['PIN']) or (com == "RFID" and str(val) == value['RFID'])):
                    accesAllowed = value["ACCESS"]
                    user = key

                # sleep(0.2)
                    val = 0

            if(com == "PIN" or com == "RFID"):
                if(accesAllowed):
                    print(user + " je usao u kucu!")
                    serialPortDoor.flush()
                    waitNumBytes = serialPortDoor.write(b'U')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortDoor.flush()

                else:
                    if (user == ""):
                        print("Neko je pokusao da udje u kucu!")
                    else:
                        print(user + " je pokusao da udje u kucu!")
                    serialPortDoor.flush()
                    waitNumBytes = serialPortDoor.write(b'D')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortDoor.flush()
            accesAllowed = False
            com = ""
            val = ""
            user = ""

            jsonFile.close()
        oldData = newData


main()
