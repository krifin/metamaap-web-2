import { useRef } from "react"
import { Color } from "three"

export function Nucleus({ size, position }) {
    const nucleusRef = useRef()
    const color = new Color()
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05)
  
    return (
      <mesh ref={nucleusRef} position={position} scale={[size, size, size]}>
        <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
        <meshBasicMaterial attach="material" color={'#fff'} />
      </mesh>
    )
  }
  