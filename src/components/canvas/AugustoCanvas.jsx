import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Augusto from '../models/Augusto'
import CanvasLoader from '../CanvasLoader'

const AugustoCanvas = () => {
  return (
    <Canvas>
      <OrbitControls />
      {/* <ambientLight /> */}
      {/* <PerspectiveCamera position={[2, 2, 2]} makeDefault /> */}
      <Suspense fallback={<CanvasLoader />}>
        <Augusto />
      </Suspense>
    </Canvas>
  );
};

export default AugustoCanvas;
