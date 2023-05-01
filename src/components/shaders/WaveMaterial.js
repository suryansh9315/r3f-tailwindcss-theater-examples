import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const WaveMaterial = shaderMaterial(
  {
    time: 0,
  },
  /*glsl*/ `
  varying vec2 vUv;
  uniform float time;
  varying vec3 vPosition;
  float PI = 3.141592;
  attribute float aRandom;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.x += sin((uv.y + uv.x + time) * 10.0) * 0.08; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }`,

  /*glsl*/ `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(0.3, 0.7, 0.5, 1.0);
}`
);

extend({ WaveMaterial });
export { WaveMaterial };
