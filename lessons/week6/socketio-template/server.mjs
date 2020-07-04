import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';

const __dirname = path.resolve(path.dirname(''));   // Our current program directory
const app = express();                              // Express Application
const server = http.Server(app);                    // HTTP Server
const io = socketIO(server);                        // Socket Input/Output attached to our server
const port_num = 3000;

// Set the port number
app.set('port', port_num);

// Tell our express application where to look for our files
app.use(express.static('./'));

// Set default page to index.html
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/index.html'));
});

// Tell the server to listen to "port_num"
server.listen(port_num, function () {
    console.log('Starting server on port', port_num);
});

// When someone connects to a websocket, this is how to respond.
io.on('connection', function (socket) {
    // When a socket message 'new player' is recieved, print the data to the console.
    socket.on('new player', function (data) {
        console.log(data);
        let message = 'new player';
        data = "A new player has joined with id: " + socket.id;
        io.emit(message, data);
    });
});