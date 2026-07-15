import { useRef, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

let R3F: any = null;
let Drei: any = null;
let THREE_OBJ: any = null;

if (Platform.OS === 'web') {
  try {
    const fiber = require('@react-three/fiber');
    const drei = require('@react-three/drei');
    R3F = fiber;
    Drei = drei;
    THREE_OBJ = require('three');
  } catch {}
}

const WOOD_COLOR = '#5C3D2E';
const WOOD_DARK = '#3E2518';
const GOLD = '#C8A45C';
const WARM_LIGHT = '#FFE6B8';
const INTERIOR = '#1A1A1A';
const WHITE = '#F5F5F5';

const CLOTHES_COLORS = ['#2E4057', '#C04040', '#2D5A27', '#1A237E', '#4A148C', '#3E2723', '#5D4037', '#1565C0'];

const SECTIONS = [
  { id: 'shirts', label: '👔 Shirts', y: 0.7, items: [] as any[] },
  { id: 'tshirts', label: '👕 T-Shirts', y: -0.2, items: [] as any[] },
  { id: 'jeans', label: '👖 Jeans', y: -0.7, items: [] as any[] },
  { id: 'jackets', label: '🧥 Jackets', y: -1.1, items: [] as any[] },
];

function WoodMaterial({ color = WOOD_COLOR }: { color?: string }) {
  return <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />;
}

function InteriorMaterial() {
  return <meshStandardMaterial color={INTERIOR} roughness={0.6} metalness={0.1} />;
}

function GoldMaterial() {
  return <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.6} />;
}

function Shelf({ y, width, depth }: { y: number; width: number; depth: number }) {
  return (
    <mesh position={[0, y, 0]} receiveShadow>
      <boxGeometry args={[width, 0.05, depth]} />
      <WoodMaterial color={WOOD_DARK} />
    </mesh>
  );
}

function Hanger({ x, y, z, color }: { x: number; y: number; z: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.0008 + x) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[0.03, 0.3, 0.03]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.25, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
      {hovered && (
        <Html position={[0, -0.5, 0]} center>
          <div style={{ color: '#C8A45C', fontSize: 11, fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            ✨ {color}
          </div>
        </Html>
      )}
    </group>
  );
}

function ClothesRack({ count = 8 }: { count?: number }) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1) - 0.5) * 2.2;
    const color = CLOTHES_COLORS[i % CLOTHES_COLORS.length];
    items.push(<Hanger key={i} x={x} y={0.45} z={-0.2} color={color} />);
  }
  return <>{items}</>;
}

function ClothingShelf({ y, count = 5 }: { y: number; count?: number }) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1) - 0.5) * 1.8;
    const color = CLOTHES_COLORS[(i + 3) % CLOTHES_COLORS.length];
    items.push(
      <mesh key={i} position={[x, y + 0.08, -0.3]} castShadow>
        <boxGeometry args={[0.2, 0.12, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
    );
  }
  return <>{items}</>;
}

function LEDStrip({ position, rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <mesh position={position as any} rotation={rotation as any}>
      <boxGeometry args={[1.8, 0.02, 0.02]} />
      <meshStandardMaterial color={WARM_LIGHT} emissive={WARM_LIGHT} emissiveIntensity={0.8} />
    </mesh>
  );
}

