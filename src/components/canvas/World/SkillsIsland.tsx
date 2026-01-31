import { Text, Float } from '@react-three/drei'

export const SkillsIsland = () => {
    return (
        <group position={[-20, 5, -20]}>
            {/* Main Platform */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <cylinderGeometry args={[10, 6, 2, 8]} />
                <meshStandardMaterial color="#303030" metalness={0.8} roughness={0.2} />
            </mesh>

            <Text
                position={[0, 5.5, 0]}
                fontSize={1.5}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
            >
                TECH ARSENAL
            </Text>

            {/* Frontend Cluster */}
            <group position={[-4, 1.5, 2]}>
                <Text position={[0, 2.5, 0]} fontSize={0.5} color="#61dafb">Frontend</Text>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group>
                        <mesh castShadow>
                            <icosahedronGeometry args={[0.8]} />
                            <meshStandardMaterial color="#61dafb" wireframe />
                        </mesh>
                        <Text position={[0, -1.2, 0]} fontSize={0.3} color="white">React & Three.js</Text>
                    </group>
                </Float>
            </group>

            {/* Backend Cluster */}
            <group position={[4, 2, 2]}>
                <Text position={[0, 2.5, 0]} fontSize={0.5} color="#4caf50">Backend</Text>
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group>
                        <mesh castShadow>
                            <dodecahedronGeometry args={[0.8]} />
                            <meshStandardMaterial color="#4caf50" wireframe />
                        </mesh>
                        <Text position={[0, -1.2, 0]} fontSize={0.3} color="white">Node/Express/Mongo</Text>
                    </group>
                </Float>
            </group>

            {/* Mobile/Game Cluster */}
            <group position={[0, 3, -4]}>
                <Text position={[0, 2.5, 0]} fontSize={0.5} color="#ff9800">Mobile & Game</Text>
                <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group>
                        <mesh castShadow>
                            <octahedronGeometry args={[0.8]} />
                            <meshStandardMaterial color="#ff9800" wireframe />
                        </mesh>
                        <Text position={[0, -1.2, 0]} fontSize={0.3} color="white">Flutter & Unity</Text>
                    </group>
                </Float>
            </group>
        </group>
    )
}
