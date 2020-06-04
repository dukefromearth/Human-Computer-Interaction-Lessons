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


/*************************  DECLARE VARIABLES  *************************/

// Objects are storage structures that can hold many diffent variables. 
// Each variable has to be named. It is very easy to read.

var show_box_obj = {
    left: true,
    right: true,
    up: true,
    down: true
};

// Arrays are storage structures that can also hold many diffent variables.
// Arrays are very powerful and we can add and remove values very easily,
//      but they are not always clear

var show_box_arr = [
    true,
    true,
    true,
    true
];

/****************************  SHOW OBJECT  ****************************/

//  Notice how each if statement is written differently. Each is a different
//      way of writing "if show_box_obj is true". 

context.fillStyle = 'black';

if (show_box_obj.up) context.fillRect(canvas.width / 2 - 25, 0, 50, 50);

if (show_box_obj.down === true) context.fillRect(canvas.width / 2 - 25, 450, 50, 50);

if (show_box_obj.left === true) context.fillRect(0, canvas.height / 2 - 25, 50, 50);

if (show_box_obj.right != false) context.fillRect(450, canvas.height / 2 - 25, 50, 50);

/****************************  SHOW ARRAY  ****************************/

context.fillStyle = 'red';

if (show_box_arr[0]) context.fillRect(0, 0, 50, 50);

if (show_box_arr[1]) context.fillRect(0, 450, 50, 50);

if (show_box_arr[2] === true) context.fillRect(450, 0, 50, 50);

if (show_box_arr[3] != false) context.fillRect(450, 450, 50, 50);