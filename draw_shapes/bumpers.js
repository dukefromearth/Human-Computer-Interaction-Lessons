const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
var bumpers = [];
var monkey = document.getElementById('monkey');
var tone;

function getRandFloat(min, max) {
    return Math.random() * (max - min) + min;
}

class Bumper {
    constructor(x, y, radius, rgb, speed) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.rgb = rgb;
        this.fillStyle = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";;
        this.spd = speed;
        this.angle = getRandFloat(-Math.PI, Math.PI);
        this.dirX = Math.cos(this.angle) * this.spd;;
        this.dirY = Math.sin(this.angle) * this.spd;;
    }
    draw() {
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath()
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(monkey, -40, -40, 80, 80);
        ctx.restore();
    }
    mix(bumper2) {
        let red = (this.rgb[0] + bumper2.rgb[0]) / 2;
        let green = (this.rgb[1] + bumper2.rgb[1]) / 2;
        let blue = (this.rgb[2] + bumper2.rgb[2]) / 2;
        this.rgb = [red, green, blue];
        this.fillStyle = "rgb(" + this.rgb[0] + ", " + this.rgb[1] + ", " + this.rgb[2] + ")";
    }
    rand_color() {
        let rand_red = Math.floor(Math.random() * 255);
        let rand_green = Math.floor(Math.random() * 255);
        let rand_blue = Math.floor(Math.random() * 255);
        this.rgb = [rand_red, rand_green, rand_blue];
        this.fillStyle = "rgb(" + this.rgb[0] + ", " + this.rgb[1] + ", " + this.rgb[2] + ")";
    }
    collide(bumper2) {
        var dx = Math.abs(this.x - bumper2.x);
        var dy = Math.abs(this.y - bumper2.y);
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (this.r + bumper2.r >= distance && this != bumper2) {
            let ang = Math.atan2(this.y - bumper2.y, this.x - bumper2.x);
            this.update_dir(ang)
            this.rand_color();
            synth.triggerAttackRelease(['C3', 'E3', 'C4'], "8n");
        }
    }
    update_dir(new_ang) {
        this.angle = new_ang;
        this.dirX = Math.cos(this.angle) * this.spd;;
        this.dirY = Math.sin(this.angle) * this.spd;;
    }
    move() {
        if (this.x - this.r <= 0 ||
            this.x + this.r >= canvas.width) {
            this.update_dir(Math.PI - this.angle);
        }
        if (this.y - this.r <= 0 ||
            this.y + this.r >= canvas.height) {
            this.update_dir(2 * Math.PI - this.angle);
        }
        this.x += this.dirX;
        this.y += this.dirY;
    }
}

var bumper_factory = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        let x = getRandFloat(100, canvas.width - 100);
        let y = getRandFloat(100, canvas.height - 100);
        let b = new Bumper(x, y, 50, [100, 100, 100], 2);
        b.rand_color();
        bumpers.push(b);
    }
}

var animate = () => {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bumpers.forEach(function (b) {
        ctx.fillStyle = b.fillStyle;
        b.move();
        b.draw();
        bumpers.forEach(function (b2) {
            b.collide(b2);
        })
    })
}

var run = () => {
    synth = new Tone.PolySynth(3, Tone.Synth).toMaster();
    bumper_factory(Math.floor(canvas.width * canvas.height / 100000));
    animate();
}

run();