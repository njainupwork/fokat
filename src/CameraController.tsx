import * as React from "react";
import { Vector3, PerspectiveCamera } from "three";
import { useSelector } from "react-redux";
import { useThree, useFrame } from "react-three-fiber";
import * as THREE from "three";

import AppContext from "appContext";
function CameraController({ turn, prevLookAt, position, prevTurn }) {
  const context = React.useContext(AppContext);
  console.log("context_0context_", context);

  const ref = React.useRef<PerspectiveCamera | null>(null);
  
  // const { prevLookAt, lookAt, position } = context.camera;

  const prevVectorLookAt = React.useMemo(
    function memo() {
      return new Vector3(prevLookAt.x, prevLookAt.y, -40);
    },
    [prevLookAt.x, prevLookAt.y, prevLookAt.z]
  );

  const vectorLookAt = React.useMemo(
    function memo() {
      return new Vector3(position.x, position.y, -40);
    },
    [position.x, position.y, position.z]
  );

  const vectorPosition = React.useMemo(
    function memo() {
      let x = position.x - 0.3;
      let y = position.y - 0.3;
      console.log("turn_turn", turn);
      if (turn >= 101 && turn <= 124) {
        x = position.x + 6;
        y = position.y - 8;
      }
      if (turn >= 75 && turn <= 100) {
        x = position.x - 5;
        y = position.y - 4;
      }
      if (turn >= 48 && turn <= 74) {
        x = position.x - 5;
        y = position.y + 4;
      }
      if (turn >= 25 && turn <= 48) {
        x = position.x + 3;
        y = position.y + 4;
      }
      if (turn >= 0 && turn <= 24) {
        x = position.x + 5;
        y = position.y - 0.5;
      }
      return new Vector3(position.x, position.y, -20);
    },
    [position.x, position.y, -0]
  );

  const { set } = useThree();

  // Make the camera known to the system
  React.useEffect(
    function effect() {
      if (ref.current !== null) {
        set({ camera: ref.current });
      }
    },
    [set]
  );

  // Update it every frame
  useFrame(function renderCallback() {
    
    if (position.x == prevLookAt.x) {
      // return;
    }
    // return;
    if (ref.current !== null) {
      
      
      var deg = -180;
      var angle = deg * (Math.PI / 180);

      ref.current.lookAt(prevVectorLookAt.lerp(vectorPosition, 0.3));
      ref.current.position.lerp(vectorPosition, 0.3);  
      ref.current.position.z = -25.11;
      
      ref.current.rotation.z = 0;
      ref.current.rotation.x = 0;
      ref.current.rotation.y = angle;
      ref.current.updateMatrixWorld(false);
      ref.current.updateProjectionMatrix();
      
    }
  });
  
  var width = window.innerWidth;
  var height = window.innerHeight;
  console.log("ref.current1", position, vectorLookAt);
  return (
    <perspectiveCamera
      rotation={[Math.PI / -2, -0.9, 0]}
      ref={ref}
      aspect={width/height}
      fov={45}
      far={100000}
      near={13}
      //   far={100}
      // position={[plot.x, plot.y, -10]}
      // position={plot}
    />
  );
}

export default React.memo(CameraController);
