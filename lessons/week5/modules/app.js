import Game from './game/game.js';
import { isMobile } from './game/utils.js';

// Declare Variables
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let game = new Game();

// Update canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Add controls to the game (mouse click for desktop, touch for mobile)
game.addControls(isMobile());

// Draw each player
let render = () => {
    for (let player of game.players) {
        player.draw(ctx); ``
    }
    requestAnimationFrame(run);
};

render();