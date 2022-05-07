import * as React from "react";
import { Vector3, PerspectiveCamera } from "three";
import { useSelector } from "react-redux";
import { useThree, useFrame } from "react-three-fiber";
import * as THREE from "three";
import CameraControls from "camera-controls";
import AppContext from "appContext";
import { OrbitControls } from "@react-three/drei";

function CameraGridController({ turn, prevLookAt, position, prevTurn }) {
  const context = React.useContext(AppContext);

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
      return new Vector3(0, 0, -45);
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
  var height = window.innerHeight - 163;
  const aspect = width / height; 
  // return <OrbitControls minPolarAngle={Math.PI /5} maxPolarAngle={Math.PI/2} target={[0,0,0]}  position={vectorPosition}/>
  return (
    <perspectiveCamera
      rotation={[0, 0, 0]}
      // rotation={[Math.PI / 4, -0.9, 0]}
      ref={ref}
      aspect={aspect}
      fov={75}
      far={5000}
      near={1}
      zoom={0.3}
      //   far={100}
      // position={[plot.x, plot.y, -10]}
      // position={plot}
    />
  ); 
}

export default React.memo(CameraGridController);
