import Background from '/js/background.js';
import Player from '/js/player.js';
import Sprite from '/js/sprite.js';
import ResourcePlanet from '/js/resource_planet.js';
import Asteroid from '/js/asteroid.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let playerImg = document.getElementById('player_sprite');
let asteroidImg = document.getElementById('asteroid')
let resourceplanetImg = document.getElementById('resourceplanet')
let playerSprite = new Sprite(playerImg, 1200, 300, 4, 100, 100);
console.log("Asteroid",asteroidImg)
let resourceplanet = new resourceplanet(resourceplanetImg,100,100)
console.log("resourceplanet",resourceplanetImg)
let asteroid = new Asteroid(asteroidImg, canvas.width,canvas.height-900)
let asteroid2 = new Asteroid(asteroidImg, canvas.width,canvas.height-800)


// BACKGROUND
let backgroundImages = [
    "assets/bg0.png"
];
let background = new Background(backgroundImages, 1620, 1080);

// PLAYER 
let player = new Player(100, 100, 8, playerSprite);

canvas.addEventListener('click', function (event) {
    player.updateTarget(event);
});

// asteroid



function render() {
    requestAnimationFrame(render);
    background.draw(ctx);
    player.xp -= 0.1;
    player.moveToTarget();
    player.draw(ctx);
    asteroid.draw(ctx)
    asteroid.update()
    asteroid2.draw(ctx)
    asteroid2.update()
    ResourcePlanet.draw()
    


}

render();