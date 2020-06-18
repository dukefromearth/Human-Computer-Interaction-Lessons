import Player from './player.js';

export default class Game {
    constructor() {
        this.players = [];
        this.addControls();
    }
    addPlayer(x, y) {
        let newPlayer = new Player(x, y);
        this.players.push(newPlayer);
    }
    addControls(isMobile) {
        // "this" means different things depending on where you are
        // At the moment, "this" refers to the game
        // Within the event listener "this" refers to the event listener
        let self = this;
        // Add an event listener to create a new player on click
        if (isMobile) {
            // Add a mobile touch event listener
            document.addEventListener('touchstart', function (event) {
                self.addPlayer(event.touches[0].clientX, event.touches[0].clientY, 'red');
            });
        }
        else {
            // Add a mouse click event listener
            document.addEventListener('mousedown', function (event) {
                self.addPlayer(event.clientX, event.clientY);
            });
        }
    }
}

