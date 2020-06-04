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

canvas.width = 500;
canvas.height = 500;

/****************************  CREATE A FILLED BOX  ****************************/

// Variable definitions are used to store values that we want to use later
var box_width = 100;
var box_height = 100;
var box_color = 'blue';
var box_x = 10;
var box_y = 10;

// Color our box blue
context.fillStyle = box_color;

// Below is where our box is drawn once
// Notice how it takes in 4 arguments, what happens which you change them?
context.fillRect(box_x, box_y, box_width, box_height);

//We can also draw a box without using defined variables;
context.fillStyle = 'red';
context.fillRect(390, 390, 100, 100);

/****************************  CREATE A STROKED BOX  ****************************/

var box_2_width = 490;
var box_2_height = 490;
var box_2_color = 'black';
var box_2_x = 5;
var box_2_y = 5;
var box_2_line_width = 5;

// Color our box blue
context.strokeStyle = box_2_color;

// Set our line width
context.lineWidth = box_2_line_width

// Below is where our box is drawn
// Notice how it takes in 4 arguments, what happens which you change them?
context.strokeRect(box_2_x, box_2_y, box_2_width, box_2_height);

//We can also draw a box without using defined variables;
context.strokeStyle = 'green';
context.strokeRect(125, 125, 250, 250);

/****************************  CREATE A FILLED CIRCLE  ****************************/

var circle_diameter = 50
var circle_color = 'purple'; //  Notice we are now specificing RGB values
var circle_x = canvas.width / 2;      //  Sometimes it makes sense to base our location
var circle_y = canvas.height / 2;     //      on some other object, like our canvas.

context.fillStyle = circle_color;
context.beginPath();
context.arc(circle_x, circle_y, circle_diameter, 0, 2 * Math.PI);
context.fill();

/****************************  CREATE LINES  ****************************/

context.strokeStyle = 'black';
context.strokeWidth = '8';

context.beginPath();
context.moveTo(150, 150);   //    Line 1 start
context.lineTo(350, 350);   //    Line 1 finish
context.moveTo(350, 150);   //    Line 2 start
context.lineTo(150, 350);   //    Line 2 finish
context.stroke();