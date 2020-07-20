import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import SerialPort from "serialport";

const __dirname = path.resolve(path.dirname(''));
const js = express();
const server = http.Server(js);
const io = socketIO(server);
const port_num = 3000;
// const port = new SerialPort("/dev/cu.usbmodem142201", {
//     baudRate: 115200
// });
let movex = 0;
let movey = 0;
let players = {};

js.set('port', port_num);

js.use(express.static('./'));

js.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(port_num, function () {
    console.log('Starting server on port', port_num);
});

io.on('connection', function (socket) {
    socket.on('player-state', function (player) {
        if (players[socket.id]) {
            players[socket.id] = player;
        } else {
            players[socket.id] = player;
        }
    });
    socket.on('disconnect', function () {
        console.log(socket.id);
        if (players[socket.id]) {
            delete players[socket.id];
        }
    });
    socket.on('new player', function () {
        socket.emit('new player', socket.id)
    })
});

// port.on('readable', function () {
//     let data = port.read();
//     data = data.toString();
//     console.log(data === "scream");
//     if (data === "scream") {
//         io.emit("scream");
//     }
//     for (let i = 0; i < data.length; i++) {
//         if (data[i] === "x") {
//             movex = data[i + 1];
//             io.emit('movex', movex)
//             // console.log("movex" + movex);

//         }
//         if (data[i] === "y") {
//             movey = data[i + 1];
//             io.emit('movey', movey)
//             // console.log("movey" + movey);
//         }
//     }
// })

setInterval(function () {
    io.emit('state', players);
}, 1000 / 30);