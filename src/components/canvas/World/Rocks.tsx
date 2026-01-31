import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RockProps {
    initialPosition: [number, number, number]
    scale?: number
    color?: string
}

const Rock = ({ initialPosition, scale = 1, color = "#404040" }: RockProps) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const position = useMemo(() => new THREE.Vector3(...initialPosition), [initialPosition])
    const velocity = useRef(new THREE.Vector3(0, 0, 0))
    const rotationSpeed = useRef(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
    ))

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // 1. Collision/Push logic
        const player = state.scene.getObjectByName("Player")
        if (player) {
            const dist = player.position.distanceTo(meshRef.current.position)
            const pushRadius = 2 * scale

            if (dist < pushRadius) {
                // Direction from player to rock
                const pushDir = new THREE.Vector3()
                pushDir.subVectors(meshRef.current.position, player.position).normalize()

                // Strength of push based on proximity
                const force = (1 - dist / pushRadius) * 5 * delta
                velocity.current.add(pushDir.multiplyScalar(force))

                // Add some chaotic rotation on impact
                rotationSpeed.current.add(new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                ))
            }
        }

        // 2. Apply Physics
        position.add(velocity.current)
        meshRef.current.position.copy(position)

        // 3. Apply Rotation
        meshRef.current.rotation.x += rotationSpeed.current.x
        meshRef.current.rotation.y += rotationSpeed.current.y
        meshRef.current.rotation.z += rotationSpeed.current.z

        // 4. Damping (Friction of space-dust/gravity)
        velocity.current.multiplyScalar(0.98)
        rotationSpeed.current.multiplyScalar(0.99)

        // 5. Hard boundary (optional: keep rocks from drifting too far)
        if (position.length() > 200) {
            position.set(initialPosition[0], initialPosition[1], initialPosition[2])
            velocity.current.set(0, 0, 0)
        }
    })

    return (
        <mesh ref={meshRef} position={initialPosition} scale={scale} castShadow receiveShadow>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color={color}
                roughness={0.9}
                metalness={0.1}
            />
        </mesh>
    )
}

export const Rocks = () => {
    const rocks = useMemo(() => [
        { pos: [10, 2, 10], scale: 2 },
        { pos: [-15, 5, 5], scale: 3 },
        { pos: [5, 3, -15], scale: 1.5 },
        { pos: [-10, 8, -25], scale: 4 },
        { pos: [20, 4, 0], scale: 2.5 },
        { pos: [-5, 6, 15], scale: 1.2 },
        { pos: [12, 5, -10], scale: 3.5 },
        { pos: [-25, 4, -10], scale: 2 },
        { pos: [0, 10, -30], scale: 5 },
        { pos: [30, 15, -20], scale: 3 },
        { pos: [-30, 12, 20], scale: 4 },
        { pos: [15, 20, 10], scale: 2.5 },
    ], [])

    return (
        <group>
            {rocks.map((rock, i) => (
                <Rock key={i} initialPosition={rock.pos as any} scale={rock.scale} />
            ))}
        </group>
    )
}
