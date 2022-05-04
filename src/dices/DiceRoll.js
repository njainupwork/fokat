/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { Vector3 } from 'three';

export default function DiceRoll1({ ...props }) {
  const group = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = { idle: mixer.clipAction(animations[0], group.current) }
    actions.current.idle.play()
    actions.current.idle.setLoop(THREE.LoopOnce);
    actions.current.idle.clampWhenFinished = true;
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [props.rand])

  const { nodes, materials, animations } = useGLTF(`assets/dices/DiceRoll${props.number}.gltf`)
  console.log('materials', materials)
  const { actions } = useAnimations(animations, group)
  const scale = .2;
  return (
    <group ref={group} {...props} dispose={null} scale={new Vector3(scale, scale, scale)}>
      <group>
        <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials['Material']} position={[-7.8, 1.26, 9.26]} rotation={[0.79, 0.19, -0.94]} />
      </group>
    </group>
  )
}

useGLTF.preload('assets/dices/DiceRoll1.gltf')
useGLTF.preload('assets/dices/DiceRoll2.gltf')
useGLTF.preload('assets/dices/DiceRoll3.gltf')
useGLTF.preload('assets/dices/DiceRoll4.gltf')
useGLTF.preload('assets/dices/DiceRoll5.gltf')
useGLTF.preload('assets/dices/DiceRoll6.gltf')
