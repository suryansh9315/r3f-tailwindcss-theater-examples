import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Preload
} from "@react-three/drei";
import React, { Suspense } from "react";
import CanvasLoader from "../CanvasLoader";
import Scene from '../models/Scene'
import Meteor from '../models/Meteor'
import { NodeToyTick } from "@nodetoy/react-nodetoy";

const SceneCanvas = () => {
  return (
    <Canvas
      shadows
      gl={{
        preserveDrawingBuffer: true,
      }}
    >
      <Environment
        background={"only"}
        files={"/assets/textures/envmap_blur.hdr"}
        ground={{ height: 100, radius: 300 }}
      />
      <Environment background={false} files={"/assets/textures/envmap.hdr"} />
      <PerspectiveCamera
        makeDefault
        fov={33}
        position={[-0.07, 16.41, -24.1]}
      />
      <OrbitControls
        target={[0.02, 0.806, 0.427]}
        maxPolarAngle={Math.PI * 0.45}
      />
      <NodeToyTick />
      <Suspense fallback={<CanvasLoader />}>
        <Scene />
        <Meteor />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default SceneCanvas;
