import React from "react";
import { useLoader, useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
function Sky() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  let obj = useLoader(EXRLoader, "assets/086_hdrmaps_com_free.exr", (loader) => {
    
    //@ts-ignore
    // loader.setMaterials(materials);
  });

  scene.background = obj;
  return null;
}

export default React.memo(Sky);
