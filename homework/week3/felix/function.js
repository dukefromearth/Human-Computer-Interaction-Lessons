
var particleNumber = 1250;
// number of particles 


window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 20);
    };
})();
// requesting the keyframes

var c = document.getElementById('c');
var ctx = c.getContext('2d');
//context and id of canvas

var w = window.innerWidth;
var h = window.innerHeight;
//width and height of canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

function between(min, max) {
  return Math.random() * (max - min) + min;
}

var particles = [];
// the particles storage

for (i = 0; i < particleNumber; i++) {
  setTimeout(function () {
    particles.push(new createParticle);
  }, i * 4.3);
  // add a particle (not all at once - setTimeout(); )
}
// adding 55 particles

function createParticle() {
  this.x = c.width / 2;
  this.y = c.height / 2;

  this.angle = between(3, 100);
  this.speed = c.width / 500;

  this.size = 2;

  var r = 'tomato';
  var o = '*fff';
  var y = '*fff';
  var array = [r, o, y];
  this.color = array[Math.floor(Math.random() * 90)];
}

function draw() {
  requestAnimFrame(draw);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.075)';
  ctx.fillRect(0, 0, c.width, c.height);

  for (t = 0; t < particles.length; t++) {
    var p = particles[t];

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, Math.PI * 2, false);
    ctx.fill();

    p.x += Math.cos((Math.PI * 1) + (p.angle)) * p.speed;
    p.y += Math.sin((Math.PI * 1) + (p.angle)) * p.speed;

    p.angle += 0.02;
  }
}

draw();

