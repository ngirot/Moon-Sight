attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;


uniform mat4 uModelViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
    vec4 modelPosition = uModelMatrix * vec4(aPosition, 1.0);

    vTexCoord = aTexCoord;
    vNormal = aNormal;
    vPosition = modelPosition.xyz;

    gl_Position = uProjectionMatrix * viewModelPosition;
}
