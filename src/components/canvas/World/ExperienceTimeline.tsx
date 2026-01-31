import { Text } from '@react-three/drei'

const TimelineNode = ({ position, title, year, description }: { position: [number, number, number], title: string, year: string, description: string }) => {
    return (
        <group position={position}>
            {/* Node Visual */}
            <mesh castShadow>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>

            {/* Floating Info */}
            <group position={[0, 1, 0]}>
                <Text fontSize={0.3} color="white" anchorX="left" position={[0.5, 0.2, 0]}>
                    {year}
                </Text>
                <Text fontSize={0.4} color="#00ffff" anchorX="left" position={[0.5, -0.2, 0]}>
                    {title}
                </Text>
                <Text fontSize={0.2} color="#aaaaaa" anchorX="left" maxWidth={3} position={[0.5, -0.6, 0]}>
                    {description}
                </Text>
            </group>

            {/* Connecting Beam (handled by parent usually, but simple one here) */}
        </group>
    )
}

export const ExperienceTimeline = () => {
    const experiences = [
        {
            pos: [-20, 0, -10],
            year: "2023 - Present",
            title: "Full Stack Developer",
            description: "Building scalable web applications using the MERN stack with a focus on performance and interactive UI."
        },
        {
            pos: [-25, 2, -5],
            year: "2022 - 2023",
            title: "Frontend Engineer",
            description: "Developed responsive React interfaces and integrated complex state management solutions."
        },
        {
            pos: [-30, 4, 0],
            year: "2021",
            title: "Web Development Intern",
            description: "Assisted in the development of client-side features and improved codebase maintainability."
        }
    ]

    return (
        <group>
            {/* Legend / Title */}
            <Text position={[-15, 5, -10]} fontSize={1} color="white" rotation={[0, Math.PI / 4, 0]}>
                PROFESSIONAL JOURNEY
            </Text>

            {experiences.map((exp, i) => (
                <TimelineNode key={i} position={exp.pos as any} title={exp.title} year={exp.year} description={exp.description} />
            ))}

            {/* Connecting Line Beam */}
            <mesh rotation={[0, 0, Math.PI / 6]} position={[-25, 2, -5]}>
                <cylinderGeometry args={[0.02, 0.02, 15]} />
                <meshStandardMaterial color="#00ffff" transparent opacity={0.3} />
            </mesh>
        </group>
    )
}
