import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { DoubleSide } from "three";
import { PlaneMaterial } from "../shaders/PlaneMaterial";

const Plane = () => {
  const planeRef = useRef();
  const matRef = useRef()

  useFrame(({ clock }) => {
    planeRef.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <>
      <mesh
        position={[0, 0, 0]}
        scale={[1.5, 1.5, 1.5]}
        ref={planeRef}
      >
        <planeGeometry args={[1, 1, 100, 100]} />
        <planeMaterial ref={matRef} key={PlaneMaterial.key} toneMapped={true} side={DoubleSide} />
      </mesh>
    </>
  );
};

export default Plane;
