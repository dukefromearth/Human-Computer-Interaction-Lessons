import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import Game from './game.mjs';

const __dirname = path.resolve(path.dirname(''));
const environment = process.env.ENV || "prod";
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port_num = 3000;
const game = new Game();
let counter = 0;

// Tell our express server where to look for our files
app.set('port', port_num);
app.use('/public', express.static('../public'));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../index.html'));
});

// Tell the server to listen to "port_num"
server.listen(port_num, function () {
    console.log(`Running as ${environment} environment`);
    console.log('Starting server on port', port_num);
});

// When someone connects to a websocket, this is how to respond.
io.on('connection', function (socket) {
    socket.on('new player', function (data) {
        game.newPlayer(data);
    });
    socket.on('click', function (data) {
        game.draw(data);
    })
    socket.on('disconnect', function () {
        game.removePlayer(socket.id);
    });
});

// 30 times per second, update the state and send to all connected sockets.
setInterval(function () {
    if (++counter > 30 * 30) {
        counter = 0;
        game.clearBoxes();
    }
    io.emit('state', game.getState());
}, 1000 / 30);