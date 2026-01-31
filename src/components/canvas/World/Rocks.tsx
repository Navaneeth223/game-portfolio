interface RockProps {
    position: [number, number, number]
    scale?: number
    color?: string
}

const Rock = ({ position, scale = 1, color = "#404040" }: RockProps) => {
    return (
        <mesh position={position} scale={scale} castShadow receiveShadow>
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
    const rocks = [
        { pos: [10, 0, 10], scale: 2 },
        { pos: [-15, 0, 5], scale: 3 },
        { pos: [5, 0, -15], scale: 1.5 },
        { pos: [-10, 0, -25], scale: 4 },
        { pos: [20, 0, 0], scale: 2.5 },
        { pos: [-5, 0, 15], scale: 1.2 },
        { pos: [12, 0, -10], scale: 3.5 },
        { pos: [-25, 0, -10], scale: 2 },
        { pos: [0, 0, -30], scale: 5 },
    ]

    return (
        <group>
            {rocks.map((rock, i) => (
                <Rock key={i} position={rock.pos as any} scale={rock.scale} />
            ))}
        </group>
    )
}