function WardrobeDoor({ side, open, onToggle }: { side: 'left' | 'right'; open: boolean; onToggle: () => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const targetRotation = side === 'left' ? -Math.PI / 1.8 : Math.PI / 1.8;

  useFrame((_, delta) => {
    if (groupRef.current) {
      const current = groupRef.current.rotation.y;
      const target = open ? targetRotation : 0;
      groupRef.current.rotation.y += (target - current) * delta * 4;
    }
  });

  const hingeX = side === 'left' ? -1.12 : 1.12;

  return (
    <group ref={groupRef} position={[hingeX, 0, 0]}>
      <group position={[0, 0, 0.45]}>
        <mesh
          position={[side === 'left' ? 0.9 : -0.9, 0, 0.02]}
          castShadow
          onClick={onToggle}
          onPointerOver={(e) => {
            (e.object as any).material && ((e.object as any).material.color.setHex(0x8B6914));
            document && (document.body.style.cursor = 'pointer');
          }}
          onPointerOut={(e) => {
            (e.object as any).material && ((e.object as any).material.color.setHex(0x5C3D2E));
            document && (document.body.style.cursor = 'default');
          }}
        >
          <boxGeometry args={[1.8, 2.2, 0.04]} />
          <WoodMaterial />
        </mesh>

        {/* Door frame gold trim */}
        <mesh position={[side === 'left' ? 0.9 : -0.9, 0.9, 0.06]}>
          <boxGeometry args={[1.7, 0.04, 0.01]} />
          <GoldMaterial />
        </mesh>
        <mesh position={[side === 'left' ? 0.9 : -0.9, -0.9, 0.06]}>
          <boxGeometry args={[1.7, 0.04, 0.01]} />
          <GoldMaterial />
        </mesh>

        {/* Handle */}
        <mesh
          position={[side === 'left' ? 1.5 : -1.5, 0, 0.06]}
          onClick={onToggle}
          onPointerOver={(e) => { document && (document.body.style.cursor = 'pointer'); }}
          onPointerOut={(e) => { document && (document.body.style.cursor = 'default'); }}
        >
          <boxGeometry args={[0.06, 0.25, 0.04]} />
          <GoldMaterial />
        </mesh>
      </group>
    </group>
  );
}

function WardrobeBox() {
  return (
    <>
      {/* Back wall */}
      <mesh position={[0, 0, -0.6]} receiveShadow>
        <boxGeometry args={[2.4, 2.4, 0.05]} />
        <InteriorMaterial />
      </mesh>

      {/* Left wall */}
      <mesh position={[-1.15, 0, 0]} receiveShadow>
        <boxGeometry args={[0.05, 2.4, 1.2]} />
        <InteriorMaterial />
      </mesh>

      {/* Right wall */}
      <mesh position={[1.15, 0, 0]} receiveShadow>
        <boxGeometry args={[0.05, 2.4, 1.2]} />
        <InteriorMaterial />
      </mesh>

      {/* Top */}
      <mesh position={[0, 1.2, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.06, 1.2]} />
        <WoodMaterial />
      </mesh>

      {/* Bottom / Floor */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.06, 1.2]} />
        <WoodMaterial color={WOOD_DARK} />
      </mesh>

      {/* Top exterior crown */}
      <mesh position={[0, 1.25, 0.6]}>
        <boxGeometry args={[2.5, 0.12, 0.15]} />
        <WoodMaterial />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -1.25, 0.6]}>
        <boxGeometry args={[2.5, 0.08, 0.15]} />
        <WoodMaterial color={WOOD_DARK} />
      </mesh>
    </>
  );
}

function SectionLabel({ label, y }: { label: string; y: number }) {
  return (
    <Html position={[0, y + 0.2, -0.05]} center transform>
      <div style={{
        color: '#C8A45C',
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        background: 'rgba(0,0,0,0.4)',
        padding: '2px 10px',
        borderRadius: 4,
        border: '1px solid rgba(200,164,92,0.15)',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </Html>
  );
}

function EmptyHanger({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.03, 0.25, 0.03]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.12, 0.02, 0.02]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    </group>
  );
}

