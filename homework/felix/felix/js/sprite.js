/**
 * 
 * Create a sprite class
 * 
 * What this class does is take an image and break it into small parts.
 * Each time the image is redrawn, we draw a new part of the image
 * It gives an illusion of movement
 * https://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099
 * 
 */

export default class Sprite {
    constructor(img, width, height, numImages, scaledHeight, scaledWidth) {
        this.img = img;
        this.width = width;
        this.height = height;
        this.scaledWidth = scaledWidth;
        this.scaledHeight = scaledHeight;
        this.numImages = numImages;
        this.imgWidth = this.width / this.numImages;
        this.currIndex = 0;
        this.lastDraw = Date.now();
    }
    draw(ctx, x, y, angle) {
        // Check if the time since we last drew our image was greater that 1/60 of a second ago
        if (Date.now() - this.lastDraw > 1000 / 60) {
            //Check if the next index is greater than the amount of images in the sprite sheet
            if (++this.currIndex >= this.numImages) {
                this.currIndex = 0;
            }
        }
        // Cut the image into smaller parts and draw at the appropriate index
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(this.img, this.currIndex * this.imgWidth, 0, this.imgWidth, this.height, 0, 0, this.scaledWidth, this.scaledHeight);
        ctx.restore();
        this.lastDraw = Date.now();
    }
}