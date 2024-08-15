import p5 from 'p5';

const sketch = function (p) {
  let shaders;
  let moonTexture;

  p.preload = function (){
    shaders = p.loadShader('shaders/shader.vert', 'shaders/shader.frag');
    moonTexture = p.loadImage("img/lroc_color_poles_4k.jpg");
  }

  p.setup = function () {
    p.createCanvas(800, 800, p.WEBGL);
    p.shader(shaders);
    p.noStroke();
    p.background(0);
    //p.noLoop();
  }

  p.draw = function () {
    shaders.setUniform("uTexture", moonTexture);
    shaders.setUniform('time', p.millis());
    p.sphere(200, 100, 100);
  }
};

const sketachable = new p5(sketch);
