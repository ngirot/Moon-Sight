import p5 from 'p5';

const sketch = function (p) {
  let shaders;
  let moonTexture;

  p.preload = function (){
    shaders = p.loadShader('shaders/shader.vert', 'shaders/shader.frag');
    moonTexture = p.loadImage("img/lroc_color_poles_4k.jpg");
  }

  p.setup = function () {
    p.createCanvas(500, 500, p.WEBGL);
    p.shader(shaders);
    p.noStroke();
    shaders.setUniform("uTexture", moonTexture);
  }

  p.draw = function () {
    p.sphere(200, 100, 100);
  }
};

new p5(sketch);
