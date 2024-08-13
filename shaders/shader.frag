precision mediump float;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;

uniform sampler2D uTexture;
uniform float time;

void main() {
    const float PI = 3.1415926535897932384626433832795;
    const float PI_2 = 1.57079632679489661923;
    const float PI_4 = 0.785398163397448309616;

    // Texture
    vec2 coord = vec2(1. - vTexCoord.x, 1. - vTexCoord.y);
    vec4 color = texture2D(uTexture, coord);

    // Light
    vec3 lighSource = vec3(100., 100., -100.);

    vec3 pn = normalize(vNormal);
    vec3 ln = normalize(lighSource);
    float light = max(dot(pn, ln), 0.0);


    // Result
    gl_FragColor = vec4(light * color.x, light * color.y, light * color.z, color.w);
}
