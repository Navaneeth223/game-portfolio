import { ProjectBillboard } from './ProjectBillboard'

export const ProjectsGallery = () => {
    const projects = [
        {
            title: "Premium Chocolate",
            subtitle: "React • Responsive • Brand UI",
            image: "/projects/project1.png",
            link: "https://premium-chocolate.vercel.app/"
        },
        {
            title: "Digital Frontier",
            subtitle: "PixiJS • GSAP • Gaming Hub",
            image: "/projects/project2.png",
            link: "https://2-d-game-single-site.vercel.app/"
        },
        {
            title: "Net Shop",
            subtitle: "MERN Stack • E-commerce",
            image: "/projects/project3.png",
            // link?: "..." // Add if available
        },
        {
            title: "AI Wallpaper Gen",
            subtitle: "MERN • AI Integration",
            image: "/projects/project5.png",
            // link?: "..."
        }
    ]

    return (
        <group position={[20, 0, -20]}>
            {/* Platform */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <rectAreaLight width={20} height={10} intensity={5} color="blue" rotation={[-Math.PI / 2, 0, 0]} />
                <boxGeometry args={[25, 20, 0.2]} />
                <meshStandardMaterial color="#101010" />
            </mesh>

            {/* The Giant Billboard */}
            <ProjectBillboard position={[0, 2, 0]} projects={projects} />
        </group>
    )
}
