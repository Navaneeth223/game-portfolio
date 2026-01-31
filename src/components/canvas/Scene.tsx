import { Environment, OrbitControls } from '@react-three/drei'
import { World } from './World/World'
import { Player } from './Player/Player'

import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'

export const Scene = () => {
    const playerRef = useRef<Group>(null)

    // For OrbitControls to follow player, we need to update its target
    // But CameraRig is also controlling the camera.
    // We should DISABLE CameraRig if the user wants full "Rotate Everything" control via mouse (Orbit),
    // OR make CameraRig looser.
    // User asked "Middle button I can rotate everything". 
    // Standard solution:
    // - CameraRig handles "Follow" logic (positioning camera near player)
    // - OrbitControls handles "Rotation" logic (rotating around the target)
    // BUT OrbitControls usually controls the camera position too.

    // Hybrid Approach:
    // Use OrbitControls. Set its target to player position every frame.

    const orbitRef = useRef<any>(null)

    useFrame(() => {
        if (playerRef.current && orbitRef.current) {
            // Smoothly move orbit target to player
            const { x, y, z } = playerRef.current.position
            orbitRef.current.target.lerp({ x, y: y + 2, z }, 0.1)
            orbitRef.current.update()
        }
    })

    // We Disable CameraRig for now as sticking to OrbitControls gives the user the "Rotate Everything" freedom they wanted.
    // CameraRig was forcing the angle.

    return (
        <>
            <directionalLight
                position={[20, 20, 20]}
                intensity={2}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />
            <ambientLight intensity={0.2} />
            <Environment preset="night" />

            <Player ref={playerRef} />
            {/* <CameraRig playerRef={playerRef} /> */}

            <OrbitControls
                ref={orbitRef}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={20}
            />

            <World />
        </>
    )
}
