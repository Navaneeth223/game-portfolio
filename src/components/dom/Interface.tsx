import { MobileJoystick } from './MobileJoystick'
import { useGameStore } from '../../stores/useGameStore'

export const Interface = () => {
    const { setJoystickInput } = useGameStore()

    return (
        <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-10 z-10 text-white font-mono">
            {/* Mobile Joystick - pointer events auto to allow interaction */}
            <div className="pointer-events-auto">
                <MobileJoystick
                    onMove={(x, y) => setJoystickInput(x, y)}
                    onStop={() => setJoystickInput(0, 0)}
                />
            </div>

            {/* Header */}
            <div className="flex justify-between items-start pointer-events-auto">
                <div className="flex flex-row">
                    <div className="backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/10">
                        <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-wider">
                            Navaneeth <span className="text-cyan-400">KV</span>
                        </h1>
                        <p className="text-xs md:text-sm text-gray-300 tracking-widest mt-1">FULL STACK MERN DEVELOPER</p>
                    </div>

                    <div className="backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/10 ml-4">
                        <p className="text-xs opacity-70 mb-1">DATA FRAGMENTS</p>
                        <p className="text-2xl font-bold text-yellow-400">
                            {useGameStore((state) => state.score)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 pointer-events-auto">
                    <a href="https://github.com/Navaneeth223" target="_blank" className="backdrop-blur-md bg-black/40 hover:bg-white/10 p-2 rounded-lg border border-white/10 transition-colors text-center text-sm">
                        GITHUB
                    </a>
                    <a href="https://linkedin.com/in/navaneeth-kv" target="_blank" className="backdrop-blur-md bg-black/40 hover:bg-white/10 p-2 rounded-lg border border-white/10 transition-colors text-center text-sm">
                        LINKEDIN
                    </a>
                    <button
                        onClick={() => useGameStore.setState((state) => ({ muted: !state.muted }))}
                        className="backdrop-blur-md bg-black/40 hover:bg-white/10 p-2 rounded-lg border border-white/10 transition-colors text-center text-sm pointer-events-auto"
                    >
                        {useGameStore((state) => state.muted ? "UNMUTE" : "MUTE")}
                    </button>
                </div>
            </div>

            {/* Footer / Controls */}
            <div className="flex justify-between items-end">
                <div className="backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/10 hidden md:block">
                    <p className="text-xs opacity-70 mb-2">SYSTEM STATUS</p>
                    <div className="flex gap-4 text-sm">
                        <div><span className="text-green-400">●</span> ONLINE</div>
                        <div><span className="text-yellow-400">●</span> v1.0.0</div>
                    </div>
                </div>

                <div className="text-center backdrop-blur-md bg-black/40 p-4 rounded-lg border border-white/10">
                    <p className="text-xs opacity-70 mb-2">CONTROLS</p>
                    <div className="flex gap-4 justify-center text-sm font-bold">
                        <span className="border border-white/20 px-2 py-1 rounded">W</span>
                        <span className="border border-white/20 px-2 py-1 rounded">A</span>
                        <span className="border border-white/20 px-2 py-1 rounded">S</span>
                        <span className="border border-white/20 px-2 py-1 rounded">D</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">Move & Fly</div>
                </div>
            </div>
        </div>
    )
}
