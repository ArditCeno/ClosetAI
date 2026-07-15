import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Shoe({ pos, color, active }: { pos: [number, number, number]; color: string; active: boolean }) {
  const g = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (!g.current) return;
    g.current.rotation.y += delta * (hovered ? 0.8 : 0.15);
    const lift = hovered ? 0.08 : 0;
    g.current.position.y += (pos[1] + lift - g.current.position.y) * 0.15;
  });
  return (
    <group ref={g} position={pos}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}>
      <mesh position={[0, -0.03, 0]}><cylinderGeometry args={[0.14, 0.14, 0.02, 24]} /><meshStandardMaterial color="#1a1613" roughness={0.4} metalness={0.3} /></mesh>
      <mesh castShadow position={[0, 0.03, 0]}><boxGeometry args={[0.22, 0.05, 0.1]} /><meshStandardMaterial color={color} roughness={0.35} metalness={0.15} /></mesh>
      <mesh castShadow position={[0.07, 0.055, 0]}><sphereGeometry args={[0.05, 16, 12]} /><meshStandardMaterial color={color} roughness={0.3} /></mesh>
      <mesh castShadow position={[-0.08, 0.08, 0]}><boxGeometry args={[0.06, 0.09, 0.08]} /><meshStandardMaterial color={color} roughness={0.3} /></mesh>
      {active && <pointLight position={[0, 0.5, 0.2]} intensity={0.6} distance={1.2} color="#ffd9a0" />}
    </group>
  );
}

export function ShoeWall({ active }: { active: boolean }) {
  const shoes: { pos: [number, number, number]; color: string }[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    shoes.push({ pos: [4.55 + (c - 1) * 0.4, 0.4 + r * 0.55, -2.4], color: ["#1a1613", "#3a2a1e", "#c9a97a", "#8a5a3a"][(r + c) % 4]! });
  }
  return (
    <group>
      <mesh position={[4.6, 1.5, -2.6]}><boxGeometry args={[1.6, 2.8, 0.4]} /><meshStandardMaterial color="#2a221c" roughness={0.7} /></mesh>
      {[0.35, 0.9, 1.45, 2.0, 2.55].map((y) => (
        <mesh key={y} position={[4.6, y, -2.45]}><boxGeometry args={[1.5, 0.03, 0.35]} /><meshStandardMaterial color="#3a2d24" roughness={0.5} /></mesh>
      ))}
      {[0.35, 0.9, 1.45, 2.0, 2.55].map((y) => (
        <mesh key={"g" + y} position={[4.6, y + 0.015, -2.28]}>
          <boxGeometry args={[1.4, 0.005, 0.02]} />
          <meshStandardMaterial color="#f4d9a8" emissive="#f4d9a8" emissiveIntensity={active ? 1.6 : 0.6} />
        </mesh>
      ))}
      {shoes.map((s, i) => <Shoe key={i} pos={s.pos} color={s.color} active={active} />)}
    </group>
  );
}
