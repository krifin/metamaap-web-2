import { Vector3 } from 'three'
import React, { Suspense, useContext, useEffect, useRef, useState, } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Universe } from '../components/Universe'
import { Realm } from '../components/Realm'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Effects, OrbitControls } from '@react-three/drei'
import { AppContext } from '../AppContext'


extend({ UnrealBloomPass })




export default function Galaxy4() {
  const [metaverses] = useContext(AppContext);

  return (
    <>
      <Canvas color='#000' linear flat colorManagement={false} style={{ height: `${window.innerHeight}px` }} camera={{ position: [0, 4, 6], rotation: [-1, 0, 0] }}>
        <color attach="background" args={['#111']} />
        <Effects disableGamma>
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}
          <unrealBloomPass threshold={1} strength={1.5} radius={0.1} />
        </Effects>
        <OrbitControls enableZoom={false} enableRotate enablePan={false} />

        {/* <color attach="background" args={['#111']} /> */}
        {/* <ambientLight color={'hotpink'}/> */}
        {/* <pointLight position={[0, 0, 0]} color={'hotpink'}/> */}

        {/* <Effects disableGamma> */}
        {/* threshhold has to be 1, so nothing at all gets bloom by default */}
        {/* <unrealBloomPass threshold={1} strength={1} radius={0} /> */}
        {/* </Effects> */}
        <Universe />
        {metaverses.length > 0 && <Realm metaverse={
          metaverses
        } position={new Vector3(0, 0, 0)} rotation={new Vector3(0, 0, 0)} speed={.01} />}

      </Canvas>
    </>
  )
}


function Shape({ children, color, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh {...props} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshBasicMaterial color={hovered ? color : 'white'} toneMapped={false} />
    </mesh>
  )
}

