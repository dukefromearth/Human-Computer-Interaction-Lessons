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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

/****************************  CREATE CLASS  ****************************/

class Box {
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    shift(){
        this.x += Math.random() * 2 - 1; //move randomly left or right from -2, +2
        this.y += Math.random() * 2 - 1; //move randomly up or down from -2, +2
        this.width += Math.random() * 10 - 5; //move width randomly from -5, +5
        this.height += Math.random() * 10 - 5; //move height randomly from -5, +5
    }
}

/**********************  CREATE ARRAY OF CLASSES  **********************/

var box_array = []; // Intialize to empty;
var num_boxes = 200;

for (let i = 0; i < num_boxes; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let width = Math.random() * 150 + 5;
    let height = Math.random() * 150 + 5;
    let color = colors[Math.floor(Math.random() * colors.length)];
    box_array.push(new Box(x, y, width, height, color));
}

/****************************  SET INTERVAL  ****************************/

/*
    This is a simple looping function.
    Let's break it down:

        setInterval( function() , time);

        setInterval is a type of function, this function takes in two arguments
            Argument 1: The functions we want to repeat.
            Argument 2: The time between each function repeat.

*/

var refresh_rate = 1000 / 30; // loop 30 times per second
var number_of_loops = 0;
setInterval(function () {

    //  Clear the canvas 
    //  What happens if you comment these two lines?)
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.globalAlpha = 0.4; // Make semi transparent

    // Draw our boxes, and update their position
    for (let i = 0; i < box_array.length; i++) {
        context.fillStyle = box_array[i].color;
        context.fillRect(box_array[i].x, box_array[i].y, box_array[i].width, box_array[i].height);
        box_array[i].shift();
    }

    context.globalAlpha = 1.0; // No more transparency 

    //  Draw text that displays the number of loops
    context.fillStyle = 'black';
    context.font = "24px Helvetica";
    context.fillText(number_of_loops++, canvas.width / 2 - 24, canvas.height / 2);


}, refresh_rate);

