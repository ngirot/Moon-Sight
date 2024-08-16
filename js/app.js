import p5 from 'p5';

const sketch = function (p) {
  let shaders;
  let moonTexture;

  p.preload = function () {
    shaders = p.loadShader('shaders/shader.vert', 'shaders/shader.frag');
    moonTexture = p.loadImage("img/lroc_color_poles_4k.jpg");
  }

  p.setup = function () {
    p.createCanvas(800, 800, p.WEBGL);
    p.shader(shaders);
    p.noStroke();
    p.background(0);
    //p.noLoop();

    const cam = p.createCamera();
    cam.setPosition(0, 0, 0);
    cam.lookAt(0, 0, 1);

  }

  p.draw = function () {
    shaders.setUniform("uLightPosition", [1000, 0, -500]);
    shaders.setUniform("uTexture", moonTexture);
    shaders.setUniform('time', p.millis());

    p.translate(0, 0, 250);
    p.sphere(100, 100, 100);
  }
};

const sketachable = new p5(sketch);
