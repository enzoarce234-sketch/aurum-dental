'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { lerp } from '@/lib/utils';

/**
 * A single, clean molar — generated procedurally (always exactly one tooth).
 * A squashed sphere is sculpted into a cusped occlusal crown, paired with two
 * short tapered roots, then finished in a glossy white enamel material.
 */
export default function Tooth({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#fcfdfd'),
        roughness: 0.18,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
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

  // Cusped molar crown.
  const crownGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 96, 96);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const nx = v.x;
      const ny = v.y;
      const nz = v.z;
      let X = nx * 1.12;
      let Z = nz * 1.12;
      let Y = ny * 0.62; // squash into a low crown
      if (ny > 0) {
        // Four corner cusps + a central rise, with fissures between them.
        const cusp = Math.cos(nx * Math.PI) * Math.cos(nz * Math.PI);
        Y += Math.max(0, ny) * (0.2 * cusp + 0.05);
      } else {
        // Slightly tuck the base in toward the neck.
        const k = 1 + ny * 0.18;
        X *= k;
        Z *= k;
      }
      pos.setXYZ(i, X, Y, Z);
    }
    geo.computeVertexNormals();
    geo.translate(0, 0.42, 0);
    return geo;
  }, []);

  // A single tapered root (reused twice).
  const rootGeo = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.34, 1.0, 40);
    geo.translate(0, -0.5, 0); // base at origin, tip downward after we flip
    geo.rotateX(Math.PI); // wide end up (toward crown), point down
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
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.6} floatingRange={[-0.08, 0.08]}>
      <group ref={group} scale={scale} dispose={null}>
        <mesh geometry={crownGeo} material={material} castShadow />
        <mesh geometry={rootGeo} material={material} position={[-0.32, -0.1, 0]} rotation={[0, 0, 0.16]} castShadow />
        <mesh geometry={rootGeo} material={material} position={[0.32, -0.1, 0]} rotation={[0, 0, -0.16]} castShadow />
      </group>
    </Float>
  );
}
