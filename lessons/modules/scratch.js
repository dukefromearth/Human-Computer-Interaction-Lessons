import Rect from './rect.js';
import Circle from './circle.js';

let rect = new Rect();
let circle = new Circle();

let render = function () {
    circle.draw();
    rect.draw();
}