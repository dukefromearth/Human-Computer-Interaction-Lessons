/**
 * 
 * Declare Variables
 * 
 */


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let birdImg = document.getElementById('bird');
let backgroundImages = ["assets/bg0.png", "assets/bg1.png", "assets/bg2.png"];
let mouseDown = false;
let score = 0;
let player = {};
let bg = {};
let obstacles = [];
let playButton = document.getElementById('playButton');
let running = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Adds a click event to the button that tells the game to run;
playButton.onclick = function () {
    running = true;
    run();
}

/**
 * 
 * Create a sprite class
 * 
 * What this class does is take an image and break it into small parts.
 * Each time the image is redrawn, we draw a new part of the image
 * It gives an illusion of movement
 * https://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099
 * 
 */

class Sprite {
    constructor(img, width, height, numImages, scaledHeight, scaledWidth) {
        this.img = img;
        this.width = width;
        this.height = height;
        this.scaledWidth = scaledWidth;
        this.scaledHeight = scaledHeight;
        this.numImages = numImages;
        this.imgWidth = this.width / this.numImages;
        this.currIndex = 0;
        this.lastDraw = Date.now();
    }
    draw(x, y) {
        // Check if the time since we last drew our image was greater that 1/60 of a second ago
        if (Date.now() - this.lastDraw > 1000 / 60) {
            //Check if the next index is greater than the amount of images in the sprite sheet
            if (++this.currIndex >= this.numImages) {
                this.currIndex = 0;
            }
        }
        // Cut the image into smaller parts and draw at the appropriate index
        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(this.img, this.currIndex * this.imgWidth, 0, this.imgWidth, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        ctx.restore();
        this.lastDraw = Date.now();
    }
}


/**
 *
 * Create a Parallax Background class
 * 
 * The background has what is referred to as a parallax effect
 * https://www.ibm.com/developerworks/library/wa-parallaxprocessing/index.html
 *
 *
 */

class Background {
    constructor(imageNames, width, height) {
        this.images = [];
        this.width = width;
        this.height = height;
        this.lastDraw = Date.now();
        this.init(imageNames);
    }
    // Creates an image element for every image name supplied and ads it to the dom
    init(imageNames) {
        for (let i of imageNames) {
            let myImage = new Image(canvas.width, canvas.height);
            myImage.src = i;
            document.body.appendChild(myImage);
            this.images.push({ img: myImage, pos: 0 });
        }
    }
    // Updates the position of each image
    update() {
        for (let i = 0; i < this.images.length; i++) {
            let pos = this.images[i].pos;
            this.images[i].pos += i + 1;
            if (pos >= canvas.width) this.images[i].pos = i + 1;
        }
    }
    // Draws two versions of each image to make the image appear endless
    draw() {
        for (let i of this.images) {
            ctx.drawImage(i.img, -i.pos, 0, canvas.width, canvas.height);
            ctx.drawImage(i.img, canvas.width - i.pos, 0, canvas.width, canvas.height);
        }
    }
}

/**
 *
 * Create a Player class
 *
 * The player moves up on every mousedown and down when the mouse is not pressed
 * The player has a sprite, which is a flying bird that is drawn at the x,y location of the player
 *
 */

class Player {
    constructor(x, y, speedY) {
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 75;
        this.speedY = speedY;
        this.sprite = new Sprite(birdImg, 800, 101, 8, this.width, this.height);
    }
    draw() {
        this.sprite.draw(this.x, this.y);
    }
    // If the mouse is down, move the player up, otherwise move them down
    update() {
        if (mouseDown) {
            if (this.y > 0) this.y -= this.speedY;;
        } else {
            if (this.y + this.sprite.scaledHeight < canvas.height) this.y += this.speedY;
        }
    }
}


/**
 * 
 * Create an obstacle class
 * 
 * Obstacles are rectangular shapes that may collide with the player
 * Each obstacle consists of a top and a bottom, with a space between
 * 
 * 
 */

class Obstacles {
    constructor(quantity) {
        this.locations = [];
        this.quantity = quantity;
        this.width = 75;
        this.color = "green";
        this.speed = 4;
        this.init();
    }
    // Loops through "quantity" and creates two rectangles with a space between itself and the previous rectangle
    init() {
        for (let i = 0; i < this.quantity; i++) {

            // Create a top rectangle 
            let top = {
                x: (i + 1) * 500,
                y: 0,
                width: this.width,
                height: Math.random() * canvas.height - 100
            }

            // Create a bottom rectangle with a vertical space between the top rectangle
            let bottom = {
                x: top.x,
                y: top.height + 220 + Math.random() * 100,
                width: this.width,
                height: canvas.height
            }

            // Push the top and bottom into the locations array
            this.locations.push({ top, bottom });
        }
    }

