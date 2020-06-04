const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

class Vertex {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
    move() {
        if (this.x >= canvas.width + 300 || this.x <= -300) this.xSpeed = -this.xSpeed;
        if (this.y >= canvas.height + 300 || this.y <= -300) this.ySpeed = -this.ySpeed;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}

var vertex_factory = function (num_verteces, speed) {
    var arr = [];
    for (let i = 0; i < num_verteces; i++) {
        arr.push(
            new Vertex(
                Math.random() * canvas.width/2 + canvas.width/4,           // x starting location
                Math.random() * canvas.height/2 + canvas.height/4,          // y starting location
                Math.random() * speed - speed / 2,      // x speed  
                Math.random() * speed - speed / 2));    // y speed
    }
    return arr;
}

var vertex_connect_and_draw = function (arr_of_verteces, fill_color) {
    context.fillStyle = fill_color;
    context.beginPath();
    for (let i = 0; i < arr_of_verteces.length - 1; i++) {
        context.lineTo(arr_of_verteces[i + 1].x, arr_of_verteces[i + 1].y);
        arr_of_verteces[i].move();
    }
    context.lineTo(arr_of_verteces[0].x, arr_of_verteces[0].y);
    arr_of_verteces[arr_of_verteces.length - 1].move();
    context.fill();
    // context.stroke();
}

var verteces = vertex_factory(4, 20);
var verteces2 = vertex_factory(4, 20);
// var verteces3 = vertex_factory(1000, 20);

var refresh_rate = 1000 / 50;
var number_of_loops = 0;
context.globalAlpha = 0.3;
context.strokeStyle = 'white';
context.lineWidth = 1;
context.font = "50px Helvetica";
context.globalAlpha = 0.5;



var vertex_draw = () => {
    requestAnimationFrame(vertex_draw);
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // vertex_connect_and_draw(verteces, 'white');
    vertex_connect_and_draw(verteces2, 'blue');

};

vertex_draw();