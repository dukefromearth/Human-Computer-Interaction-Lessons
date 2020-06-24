const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const button = document.getElementById('button');
const input = document.getElementById('input');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
let player = { name: socket.id, color: randomColor };
let boxes = [];

button.onclick = function () {
    player.name = input.value;
};

// Tell the server that a new player has joined
socket.emit('new player', player);

// Emit data to the server when the screen is clicked
function onClick(event) {
    let data = {
        x: event.clientX,
        y: event.clientY,
        color: player.color,
        name: player.name
    }
    socket.emit('click', data);
}

// Add event listener for the 
canvas.addEventListener('click', onClick);

// Clears the canvas and redraws all the boxes to the screen
function renderBoxes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        ctx.fillStyle = box.color;
        ctx.font = '30px Arial';
        ctx.fillRect(box.x, box.y, 20, 20);
        ctx.fillText(box.name, box.x, box.y);
    }
}

// Every time there is an update from the server, we:
//  1. delete the old boxes
//  2. fill the new boxes
//  3. redraw the screen
socket.on('state', function (state) {
    boxes = state;
    renderBoxes();
})