    // Moves each obstacle to the left
    // When the obstacles x position is less than zero, move the obstacle to the end
    // Update the score
    update() {
        for (let i = 0; i < this.locations.length; i++) {
            let obstacle = this.locations[i];
            // If the obstacle has passed the player
            if (obstacle.top.x < -this.width) {
                // If we are on the first obstacle, we need to place it after the last
                if (i === 0) {
                    obstacle.top.x = this.locations[this.locations.length - 1].top.x + 500;
                    obstacle.bottom.x = obstacle.top.x;
                    score++;
                }
                // If we are not on the first obstacle, we can move the obstacle to a location after the previous obstacle
                else {
                    obstacle.top.x = this.locations[i - 1].top.x + 500;
                    obstacle.bottom.x = obstacle.top.x;
                    score++;
                }
            } else {
                obstacle.top.x -= this.speed;
                obstacle.bottom.x -= this.speed;
            }
        }
    }
    draw() {
        for (let obstacle of this.locations) {
            let gradient = ctx.createLinearGradient(obstacle.top.x, 0, obstacle.top.x + obstacle.top.width, 0);
            gradient.addColorStop(0, "green");
            gradient.addColorStop(0.7, "white");
            gradient.addColorStop(1, "green");
            ctx.fillStyle = gradient;
            ctx.fillRect(obstacle.top.x, obstacle.top.y, obstacle.top.width, obstacle.top.height);
            ctx.fillRect(obstacle.bottom.x, obstacle.bottom.y, obstacle.bottom.width, obstacle.bottom.height);
        }
    }
}

// A standard function to detect if one rectangle is inside another
function detectRectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;
    }
    return false;
}

// A loop through every obstacle to check collision with player
// If the player hits an obstacle:
//      1. The game stops running
//      2. A new game is setup
//      2. The score resets
//      3. the play button appears
function detectCollisions() {
    let o = obstacles.locations;
    for (let i = 0; i < o.length; i++) {
        if (detectRectCollision(o[i].top, player) || detectRectCollision(o[i].bottom, player)) {
            cancelAnimationFrame(run);
            setup();
            running = false;
            score = 0;
            playButton.style.display = "block";
            return;
        }
    }
}

// Draws the score to the top left of the canvas
function drawScore() {
    ctx.fillStyle = 'tomato'
    ctx.font = '48px fantasy';
    ctx.fillText('score: ' + Math.floor(score), 50, 50);
}

window.addEventListener('mousedown', function (e) {
    mouseDown = true;
});

window.addEventListener('mouseup', function (e) {
    mouseDown = false;
});


// Inititialize all of our classes and draw each to the canvas
function setup() {
    player = new Player(10, canvas.height / 2, 10);
    bg = new Background(backgroundImages, 3072, 1536);
    obstacles = new Obstacles(20);
    setTimeout(function () {
        bg.draw();
        obstacles.draw();
        player.draw();
    }, 300);

}

// A loop to redraw and update the canvas
function run() {
    if (running) {
        playButton.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bg.update();
        bg.draw();
        player.update();
        player.draw();
        obstacles.update();
        obstacles.draw();
        drawScore();
        detectCollisions();
        requestAnimationFrame(run);
    }
}

// Run our setup function
setup();