import { useMemo } from "react";
import * as THREE from "three";

export function Room() {
  const floorGrad = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 512, 512);
    g.addColorStop(0, "#2a231d"); g.addColorStop(0.5, "#3a2f26"); g.addColorStop(1, "#241d18");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = "rgba(220,200,170,0.06)"; ctx.lineWidth = 1;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, 0);
      ctx.bezierCurveTo(Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512,Math.random()*512,512);
      ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    return t;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial map={floorGrad} roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2]} receiveShadow>
        <planeGeometry args={[5, 3.5]} />
        <meshStandardMaterial color="#4a2f28" roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.5, -5]} receiveShadow><planeGeometry args={[16, 5]} /><meshStandardMaterial color="#1a1613" roughness={0.9} /></mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 2.5, 0]} receiveShadow><planeGeometry args={[16, 5]} /><meshStandardMaterial color="#1a1613" roughness={0.9} /></mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 2.5, 0]} receiveShadow><planeGeometry args={[16, 5]} /><meshStandardMaterial color="#1a1613" roughness={0.9} /></mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, 2.5, 8]} receiveShadow><planeGeometry args={[16, 5]} /><meshStandardMaterial color="#1a1613" roughness={0.9} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}><planeGeometry args={[16, 16]} /><meshStandardMaterial color="#100d0b" roughness={1} /></mesh>
      {[-5, 5].map((z) => (
        <mesh key={z} position={[0, 0.08, z]}><boxGeometry args={[16, 0.16, 0.05]} /><meshStandardMaterial color="#3a2d24" roughness={0.6} /></mesh>
      ))}
    </group>
  );
}
