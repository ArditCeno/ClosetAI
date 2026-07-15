import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Mirror({ position, rotationY, label, active, accent }: {
  position: [number, number, number]; rotationY: number; label: string; active: boolean; accent: string;
}) {
  const shimmer = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!shimmer.current) return;
    (shimmer.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      (active ? 0.9 : 0.3) + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
  });
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 1.4, 0]}><boxGeometry args={[1.2, 2.8, 0.08]} /><meshStandardMaterial color="#c4a878" metalness={0.9} roughness={0.2} /></mesh>
      <mesh position={[0, 1.4, 0.05]}><planeGeometry args={[1.0, 2.6]} />
        <meshPhysicalMaterial color="#0a1414" metalness={1} roughness={0.05} clearcoat={1} clearcoatRoughness={0.05} />
      </mesh>
      <mesh ref={shimmer} position={[0, 1.4, 0.055]}><planeGeometry args={[0.95, 2.55]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 1 : 0.3} transparent opacity={0.12} />
      </mesh>
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.35, 0.4, 0.04, 24]} /><meshStandardMaterial color="#1a1613" metalness={0.6} roughness={0.4} /></mesh>
      {active && <pointLight position={[0, 1.6, 0.6]} intensity={2} distance={3} color={accent} />}
      <mesh position={[0, 0.15, 0.06]}><planeGeometry args={[0.5, 0.06]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} /></mesh>
      <group visible={false}>{label}</group>
    </group>
  );
}
