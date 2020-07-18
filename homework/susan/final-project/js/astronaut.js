export default class Astronaut {
    constructor(img) {
        this.img = img;
        this.x = 1000;
        this.y = 260;
        this.width = 780;
        this.height = 680;
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
            this.y = 260;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}