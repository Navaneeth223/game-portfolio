import { useEffect, useState } from 'react'
import { useGameStore } from '../stores/useGameStore'

export const useInput = () => {
    const { joystickInput } = useGameStore()
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        jump: false,
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    setInput((i) => ({ ...i, forward: true }))
                    break
                case 'KeyS':
                case 'ArrowDown':
                    setInput((i) => ({ ...i, backward: true }))
                    break
                case 'KeyA':
                case 'ArrowLeft':
                    setInput((i) => ({ ...i, left: true }))
                    break
                case 'KeyD':
                case 'ArrowRight':
                    setInput((i) => ({ ...i, right: true }))
                    break
                case 'ShiftLeft':
                case 'ShiftRight':
                    setInput((i) => ({ ...i, shift: true }))
                    break
                case 'Space':
                    setInput((i) => ({ ...i, jump: true }))
                    break
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    setInput((i) => ({ ...i, forward: false }))
                    break
                case 'KeyS':
                case 'ArrowDown':
                    setInput((i) => ({ ...i, backward: false }))
                    break
                case 'KeyA':
                case 'ArrowLeft':
                    setInput((i) => ({ ...i, left: false }))
                    break
                case 'KeyD':
                case 'ArrowRight':
                    setInput((i) => ({ ...i, right: false }))
                    break
                case 'ShiftLeft':
                case 'ShiftRight':
                    setInput((i) => ({ ...i, shift: false }))
                    break
                case 'Space':
                    setInput((i) => ({ ...i, jump: false }))
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // Merge Joystick Input
    // Joystick returns Y positive for up, X positive for right
    // Standard WASD: W=Forward (Z-), S=Backward (Z+)

    // Threshold for joystick to avoid drift
    const threshold = 0.1
    const joyForward = joystickInput.y > threshold
    const joyBackward = joystickInput.y < -threshold
    const joyRight = joystickInput.x > threshold
    const joyLeft = joystickInput.x < -threshold

    return {
        forward: input.forward || joyForward,
        backward: input.backward || joyBackward,
        left: input.left || joyLeft,
        right: input.right || joyRight,
        shift: input.shift,
        jump: input.jump
    }
}
