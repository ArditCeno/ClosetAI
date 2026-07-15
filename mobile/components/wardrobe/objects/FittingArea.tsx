import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function FittingArea({ active }: { active: boolean }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame((s) => {
    if (light.current) light.current.intensity = (active ? 3.5 : 1.4) + Math.sin(s.clock.elapsedTime * 1.5) * 0.15;
  });
  return (
    <group>
      <mesh position={[0, 0.05, 5.5]} receiveShadow><cylinderGeometry args={[1.1, 1.2, 0.08, 32]} /><meshStandardMaterial color="#3a2d24" metalness={0.2} roughness={0.5} /></mesh>
      <mesh position={[0, 0.09, 5.5]}><cylinderGeometry args={[1.0, 1.0, 0.005, 32]} /><meshStandardMaterial color="#f2d9a8" emissive="#f2d9a8" emissiveIntensity={active ? 1.2 : 0.4} /></mesh>
      <mesh position={[0, 4.5, 5.5]}><coneGeometry args={[0.25, 0.4, 20, 1, true]} /><meshStandardMaterial color="#c4a878" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} /></mesh>
      <pointLight ref={light} position={[0, 4.2, 5.5]} intensity={1.4} distance={6} color="#ffe4bd" castShadow />
    </group>
  );
}
