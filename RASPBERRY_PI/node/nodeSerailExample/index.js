let serial = require('serialport');
let instance = require('axios');

const Readline = require("@serialport/parser-readline");
let ser = new serial.SerialPort({
    path: "COM4",
    baudRate: 9600
})

let parser = new Readline.ReadlineParser()

ser.pipe(parser);
parser.on('data', (line) => {
    // instance.get('https://jsonplaceholder.typicode.com/posts')
    //     .then(function (response) {
    //         // handle success
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);

    //     });
    console.log(line);
    serData = line;
});





