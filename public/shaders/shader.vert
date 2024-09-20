precision mediump float;


attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBiTangent;


uniform mat4 uModelViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform float time;

vec3 tangentSpace(vec3 normal) {
    return cross(normal, vec3(0.0, 0.0, 1.0));
}

void main() {
    vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
    vec4 modelPosition = uModelMatrix * vec4(aPosition, 1.0);

    mat3 normalModelMatrix = mat3(
    uModelMatrix[0][0], uModelMatrix[0][1], uModelMatrix[0][2],
    uModelMatrix[1][0], uModelMatrix[1][1], uModelMatrix[1][2],
    uModelMatrix[2][0], uModelMatrix[2][1], uModelMatrix[2][2]
    );

    vTexCoord = aTexCoord;
    vNormal = normalModelMatrix * aNormal;
    vPosition = modelPosition.xyz;

    vec3 tangent = tangentSpace(aNormal);
    vTangent = normalize(normalModelMatrix * normalize(tangent));
    vBiTangent = normalize(normalModelMatrix * cross(tangent, aNormal));

    gl_Position = uProjectionMatrix * viewModelPosition;
}
