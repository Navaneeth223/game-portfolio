import { Text, Float, Center } from '@react-three/drei'

export const ContactSummit = () => {
    return (
        <group position={[0, 15, -50]}>
            {/* The Summit Base */}
            <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[10, 32]} />
                <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
            </mesh>
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Center top position={[0, 0, 0]}>
                    <Text fontSize={2} color="white" anchorX="center" anchorY="middle">
                        LET'S CONNECT
                    </Text>
                </Center>
            </Float>

            <group position={[0, -1, 4]}>
                <Text fontSize={0.5} color="#00ffff" position={[0, 1.5, 0]} anchorX="center">
                    navaneethkv@example.com
                </Text>
                <Text fontSize={0.4} color="#aaaaaa" position={[0, 0.5, 0]} anchorX="center">
                    Available for New Opportunities
                </Text>
                
                {/* Social Links as 3D Text */}
                <group position={[0, -1, 0]}>
                    <Text fontSize={0.3} color="white" position={[-2, 0, 0]}>GitHub</Text>
                    <Text fontSize={0.3} color="white" position={[0, 0, 0]}>LinkedIn</Text>
                    <Text fontSize={0.3} color="white" position={[2, 0, 0]}>Twitter</Text>
                </group>
            </group>
            
            {/* Ambient Upward Beam */}
            <mesh position={[0, 10, 0]} >
                <cylinderGeometry args={[0.5, 2, 30]} />
                <meshStandardMaterial color="#00ffff" transparent opacity={0.1} />
            </mesh>
        </group>
    )
}
