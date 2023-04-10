import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";

function Galaxy() {
  const cameraRef = useRef();
  const sceneRef = useRef();

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    colors[i * 3] = 1;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 5,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
  });

  const points = new THREE.Points(geometry, material);

  useFrame(() => {
    cameraRef.current.position.z -= 1;
    if (cameraRef.current.position.z < -1000) {
      cameraRef.current.position.z = 1000;
    }
  });

  return (
    <group ref={sceneRef}>
      <Points points={points} />
      <Camera cameraRef={cameraRef} />
    </group>
  );
}

function Points(props) {
  return <points>{props.points}</points>;
}

function Camera(props) {
  return (
    <perspectiveCamera ref={props.cameraRef} position={[0, 0, 5]} fov={60} />
  );
}

function Three() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor("#000000");
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Galaxy />
      </Canvas>
    </div>
  );
}

export default Three;
