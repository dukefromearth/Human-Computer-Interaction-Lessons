/**
 *
 * Create a Parallax Background class
 * 
 * The background has what is referred to as a parallax effect
 * https://www.ibm.com/developerworks/library/wa-parallaxprocessing/index.html
 *
 *
 */

export default class Background {
    constructor(imageNames, width, height) {
        this.images = [];
        this.width = width;
        this.height = height;
        this.lastDraw = Date.now();
        this.init(imageNames);
    }
    // Creates an image element for every image name supplied and ads it to the dom
    init(imageNames) {
        for (let i of imageNames) {
            let myImage = new Image(canvas.width, canvas.height);
            myImage.src = i;
            myImage.style.display = 'none';
            document.body.appendChild(myImage);
            this.images.push({ img: myImage, pos: 0 });
        }
    }
    // Updates the position of each image
    update() {
        for (let i = 0; i < this.images.length; i++) {
            let pos = this.images[i].pos;
            this.images[i].pos += i + 1;
            if (pos >= canvas.width) this.images[i].pos = i + 1;
        }
    }
    // Draws two versions of each image to make the image appear endless
    draw(ctx) {
        for (let i of this.images) {
            ctx.drawImage(i.img, -i.pos, 0, canvas.width, canvas.height);
            ctx.drawImage(i.img, canvas.width - i.pos, 0, canvas.width, canvas.height);
        }
    }
}