precision mediump float;

// Receive the texCoord variable from the vertex shader
varying vec2 vTexCoord;
uniform sampler2D uTexture;

void main() {
    vec2 coord = vec2(1.-vTexCoord.x, 1.-vTexCoord.y);
    vec4 color = texture2D(uTexture, coord);
    gl_FragColor = color;
}
