import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Perfume({ x, color }: { x: number; color: string }) {
  const [hovered, setHovered] = useState(false);
  const g = useRef<THREE.Group>(null);
  useFrame(() => { if (g.current) g.current.rotation.y += hovered ? 0.02 : 0.003; });
  return (
    <group ref={g} position={[x, 0.9, -4.4]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}>
      <mesh castShadow><boxGeometry args={[0.12, 0.22, 0.08]} />
        <meshPhysicalMaterial color={color} transmission={0.7} thickness={0.5} roughness={0.1} metalness={0.1} ior={1.4} />
      </mesh>
      <mesh position={[0, 0.14, 0]}><cylinderGeometry args={[0.03, 0.03, 0.05, 12]} /><meshStandardMaterial color="#c4a878" metalness={0.9} roughness={0.2} /></mesh>
    </group>
  );
}

export function AccessoryTable({ active }: { active: boolean }) {
  return (
    <group>
      <mesh position={[-0.2, 0.75, -4.4]} castShadow receiveShadow><boxGeometry args={[2.4, 0.05, 0.8]} /><meshStandardMaterial color="#1a1613" roughness={0.3} metalness={0.4} /></mesh>
      {[[-1.3,0.375,-4.7],[1.0,0.375,-4.7],[-1.3,0.375,-4.1],[1.0,0.375,-4.1]].map((p, i) => (
        <mesh key={i} position={p as [number,number,number]}><cylinderGeometry args={[0.02, 0.02, 0.75, 8]} /><meshStandardMaterial color="#c4a878" metalness={0.85} roughness={0.3} /></mesh>
      ))}
      <mesh position={[-0.2, 1.05, -4.4]}><boxGeometry args={[1.2, 0.5, 0.5]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} thickness={0.4} roughness={0.05} ior={1.5} opacity={0.3} transparent />
      </mesh>
      <Perfume x={-0.6} color="#d4b483" />
      <Perfume x={-0.2} color="#a8c4b0" />
      <Perfume x={0.2} color="#c49a9a" />
      <mesh position={[0.8, 0.79, -4.4]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.09, 0.09, 0.02, 24]} /><meshStandardMaterial color="#e0c9a6" metalness={0.9} roughness={0.15} /></mesh>
      <mesh position={[-1.0, 0.79, -4.4]}><boxGeometry args={[0.4, 0.02, 0.28]} /><meshStandardMaterial color="#2a1f1a" roughness={0.6} /></mesh>
      {active && <spotLight position={[-0.2, 2.8, -3.6]} target-position={[-0.2, 0.9, -4.4]} angle={0.6} penumbra={0.8} intensity={30} color="#ffe6b8" />}
    </group>
  );
}
