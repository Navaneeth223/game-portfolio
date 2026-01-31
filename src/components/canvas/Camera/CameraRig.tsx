import { useFrame } from '@react-three/fiber'
import { Vector3, Group } from 'three'
import { useGameStore } from '../../../stores/useGameStore'

interface CameraRigProps {
    playerRef: React.RefObject<Group | null>
}

export const CameraRig = ({ playerRef }: CameraRigProps) => {
    const { currentPhase } = useGameStore()

    useFrame((state, delta) => {
        if (!playerRef.current) return

        const playerPos = playerRef.current.position

        // Defined offsets for different phases
        // Intro: High and far
        // Playing: Behind and slightly up
        const introOffset = new Vector3(0, 15, 20)
        const playingOffset = new Vector3(0, 6, 10)

        const targetOffset = currentPhase === 'intro' ? introOffset : playingOffset

        // Calculate target camera position
        // Ideally, we want the offset relative to player rotation?
        // For now, fixed world offset (Top-Down-Is) is easier for navigation
        const targetPos = playerPos.clone().add(targetOffset)

        // Smooth follow
        state.camera.position.lerp(targetPos, delta * 3)
        // Look slightly ahead of player? Or just at player
        state.camera.lookAt(playerPos)
    })

    return null // Camera is manipulated directly via state.camera
}
