// Initialize Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a vertex class to track points
class Vertex {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 10 - 5;
        this.speedY = Math.random() * 10 - 5;
    }
    move() {
        if (this.x >= canvas.width || this.x <= 0) {
            this.speedX *= -1;
        }
        if (this.y >= canvas.height || this.y <= 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

class Polygon {
    constructor(color) {
        this.vertices = [];
        this.color = color;
    }
    create(quantity) {
        for (let i = 0; i < quantity; i++) {
            this.vertices.push(new Vertex());
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 0; i < this.vertices.length - 1; i++) {
            ctx.lineTo(this.vertices[i + 1].x, this.vertices[i + 1].y);
            this.vertices[i].move();
        }
        ctx.closePath();
        this.vertices[this.vertices.length - 1].move();
        ctx.fill();
    }
}

let poly = new Polygon("blue");
let poly2 = new Polygon("green");
poly.create(1500);
poly2.create(1500);

function run() {
    requestAnimationFrame(run);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    poly.draw();
    poly2.draw();
}

run();
