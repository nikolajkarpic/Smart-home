from time import sleep
import requests

dataFromHttp = requests.get(
    'http://192.168.0.110/getPrefTemp'
)

print(dataFromHttp.text)

sleep(1)

headers = {'Content-Type': 'application/json; charset=UTF-8'}

dataFromHttp = requests.post(
    'http://192.168.0.110/setPrefTemp', json={"PT": 25})

print(dataFromHttp.text)
sleep(1)

dataFromHttp = requests.get(
    'http://192.168.0.110/getPrefTemp'
)

print(dataFromHttp.text)

sleep(1)

dataFromHttp = requests.get(
    'http://192.168.0.110/getCurrentTemp'
)

print(dataFromHttp.text)

sleep(1)
