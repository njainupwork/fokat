import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import "./styles.css";

import { useWeb3React, Web3ReactProvider } from "@web3-react/core";

import { OrbitControls, useFBX } from "@react-three/drei";
import { Suspense } from "react";
const Model = () => {
  const fbx = useFBX("/assets/xsi_man_skinning.fbx");
  return (
    <>
      <primitive object={fbx} dispose={null} />
    </>
  );
};
useFBX.preload("/fbx/changqu.fbx");
function Box(props) {
  const mesh = useRef<THREE.Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh
      color={hovered ? "hotpink" : "orange"}
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "black" : "red"}
      />
    </mesh>
  );
}
const Animate = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
    </Canvas>
  );
};

export default Animate;
