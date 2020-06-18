export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.fillRect(this.x, this.y, 100, 100);
    }
}