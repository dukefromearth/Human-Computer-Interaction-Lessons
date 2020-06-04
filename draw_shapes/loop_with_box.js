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

/****************************  DECLARE BOX VALUES  ***************************/

// Variable definitions are used to store values that we want to use later
var box_width = 10;
var box_height = 10;

/****************  LOOP TO CREATE A HORIZONTAL LINE OF BOXES  ****************/

context.fillStyle = 'blue';

for (let i = 0; i < canvas.width; i += 20) {
    // Below is where our box is drawn until i is >= canvas.width
    context.fillRect(i, 250, box_width, box_height);
}

/*****************  LOOP TO CREATE A VERTICAL LINE OF BOXES  *****************/

context.fillStyle = 'red';

for (let i = 0; i < canvas.height; i += 20) {
    // Below is where our box is drawn until i is >= canvas.width
    context.fillRect(250, i, box_width, box_height);
}

/*
    Explanation:

    A "for loop" consists of 3 arguments:

        for(Argument1; Argument2; Argument3){}

        Argument1: starting value/variable
        Argument2: how do we know when to stop?
        Arguemnt3: increment
    
    Inside our for loop we've drawn a box like normal except that we have now
        used "i" as our x or y value. Doing so means that the loop will execute
        until Argument2 is true, each time incrementing the x/y location of the box

*/