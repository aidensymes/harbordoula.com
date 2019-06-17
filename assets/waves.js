let yoff;          // Y value for perlin noise
let ylower = 0;    // Lower limit of Y noise
let yupper;        // Upper limit of y noise
let xlower = 0;    // Lower limit of X noise
let xupper;        // Upper limit of X noise
var xspacing = 75; // Distance between each horizontal location
var w;             // Width of entire wave
var theta;         // Start angle at 0
var amplitude;     // Height of wave
var period;        // How many pixels before the wave repeats
var dx;            // Value for incrementing x
var yvalues;       // Array of Y values
var numLines;

$(document).ready(function() {
  $(window).resize(function() {
    setup();
  });
});

function setup() {
  canvas = createCanvas($(window).width() * 1.1, $(window).height() * .75);
  canvas.parent('waves__canvas');

  yoff = 0;
  yupper = $(window).width() / 25;
  xupper = $(window).width() / 25;
  w = width + xspacing;
  theta = 0;
  amplitude = $(window).width() / 65;
  period = $(window).width();
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  numLines = $(window).height() / 125;

  stroke('#134E6C');
  strokeWeight(floor(amplitude / 1.5));
  noFill();
}

function draw() {
  background('#FEFEFF');
  render();
}

function render() {
  let xoff = 0;
  theta += map(noise(xoff, yoff), 0, 1, -0.02, 0.02);
  var x = theta;
  for(var j = 0; j < numLines; j++) {
    beginShape();
    for (var i = 0; i < yvalues.length; i++) {
      let ynoise = map(noise(xoff, yoff), 0, 1, ylower, yupper);
      let xnoise = map(noise(xoff, yoff), 0, 1, xlower, xupper);
      yvalues[i] = sin(x) * amplitude + ynoise;
      vertex(i * xspacing - xnoise, height - ($(window).width() / 20) - j * (amplitude * 1.75) + yvalues[i]);
      xoff += 0.05;
      x += dx;
    }
    yoff += 0.0003;
    endShape();
  }
}
