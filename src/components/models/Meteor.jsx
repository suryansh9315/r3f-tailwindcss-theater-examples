import {
  useGLTF,
  useTexture,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";
import { data as meteorShaderData } from "../shaders/meteor-shader";

const Meteor = () => {
  const { nodes } = useGLTF("/assets/models/meteor.glb");
  const [normalMap] = useTexture(["/assets/textures/meteor_normals.png"]);
  const state = useThree();

  useEffect(() => {
    state.gl.toneMappingExposure = 5;
  }, [state.gl]);

  return (
    <>
      <mesh geometry={nodes.meteor.geometry}>
        <MeshTransmissionMaterial
          normalMap={normalMap}
          normalScale={[0.3, 0.3]}
          roughness={0}
          ior={1.5}
          thickness={0.035}
          chromaticAberration={1}
          anisotropy={20}
          distortion={0}
          samples={10}
          backside
          color={"#fff"}
          attenuationDistance={0.2}
          attenuationColor={"#e2ae5b"}
        />
      </mesh>
      <mesh geometry={nodes.meteor.geometry} scale={[1.02, 1.02, 1.02]}>
        <NodeToyMaterial data={meteorShaderData} />
      </mesh>
    </>
  );
};

export default Meteor;
