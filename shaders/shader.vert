attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

varying vec2 vTexCoord;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vTexCoord = aTexCoord;
    vPosition = aPosition;
    vNormal = aNormal;

    vec4 positionVec4 = vec4(aPosition, 1.0);
    gl_Position = positionVec4;
}
