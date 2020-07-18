export default class Asteroid {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
    moveInWave() {
        this.delta += this.speed;
        this.x++;
        this.y += Math.sin(this.delta) * this.amplitude;
    }
    checkBoundary() {

    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, 100, 100)

    }



}