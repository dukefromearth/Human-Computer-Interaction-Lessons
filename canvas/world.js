const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
var i_offset = 0;

var draw_box = function (color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

var color1 = 'white';
var color2 = 'yellow';

var gradient2 = context.createLinearGradient(0, 0, 0, 300);
gradient2.addColorStop(0, 'purple');
gradient2.addColorStop(1, 'pink');
context.fillStyle = gradient2;

var current_time = Date.now();
var gridSwap = function () {
    for (let i = i_offset; i < canvas.width; i += 40) {
        for (let j = 400; j < canvas.height; j += 10) {
            let offset = i;
            if (j % 20 != 0) offset += 10;
            draw_box(color1, offset, j, 10, 10);
        }
    }
    if (i_offset <= 20) i_offset += 10;
    else i_offset = 0;
}

var movement = {
    left: false,
    right: false,
    up: false,
    down: false
};

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
        case 87: // W
            movement.up = true;
            break;
    }
});

document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
        case 87: // W
            movement.up = false;
            break;
    }
});

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = 360;
        this.img = document.getElementById('ship');
    }
    move() {
        if (movement.left) this.x -= 6;
        else if (movement.right) this.x += 6;
        if (movement.up) this.y -= 6;
        else if (movement.down) this.y += 6;
    }
    draw() {
        this.move();
        context.drawImage(this.img, this.x, this.y);
    }
}

var circle_size = 50;
var grow = true;
var circle = function (color, x, y) {
    // context.globalAlpha = 0.5;
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, circle_size, 0, 2 * Math.PI);
    context.fill();
    if (grow) {
        circle_size += 0.5;
        if (circle_size > 60) grow = false;
    } else {
        circle_size -= 0.5;
        if (circle_size <= 50) grow = true;
    }
    context.globalAlpha = 1.0;
}

class Bird {
    constructor(shift_hor, shift_vert) {
        this.x0 = 0 + shift_hor,
            this.y0 = 10 + shift_vert,
            this.x1 = 10 + shift_hor,
            this.y1 = 0 + shift_vert,
            this.x2 = 20 + shift_hor,
            this.y2 = 10 + shift_vert,
        this.up = true;
        this.right = true;
        this.distance = 0;
    }
    shift(shift_hor, shift_vert, ignore_center) {
        this.x0 += shift_hor;
        this.y0 += shift_vert;
        if (!ignore_center) {
            this.x1 += shift_hor;
            this.y1 += shift_vert;
        }
        this.x2 += shift_hor;
        this.y2 += shift_vert;
    }
    animate() {
        if (this.up) {
            this.shift(0, -1, true);
            if (this.distance++ >= 20) this.up = false;
        } else {
            this.shift(0, 1, true);
            if (this.distance-- <= 0) this.up = true;
        }
        if (this.right) {
            this.shift(2, 0, false);
            if (this.x2 >= canvas.width) this.right = false;
        } else {
            this.shift(-2, 0, false);
            if (this.x0 <= 0) this.right = true;
        }
    }
    draw() {
        this.animate();
        context.strokeStyle = 'black';
        context.strokeWidth = '24'
        context.beginPath();
        context.moveTo(this.x0, this.y0);
        context.lineTo(this.x1, this.y1);
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
    }
}

var birds = [];
var create_birds = function (num) {
    for (let i = 0; i < num; i++) {
        birds.push(new Bird(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

create_birds(10);

var ship = new Player();

setInterval(function () {
    draw_box(gradient2, 0, 0, 500, 400);
    context.globalAlpha = 0.5;
    draw_box('teal', 0, 400, 500, 100);
    gridSwap();
    context.globalAlpha = 1.0;
    circle('orange', 400, 75);
    birds.forEach(function (bird) {
        bird.draw();
    });
    ship.draw();
}, 1000 / 15)
