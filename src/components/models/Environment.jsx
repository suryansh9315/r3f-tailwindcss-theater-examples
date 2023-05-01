import React from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf, useScroll } from "@react-three/drei";
import { val } from "@theatre/core";
import { useCurrentSheet, PerspectiveCamera } from "@theatre/r3f";

const Environment = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const bgColor = "#84a4f4";

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={-4} far={10} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
      <Gltf src="/assets/models/environment.glb" castShadow receiveShadow />
    </>
  );
};

export default Environment;