function InteriorShelves() {
  return (
    <>
      {/* Hanging rod with section dividers */}
      <mesh position={[0, 0.7, -0.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2.0, 8]} />
        <GoldMaterial />
      </mesh>

      {/* Section dividers on rod */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.7, -0.2]}>
          <boxGeometry args={[0.02, 0.02, 0.06]} />
          <GoldMaterial />
        </mesh>
      ))}

      {/* Section labels */}
      <SectionLabel label="👔 Shirts" y={0.7} />
      <SectionLabel label="👕 T-Shirts" y={-0.2} />
      <SectionLabel label="👖 Jeans & Pants" y={-0.7} />
      <SectionLabel label="🧥 Jackets" y={-1.1} />

      {/* Empty hangers on rod */}
      <EmptyHanger x={-0.8} y={0.45} z={-0.2} />
      <EmptyHanger x={-0.3} y={0.45} z={-0.2} />
      <EmptyHanger x={0.2} y={0.45} z={-0.2} />
      <EmptyHanger x={0.7} y={0.45} z={-0.2} />

      {/* Shelf 1 - T-Shirts */}
      <Shelf y={-0.2} width={2.2} depth={0.8} />

      {/* Shelf 2 - Jeans */}
      <Shelf y={-0.7} width={2.2} depth={0.8} />

      {/* Shelf 3 - Jackets */}
      <Shelf y={-1.1} width={2.2} depth={0.8} />
    </>
  );
}

function Lighting() {
  return (
    <>
      {/* LED strips at top */}
      <LEDStrip position={[0, 1.15, -0.1]} />
      <LEDStrip position={[0, 1.15, 0.3]} />

      {/* Ambient light */}
      <ambientLight intensity={0.3} color="#FFE6B8" />

      {/* Warm key light */}
      <directionalLight
        position={[2, 3, 4]}
        intensity={0.6}
        color={WARM_LIGHT}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light */}
      <directionalLight position={[-2, 1, 2]} intensity={0.2} color="#8B9DC4" />

      {/* Glow from LED strips */}
      <pointLight position={[0, 1.1, -0.1]} intensity={0.15} color={WARM_LIGHT} distance={2} />
      <pointLight position={[0, 1.1, 0.3]} intensity={0.15} color={WARM_LIGHT} distance={2} />

      {/* Hemisphere */}
      <hemisphereLight args={[WARM_LIGHT, '#8B9DC4', 0.3]} />
    </>
  );
}

function CameraAnimation() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.2, 4);
    camera.lookAt(0, 0, 0);
  }, []);

  return null;
}

function WardrobeScene({ onClose }: { onClose?: () => void }) {
  const [doorsOpen, setDoorsOpen] = useState(false);

  return (
    <>
      <CameraAnimation />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 0.1, 0]}
        autoRotate={!doorsOpen}
        autoRotateSpeed={0.5}
      />

      <group position={[0, 0, 0]}>
        <WardrobeBox />
        <WardrobeDoor side="left" open={doorsOpen} onToggle={() => setDoorsOpen(!doorsOpen)} />
        <WardrobeDoor side="right" open={doorsOpen} onToggle={() => setDoorsOpen(!doorsOpen)} />

        {doorsOpen && (
          <group>
            <InteriorShelves />
            <ClothesRack count={8} />
            <ClothingShelf y={-0.2} count={4} />
            <ClothingShelf y={-0.7} count={3} />
            <ClothingShelf y={-1.1} count={4} />
          </group>
        )}
      </group>

      <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={6} blur={2} far={1} />

      <Lighting />

      {onClose && (
        <Html position={[0, 1.6, 1.8]} center>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(200,164,92,0.2)',
              border: '1px solid rgba(200,164,92,0.3)',
              borderRadius: 10,
              padding: '8px 20px',
              color: '#C8A45C',
              fontSize: 13,
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            ✕ Close
          </button>
        </Html>
      )}

      <Html position={[0, -1.4, 1.6]} center>
        <div style={{ color: 'rgba(245,245,245,0.4)', fontSize: 11, textAlign: 'center' }}>
          Click doors to open • Drag to rotate • Scroll to zoom
        </div>
      </Html>
    </>
  );
}

export default function Wardrobe3D({ onClose }: { onClose?: () => void }) {
  if (Platform.OS !== 'web') return null;

  return (
    <div style={{ width: '100%', height: '100%', background: '#0B0B0C' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 4], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ width: '100%', height: '100%' }}
      >
        <WardrobeScene onClose={onClose} />
      </Canvas>
    </div>
  );
}
