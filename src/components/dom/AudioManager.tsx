import { useEffect, useRef } from 'react'
import { useGameStore } from '../../stores/useGameStore'

export const AudioManager = () => {
    const { muted, sfxTrigger } = useGameStore()
    const audioContextRef = useRef<AudioContext | null>(null)
    const mainGainRef = useRef<GainNode | null>(null)
    const isInitialized = useRef(false)

    // Tone Frequencies (A Minor Pentatonic)
    const scale = [220, 261.63, 293.66, 329.63, 392, 440, 523.25]
    const chordProgression = [
        [110, 164.81, 220], // Am
        [87.31, 130.81, 174.61], // F
        [130.81, 164.81, 196], // C
        [98, 146.83, 196] // G
    ]

    useEffect(() => {
        const initAudio = () => {
            if (isInitialized.current) return
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
            audioContextRef.current = new AudioContextClass()
            mainGainRef.current = audioContextRef.current.createGain()
            mainGainRef.current.connect(audioContextRef.current.destination)
            mainGainRef.current.gain.value = muted ? 0 : 0.4
            isInitialized.current = true
        }
        window.addEventListener('mousedown', initAudio)
        window.addEventListener('keydown', initAudio)
        return () => {
            window.removeEventListener('mousedown', initAudio)
            window.removeEventListener('keydown', initAudio)
        }
    }, [muted])

    useEffect(() => {
        let interval: any
        const startCinematicLoop = () => {
            if (!audioContextRef.current || muted) return
            let step = 0

            interval = setInterval(() => {
                const ctx = audioContextRef.current
                if (!ctx || ctx.state === 'suspended' || muted) return
                const now = ctx.currentTime
                const chord = chordProgression[Math.floor((step / 4)) % chordProgression.length]

                // 1. Lush Chord Pad
                if (step % 8 === 0) {
                    chord.forEach((freq) => {
                        const osc = ctx.createOscillator()
                        const env = ctx.createGain()
                        osc.type = 'sine'
                        osc.frequency.setValueAtTime(freq, now)
                        env.gain.setValueAtTime(0, now)
                        env.gain.linearRampToValueAtTime(0.04, now + 2)
                        env.gain.linearRampToValueAtTime(0, now + 8)
                        osc.connect(env)
                        env.connect(mainGainRef.current!)
                        osc.start(now)
                        osc.stop(now + 8)
                    })
                }

                // 2. Deep Sub Bass
                if (step % 8 === 0) {
                    const bass = ctx.createOscillator()
                    const bassEnv = ctx.createGain()
                    bass.type = 'triangle'
                    bass.frequency.setValueAtTime(chord[0] * 0.5, now)
                    bassEnv.gain.setValueAtTime(0, now)
                    bassEnv.gain.linearRampToValueAtTime(0.06, now + 1)
                    bassEnv.gain.linearRampToValueAtTime(0, now + 8)
                    bass.connect(bassEnv)
                    bassEnv.connect(mainGainRef.current!)
                    bass.start(now)
                    bass.stop(now + 8)
                }

                // 3. Ethereal Lead Melody
                if (step % 2 === 0) {
                    const lead = ctx.createOscillator()
                    const leadEnv = ctx.createGain()
                    const leadFreq = scale[Math.floor(Math.random() * scale.length)]
                    lead.type = 'sine'
                    lead.frequency.setValueAtTime(leadFreq, now)
                    leadEnv.gain.setValueAtTime(0, now)
                    leadEnv.gain.linearRampToValueAtTime(0.03, now + 0.1)
                    leadEnv.gain.exponentialRampToValueAtTime(0.001, now + 2)
                    lead.connect(leadEnv)
                    leadEnv.connect(mainGainRef.current!)
                    lead.start(now)
                    lead.stop(now + 2)
                }

                step++
            }, 1000)
        }

        if (!muted && isInitialized.current) startCinematicLoop()
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [muted, isInitialized.current])

    useEffect(() => {
        if (mainGainRef.current && audioContextRef.current) {
            mainGainRef.current.gain.setTargetAtTime(muted ? 0 : 0.4, audioContextRef.current.currentTime, 0.1)
        }
    }, [muted])

    useEffect(() => {
        if (sfxTrigger === 0 || muted || !audioContextRef.current) return
        const ctx = audioContextRef.current
        const osc = ctx.createOscillator()
        const env = ctx.createGain()
        osc.type = 'sine'
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
