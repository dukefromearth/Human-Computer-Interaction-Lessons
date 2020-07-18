/**
 *
 * Create a Player class
 *
 * The player moves up on every mousedown and down when the mouse is not pressed
 * The player has a sprite, which is a flying bird that is drawn at the x,y location of the player
 *
 */

export default class Player {
    constructor(x, y, speed, sprite) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.target = { x: this.x, y: this.y };
        this.speed = speed;
        this.angle = 0;
        this.sprite = sprite;
        this.xp = 100;
    }
    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y, this.angle);
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.xp, 10);
        ctx.restore();
    }
    updateTarget(event) {
        console.log(event.clientX, event.clientY);
        this.target.x = event.clientX;
        this.target.y = event.clientY;
    }
    moveToTarget() {
        if (Math.abs(this.x - this.target.x) < this.speed && Math.abs(this.y - this.target.y) < this.speed) return;
        this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
    // If the mouse is down, move the player up, otherwise move them down
    update() {
        if (mouseDown) {
            if (this.y > 0) this.y -= this.speedY;;
        } else {
            if (this.y + this.sprite.scaledHeight < canvas.height) this.y += this.speedY;
        }
    }
}