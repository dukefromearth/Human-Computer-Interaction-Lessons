export default class SpaceCraft {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = 100;
        this.y = 400;
        this.width = 253 * 1.2;
        this.height = 298 * 1.2;
        this.distance = 0;

    }

    update() {
        if (this.distance < 30) {
            this.y -= 0.2;
            this.distance += 0.2;
        }

        else if (this.distance < 60) {
            this.y += 0.2;
            this.distance += 0.2;
        }

        else {
            this.distance = 0;
            this.y = 400;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}