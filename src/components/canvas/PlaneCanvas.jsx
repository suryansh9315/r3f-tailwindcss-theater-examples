import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Plane from '../models/Plane'
import CanvasLoader from '../CanvasLoader'

const PlaneCanvas = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <PerspectiveCamera position={[0, 0, 4]} makeDefault />
      <Suspense fallback={<CanvasLoader />}>
        <Plane />
      </Suspense>
    </Canvas>
  );
};

export default PlaneCanvas;
