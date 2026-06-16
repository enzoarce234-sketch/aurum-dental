'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  ContactShadows,
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import Tooth from './Tooth';
import Particles from './Particles';

interface HeroSceneProps {
  /** Render only while the hero is on screen (saves GPU/CPU on scroll). */
  active?: boolean;
  /** Scale the workload down on phones / coarse-pointer devices. */
  isMobile?: boolean;
}

/**
 * The hero's WebGL stage. Reflections are baked from in-scene Lightformers,
 * so the experience is 100% self-contained — no external HDRI fetch required.
 */
export default function HeroScene({ active = true, isMobile = false }: HeroSceneProps) {
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5);
  // Post-processing is heavy: off on mobile, and dropped if a desktop GPU struggles.
  const [effects, setEffects] = useState(!isMobile);

  return (
    <Canvas
      // Pause the loop entirely when off-screen.
      frameloop={active ? 'always' : 'never'}
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : dpr}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 38 }}
    >
      {!isMobile && (
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => {
            setDpr(1);
            setEffects(false);
          }}
        />
      )}
      <AdaptiveDpr pixelated />

      <color attach="background" args={['#eef3f6']} />
      <fog attach="fog" args={['#eef3f6', 10, 20]} />

      {/* Bright, clean studio lighting */}
      <ambientLight intensity={0.9} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.4}
        penumbra={1}
        intensity={2.6}
        color="#ffffff"
        castShadow={!isMobile}
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[-7, 2, -4]} angle={0.5} penumbra={1} intensity={1.4} color="#bfe6e0" />
      <pointLight position={[0, -4, 4]} intensity={0.5} color="#ffffff" />

      <Suspense fallback={null}>
        <Tooth scale={isMobile ? 1.05 : 1.25} />
        <Particles count={isMobile ? 220 : 650} />

        {!isMobile && (
          <ContactShadows
            position={[0, -2.6, 0]}
            opacity={0.5}
            scale={14}
            blur={3}
            far={6}
            color="#000000"
          />
        )}

        {/* Studio reflection rig — drives the clearcoat highlights on the enamel */}
        <Environment resolution={isMobile ? 128 : 256} frames={1}>
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
            color="#ffffff"
            position={[-5, 1, 2]}
            scale={[4, 6, 1]}
            rotation={[0, Math.PI / 4, 0]}
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#dff0ee"
            position={[5, -1, 2]}
            scale={[4, 6, 1]}
            rotation={[0, -Math.PI / 4, 0]}
          />
          <Lightformer
            form="ring"
            intensity={1.2}
            color="#9fd8d0"
            position={[0, 0, 6]}
            scale={[3, 3, 1]}
          />
        </Environment>

        {/* Cinematic grade: soft bloom + gentle vignette (desktop only) */}
        {effects && !isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.18}
              luminanceThreshold={0.92}
              luminanceSmoothing={0.4}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.4} darkness={0.35} />
            <SMAA />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
