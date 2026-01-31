import { Text } from '@react-three/drei'

export const LandingZone = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Floor */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <circleGeometry args={[5, 64]} />
                <meshStandardMaterial color="#202020" />
            </mesh>

            {/* Decorative Grid */}
            <gridHelper args={[20, 20, '#404040', '#101010']} position={[0, 0.01, 0]} />

            {/* Hero Text */}
            <group position={[0, 2, 0]}> {/* Moved forward in Z to effectively be centered/visible */}
                <Text
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="bottom"
                    position={[0, 0.2, 0]}
                >
                    NAVANEETH KV
                </Text>
                <Text
                    fontSize={0.4}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="top"
                    position={[0, -0.2, 0]}
                >
                    Full Stack MERN Developer
                </Text>
                <Text
                    fontSize={0.25}
                    color="#aaaaaa"
                    anchorX="center"
                    anchorY="top"
                    position={[0, -0.8, 0]}
                >
                    Press Start / Fly to Explore
                </Text>
            </group>
        </group>
    )
}
