import React from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import AppContext from "appContext";
import { Water } from "./background/Water";

function buildWater(scene) {
  const waterGeometry = new THREE.PlaneGeometry(70, 70);
  const water = new Water(waterGeometry, {
    textureWidth: 10,
    textureHeight: 10,
    waterNormals: new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  // const waterUniforms = water.material.uniforms;
  return water;
}


function Sky() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const context = React.useContext(AppContext);
  const { camera, gridPosition } = context;
  const { cameraType } = camera;
  // const water = buildWater(scene);

  // useFrame((state) => {
    // Animates water
    // (water.material as any).uniforms["time"].value += 1.0 / 60.0;
  // });
  // let obj = useLoader(TextureLoader, cameraType == "character" ? "assets/art_bg.jpg" :"assets/water_ocean_nature_waves_foam_1920x1080.jpg");;
  // scene.background = obj;
  return null;
}

export default React.memo(Sky);
