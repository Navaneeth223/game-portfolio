import { LandingZone } from './LandingZone'
import { SkillsIsland } from './SkillsIsland'
import { ProjectsGallery } from './ProjectsGallery'
import { Stars } from '@react-three/drei'
import { Coin } from './Coin'
import { Rocks } from './Rocks'

export const World = () => {
    return (
        <group>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <LandingZone />
            <SkillsIsland />
            <ProjectsGallery />

            {/* Coins Trail */}
            <Coin position={[0, 1, -5]} />
            <Coin position={[0, 1, -8]} />
            <Coin position={[0, 1, -11]} />
            <Coin position={[-5, 2, -15]} />
            <Coin position={[-10, 3, -18]} />
            <Coin position={[-15, 4, -20]} />
            <Rocks />
        </group>
    )
}
