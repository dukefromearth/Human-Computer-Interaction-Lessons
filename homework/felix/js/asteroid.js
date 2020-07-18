export default class Asteroid {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.spd = Math.random() * 4 + 1;
    }
    update() {
        this.x++;
    }
    draw(ctx) {

    }
}

let a1 = new Asteroid(null, 1, 1);
let a2 = new Asteroid(null, 2, 2);


