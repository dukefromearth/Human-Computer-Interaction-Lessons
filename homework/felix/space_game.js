import Background from '/js/background.js';
import Player from '/js/player.js';
import Sprite from '/js/sprite.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let playerImg = document.getElementById('player_sprite');
let playerSprite = new Sprite(playerImg, 1200, 300, 4, 100, 100);






// BACKGROUND
let backgroundImages = [
    "assets/bg0.png"
];
let background = new Background(backgroundImages, 1620, 1080);

// PLAYER 
let player = new Player(100, 100, 8, playerSprite);
console.log(player);

canvas.addEventListener('click', function (event) {
    player.updateTarget(event);
});

function render() {
    requestAnimationFrame(render);
    background.draw(ctx);
    player.xp -= 0.1;
    player.moveToTarget();
    player.draw(ctx);
    drawPlayers();
}

render();