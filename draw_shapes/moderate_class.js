/****************************  SETUP  ****************************/

/* 
    Here we are creating two variables that are used to access and manipulate our canvas.

    canvas -    This variable is our actually canvas that we will be drawing on
                it is typically used to set our width and height. It is type "const"
                because it never changes (constant);

    context -   This grabs information from the canvas that relates to things like 
                postion or orientation.
*/

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

class Bird {
    constructor(shift_hor, shift_vert, color, speed) {
        this.x0 = 0 + shift_hor;
        this.y0 = 20 + shift_vert;
        this.x1 = 20 + shift_hor;
        this.y1 = 0 + shift_vert;
        this.x2 = 40 + shift_hor;
        this.y2 = 20 + shift_vert;
        this.up = true;
        this.right = true;
        this.distance = 0;
        this.color = color;
        this.speed = speed;
        // this.tone = new Tone.PolySynth(3, Tone.Synth).toMaster();
        this.tones = [];
    }
    shift(shift_hor, shift_vert, ignore_center) {
        this.x0 += shift_hor;
        this.y0 += shift_vert;
        if (!ignore_center) {
            this.x1 += shift_hor;
            this.y1 += shift_vert;
        }
        this.x2 += shift_hor;
        this.y2 += shift_vert;
        this.tones.length = 0;
        // this.tones.push(Math.sqrt(Math.pow(this.y0, 2) + Math.pow(this.y2, 2)));
    }
    animate() {
        if (this.up) {
            this.shift(0, -1, true);
            if (this.distance++ >= 40) this.up = false;
        } else {
            this.shift(0, 1, true);
            if (this.distance-- <= 0) this.up = true;
        }
        if (this.right) {
            this.shift(this.speed, 0, false);
            if (this.x2 >= canvas.width) this.right = false;
        } else {
            this.shift(-this.speed, 0, false);
            if (this.x0 <= 0) this.right = true;
        }

    }
    draw() {
        this.animate();
        context.strokeStyle = this.color;
        context.strokeWidth = '24'
        context.beginPath();
        context.moveTo(this.x0, this.y0);
        context.lineTo(this.x1, this.y1);
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
    }
}

var birds = [];
var create_birds = function (num) {
    for (let i = 0; i < num; i++) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        let speed = Math.random() * 4 - 2;
        birds.push(new Bird(Math.random() * canvas.width, Math.random() * canvas.height, color, speed));
    }
}

create_birds(500);


/****************************  SET INTERVAL  ****************************/

/*
    This is a simple looping function.
    Let's break it down:

        setInterval( function() , time);

        setInterval is a type of function, this function takes in two arguments
            Argument 1: The functions we want to repeat.
            Argument 2: The time between each function repeat.

*/

var refresh_rate = 1000 / 50; // loop 10 times per second
var number_of_loops = 0;

var render_birds = () => {
    requestAnimationFrame(render_birds);
    //  Clear the canvas 
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //  Draw our birds
    for (let i = 0; i < birds.length; i++) {
        birds[i].draw();
    }

};

render_birds();