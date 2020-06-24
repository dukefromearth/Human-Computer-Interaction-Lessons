const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Send a socket message with data to the server.
socket.emit('new player', 'A new player has joined');

// When the message 'new player' is recieved, print the sent data to the screen.
socket.on('new player', function (data) {
    console.log(data);
});

















