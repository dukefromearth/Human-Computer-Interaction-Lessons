// Initialize Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/** 
 * 
 * All of this audio context code was pulled straight off of the tutorial for webAudio! 
 * https://webaudiodemos.appspot.com/volume-meter/index.html
 * 
 * */
let audioContext = null;
let meter = null;
let angle = 0;
let lastDraw = Date.now();
var mediaStreamSource = null;

window.onload = function () {
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}

function didntGetStream() {
    alert('Stream generation failed.');
}



function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    audioContext.resume();
    run();
}



// Create a vertex class to track points
class Vertex {
    constructor(x, y, angle, speedX, speedY) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.speedX = speedX || Math.random() * 10 - 5;
        this.speedY = speedY || Math.random() * 10 - 5;
        this.angle = angle;
    }
    move(x, y, value) {
        this.x = x + Math.cos(this.angle) * (Math.max(50, (value / 8 * 10000)));
        this.y = y + Math.sin(this.angle) * (Math.max(50, (value / 8 * 10000)));
    }
}

class Polygon {
    constructor(x, y, color, r) {
        this.x = x;
        this.y = y;
        this.vertices = [];
        this.r = r;
        this.color = color;
    }
    create(quantity) {
        this.vertices = [];
        for (let i = 0; i < quantity; i++) {
            let angle = 2 * Math.PI / quantity * i;
            let x = this.x + Math.cos(angle) * this.r;
            let y = this.y + Math.sin(angle) * this.r;
            this.vertices.push(new Vertex(x, y, angle, 0.001, 0.001));
        }
        console.log(this.vertices);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 0; i < this.vertices.length - 1; i++) {
            ctx.lineTo(this.vertices[i + 1].x, this.vertices[i + 1].y);
            this.vertices[i].move(this.x, this.y, meter.volume);
        }
        ctx.closePath();
        this.vertices[this.vertices.length - 1].move(this.x, this.y, meter.volume);
        ctx.stroke();
        ctx.fill();
    }
}

let poly = new Polygon(canvas.width / 2, canvas.height / 2, "blue", 50);
poly.create(8)
function run() {
    requestAnimationFrame(run);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    poly.draw();
}
