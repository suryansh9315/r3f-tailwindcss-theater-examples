import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const WaveMaterial = shaderMaterial(
  {
    time: 0,
    progress: 0
  },
  /*glsl*/ `
  varying vec2 vUv;
  uniform float time;
  uniform float progress;
  varying vec3 vPosition;
  float PI = 3.141592;
  attribute float aRandom;
  attribute vec3 aCenter;
  varying float bRandom;
  mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
  }
  vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
  }
  void main() {
    vUv = uv;
    bRandom = aRandom;
    vec3 pos = position;
    float prog = (position.y + 1.0) / 2.0;
    float locprog = clamp((progress - 0.8*prog)/0.2, 0.0, 1.0);
    pos = pos - aCenter;
    pos *= locprog;
    pos += aCenter; 
    pos = rotate(pos, vec3(0.0, 1.0, 0.0), aRandom*(1.0-progress)*3.14*3.0);
    pos += aRandom * (1.0 - progress) * normal; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,

  /*glsl*/ `
  varying vec2 vUv;
  varying float bRandom;
  void main() {
    gl_FragColor = vec4(0.8, 0.8, 0.8, 1);
}`
);

extend({ WaveMaterial });
export { WaveMaterial };
