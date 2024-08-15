precision mediump float;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;

uniform sampler2D uTexture;
uniform float time;

void main() {
    // const float PI = 3.1415926535897932384626433832795;
    // const float PI_2 = 1.57079632679489661923;
    // const float PI_4 = 0.785398163397448309616;

    // Texture
    vec2 coord = vec2(1. - vTexCoord.x, 1. - vTexCoord.y);
    vec4 color = texture2D(uTexture, coord);

    // Light
    float xFactor = cos(time * 0.001);
    float zFactor = sin(time * 0.0008);
    float yFactor = cos(time * 0.0009);
    vec3 lighSource = vec3(xFactor * 300., yFactor * 300., zFactor * 300.);

    vec3 lightVector = lighSource - vNormal;

    vec3 pn = normalize(vNormal);
    vec3 ln = normalize(lightVector);
    float light = max(dot(pn, ln), 0.0);


    // Result
    gl_FragColor = vec4(light * color.x, light * color.y, light * color.z, color.w);
    //gl_FragColor = vec4(xFactor, xFactor, xFactor, 1.);
}
