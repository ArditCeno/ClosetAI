import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface Props { position: [number, number, number]; color: string; onSelect: () => void; focused: boolean; }

export function Hotspot({ position, color, onSelect, focused }: Props) {
  const [hovered, setHovered] = useState(false);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ring.current) return;
    const t = s.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 2) * 0.15 + (hovered ? 0.25 : 0);
    ring.current.scale.setScalar(scale);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = focused ? 0 : 0.65 + Math.sin(t * 2) * 0.2;
  });
  return (
    <group position={position}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}>
        <ringGeometry args={[0.14, 0.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.06, 20]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
