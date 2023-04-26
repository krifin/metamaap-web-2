import { useEffect, useRef, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { AdditiveBlending, BufferAttribute, Color, Euler, MeshBasicMaterial, TextureLoader, Vector3 , } from "three"
import { Nucleus } from "./Nucleus"
import { Html } from "@react-three/drei"
import '../pages/Galaxy4.css'

export function Realm({  position, rotation, speed, metaverse }) {

    const particles = useRef()

    const group1 = useRef()
    const [isAnimating, setIsAnimating] = useState(false)
    const [temp] = useState(() => new Vector3())
    const [planets, setPlanets] = useState([])

    // const parameter = useControls({
    //     Camera: folder({
    //         x: { value: 0, min: -10, max: 10, step: 0.1 },
    //         y: { value: 8, min: -10, max: 10, step: 0.1 },
    //         z: { value: 18, min: -10, max: 10, step: 0.1 },
    //         rx: { value: -0.41, min: -10, max: 10, step: 0.1 },
    //         ry: { value: 0, min: -10, max: 10, step: 0.1 },
    //         rz: { value: 0, min: -10, max: 10, step: 0.1 },
    //     }),
    // })

    const parameters = {
        count: 30000,
        size: 0.01,
        radius: 6,
        branches: 8,
        spin: 2.5,
        randomness: 0.3,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984',
    }

    useEffect(() => {
        generateGalaxy()
    }, [])

    useFrame((state, delta) => {
        
        

        // TODO use delta instead
        if (group1.current) {
            group1.current.rotateY(0.005 * speed)
        }
    })

    const generateGalaxy = () => {
        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)
        //const colorInside = new Color(parameters.insideColor)
        //const colorOutside = new Color(parameters.outsideColor)
        const colorInside = new Color(1.0, 0.3765, 0.1882)
        const colorOutside = new Color(0.10588, 0.22353, 0.51765)

        for (let i = 0; i < metaverse.length; i++) {
            const id = metaverse[i];
            const parameters = {
                restRadiusMin: 5,
                restRadiusMax: 7,
                height: 2
            };

            // Get the ID and extract the coordinates
            //   const id = "111-111-111";
            const [x, y, z] = id.split("-").map((n) => parseInt(n));

            // Map the x value to the radius range
            let radius;
            if (x <= 200) {
                radius = ((x - 0) * (3 - 0.5) / (200 - 0)) + 0.5;
            } else if (x <= 500) {
                radius = ((x - 201) * (5 - 3) / (500 - 201)) + 3;
            } else {
                radius = ((x - 501) * (parameters.restRadiusMax - parameters.restRadiusMin) / (999 - 501)) + parameters.restRadiusMin;
            }

            // Calculate the y and z coordinates
            const theta = (y / 999) * 2 * Math.PI;
            const xCoord = radius * Math.cos(theta);
            const yCoord = (z / 999) * parameters.height - (parameters.height / 2);
            const zCoord = radius * Math.sin(theta);


            const position = [xCoord, yCoord, zCoord];

            setPlanets(val => [...val, {
                position: position,
                id: id
            }])
        }

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3

            const radius = Math.random() * parameters.radius
            const spinAngle = radius * parameters.spin
            const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / parameters.radius)

            colors[i3] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
        }
        particles.current.setAttribute('position', new BufferAttribute(positions, 3))
        particles.current.setAttribute('color', new BufferAttribute(colors, 3))
    }
    const nucleusRef = useRef()
    const color = new Color()
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05)

    const texture = useLoader(TextureLoader, '/assets/images/texture_1.jpg')


    return (
        <>
            <group>
                <Nucleus size={.15} position={position} />
                <points position={position} ref={group1} rotation={new Euler().setFromVector3(rotation, 'XYZ')}>
                    {planets.map((planet, index) => {
                        return <Planet key={index} position={planet} size={0.1} texture={texture}/>
                    })}
                    <bufferGeometry ref={particles} />
                    <pointsMaterial size={parameters.size} sizeAttenuation={true} depthWrite={true} vertexColors={true} blending={AdditiveBlending} />
                </points>
            </group>
        </>
    )
}

function Planet({ position, size, texture }) {
    const [hover, setHover] = useState(false)
    // load the texture
    // random color for the glow
    const glowRed = new MeshBasicMaterial({ color: new Color(7, 2 ,1), toneMapped: false })
    return (
        <mesh  onPointerOver={() => setHover(true)} onPointerLeave={() => setHover(false)} onClick={() => {
            // open a new tab in the browser
            window.open(`https://google.com`, '_blank');
        }} position={position.position} scale={[size, size, size]}>
            <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
            <meshBasicMaterial color={glowRed.color} map={texture} toneMapped={false} />
            {hover && <Html distanceFactor={10}>
                <div className="annotation">
                    <div className="annotation-image"></div>
                    <div className="annotation-text">
                        {/* Logo Image */}
                        <div className="annotation-logo" />
                        <div className="annotation-name">Metaverse name</div>
                    </div>
                </div>
            </Html>}
        </mesh>
    )
}


  // Controls for the galaxy

  // const parameters = useControls({
    //   Galaxy: folder({
    //     count: { min: 100, max: 1000000, value: 10000, step: 100 },
    //     size: { min: 0.001, max: 0.1, value: 0.01, step: 0.001 },
    //     radius: { min: 0.01, max: 20, value: 6, step: 0.01 },
    //     branches: { min: 2, max: 20, value: 8, step: 1 },
    //     spin: { min: -5, max: 5, value: 2.5, step: 0.001 },
    //     randomness: { min: 0, max: 2, value: 0.3, step: 0.001 },
    //     randomnessPower: { min: 1, max: 10, value: 3, step: 0.001 },
    //     insideColor: { value: '#ff6030', label: 'Inside Color' },
    //     outsideColor: { value: '#1b3984', label: 'Outside Color' },
    //   }),
    //   Animation: folder({
    //     animate: true,
    //     mouse: false,
    //     //speed: { value: 0.3, min: 0, max: 2, render: (get) => get('animation.animate') },
    //   }),
    //   DoF: folder({
    //     opacity: {
    //       min: 0,
    //       max: 1,
    //       value: 1,
    //       steps: 0.01,
    //     },
    //     focusDistance: {
    //       min: 0,
    //       max: 1.0,
    //       value: 0.05,
    //       steps: 0.001,
    //     },
    //     focalLength: {
    //       min: 0,
    //       max: 0.1,
    //       value: 0.05,
    //       steps: 0.0001,
    //     },
    //     width: {
    //       min: 0,
    //       max: 1280,
    //       value: 480,
    //     },
    //     height: {
    //       min: 0,
    //       max: 1280,
    //       value: 480,
    //     },
    //     focusX: {
    //       min: -1,
    //       max: 1,
    //       value: 0,
    //     },
    //     focusY: {
    //       min: -1,
    //       max: 1,
    //       value: 0,
    //     },
    //     focusZ: {
    //       min: -1,
    //       max: 1,
    //       value: 0,
    //     },
    //   }),
    // })