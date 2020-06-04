const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var synth = new Tone.PolySynth(1, Tone.Synth).toMaster();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const key = 55.0; //Key of A first octave;
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var boxes = [];
var notes = [];
var notes_being_played = [];
var note_intervals = [1, 2, 4, 8];

// Creates notes based on --- next_note = prev_note * 2 ^ 1/12 
var create_notes = () => {
    let freq = key;
    for (let i = 0; freq <= key * Math.pow(2, 36 / 12); i++) {
        freq = freq * Math.pow(2, i / 12);
        notes.push(freq);
    }
}

create_notes();
console.log(notes);
//  Create a box class that consists of 3 stroked boxes inside eachother

class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.lineWidth = 20;
        this.color1 = colors[Math.floor(Math.random() * colors.length)];
        this.color2 = colors[Math.floor(Math.random() * colors.length)];
        this.color3 = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.color2;
        ctx.strokeRect(this.x + this.lineWidth / 2, this.y + this.lineWidth / 2, this.width - this.lineWidth, this.height - this.lineWidth);
        ctx.strokeStyle = this.color3;
        ctx.strokeRect(this.x + this.lineWidth, this.y + this.lineWidth, this.width - this.lineWidth * 2, this.height - this.lineWidth * 2);
    }
    change_colors() {
        this.color1 = colors[Math.floor(Math.random() * colors.length)];
        this.color2 = colors[Math.floor(Math.random() * colors.length)];
        this.color3 = colors[Math.floor(Math.random() * colors.length)];
    }
}


// Create a bunch of boxes
for (let i = 0; i < canvas.width; i += 80) {
    for (let j = 0; j < canvas.height; j += 80) {
        let box = new Box(i, j);
        boxes.push(box);
    }
}

// Animate our boxes
let animate = () => {
    notes_being_played.length = 0;
    synth.releaseAll();
    for (let i = 0; i < boxes.length; i += 1) {
        let box = boxes[i];
        if (Math.random() < 0.1) {
            box.change_colors();
            let rand_note = notes[Math.floor(Math.sqrt(Math.pow(box.x, 2) + Math.pow(box.y, 2))) % notes.length];
            if(Math.random() < 0.1) notes_being_played.push(rand_note);
        }
        box.draw();
    }
    synth.triggerAttackRelease(notes_being_played, "8n");
    let rand_interval = 1000/note_intervals[Math.floor(Math.random() * note_intervals.length)]
    setTimeout(animate, rand_interval);
}

setTimeout(animate, 1000/note_intervals[Math.floor(Math.random() * note_intervals.length)]);
