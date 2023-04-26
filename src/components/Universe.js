import { PointMaterial, Points } from "@react-three/drei"
import { random } from "maath"
import { useRef, useState } from "react"
import { useFrame } from "react-three-fiber"

export function Universe(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 100 }))
    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    })
  
    
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#fff" size={0.05} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  }
  