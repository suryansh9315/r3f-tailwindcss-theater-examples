import {
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Augusto from "../models/Augusto";
import Plane from "../models/Plane";
import CanvasLoader from "../CanvasLoader";

const AugustoCanvas = () => {
  return (
    <Canvas camera={{ position: [4, 4, 5] }}>
      <OrbitControls />
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.1} position={[0.5, 0, 0.866]} />
      <spotLight
        // castShadow
        position={[0, 2, 2]}
        intensity={0.7}
        angle={Math.PI / 3}
        penumbra={0.5}
        shadow-mapSize={2048}
        target-position={[0,0,0]}
      />
      <Suspense fallback={<CanvasLoader />}>
        <Augusto />
        {/* <Plane /> */}
      </Suspense>
      <Environment preset="night" />
    </Canvas>
  );
};

export default AugustoCanvas;
