precision mediump float;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;

uniform sampler2D uTexture;
uniform float time;

void main() {
    // Texture
    vec2 coord = vec2(vTexCoord.x, vTexCoord.y);
    vec4 color = texture2D(uTexture, coord);

    // Light
    float xFactor = cos(time * 0.001);
    float zFactor = sin(time * 0.0008);
    float yFactor = cos(time * 0.0009);
    vec3 lighSource = vec3(xFactor * 1000., yFactor * 1000., zFactor * 1000.);

    vec3 lightVector = lighSource - vPosition;

    vec3 pn = normalize(vNormal);
    vec3 ln = normalize(lightVector);
    float light = max(dot(pn, ln), 0.0);


    // Result
    gl_FragColor = vec4(light * color.x, light * color.y, light * color.z, color.w);
}
