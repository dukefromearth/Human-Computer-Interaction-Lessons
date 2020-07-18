export default class JoyStick {

    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.originX = x;
        this.originY = y;
        this.angle = 0;
        this.clicked = false;
    }
    update(x, y) {
        if (this.clicked) {
            this.angle = Math.atan2((this.originY - this.y), (this.originX - this.x));
            this.x = x;
            this.y = y;
        }
        else {
            this.x = this.originX;
            this.y = this.originY;
        }
    }
    draw(ctx) {

        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

    }
    collide(x, y) {
        let distance = Math.sqrt(Math.pow(this.originX - this.x, 2), Math.pow(this.originY - this.y, 2));
        if (distance >= 100 - this.r) {
            this.clicked = false;
        }
        else {
            this.clicked = true;
        }

    }

}