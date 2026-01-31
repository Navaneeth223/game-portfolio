import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Scene } from './components/canvas/Scene'
import { Interface } from './components/dom/Interface'
import { AudioManager } from './components/dom/AudioManager'
import { Loader } from '@react-three/drei'

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 45 }}
        dpr={[1, 2]} // Performance optimization
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Interface />
      <AudioManager />
      <Loader />
    </>
  )
}

export default App
