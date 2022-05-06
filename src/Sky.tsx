import React from "react";
import { useLoader, useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import AppContext from "appContext";


function returnImage(){

}
function Sky() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const context = React.useContext(AppContext);
  const { camera, gridPosition } = context;
  const { cameraType } = camera;
  let obj = useLoader(TextureLoader, cameraType == "character" ? "assets/art_bg.jpg" :"assets/water_ocean_nature_waves_foam_1920x1080.jpg");;
  

  scene.background = obj;
  return null;
}

export default React.memo(Sky);
