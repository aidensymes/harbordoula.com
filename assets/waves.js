let yoff = 0.0;
let ylower = 0;
let yupper = 25;
let xlower = 0;
let xupper = 30;

var xspacing = 50;                            // Distance between each horizontal location
var w;                                        // Width of entire wave
var theta = 0.0;                              // Start angle at 0
var amplitude = 25;                           // Height of wave
var period = ($(window).width() + 100) * .9;  // How many pixels before the wave repeats
var dx;                                       // Value for incrementing x
var yvalues;                                  // Array of Y values

function setup() {
  canvas = createCanvas($(window).width() + 100, $(window).height() * .9);
  canvas.parent('waves__canvas');
  w = width + xspacing;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background('#FEFEFF');
  stroke('#134E6C');
  strokeWeight(amplitude / 2);
  noFill();
  render();
}

function render() {
  let xoff = 0;
  theta += map(noise(xoff, yoff), 0, 1, -0.02, 0.02);
  var x = theta;
  for(var j = 0; j < 7; j++) {
    beginShape();
    for (var i = 0; i < yvalues.length; i++) {
      let ynoise = map(noise(xoff, yoff), 0, 1, ylower, yupper);
      let xnoise = map(noise(xoff, yoff), 0, 1, xlower, xupper);
      yvalues[i] = sin(x) * amplitude + ynoise;
      vertex(i * xspacing - xnoise, height - 100 - j * 1.5 * amplitude + yvalues[i]);
      xoff += 0.05;
      x += dx;
    }
    yoff += 0.001;
    endShape();
  }
}
