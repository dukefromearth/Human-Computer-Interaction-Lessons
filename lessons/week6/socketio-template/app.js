const socket = io();

// Send a socket message with data to the server.
socket.emit('new player', 'A new player has joined');

// When the message 'new player' is recieved, print the sent data to the screen.
socket.on('new player', function (data) {
    console.log(data);
});

socket.on('click', function (data) {
    let circle = new Circle(data.x, data.y, 25);
    circle.draw();
})