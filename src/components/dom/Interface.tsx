import { MobileJoystick } from './MobileJoystick'
import { useGameStore } from '../../stores/useGameStore'

export const Interface = () => {
    const { setJoystickInput, setMobileJump, mobileJump } = useGameStore()

    return (
        <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-10 z-10 text-white font-mono">
            {/* Mobile Movement Controls - Bottom Left */}
            <div className="flex justify-between items-end pointer-events-none mb-4 md:hidden">
                <div className="pointer-events-auto flex items-end gap-4">
                    <MobileJoystick
                        onMove={(x, y) => setJoystickInput(x, y)}
                        onStop={() => setJoystickInput(0, 0)}
                    />

                    {/* NEW: Mobile Fly Button */}
                    <button
                        onTouchStart={() => setMobileJump(true)}
                        onTouchEnd={() => setMobileJump(false)}
                        className={`flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all active:scale-95 ${mobileJump ? 'bg-cyan-500/60 border-cyan-400' : 'bg-black/40 border-white/20'
                            } backdrop-blur-md pointer-events-auto`}
                    >
                        <span className="text-xs font-bold uppercase">Fly</span>
                    </button>
                </div>
            </div>

            {/* Header - Repositioned/Compacted for Mobile */}
            <div className="absolute top-4 left-4 right-4 md:static flex justify-between items-start pointer-events-none">
                <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
                    <div className="backdrop-blur-md bg-black/40 p-3 md:p-4 rounded-lg border border-white/10">
                        <h1 className="text-lg md:text-3xl font-bold uppercase tracking-wider leading-none">
                            Navaneeth <span className="text-cyan-400">KV</span>
                        </h1>
                        <p className="text-[10px] md:text-xs text-gray-300 tracking-widest mt-1 opacity-80 uppercase">MERN Developer</p>
                    </div>

                    <div className="backdrop-blur-md bg-black/40 px-3 py-1 md:px-4 md:py-2 rounded-lg border border-white/10 flex md:flex-col items-center md:items-start justify-between">
                        <p className="text-[10px] md:text-[9px] opacity-70 uppercase md:mb-1">Fragments</p>
                        <p className="text-sm md:text-xl font-bold text-yellow-400 ml-2 md:ml-0 leading-none">
                            {useGameStore((state) => state.score)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 pointer-events-auto items-end">
                    {/* Archive Button - Desktop Only */}
                    <button
                        onClick={() => {
                            const nextPhase = useGameStore.getState().currentPhase === 'focused' ? 'playing' : 'focused'
                            useGameStore.getState().setPhase(nextPhase)
                        }}
                        className={`hidden md:block backdrop-blur-md p-2 rounded-lg border transition-colors text-center text-sm ${useGameStore((state) => state.currentPhase) === 'focused'
                                ? "bg-cyan-500/40 border-cyan-400"
                                : "bg-black/40 border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {useGameStore((state) => state.currentPhase === 'focused' ? "BACK TO DRONE" : "PROJECT ARCHIVE")}
                    </button>

                    <div className="flex gap-2">
                        <a href="https://github.com/Navaneeth223" target="_blank" className="backdrop-blur-md bg-black/40 hover:bg-white/10 p-2 rounded-lg border border-white/10 transition-colors text-center text-[10px] md:text-xs px-3 uppercase">
                            GitHub
                        </a>
                        <button
                            onClick={() => useGameStore.setState((state) => ({ muted: !state.muted }))}
                            className="backdrop-blur-md bg-black/40 hover:bg-white/10 p-2 rounded-lg border border-white/10 transition-colors text-center text-[10px] md:text-xs px-3 uppercase"
                        >
                            {useGameStore((state) => state.muted ? "Unmute" : "Mute")}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Controls Info */}
            <div className="hidden md:flex justify-between items-end">
                <div className="backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/10">
                    <p className="text-[10px] opacity-70 mb-2 uppercase">System Status</p>
                    <div className="flex gap-4 text-xs font-bold">
                        <div><span className="text-green-400 mr-2">●</span>ONLINE</div>
                        <div><span className="text-yellow-400 mr-2">●</span>V1.1.0</div>
                    </div>
                </div>

                <div className="text-center backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/10">
                    <p className="text-[10px] opacity-70 mb-2 uppercase">Controls</p>
                    <div className="flex gap-3 justify-center text-xs font-bold">
                        <span className="border border-white/20 px-2 py-1 rounded">W</span>
                        <span className="border border-white/20 px-2 py-1 rounded">A</span>
                        <span className="border border-white/20 px-2 py-1 rounded">S</span>
                        <span className="border border-white/20 px-2 py-1 rounded">D</span>
                        <span className="border border-white/20 px-2 py-1 rounded ml-2">SPACE</span>
                    </div>
                    <div className="mt-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Move & Ascend</div>
                </div>
            </div>
        </div>
    )
}
