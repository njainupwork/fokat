import Osaka_p1 from "./Osaka/Osaka_p1";
import Osaka_p2 from "./Osaka/Osaka_p2";
import Osaka_p3 from "./Osaka/Osaka_p3";
import Osaka_p4 from "./Osaka/Osaka_p4";
import Osaka_p5 from "./Osaka/Osaka_p5";

import Beijing1 from "./Beijing/Beijing1";
import Beijing2 from "./Beijing/Beijing2";
import Beijing3 from "./Beijing/Beijing3";
import Beijing4 from "./Beijing/Beijing4";
import Beijing5 from "./Beijing/Beijing5";

import Stars from "./Stars";
import Item from "grids/Item";
import plots from "plots";
import { DoubleSide } from "three";
import AnimationLaser from "./../AnimationLaser";
import { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const OsakaComponents = {
  Osaka_p1: Osaka_p1,
  Osaka_p2: Osaka_p2,
  Osaka_p3: Osaka_p3,
  Osaka_p4: Osaka_p4,
  Osaka_p5: Osaka_p5,

  Beijing1: Beijing1,
  Beijing2: Beijing2,
  Beijing3: Beijing3,
  Beijing4: Beijing4,
  Beijing5: Beijing5,
};
export default function Plane(props) {
 let geomRef = useRef<any>();
  const dispatch = props.dispatch;
  const background = useLoader(
    TextureLoader,
    "assets/grid/Scifi_Hex_Wall_specular.jpg"
  );
  const mouseOver = (event, k) => {
    console.log("mouseOver", event, k);
    dispatch({
      type: "mouseOver",
      hover: parseInt(k),
    });
  };
  const mouseOut = (event, k) => {
    console.log("mouseOverOut", event, k);
    dispatch({
      type: "mouseOverOut",
      hover: -1,
    });
  };
  var deg = 0;
  var angle = deg * (Math.PI / 180);

  return (
    // The mesh is at the origin
    // Since it is inside a group, it is at the origin
    // Since it is inside a group, it is at the origin
    // of that group
    // It's rotated by 90 degrees along the X-axis
    // This is because, by default, planes are rendered
    // in the X-Y plane, where Y is the up direction

    <mesh
      position={[0, 0.01, 0]}
      scale={[0.1, 0.1, 0.1]}
      rotation={[Math.PI / 2, 0, angle]}
    >
      {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
      <Stars />
      
      {plots.map((plot, k) => {
        if (plot.hasOwnProperty('component')) {
          const Osaka = OsakaComponents[plot["component"]];
          return (
            <Osaka
              position={[plot["x"], plot["y"], 0]}
              key={k}
              rotation={[Math.PI / -2, 0, 0]}
              onPointerOver={(event) => {
                mouseOver(event, k);
              }}
            />
          );
        }

        return (
          <Item
            position={[plot["x"], plot["y"], 0]}
            key={k}
            rotation={[Math.PI / -2, 0, 0]}
            onPointerOver={(event) => {
              mouseOver(event, k);
            }}
            onPointerOut={(event) => {
              mouseOut(event, k);
            }}
          />
        );
      })}
      <AnimationLaser />
      {/* <CameraController/> */}
      {/*
        The material gives a mesh its texture or look.
        In this case, it is just a uniform green
      */}
      {/* <circleBufferGeometry args={[51, 5]} attach="geometry" /> */}
      <circleBufferGeometry args={[51, 5]} attach="geometry" />
      <meshBasicMaterial side={DoubleSide} opacity={0.5} wireframe={false} map={background}/>
    </mesh>
  );
}
