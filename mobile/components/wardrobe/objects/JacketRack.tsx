import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Hanger({ x, color, active }: { x: number; color: string; active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const swing = useRef(0);
  const [hovered, setHovered] = useState(false);
  useFrame((state, delta) => {
    if (!group.current) return;
    swing.current += delta;
    const idle = Math.sin(swing.current * 1.2 + x) * 0.02;
    const target = hovered ? 0.15 : idle;
    group.current.rotation.z += (target - group.current.rotation.z) * 0.08;
    group.current.position.z += ((hovered ? 0.25 : 0) - group.current.position.z) * 0.1;
    group.current.scale.setScalar(1 + (hovered ? 0.04 : 0));
    if (active) {
      const mat = (group.current.children[1] as THREE.Mesh)?.material as THREE.MeshStandardMaterial | undefined;
      if (mat) mat.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 2 + x) * 0.05;
    }
  });
  return (
    <group ref={group} position={[x, 1.9, -2.4]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}>
      <mesh><torusGeometry args={[0.08, 0.008, 8, 16, Math.PI]} /><meshStandardMaterial color="#c4a878" metalness={0.9} roughness={0.25} /></mesh>
      <mesh position={[0, -0.45, 0]} castShadow><boxGeometry args={[0.55, 0.9, 0.12]} /><meshStandardMaterial color={color} roughness={0.65} emissive={color} emissiveIntensity={0} /></mesh>
      <mesh position={[0, -0.05, 0]} castShadow><boxGeometry args={[0.6, 0.12, 0.14]} /><meshStandardMaterial color={color} roughness={0.65} /></mesh>
    </group>
  );
}

export function JacketRack({ active }: { active: boolean }) {
  const colors = ["#1c1c1e", "#3a2a1e", "#6b5844", "#2b3a2b", "#4a2a2a", "#8a7458"];
  return (
    <group>
      <mesh position={[-4.6, 2.0, -2.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3.5, 16]} /><meshStandardMaterial color="#c4a878" metalness={0.9} roughness={0.2} />
      </mesh>
      {[-1.6, 1.6].map((dx) => (
        <mesh key={dx} position={[-4.6 + dx, 3.0, -2.4]}>
          <cylinderGeometry args={[0.015, 0.015, 2.0, 8]} /><meshStandardMaterial color="#c4a878" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {colors.map((c, i) => <Hanger key={i} x={-4.6 + (i - 2.5) * 0.35} color={c} active={active} />)}
      <mesh position={[-4.6, 3.6, -2.55]}><boxGeometry args={[3.6, 0.08, 0.45]} /><meshStandardMaterial color="#2a221c" roughness={0.7} /></mesh>
      {active && <spotLight position={[-4.6, 4.5, -1.4]} target-position={[-4.6, 1.4, -2.4]} angle={0.5} penumbra={0.6} intensity={40} color="#f4d9a8" castShadow />}
    </group>
  );
}
