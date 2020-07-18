export default class Bomb {
    constructor(img, speed) {
        this.img = img;
        this.x = Math.random() * canvas.width;
        this.y = -Math.random() * canvas.height;
        this.speed = speed;
        this.width = 22;
        this.height = 93;
    }
    update() {
        this.y += this.speed;
        if (this.y >= canvas.height) {
            this.y = -Math.random() * canvas.height;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
