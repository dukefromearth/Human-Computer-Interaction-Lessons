export default class ResourcePlanet {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.drawImage(this.img,this.x,this.y,100,100)
    }

    
}