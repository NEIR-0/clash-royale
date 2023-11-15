import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useLayoutEffect } from "react";

export function Crown(props) {
  const { nodes, materials } = useGLTF("./models/crown_clash_royale.glb");

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.Crown} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

useGLTF.preload("./models/crown_clash_royale.glb");
