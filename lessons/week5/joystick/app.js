import JoyStick from './joystick.js';
import Player from './player.js';


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let superbabyImg = document.getElementById('superbaby');
let mouse = { x: 0, y: 0, mouseDown: false };
let joystick = new JoyStick(canvas.width / 2, canvas.height / 2, 50, 'teal');
let player = new Player(superbabyImg, canvas.width / 2, canvas.height / 2, 100, 100, 6);

function onMouseDown(e) {
    e.preventDefault();
    mouse.mouseDown = true;
    joystick = new JoyStick(e.clientX, e.clientY, 50, 'teal');
}

function onMouseUp(e) {
    e.preventDefault();
    mouse.mouseDown = false;
}

function onMouseMove(e) {
    e.preventDefault();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchStart(e) {
    e.preventDefault();
    mouse.mouseDown = true;
    joystick = new JoyStick(e.touches[0].clientX, e.touches[0].clientY, 50, 'teal');
}

function onTouchMove(e) {
    e.preventDefault();
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
}

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('touchstart', onTouchStart);
canvas.addEventListener('touchend', onMouseUp);
canvas.addEventListener('touchmove', onTouchMove);

let run = () => {
    requestAnimationFrame(run);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (mouse.mouseDown) {
        joystick.update(mouse.x, mouse.y);
        player.update(joystick.angle);
    } else {
        joystick.resetToOrigin();
    }

    joystick.draw(ctx);
    player.draw(ctx);

    let text = "angle: " + joystick.angle;
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(text, 30, 30);
}

run();