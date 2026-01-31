import { Joystick } from 'react-joystick-component'


interface JoystickProps {
    onMove: (x: number, y: number) => void
    onStop: () => void
}

export const MobileJoystick = ({ onMove, onStop }: JoystickProps) => {
    return (
        <div className="absolute bottom-10 left-10 z-50 md:hidden">
            <Joystick
                size={100}
                sticky={false}
                baseColor="#ffffff20"
                stickColor="#ffffff80"
                move={(e) => onMove(e.x || 0, e.y || 0)}
                stop={onStop}
            />
        </div>
    )
}
