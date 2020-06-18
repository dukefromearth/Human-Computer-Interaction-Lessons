export default class Game {
    constructor() {
        this.boxes = [];
        this.players = {};
    }
    newPlayer(data) {
        this.players[data.id] = { name: data.name, color: data.color };
    }
    removePlayer(id) {
        delete this.players[id];
    }
    draw(data) {
        this.boxes.push(data);
    }
    getState() {
        return this.boxes;
    }
    clearBoxes() {
        this.boxes.length = 0;
    }
}