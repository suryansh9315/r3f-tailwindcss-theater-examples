import { useFrame, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { WaveMaterial } from "../shaders/WaveMaterial";
import * as THREE from "three";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import { patchShadersCSM, patchShaders } from "gl-noise/build/glNoise.m";

let shader = {
  vertex: /* glsl */ `
  varying vec2 vUv;
  uniform float time;
  uniform float progress;
  varying vec3 vPosition;
  // float PI = 3.141592653589793;
  attribute float aRandom;
  attribute vec3 aCenter;
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
    vec3 pos = position;
    // float prog = (position.y + 1.0) / 2.0;
    // float locprog = clamp((progress - 0.8*prog)/0.2, 0.0, 1.0);
    // pos = rotate(pos, vec3(0.0, 1.0, 0.0), progress*3.14*3.0);
    pos = progress + pos;
    // pos = pos - aCenter;
    // pos += progress*normal*aRandom;
    // pos += aCenter; 
    // pos += aRandom * (1.0 - progress) * normal; 
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }`,
  fragment: /* glsl */  `
    varying vec2 vUv;
    uniform float time;
    uniform float progress;
    void main() {
      // gl_FragColor = vec4(0.8, 0.8, 0.8, 1);
      csm_DiffuseColor = vec4(0.8, 0.8, 0.8, 1);
  }`,
};

const Augusto = () => {
  const { nodes, materials } = useGLTF("/assets/models/aabcd/scene.gltf");
  const matRef = useRef();
  const meshRef = useRef();
  
  useControls("Progress", {
    progress: {
      value: 0.0,
      step: 0.01,
      onChange: (v) => {
        matRef.current.uniforms.progress.value = v;
      },
    },
  });
  useControls("Mesh Controls", {
    position: {
      x: 0,
      y: 0,
      z: 0,
      onChange: (v) => {
        meshRef.current.position.copy(v);
      },
    },
    scale: {
      x: 15,
      y: 15,
      z: 15,
      onChange: (v) => {
        meshRef.current.scale.copy(v);
      },
    },
  });

  useFrame((state, delta) => {
    matRef.current.uniforms.time.value += delta * 1;
  });
  
  useLayoutEffect(() => {
    console.log(meshRef.current);
    let len = meshRef.current.geometry.attributes.position.count;
    let randoms = new Float32Array(len);
    let centres = new Float32Array(len * 3);

    for (let i = 0; i < len; i += 3) {
      let r = Math.random();
      randoms[i] = r;
      randoms[i + 1] = r;
      randoms[i + 2] = r;

      let x = meshRef.current.geometry.attributes.position.array[i * 3];
      let y = meshRef.current.geometry.attributes.position.array[i * 3 + 1];
      let z = meshRef.current.geometry.attributes.position.array[i * 3 + 2];

      let x1 = meshRef.current.geometry.attributes.position.array[i * 3 + 3];
      let y1 = meshRef.current.geometry.attributes.position.array[i * 3 + 4];
      let z1 = meshRef.current.geometry.attributes.position.array[i * 3 + 5];

      let x2 = meshRef.current.geometry.attributes.position.array[i * 3 + 6];
      let y2 = meshRef.current.geometry.attributes.position.array[i * 3 + 7];
      let z2 = meshRef.current.geometry.attributes.position.array[i * 3 + 8];

      let center = new THREE.Vector3(x, y, z)
        .add(new THREE.Vector3(x1, y1, z1))
        .add(new THREE.Vector3(x2, y2, z2))
        .divideScalar(3);

      centres.set([center.x, center.y, center.z], i * 3);
      centres.set([center.x, center.y, center.z], (i+1)*3);
      centres.set([center.x, center.y, center.z], (i+2)*3);
    }
    meshRef.current.geometry.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(randoms, 1)
    );
    meshRef.current.geometry.setAttribute(
      "aCenter",
      new THREE.BufferAttribute(centres, 3)
    );
  }, []);

  return (
    <>
      <group>
        <mesh
          position={[0, 0, 0]}
          scale={[15, 15, 15]}
          ref={meshRef}
          geometry={nodes.Object_4.geometry}
          material={materials.default}
        >
          {/* <icosahedronGeometry args={[1, 15]} /> */}
          {/* <sphereGeometry args={[1, 32, 32]}  /> */}
          {/* <waveMaterial
            ref={matRef}
            key={WaveMaterial.key}
            toneMapped={true}
          /> */}
          <CustomShaderMaterial
            // wireframe
            ref={matRef}
            toneMapped
            baseMaterial={THREE.MeshStandardMaterial}
            vertexShader={patchShaders(shader.vertex)}
            fragmentShader={patchShaders(shader.fragment)}
            uniforms={{
              time: {
                value: 0.0,
              },
              progress: {
                value: 0.0,
              },
            }}
          />
          {/* <meshStandardMaterial ref={matRef} key={WaveMaterial.key} toneMapped /> */}
        </mesh>
      </group>
    </>
  );
};

export default Augusto;
