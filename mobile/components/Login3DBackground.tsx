import { useRef } from 'react';
import { Platform } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

if (Platform.OS !== 'web') {
  try { require('@react-three/fiber'); require('three'); } catch {}
}

function FloatingWardrobe() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock, camera }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.3;
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.05) * 0.05;
    }
    camera.position.x = Math.sin(clock.elapsedTime * 0.03) * 0.5;
    camera.position.y = 0.6 + Math.sin(clock.elapsedTime * 0.04) * 0.1;
    camera.lookAt(0, 0.4, 0);
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Wardrobe body */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.5]} />
        <meshStandardMaterial color="#3E2518" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Left door */}
      <mesh position={[-0.5, 0.6, 0.26]}>
        <boxGeometry args={[0.8, 1.0, 0.03]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.6} />
      </mesh>
      {/* Right door */}
      <mesh position={[0.5, 0.6, 0.26]}>
        <boxGeometry args={[0.8, 1.0, 0.03]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.6} />
      </mesh>
      {/* Gold trim */}
      <mesh position={[0, 1.2, 0.2]}>
        <boxGeometry args={[1.8, 0.03, 0.02]} />
        <meshStandardMaterial color="#C8A45C" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.2, -0.2]}>
        <boxGeometry args={[1.8, 0.03, 0.02]} />
        <meshStandardMaterial color="#C8A45C" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Interior glow */}
      <mesh position={[0, 0.6, 0.2]}>
        <planeGeometry args={[1.4, 0.8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
      </mesh>
      {/* Hanging rod */}
      <mesh position={[0, 1.0, 0.2]}>
        <cylinderGeometry args={[0.01, 0.01, 1.4, 6]} />
        <meshStandardMaterial color="#C8A45C" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Clothes hints */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 0.2]}>
          <boxGeometry args={[0.12, 0.2, 0.03]} />
          <meshStandardMaterial color={`hsl(${i * 60 + 200}, 35%, 40%)`} roughness={0.6} />
        </mesh>
      ))}
      {/* Floor shadow */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshBasicMaterial color="rgba(0,0,0,0.3)" transparent />
      </mesh>
    </group>
  );
}

interface LoginBackgroundProps {
  children?: React.ReactNode;
}

export default function Login3DBackground({ children }: LoginBackgroundProps) {
  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0D0806' }}>
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.6 }}>
        <Canvas
          camera={{ position: [0, 0.6, 2.5], fov: 45 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.8 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.15} color="#FFE6B8" />
          <pointLight position={[1, 2, 2]} intensity={0.3} color="#FFE6B8" />
          <pointLight position={[-1, 1, 1]} intensity={0.15} color="#8B9DC4" />
          <hemisphereLight args={['#FFE6B8', '#0D0806', 0.1]} />
          <FloatingWardrobe />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(13,8,6,0.3) 0%, rgba(13,8,6,0.6) 50%, rgba(13,8,6,0.9) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
