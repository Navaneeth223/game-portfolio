import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../../stores/useGameStore'


interface CoinProps {
    position: [number, number, number]
}

export const Coin = ({ position }: CoinProps) => {
    const group = useRef<THREE.Group>(null)
    const [collected, setCollected] = useState(false)
    // In a real app, update score in store

    useFrame((state, delta) => {
        if (!group.current || collected) return
        group.current.rotation.y += delta * 2

        // Simple distance check for collection
        // Assuming player is at roughly the same height or we check XZ distance
        // Access player position from scene or store is expensive if checked every frame here 
        // ideally scene manages collisions.
        // For demo, we leave it visual-only or rely on global player position if available.

        // Robust Player check
        const player = state.scene.getObjectByName("Player")
        if (player) {
            const dist = player.position.distanceTo(group.current.position)
            if (dist < 1.5) {
                setCollected(true)

                // Update score and trigger synthetic sound in AudioManager
                useGameStore.getState().addCoin()
            }
        }
    })

    if (collected) return null

    return (
        <group ref={group} position={position}>
            <Float speed={4} rotationIntensity={2} floatIntensity={1}>
                <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.1, 8, 16]} />
                    <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={0.5} />
                </mesh>
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.2}
                    color="#ffd700"
                    anchorX="center"
                    anchorY="bottom"
                >
                    $
                </Text>
            </Float>
            <pointLight distance={2} intensity={2} color="gold" />
        </group>
    )
}
