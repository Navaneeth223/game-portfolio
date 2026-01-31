import { Html, Text } from '@react-three/drei'
import { useState } from 'react'

interface ProjectBillboardProps {
    position: [number, number, number]
    projects: {
        title: string
        subtitle: string
        image: string
        link?: string
    }[]
}

export const ProjectBillboard = ({ position, projects }: ProjectBillboardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Safety check for empty projects
    if (!projects || projects.length === 0) return null

    const currentProject = projects[currentIndex]

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }

    return (
        <group position={position}>
            {/* Billboard Structure */}
            <mesh position={[0, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[10, 6, 0.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Screen Area (Image) */}
            {/* We use an Html overlay for the image for better quality/scrolling UI or a Texture on a plane. 
                 The user asked for interactive scroll and "Action". 
                 Let's stick to texture on plane for "in-world" feel, but since useTexture needs to be hooked, 
                 let's use HTML for the interface part to allow clicking. 
             */}

            {/* Actually, user wants "Billboard type thing... I can scroll... Camera angle will change".
                 For now, let's implement the structure.
             */}

            <mesh position={[0, 4, 0.3]}>
                <planeGeometry args={[9, 5]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* HTML Overlay for Image + Controls */}
            <Html transform position={[0, 4, 0.31]} distanceFactor={3}>
                <div className="w-[800px] h-[500px] bg-black relative flex flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                    <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 text-white">
                        <h2 className="text-5xl font-bold mb-2 text-cyan-400">{currentProject.title}</h2>
                        <p className="text-2xl text-gray-300">{currentProject.subtitle}</p>

                        {currentProject.link && (
                            <a
                                href={currentProject.link}
                                target="_blank"
                                className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded transition-colors pointer-events-auto"
                            >
                                VIEW PROJECT
                            </a>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/20 text-white text-4xl p-4 rounded-full transition-colors pointer-events-auto"
                    >
                        ❮
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/20 text-white text-4xl p-4 rounded-full transition-colors pointer-events-auto"
                    >
                        ❯
                    </button>

                    <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-sm font-mono">
                        {currentIndex + 1} / {projects.length}
                    </div>
                </div>
            </Html>

            <Text
                position={[0, 7.5, 0]}
                fontSize={0.8}
                color="#00ffff"
                anchorX="center"
                anchorY="bottom"
            >
                PROJECT ARCHIVE
            </Text>
        </group>
    )
}
