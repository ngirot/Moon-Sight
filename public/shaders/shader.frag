precision mediump float;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;

uniform sampler2D uTexture;
uniform vec3 uLightPosition;
uniform float time;

void main() {
    // Texture
    vec2 coord = vec2(vTexCoord.x, vTexCoord.y);
    vec4 color = texture2D(uTexture, coord);

    // Light
    vec3 lightVector = uLightPosition - vPosition;

    vec3 pn = normalize(vNormal);
    vec3 ln = normalize(lightVector);
    float light = max(dot(pn, ln), 0.0);

    // Result
    gl_FragColor = vec4(light * color.x, light * color.y, light * color.z, color.w);

}
