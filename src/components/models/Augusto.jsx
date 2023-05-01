import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { DoubleSide } from 'three'

const Augusto = () => {
  const planeRef = useRef();

  useFrame(({ clock }) => {
    planeRef.current.rotation.x = clock.getElapsedTime();
  });

  return (
    <>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 1, 1]}
        ref={planeRef}
      >
        <planeGeometry />
        <meshBasicMaterial color="red" side={DoubleSide} />
      </mesh>
    </>
  );
};

export default Augusto;
