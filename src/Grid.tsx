import React, { useEffect, useState } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";

import { useDispatch, useSelector } from "react-redux";
import { State } from "state/types";
import { DiceManager, DiceD6 } from "threejs-dice/lib/dice";
import AppContext from "appContext";
import Sky from "Sky";
import DiceRoll from "dices/DiceRoll";
import styled from "styled-components";
import Plane from "grids/Plan";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Scene = (props) => {
  const ref = useRef();
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(2);
  const context = React.useContext(AppContext);
  const { dice } = context;
  const { rolls } = dice;

  //set rand because I realised if the dice rolls and has same as old value it does not animate
  const [rand, setRand] = useState(Math.random() * 100);
  useEffect(() => {
    setDice1(rolls.roll1);
    setDice2(rolls.roll2);
    setRand(Math.random());
  }, [rolls.roll1, rolls.roll2]);
  return (
    <mesh>
      <group ref={ref}>
        {/* <Cube/> */}
        {/* <gridHelper args={[50, 50]} /> */}
        {/* <axesHelper /> */}
        {/* <Person/> */}

        <Sky />
        <pointLight intensity={10} position={[0, 2, 3]} distance={10} />
        <pointLight intensity={10} position={[0, 2, 1]} distance={10} />
        <Plane dispatch={props.dispatch} />
        {/* <LazerPerson/> */}
        <DiceRoll dice={1} number={dice1} position={[0, 0, 0.5]} rand={rand} />
        <DiceRoll dice={1} number={dice2} position={[0, 0, -0.5]} rand={rand} />
        {/* <DiceRoll1_1 dice={2} position={[0, 0, 2]} /> */}
        {/* <DiceRoll dice={2} position={[0, -0, 0]} /> */}
        {/* <Dice2 /> */}
      </group>
    </mesh>
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
  return state.game;
}
const Grid: React.FC = () => {
  const sel = useSelector(selector);
  let ref = useRef<any>();
  const dispatch = useDispatch();
  return (
    <div
      style={{
        height: "100%",
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
        {/* <Stats /> */}
        <OrbitControls />
        <ambientLight />
        <pointLight position={[0, 3, 0]} />
      </Canvas>
    </div>
  );
};

export default Grid;
