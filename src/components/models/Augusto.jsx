import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { WaveMaterial } from '../shaders/WaveMaterial'

const Augusto = () => {
  const ref = useRef();

  useFrame((state, delta) => (ref.current.time += delta))

  return (
    <>
      <mesh
        position={[0, 0, 0]}
        scale={[2, 2, 2]}
      >
        <icosahedronGeometry args={[1,3]} />
        <sphereGeometry args={[1, 32, 32]} />
        <waveMaterial wireframe ref={ref} key={WaveMaterial.key} toneMapped={true} />
      </mesh>
    </>
  );
};

export default Augusto;
