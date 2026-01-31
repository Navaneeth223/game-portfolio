import { useFrame } from '@react-three/fiber'
import { forwardRef } from 'react'
import { Group, Vector3 } from 'three'
import { useInput } from '../../../hooks/useInput'
import { useGameStore } from '../../../stores/useGameStore'

export const Player = forwardRef<Group>((props, ref) => {
    const { forward, backward, left, right, jump } = useInput()
    const { joystickInput, mobileJump } = useGameStore()

    useFrame((state, delta) => {
        const group = (ref as React.MutableRefObject<Group>).current
        if (!group) return

        const speed = 10 * delta

        // Threshold for joystick to avoid drift
        const joyX = Math.abs(joystickInput.x) > 0.15 ? joystickInput.x : 0
        const joyY = Math.abs(joystickInput.y) > 0.15 ? joystickInput.y : 0

        // Camera-Relative Movement Logic
        const frontVector = new Vector3(0, 0, 0)
        const sideVector = new Vector3(0, 0, 0)
        const direction = new Vector3(0, 0, 0)

        // Calculate Input Vectors (Keyboard || Joystick)
        const moveForward = forward || joyY > 0
        const moveBackward = backward || joyY < 0
        const moveLeft = left || joyX < 0
        const moveRight = right || joyX > 0

        frontVector.set(0, 0, Number(moveBackward) - Number(moveForward))
        sideVector.set(Number(moveLeft) - Number(moveRight), 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed)

        const camera = state.camera

        // Apply camera rotation for movement direction
        direction.applyEuler(camera.rotation)

        // Apply movement
        group.position.add(direction)

        // Fly Logic: Use either keyboard jump or mobile button
        const isJumping = jump || mobileJump

        if (isJumping) group.position.y += speed
        // Simple gravity/return to zero
        if (!isJumping && group.position.y > 1) group.position.y -= speed * 0.5
        if (group.position.y < 1) group.position.y = 1

        // Visual Tilt & Rotation
        group.rotation.x = (Number(moveForward) - Number(moveBackward)) * 0.3
        group.rotation.z = (Number(moveLeft) - Number(moveRight)) * 0.3
        group.rotation.y = camera.rotation.y
    })

    return (
        <group ref={ref} position={[0, 1, 0]} name="Player" {...props}>
            <mesh castShadow>
                <octahedronGeometry args={[0.5]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} wireframe />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
            </mesh>
            <pointLight distance={3} intensity={5} color="#00ffff" />
        </group>
    )
})
