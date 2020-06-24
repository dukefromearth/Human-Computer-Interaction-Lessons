const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

canvas.addEventListener('click', function (event) {
    let pos = { x: event.clientX, y: event.clientY };
    socket.emit('click', pos);
})

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