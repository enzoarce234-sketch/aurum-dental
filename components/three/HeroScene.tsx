'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  ContactShadows,
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
} from '@react-three/postprocessing';
import { useState } from 'react';
import Tooth from './Tooth';
import Particles from './Particles';

/**
 * The hero's WebGL stage. Reflections are baked from in-scene Lightformers,
 * so the experience is 100% self-contained — no external HDRI fetch required.
 */
export default function HeroScene() {
  const [dpr, setDpr] = useState(1.5);
  // Post-processing is gated on device performance so weaker GPUs stay smooth.
  const [effects, setEffects] = useState(true);

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 38 }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => {
          setDpr(1);
          setEffects(false);
        }}
      />
      <AdaptiveDpr pixelated />

      <color attach="background" args={['#0a0a0b']} />
      <fog attach="fog" args={['#0a0a0b', 9, 18]} />

      {/* Key + rim lighting */}
      <ambientLight intensity={0.25} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.4}
        penumbra={1}
        intensity={2.4}
        color="#fff4dc"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-7, 2, -4]} angle={0.5} penumbra={1} intensity={1.6} color="#c9a86a" />
      <pointLight position={[0, -4, 4]} intensity={0.6} color="#cfd2d6" />

      <Suspense fallback={null}>
        <Tooth scale={1.25} />
        <Particles count={650} />

        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.5}
          scale={14}
          blur={3}
          far={6}
          color="#000000"
        />

        {/* Studio reflection rig — drives the clearcoat highlights on the enamel */}
        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={3}
            color="#ffffff"
            position={[0, 4, -6]}
            scale={[8, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#e7d3a8"
            position={[-5, 1, 2]}
            scale={[4, 6, 1]}
            rotation={[0, Math.PI / 4, 0]}
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#cfd2d6"
            position={[5, -1, 2]}
            scale={[4, 6, 1]}
            rotation={[0, -Math.PI / 4, 0]}
          />
          <Lightformer
            form="ring"
            intensity={1.4}
            color="#c9a86a"
            position={[0, 0, 6]}
            scale={[3, 3, 1]}
          />
        </Environment>

        {/* Cinematic grade: soft golden bloom + gentle vignette */}
        {effects && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.65}
              luminanceSmoothing={0.3}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
            <SMAA />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
