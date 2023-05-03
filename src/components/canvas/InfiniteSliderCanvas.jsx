import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import InfiniteSlider from '../models/InfiniteSlider'
import CanvasLoader from '../CanvasLoader'

const InfiniteSliderCanvas = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <PerspectiveCamera position={[0, 0, 4]} makeDefault />
      <Suspense fallback={<CanvasLoader />}>
        <InfiniteSlider />
      </Suspense>
    </Canvas>
  );
};

export default InfiniteSliderCanvas;
