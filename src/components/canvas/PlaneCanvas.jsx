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
      <PerspectiveCamera position={[2, 2, 2]} makeDefault />
      <Suspense fallback={<CanvasLoader />}>
        <Plane />
      </Suspense>
    </Canvas>
  );
};

export default PlaneCanvas;
