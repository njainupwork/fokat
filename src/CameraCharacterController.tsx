import * as React from "react";
import { Vector3, PerspectiveCamera } from "three";
import { useSelector } from "react-redux";
import { useThree, useFrame } from "react-three-fiber";
import * as THREE from "three";


function CameraCharacterController({ turn, prevLookAt, position, prevTurn }) {
  

  const ref = React.useRef<PerspectiveCamera | null>(null);

  const prevVectorLookAt = React.useMemo(
    function memo() {
      return new Vector3(prevLookAt.x, prevLookAt.y, prevLookAt.z);
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
        x = position.x +6;
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
        x = position.x + 4;
        y = position.y + 4;
      }
      if (turn >= 0 && turn <= 24) {
        x = position.x + 6;
        y = position.y - 1.5;
      }
      return new Vector3(x, y, -1.8);
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
  useFrame(function renderCallback(state) {
    if (position.x == prevLookAt.x) {
      // return;
    }
    // return;
    if (ref.current !== null) {
      console.log("positionpositionposition", position, prevLookAt);
      let n = position;

      // ref.current.lookAt(n);

      ref.current.lookAt(prevVectorLookAt.lerp(vectorPosition, 0.2));
      ref.current.position.lerp(vectorPosition, 0.2);
     
      ref.current.rotation.x = -90;
      ref.current.rotation.y = 1.9;
      ref.current.rotation.z = 0.5;
      if (turn >= 25 && turn <= 48) {
        ref.current.rotation.y = .9;
        ref.current.rotation.z = 0.4;
      }
      if (turn > 48 && turn <= 74) {
        ref.current.rotation.y = -.6;
        ref.current.rotation.z = -0.2;
      }
      if (turn >= 101 && turn <= 124) {
        ref.current.rotation.y = 2.9;
        ref.current.rotation.z = 0.1;

      }
      if (turn >= 75 && turn <= 100) {
        ref.current.rotation.y = -1.9;
        ref.current.rotation.z = -0.4;
      }
      
      // ref.current.rotation.x = 120;
      ref.current.updateMatrixWorld(false);
      ref.current.updateProjectionMatrix();
      // ref.current.updateProjectionMatrix();
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
      fov={75}
      far={100}
      near={0.01}
      //   far={100}
      // position={[0, 0, -10]}
      // position={plot}
    />
  );
}

export default React.memo(CameraCharacterController);
