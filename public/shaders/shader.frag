precision mediump float;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;
varying mat3 vNormalMatrix;
varying vec3 vTangent;
varying vec3 vBiTangent;

uniform sampler2D uTexture;
uniform sampler2D uHeightMap;
uniform vec3 uHeightMapSize;
uniform vec3 uLightPosition;
uniform float time;

vec3 heighToNormal(vec2 texturePos) {
    vec2 steps = vec2(1. / uHeightMapSize.x, 1. / uHeightMapSize.y);
    float factor = uHeightMapSize.z;

    float currentPixel = texture2D(uHeightMap, texturePos).x * factor;
    float leftPixel = texture2D(uHeightMap, vec2(texturePos.x - steps.x, texturePos.y)).x * factor;
    float rightPixel = texture2D(uHeightMap, vec2(texturePos.x + steps.x, texturePos.y)).x * factor;
    float downPixel = texture2D(uHeightMap, vec2(texturePos.x, texturePos.y + steps.y)).x * factor;
    float upPixel = texture2D(uHeightMap, vec2(texturePos.x, texturePos.y - steps.y)).x * factor;

    vec3 va = normalize(vec3(steps.y, 0.0, rightPixel - currentPixel));
    vec3 vb = normalize(vec3(0.0, steps.x, upPixel - currentPixel));

    return normalize(cross(va, vb));
}

void main() {
    // Texture
    vec2 coord = vec2(vTexCoord.x, vTexCoord.y);
    vec4 color = texture2D(uTexture, coord);

    // Light
    vec3 lightVector = uLightPosition - vPosition;

    // Normal
    mat3 tbn = mat3(normalize(vTangent), normalize(vBiTangent), normalize(vNormal));
    vec3 normalMap = tbn * heighToNormal(coord);

    vec3 pn = normalize(normalMap);
    vec3 ln = normalize(lightVector);
    float light = max(dot(pn, ln), 0.0);



    // Result
    gl_FragColor = vec4(light * color.x, light * color.y, light * color.z, color.w);
}
