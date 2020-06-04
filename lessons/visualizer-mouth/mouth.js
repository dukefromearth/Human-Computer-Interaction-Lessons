// Initialize Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouthImg = document.getElementById('mouthImg');


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

window.addEventListener('mousedown',
    function () {

    })

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


// Create a Mouth class
class Mouth {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(audioVal) {
        if (audioVal < 300) audioVal = 0;
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

let mouth = new Mouth(canvas.width / 2, canvas.height / 8, 300, 200);

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouth.draw(meter.volume * 2000)
    requestAnimationFrame(run);
}

