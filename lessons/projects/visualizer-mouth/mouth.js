// Initialize Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = "30px Fantasy";
let mouths = [];
let mouthImg = document.getElementById('mouthImg');
let song;
let analyzer;
let playing = false;


/**
*
* Begin Custom Animation
*
**/

// Create a Mouth class that with a draw method that takes in the audio value
class Mouth {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(audioVal) {
        audioVal *= 1000;
        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.drawImage(
            mouthImg,
            -(this.width) / 2,
            -(this.height) / 2,
            this.width,
            this.height + audioVal);
        ctx.restore();
    }
}

// Loop to quantity and create mouth in a different location and size.
const createMouths = function (quantity) {
    for (let i = 0; i < quantity; i++) {
        let width = Math.random() * 300;
        let height = width / 4;
        mouths.push(new Mouth(canvas.width * Math.random(), canvas.height * Math.random(), width, height))
    }
}

createMouths(10);

document.addEventListener('click', function () {
    if (!playing) {
        song.loop();
        analyzer = new p5.Amplitude();
        analyzer.setInput();
        song.play();
        playing = true;
    }
});

// runs before our animation
function preload() {
    song = loadSound('https://assets.codepen.io/4147509/michael.mp3');
}

// Run animation
function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let mouth of mouths) {
        if (analyzer) {
            mouth.draw(analyzer.getLevel());
        } else {
            mouth.draw(0.01);
        }

    }
    ctx.fillStyle = 'white';
    ctx.fillText("Click to Start", 50, 50); s
}