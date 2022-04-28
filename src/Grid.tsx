import React, { useEffect, useState } from "react";
import { Stats } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import { Html, useProgress } from "@react-three/drei";
import { DoubleSide } from "three";

import { useDispatch, useSelector } from "react-redux";
import { State } from "state/types";
import { DiceManager, DiceD6 } from "threejs-dice/lib/dice";
import Item from "Item";
import plots from "plots";
import AnimationLaser from "AnimationLaser";
import AppContext from "appContext";
import Sky from "Sky";
import DiceRoll from "dices/DiceRoll";
import styled from "styled-components";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Div() {
  return (
    <div className="reward-box">
      <h3>Reward Box</h3>
    </div>
  );
}
function Plane(props) {
  const dispatch = props.dispatch;
  const mouseOver =(event, k) => {
    console.log("mouseOver", event, k);
    dispatch({
      type: "mouseOver",
      hover: parseInt(k)
    })
  }
  const mouseOut =(event, k) => {
    console.log("mouseOverOut", event, k);
    dispatch({
      type: "mouseOverOut",
      hover: -1
    })
  }
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
      position={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[Math.PI / 2, 0, angle]}
    >
      {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
      <Stars />
      {/* <circleBufferGeometry args={[50, 5]} attach="geometry" ref={geomRef} /> */}
      {plots.map((plot, k) => {
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
      <meshBasicMaterial
        color="white"
        side={DoubleSide}
        opacity={0.5}
        wireframe={false}
      />
    </mesh>
  );
}

function Stars({ count = 5000 }) {
  const positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < count; i++) {
      const r = 4000;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x =
        r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000);
      const y =
        r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000);
      const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000);
      positions.push(x);
      positions.push(y);
      positions.push(z);
    }
    return new Float32Array(positions);
  }, [count]);
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach={"attributes-position"}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={1.5}
        sizeAttenuation
        color="white"
        fog={false}
      />
    </points>
  );
}

const Scene = (props) => {
  const ref = useRef();
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(2);
  const context = React.useContext(AppContext);
  const { dice } = context;
  const { rolls } = dice;

  console.log("rolls_rolls", rolls, context);
  //set rand because I realised if the dice rolls and has same as old value it does not animate
  const [rand, setRand] = useState(Math.random() * 100);
  useEffect(() => {
    setDice1(rolls.roll1);
    setDice2(rolls.roll2);
    setRand(Math.random())
  }, [rolls.roll1, rolls.roll2]);
  return (
    <group ref={ref}>
      {/* <Cube/> */}
      {/* <gridHelper args={[50, 50]} /> */}
      <axesHelper />
      {/* <Person/> */}

      {/* <Sky /> */}
      <pointLight intensity={10} position={[0, 2, 5]} distance={10} />
      <pointLight intensity={10} position={[0, 2, -1]} distance={10} />
      <Plane dispatch={props.dispatch} />
      {/* <LazerPerson/> */}
      <DiceRoll dice={1} number={dice1} position={[0, 0, 2]} rand={rand} />
      <DiceRoll dice={1} number={dice2} position={[0, 0, -1]} rand={rand} />
      {/* <DiceRoll1_1 dice={2} position={[0, 0, 2]} /> */}
      {/* <DiceRoll dice={2} position={[0, -0, 0]} /> */}
      {/* <Dice2 /> */}
    </group>
  );
};

interface SelectorProps {
  camera: any;
  dice: any;
  gridPosition: number;
  hover: number;
  characterSelected: number;
}

function selector(state: State): SelectorProps {
  console.log("state_state", state);
  return state.game;
}
const Grid: React.FC = () => {
  const sel = useSelector(selector);
  let ref = useRef<any>();
  const dispatch = useDispatch();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
      className="grid-wrapper"
    >
      <Canvas ref={ref} camera={{ position: [0, 0, 10], fov: 40, far: 100 }}>
        <AppContext.Provider value={sel}>
          <Suspense fallback={<Loader />}>
            <Scene dispatch={dispatch} />
          </Suspense>
        </AppContext.Provider>
        <Stats />
        {/* <OrbitControls /> */}
        <ambientLight />
        <pointLight position={[0, 3, 0]} />
      </Canvas>
    </div>
  );
};

export default Grid;
