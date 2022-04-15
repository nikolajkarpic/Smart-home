from urllib import request
import serial
import requests

serialPort = serial.Serial('COM4', baudrate=9600)
serialString = ""  # Used to hold data coming over UART
data = ""
dataFromHttp = ""
while 1:
    # Wait until there is data waiting in the serial buffer
    if serialPort.in_waiting > 0:

        dataFromHttp = requests.get(
            'https://jsonplaceholder.typicode.com/posts')
        print(dataFromHttp.text)
        # Read data out of the buffer until a carraige return / new line is found
        serialString = serialPort.readline()

        try:
            data = serialString.decode("Ascii")
        except:
            pass

        sensorData = data.split()

        print(sensorData)

        # Print the contents of the serial data
        try:
            print(serialString.decode("Ascii"))

        except:
            pass
    serialPort.write('A'.encode())
