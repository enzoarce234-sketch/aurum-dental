'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

/**
 * A single, clean, aesthetic tooth — generated procedurally so it is always
 * exactly one tooth (no extra props), with full control over its shape.
 * A unit sphere is sculpted: a wide rounded crown on top that tapers into a
 * single elongated root below, then finished in a glossy white enamel material.
 */
export default function Tooth({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#fcfdfd'),
        roughness: 0.16,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        transmission: 0.03,
        ior: 1.5,
        thickness: 1.0,
        sheen: 0.5,
        sheenColor: new THREE.Color('#dff1ef'),
        sheenRoughness: 0.5,
        iridescence: 0.08,
        envMapIntensity: 1.4,
      }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 160, 160);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();

    const crownWidth = 1.04; // left-right
    const crownDepth = 0.74; // front-back (an incisor is flatter)

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const y = v.y;
      let taper = 1;
      let ny = y;

      if (y < 0) {
        // Lower half tapers and elongates into a single root.
        taper = THREE.MathUtils.clamp(1 + y * 0.7, 0.16, 1);
        ny = y * 1.85;
      } else {
        // Crown: gently flatten the biting edge and round the shoulders.
        ny = y * 0.92;
        taper = 1 - y * y * 0.05;
      }

      // Soft incisal lobes — three subtle vertical swells on the crown front.
      const lobe =
        y > 0.1 ? Math.cos(v.x * 4.2) * 0.015 * Math.max(0, v.z) : 0;

      v.x *= taper * crownWidth + lobe;
      v.z *= taper * crownDepth + lobe;
      v.y = ny;
      pos.setXYZ(i, v.x, v.y, v.z);
    }

    geo.computeVertexNormals();
    geo.center();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    target.current.y = state.pointer.x * 0.5;
    target.current.x = -state.pointer.y * 0.32;
    group.current.rotation.y = lerp(
      group.current.rotation.y,
      target.current.y + state.clock.elapsedTime * 0.1,
      delta * 2
    );
    group.current.rotation.x = lerp(group.current.rotation.x, target.current.x, delta * 2);
  });

  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.1, 0.1]}>
      {/* Slight forward tilt so both crown and root read at a glance. */}
      <group ref={group} scale={scale * 1.7} rotation={[0.15, 0, 0]} dispose={null}>
        <mesh geometry={geometry} material={material} castShadow />
      </group>
    </Float>
  );
}
