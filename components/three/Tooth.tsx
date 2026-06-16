'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

const MODEL_URL = '/models/tooth.glb';

/**
 * Real scanned tooth (GLB), re-finished in a premium pearlescent enamel material.
 * The model is auto-centred and auto-scaled at runtime so it always frames
 * perfectly regardless of the source asset's native units or pivot.
 */
export default function Tooth({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { scene } = useGLTF(MODEL_URL);

  // Luxury enamel — clearcoat + faint gold iridescence over the scanned geometry.
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#fbfcfd'),
        roughness: 0.18,
        metalness: 0.0,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        transmission: 0.04,
        ior: 1.5,
        thickness: 1.2,
        sheen: 0.6,
        sheenColor: new THREE.Color('#dff0ee'),
        sheenRoughness: 0.5,
        iridescence: 0.12,
        iridescenceIOR: 1.3,
        envMapIntensity: 1.4,
      }),
    []
  );

  // Clone, re-material, centre on origin, and normalise to a consistent size.
  const model = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = material;
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        mesh.geometry.computeVertexNormals();
      }
    });

    // Auto-fit: centre the bounding box and scale so its largest side ≈ 3 units.
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fit = 3 / maxDim;

    const wrapper = new THREE.Group();
    root.position.sub(center); // centre on origin
    wrapper.add(root);
    wrapper.scale.setScalar(fit);
    return wrapper;
  }, [scene, material]);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Mouse-reactive parallax tilt (state.pointer is normalised -1..1).
    target.current.y = state.pointer.x * 0.5;
    target.current.x = -state.pointer.y * 0.35;
    group.current.rotation.y = lerp(
      group.current.rotation.y,
      target.current.y + state.clock.elapsedTime * 0.12,
      delta * 2
    );
    group.current.rotation.x = lerp(
      group.current.rotation.x,
      target.current.x,
      delta * 2
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7} floatingRange={[-0.1, 0.1]}>
      <group ref={group} scale={scale} dispose={null}>
        <primitive object={model} />
      </group>
    </Float>
  );
}

// Preload so the model is ready the moment the hero mounts.
useGLTF.preload(MODEL_URL);
