import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const PlaneMaterial = shaderMaterial(
  {},
  /*glsl*/ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  /*glsl*/ `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}`
);

extend({ PlaneMaterial });
export { PlaneMaterial };
