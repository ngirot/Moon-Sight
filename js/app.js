import p5 from 'p5';

const moonPosition = {x:  100, y: 250, z: 500};
const earthPosition = {x: 0, y: 0, z: 0};
const sunPosition = {x: 1000, y: 0, z: -1500};

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
    //p.noLoop();
  }

  p.draw = function () {
    p.background(0);

    const cam = p.createCamera();
    cam.setPosition(earthPosition.x, earthPosition.y, earthPosition.z);
    cam.perspective(1, 1, 0.01, 10000000000000);
    cam.lookAt(moonPosition.x, moonPosition.y, moonPosition.z);

    shaders.setUniform("uLightPosition", [sunPosition.x, sunPosition.y, sunPosition.z]);
    shaders.setUniform("uTexture", moonTexture);
    shaders.setUniform('time', p.millis());

    p.translate(moonPosition.x, moonPosition.y, moonPosition.z);
    //p.rotate(p.PI/3);
    p.sphere(100, 100, 100);
  }
};

const sketachable = new p5(sketch);
