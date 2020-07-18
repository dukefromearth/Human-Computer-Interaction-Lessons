import Astronaut from '/js/astronaut.js';
import JoyStick from '/js/joystick.js';
import Player from '/js/player.js';
import SpaceCraft from '/js/spacecraft.js';
import Bomb from '/js/bomb.js'

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const socket = io();
socket.emit('new player');
let as, sp;

var backgroundimg = new Image();
backgroundimg.src = "bg.jpg";

var astr = new Image();
astr.src = "as.png";

var spacecraft1 = new Image();
spacecraft1.src = "sc.png";

var playre = new Image();
playre.src = "as1.png";

var bomb = new Image();
bomb.src = "bomb.png";

var backgroundimg2 = new Image();
backgroundimg2.src = "bg2.jpg";

let running = false;
let boms = [];
let mouse = { x: 0, y: 0, mouseDown: false };
var startbutton = document.getElementById("startbutton");
let stick = new JoyStick(100, 839, 35, "rgba(147, 181, 255, 0.836)");
let player1 = null;
let players = {};

startbutton.onclick = function () {
    $("#startbutton").hide();
    $("#h").hide();
    creatBombs(10);
    running = true;
    cancelAnimationFrame(render);
    run();
}

function detectcollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;

    }
    else { return false; }
}

function DetectCollisions() {
    for (let i = 0; i < boms.length; i++) {
        if (detectcollision(boms[i], player1)) {
            cancelAnimationFrame(run);
            running = false;
            setup();
            return;
        }

    }
}

function setup() {
    as = new Astronaut(astr);
    sp = new SpaceCraft(spacecraft1);

    $("#startbutton").show();
    $("#h").show();
    render();
}

function creatBombs(quantity) {
    boms.length = 0;
    for (let i = 0; i < quantity; i++) {
        let bom = new Bomb(bomb, Math.random() * 2 + 2);
        boms.push(bom);

    }
}

function updatePlayers(state) {
    players = {};
    for (let id in state) {
        let p = state[id];
        console.log(state);
        if (players[p.id]) {
            players[p.id].x = p.x;
            players[p.id].y = p.y;
            players[p.id].angle = p.angle;
        }
        else {
            players[p.id] = new Player(playre, p.x, p.y, 173, 198, stick, id);
        }
    }
}

function run() {
    if (running && player1) {
        requestAnimationFrame(run);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundimg2, 0, 0, 1604, 896, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < boms.length; i++) {
            boms[i].draw(ctx);
            boms[i].update();
        }
        stick.draw(ctx);
        if (mouse.mouseDown) {
            stick.collide(mouse.x, mouse.y);
        } else {
            stick.clicked = false;
        }

        stick.update(mouse.x, mouse.y);
        player1.update();
        for (let id in players) {
            let p = players[id];
            p.draw(ctx);
        }

        // player1.draw(ctx);
        // player1.update();

        DetectCollisions();
    }
}

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundimg, 0, 0, 1604, 896, 0, 0, canvas.width, canvas.height);
    sp.draw(ctx);
    sp.update();
    as.draw(ctx);
    as.update();
}

document.addEventListener('mousedown', function (e) {
    e.preventDefault();
    mouse.mouseDown = true;
    stick.originX = e.clientX;
    stick.originY = e.clientY;
});

document.addEventListener('mouseup', function (e) {
    e.preventDefault();
    mouse.mouseDown = false;
});

document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

socket.on('new player', function (id) {
    console.log('new player');
    player1 = new Player(playre, canvas.width / 2, canvas.height / 2, 173, 198, stick, id);
    players[player1.id] = player1;
    socket.on("movex", function (data) {
        if (data === "+") {
            player1.x++;
        }
        if (data === "-") {
            player1.x--;
        }
    });

    socket.on("movey", function (data) {
        if (data === "+") {
            player1.y++;
        }
        if (data === "-") {
            player1.y--;
        }
    })
});

socket.on('state', function (_players) {
    updatePlayers(_players);
});

setup();

setInterval(function () {
    if (player1) socket.emit('player-state', player1);
}, 1000 / 30);