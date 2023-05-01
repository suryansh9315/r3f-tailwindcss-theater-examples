import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, OrbitControls } from "@react-three/drei";
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import Environment from "../models/Environment";
import CanvasLoader from "../CanvasLoader";

const TheaterCanvas = () => {
  const sheet = getProject("Fly Through").sheet("Scene");

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <OrbitControls />
      <Suspense fallback={<CanvasLoader />}>
        <ScrollControls pages={5}>
          <SheetProvider sheet={sheet}>
            <Environment />
          </SheetProvider>
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
};

export default TheaterCanvas;
