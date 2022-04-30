import React, { useEffect } from "react";
import { Stats, OrbitControls } from "@react-three/drei";

import { Suspense, useRef, useMemo, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as three from "three";
import gsap from "gsap";
import { Vector3 } from "three";
import plots from "plots";
import plotsChar from "plotsChar";
import AppContext from "appContext";
import CameraController from "CameraController";
import CameraControls from "camera-controls";
import CameraCharacterController from "CameraCharacterController";
import CameraGridController from "CameraGridController";

const animationsObjects = [];

function createMoveAnimation({
  mesh,
  startPosition,
  endPosition,
  turn = 0,
  callback = () => {},
}) {
  if (!mesh) {
    return;
  }
  mesh.userData.mixer = new THREE.AnimationMixer(mesh);

  let track = new THREE.VectorKeyframeTrack(
    ".position",
    [0, 1, 2],
    [
      startPosition.x,
      startPosition.y,
      startPosition.z,
      endPosition.x,
      endPosition.y,
      endPosition.z,
    ],
    THREE.InterpolateSmooth
  );

  const animationClip = new THREE.AnimationClip(null, 3, [track]);
  const animationAction = mesh.userData.mixer.clipAction(animationClip);
  // animationAction.setLoop(THREE.LoopOnce);
  const p = animationAction.play();
  mesh.userData.clock = new THREE.Clock();
  animationsObjects.push(mesh);

  if (mesh.userData.clock && mesh.userData.mixer) {
    // mesh.userData.mixer.update(mesh.userData.clock.getDelta());
    // console.log("endPosition2", endPosition, startPosition);
    // mesh.scale.set(8, 8, 8);
  }
  console.log("turn", turn);
  // console.log('moved2', mesh.position.set(20,20,20))
  //  mesh.position.set(20,20,20)

  gsap.to(mesh.position, {
    duration: 0.5,
    x: endPosition.x,
    y: endPosition.y,
    z: endPosition.z,
    onUpdate: function () {},
    onComplete: function () {
      // turn character at every corner
      if ((turn + 1) % 25 == 0) {
        mesh.rotateY(-0.9);
      }
      callback();
    },
  });
}
function usePrevious(value) {
  const ref = useRef(-1);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
function AnimationLaser() {
  const [turn, setTurn] = useState(0);

  const context = React.useContext(AppContext);
  const { camera, gridPosition } = context;
  const { cameraType } = camera;
  const ref = useRef<any>();
  let mtlLoader = new MTLLoader();
  //   const t = useLoader(TextureLoader, "assets/models/ver1/gradient_texture.png");
  const t = useLoader(TextureLoader, "assets/textures/m249-gun_Base_Color.png");
  const materialsArmor = useLoader(
    TextureLoader,
    "assets/textures/outfit-m-starwarstaurus-01-v2-footwear-D.jpg"
  );
  const wings = useLoader(
    TextureLoader,
    "assets/textures/vultures wings roughness tex.png"
  );
  const helmet = useLoader(
    TextureLoader,
    "assets/textures/headwear-sw-01-D.png"
  );
  const face = useLoader(TextureLoader, "assets/textures/face_texture.jpg");

  const materials = useLoader(
    MTLLoader,
    "assets/textures/m249-gun_Metallic.png"
  );

  let obj = useLoader(OBJLoader, "assets/animation_laser.obj", (loader) => {
    materials.preload();
    //@ts-ignore
    loader.setMaterials(materials);
  });

  obj.traverse(function (child) {
    //@ts-ignore
    if (child.name == "machine_gun_Sphere.001") {
      // switch the material here - you'll need to take the settings from the
      //original material, or create your own new settings, something like:

      //@ts-ignore
      child.material = new three.MeshLambertMaterial({
        map: t,
        //etc
      });
    }
    if (child.name == "armor_1.001_M_MED_Convoy_Tarantula.md.001") {
      // switch the material here - you'll need to take the settings from the
      //original material, or create your own new settings, something like:

      //@ts-ignore
      child.material = new three.MeshLambertMaterial({
        map: materialsArmor,
        //etc
      });
    }

    if (
      child.name == "Mesh_0093.rip.001_Mesh_0093.rip_mesh0000.001" ||
      child.name == "Mesh_0093.rip.002_Mesh_0093.rip_mesh0000.004"
    ) {
      // switch the material here - you'll need to take the settings from the
      //original material, or create your own new settings, something like:

      //@ts-ignore
      child.material = new three.MeshLambertMaterial({
        map: wings,
        //etc
      });
    }
    if (child.name == "Wolf3D_Headwear_Wolf3D_Headwear.001") {
      // switch the material here - you'll need to take the settings from the
      //original material, or create your own new settings, something like:

      //@ts-ignore
      child.material = new three.MeshLambertMaterial({
        map: helmet,
        //etc
      });
    }
    if (child.name == "Wolf3D_Head.001_Wolf3D_Head.003") {
      // switch the material here - you'll need to take the settings from the
      //original material, or create your own new settings, something like:

      //@ts-ignore
      child.material = new three.MeshLambertMaterial({
        map: face,
        //etc
      });
    }
  });

  const prevTurn = usePrevious(turn);
  const prevGridPosition = usePrevious(gridPosition);
  let plotPrev = {
    x: 0,
    y: 0,
    z: 0,
  };
  if (prevTurn != -1) {
    plotPrev = plotsChar[prevTurn];
  }
  useEffect(() => {
    if (prevGridPosition == gridPosition && turn == prevTurn) {
      return;
    }
    if (turn == 124) {
      setTurn(0);

      return;
    }
    const mesh = ref.current;
    const plot = plotsChar[turn];

    let plotPrev = {
      x: 0,
      y: 0,
      z: 0,
    };
    if (prevTurn != -1) {
      plotPrev = plotsChar[prevTurn];
    }
    // return character to middle user has logged out
    if (gridPosition == -1) {
      setTurn(0);
      createMoveAnimation({
        mesh,
        // startPosition: {x: plot[0],y: plot[1],z: plot[0]},
        // endPosition: [1, 0, 0],
        // startPosition: [plot[0], plot[1], plot[0]],
        startPosition: { x: plot[0], y: plot[1], z: plot[0] },
        endPosition: { x: 0, y: 0, z: 0 },
        turn: turn,
        callback: () => {},
      });
    }
    if (gridPosition > 0) {
      if (turn == gridPosition) {
        return;
      }

      createMoveAnimation({
        mesh,
        // startPosition: {x: plot[0],y: plot[1],z: plot[0]},
        // endPosition: [1, 0, 0],
        // startPosition: [plot[0], plot[1], plot[0]],
        startPosition: { x: plot[0], y: plot[1], z: plot[0] },
        endPosition: plot,
        turn: turn,
        callback: () => {
          setTurn(turn + 1);
        },
      });
    }
  }, [turn, gridPosition]);
  //   obj.load((anim));
  const scale = 1.06;
  const GetCam = () => {
    if (cameraType == "region") {
      return (
        <CameraController
          turn={turn}
          prevLookAt={prevTurn}
          position={plotsChar[turn]}
          prevTurn={plotPrev}
        />
      );
    }
    if (cameraType == "character") {
      return (
        <CameraCharacterController
          turn={turn}
          prevLookAt={prevTurn}
          position={plotsChar[turn]}
          prevTurn={plotPrev}
        />
      );
    }

    return (
      <>
        <CameraGridController
          turn={turn}
          prevLookAt={prevTurn}
          position={plotsChar[turn]}
          prevTurn={plotPrev}
        />
      </>
    );
  };
  return (
    <mesh scale={new Vector3(scale, scale, scale)}>
      <primitive
        object={obj}
        ref={ref}
        rotation={[Math.PI / -2, -0.6, 0]}
        // position={props.position ? props.position : [0, 0, 0]}
      />
      {GetCam()}

      {/* <Controls zoom={zoom} focus={focus} /> */}
    </mesh>
  );
}

export default AnimationLaser;
