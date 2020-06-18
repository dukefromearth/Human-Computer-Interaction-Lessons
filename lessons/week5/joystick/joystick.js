export default class JoyStick {
    constructor(x, y, r, color) {
        this.pos = { x: x, y: y };
        this.origin = { x: x, y: y };
        this.target = { x: x, y: y };
        this.color = color;
        this.r = r;
        this.angle = 0;
        this.clicked = false;
    }
    draw(ctx) {
        // Draw Circle
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        // Draw origin circle
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.origin.x, this.origin.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }
    collides(x, y) {
        // Get distance between two points 
        let distance = Math.sqrt(Math.pow(x - this.pos.x, 2) + Math.pow(y - this.pos.y, 2))
        // If the distance is greater than the radius of the circle, we didn't collide
        if (distance > this.r) {
            this.clicked = false;
        }
        else {
            this.clicked = true;
        }
        return this.clicked;
    }
    resetToOrigin() {
        this.clicked = false;
        this.pos.x = this.origin.x;
        this.pos.y = this.origin.y;
        this.angle = 0;
    }
    updateTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
    }
    updatePos() {
        if (this.clicked) {
            this.angle = Math.atan2((this.pos.y - this.origin.y), (this.pos.x - this.origin.x));
            console.log(this.angle);
            this.pos.x = this.target.x;
            this.pos.y = this.target.y;
        } else {
            this.resetToOrigin();
        }
    }
    update(x, y) {
        this.collides(x, y);
        this.updateTarget(x, y);
        this.updatePos();
    }
}
// Check who
console.log(window.navigator.userAgent);