import { useEffect, useRef } from 'react'
import { useGameStore } from '../../stores/useGameStore'

export const AudioManager = () => {
    const { muted, sfxTrigger } = useGameStore()
    const audioContextRef = useRef<AudioContext | null>(null)
    const mainGainRef = useRef<GainNode | null>(null)
    const isInitialized = useRef(false)

    // Initialize Audio Context on user interaction
    useEffect(() => {
        const initAudio = () => {
            if (isInitialized.current) return

            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
            audioContextRef.current = new AudioContextClass()
            mainGainRef.current = audioContextRef.current.createGain()
            mainGainRef.current.connect(audioContextRef.current.destination)
            mainGainRef.current.gain.value = muted ? 0 : 0.4

            isInitialized.current = true
            console.log("Procedural Audio System Online")
        }

        window.addEventListener('mousedown', initAudio)
        window.addEventListener('keydown', initAudio)
        window.addEventListener('touchstart', initAudio)

        return () => {
            window.removeEventListener('mousedown', initAudio)
            window.removeEventListener('keydown', initAudio)
            window.removeEventListener('touchstart', initAudio)
        }
    }, [muted])

    // Ambient Loop (The "Song")
    useEffect(() => {
        let interval: any

        const startLoop = () => {
            if (!audioContextRef.current || muted) return

            let step = 0
            const scale = [220, 246.94, 261.63, 293.66, 329.63, 392, 440] // A Minor

            interval = setInterval(() => {
                const ctx = audioContextRef.current
                if (!ctx || ctx.state === 'suspended' || muted) return

                const osc = ctx.createOscillator()
                const env = ctx.createGain()

                // Random-ish hypnotic sequence
                const freq = scale[Math.floor(Math.random() * scale.length)]
                osc.frequency.setValueAtTime(freq * 0.5, ctx.currentTime)
                osc.type = 'triangle'

                env.gain.setValueAtTime(0, ctx.currentTime)
                env.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1)
                env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)

                osc.connect(env)
                env.connect(mainGainRef.current!)

                osc.start()
                osc.stop(ctx.currentTime + 1.5)

                step++
            }, 1000)
        }

        if (!muted && isInitialized.current) {
            startLoop()
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [muted, isInitialized.current])

    // Mute Toggling
    useEffect(() => {
        if (mainGainRef.current && audioContextRef.current) {
            const ctx = audioContextRef.current
            mainGainRef.current.gain.setTargetAtTime(muted ? 0 : 0.4, ctx.currentTime, 0.1)

            if (!muted && ctx.state === 'suspended') {
                ctx.resume()
            }
        }
    }, [muted])

    // SFX: Coin Collection
    useEffect(() => {
        if (sfxTrigger === 0 || muted || !audioContextRef.current) return

        const ctx = audioContextRef.current
        const osc = ctx.createOscillator()
        const env = ctx.createGain()

        osc.type = 'sine'
        // High pitched "ping"
        osc.frequency.setValueAtTime(880, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.05)

        env.gain.setValueAtTime(0.1, ctx.currentTime)
        env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

        osc.connect(env)
        env.connect(ctx.destination)

        osc.start()
        osc.stop(ctx.currentTime + 0.2)
    }, [sfxTrigger])

    return null
}
