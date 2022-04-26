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
        return["heat", 1]
    if(currentTemp - preferredTemp <= -5):
        return["cool", 1]
    value = (currentTemp - preferredTemp)/5
    if (value >= 0):
        return["heat", abs(value)]
    else:
        return["cool", abs(value)]


def doorLogic(newData):
    command = ""
    value = ""
    [command, value] = newData[:-2].split(':')
    return(command, value)


def main():
    currentTime = datetime.now().second
    lastTimeCheckCommands = datetime.now().second
    serialPortDoor = serial.Serial('COM5', baudrate=9600)
    serialPortSensors = serial.Serial('COM3', baudrate=9600)
    serialStringSensor = ""
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
                if(newjsonCommandData["COMMANDS"]["DOOR_LOCKED"] != jsonCommandData["COMMANDS"]["DOOR_LOCKED"]):
                    doorLocked = newjsonCommandData["COMMANDS"]["DOOR_LOCKED"]
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
                [tempCommand, PWM] = (calculateTempPWM(27, newTemp))
                if(tempCommand == 'cool'):
                    tmp = "C:"+str(PWM)
                    serialPortSensors.flush()
                    waitNumBytes = serialPortSensors.write(tmp.encode())
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortSensors.flush()
                    sleep(0.1)
                    waitNumBytes = serialPortSensors.write(b'H0')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortSensors.flush()
                else:
                    waitNumBytes = serialPortSensors.write(b'C0')
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortSensors.flush()
                    tmp = "H:"+str(PWM)
                    serialPortSensors.flush()
                    waitNumBytes = serialPortSensors.write(tmp.encode())
                    for x in range(0, waitNumBytes * 8):
                        sleep(0.02)
                    serialPortSensors.flush()
                    sleep(0.17)

            newCommandRecieved = False
            # first you have to fix second arduino
            if(roomCommands != []):
                for [room, command] in roomCommands:
                    if(room == "BED_ROOM_0"):
                        if (command.get("LIGHTS")):
                            serialPortSensors.flush()
                            waitNumBytes = serialPortSensors.write(b'Q1')
                            for x in range(0, waitNumBytes * 8):
                                sleep(0.02)
                            serialPortSensors.flush()
                        else:
                            serialPortSensors.flush()
                            waitNumBytes = serialPortSensors.write(b'Q0')
                            for x in range(0, waitNumBytes * 8):
                                sleep(0.02)
                            serialPortSensors.flush()
                if(room == "BED_ROOM_1"):
                    if (command.get("LIGHTS")):
                        serialPortSensors.flush()
                        waitNumBytes = serialPortSensors.write(b'W1')
                        for x in range(0, waitNumBytes * 8):
                            sleep(0.02)
                        serialPortSensors.flush()
                    else:
                        serialPortSensors.flush()
                        waitNumBytes = serialPortSensors.write(b'W0')
                        for x in range(0, waitNumBytes * 8):
                            sleep(0.02)
                        serialPortSensors.flush()
                if(room == "LIVING_ROOM"):
                    if (command.get("LIGHTS")):
                        serialPortSensors.flush()
                        waitNumBytes = serialPortSensors.write(b'E1')
                        for x in range(0, waitNumBytes * 8):
                            sleep(0.02)
                        serialPortSensors.flush()
                    else:
                        serialPortSensors.flush()
                        waitNumBytes = serialPortSensors.write(b'E0')
                        for x in range(0, waitNumBytes * 8):
                            sleep(0.02)
                        serialPortSensors.flush()
                if(room == "KITCHEN"):
                    if (command.get("LIGHTS")):
                        serialPortSensors.flush()
                        waitNumBytes = serialPortSensors.write(b'R1')
                        for x in range(0, waitNumBytes * 8):
                            sleep(0.02)
                        serialPortSensors.flush()
                    else:
                        serialPortSensors.flush()
                        waitNumBytes = serialPortSensors.write(b'R0')
                        for x in range(0, waitNumBytes * 8):
                            sleep(0.02)
                        serialPortSensors.flush()

        if serialPortSensors.in_waiting > 0:
            serialStringSensor = serialPortSensors.readline()
            try:
                dataSensor = serialStringSensor.decode("Ascii")
                print(dataSensor)
            except:
                pass

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
