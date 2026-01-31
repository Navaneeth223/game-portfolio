import { create } from 'zustand'

interface GameState {
    currentPhase: 'intro' | 'playing' | 'focused'
    setPhase: (phase: 'intro' | 'playing' | 'focused') => void
    joystickInput: { x: number, y: number }
    setJoystickInput: (x: number, y: number) => void
    muted: boolean
    setMuted: (muted: boolean) => void
    score: number
    addCoin: () => void
    sfxTrigger: number
    triggerSfx: () => void
    mobileJump: boolean
    setMobileJump: (jump: boolean) => void
}

export const useGameStore = create<GameState>((set) => ({
    currentPhase: 'intro',
    setPhase: (phase) => set({ currentPhase: phase }),
    joystickInput: { x: 0, y: 0 },
    setJoystickInput: (x, y) => set({ joystickInput: { x, y } }),
    muted: false,
    setMuted: (muted) => set({ muted }),
    score: 0,
    addCoin: () => set((state) => ({ score: state.score + 1, sfxTrigger: state.sfxTrigger + 1 })),
    sfxTrigger: 0,
    triggerSfx: () => set((state) => ({ sfxTrigger: state.sfxTrigger + 1 })),
    mobileJump: false,
    setMobileJump: (mobileJump) => set({ mobileJump })
}))
