'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 80, spread = 15, speed = 0.15 }: { count?: number; spread?: number; speed?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.3;
      velocities[i * 3] = (Math.random() - 0.5) * speed;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.2;
    }
    return { positions, velocities };
  }, [count, spread, speed]);

  useFrame((_, delta) => {
    if (!meshRef.current || !linesRef.current) return;

    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const halfSpread = spread / 2;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += particles.velocities[i * 3] * delta;
      posArray[i * 3 + 1] += particles.velocities[i * 3 + 1] * delta;
      posArray[i * 3 + 2] += particles.velocities[i * 3 + 2] * delta;

      for (let j = 0; j < 3; j++) {
        if (posArray[i * 3 + j] > halfSpread) posArray[i * 3 + j] = -halfSpread;
        if (posArray[i * 3 + j] < -halfSpread) posArray[i * 3 + j] = halfSpread;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    const linePositions: number[] = [];
    const connectionDistance = spread * 0.2;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
          );
        }
      }
    }

    const lineGeom = linesRef.current.geometry as THREE.BufferGeometry;
    lineGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeom.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#86868b"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#86868b"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

interface ParticleFieldProps {
  className?: string;
  opacity?: number;
  particleCount?: number;
  spread?: number;
}

export default function ParticleField({
  className = '',
  opacity = 0.4,
  particleCount = 80,
  spread = 15,
}: ParticleFieldProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) setShouldRender(false);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`particle-field absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={particleCount} spread={spread} />
      </Canvas>
    </div>
  );
}
