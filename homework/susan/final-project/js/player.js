export default class Player {

    constructor(img, x, y, width, height, stick, id) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.width = width;
        this.height = height;
        this.speed = 4;
        this.spinning = false;
        this.spinTimer = 1500;
        this.lastSpin = 0;
        this.angle = 0;
        this.stick = stick;
        this.id = id;
        this.xp = this.width;
        this.numSpins = 2;
    }
    startSpin() {
        if (this.spinning || this.numSpins <= 0) return;
        this.numSpins--;
        this.spinning = true;
        this.lastSpin = Date.now();
    }
    spin() {
        if (this.spinning && Date.now() - this.lastSpin < this.spinTimer) {
            this.angle = (this.angle + 0.4) % (2 * Math.PI);
        } else if (this.angle > 0.2 && this.angle < 2 * Math.PI - 0.2) {
            this.angle = (this.angle + 0.1) % (2 * Math.PI);
        } else {
            this.angle = 0;
            this.spinning = false;
        }
    }
    update() {
        this.spin();
        if (this.stick.clicked) {
            this.x -= Math.cos(this.stick.angle) * this.speed;
            this.y -= Math.sin(this.stick.angle) * this.speed;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 20, this.xp, 10);
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

}