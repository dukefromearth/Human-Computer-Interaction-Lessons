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
setInterval(function () {

    //  Clear the canvas 
    //  What happens if you comment these two lines?)
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //  Draw text that displays the number of loops
    context.fillStyle = 'black';
    context.font = "24px Helvetica";
    context.fillText(number_of_loops++, canvas.width / 2, canvas.height / 2);


}, refresh_rate);