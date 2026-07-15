import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { CameraRig } from "./CameraRig";
import { Room } from "./Room";
import { JacketRack } from "./objects/JacketRack";
import { ShoeWall } from "./objects/ShoeWall";
import { AccessoryTable } from "./objects/AccessoryTable";
import { Mirror } from "./objects/Mirrors";
import { FittingArea } from "./objects/FittingArea";
import { Decor } from "./objects/Decor";
import { Hotspot } from "./Hotspot";
import { HUD } from "./HUD";
import { SECTIONS, type SectionId, getSection } from "./sections";

export function WardrobeExperience() {
  const [section, setSection] = useState<SectionId>("overview");
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setYaw(nx * 1.2);
      setPitch(-ny * 0.6);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const current = getSection(section);

  return (
    <div ref={container} className="relative h-screen w-screen overflow-hidden bg-black font-sans"
      style={{ ["--gold" as never]: "#d4b483", fontFamily: "'Cormorant Garamond','Playfair Display',ui-serif,serif" } as React.CSSProperties}>
      <Canvas shadows camera={{ position: [0, 1.7, 6.2], fov: 55, near: 0.05, far: 60 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#0a0806"]} />
        <fog attach="fog" args={["#0a0806", 8, 22]} />
        <ambientLight intensity={0.35} color="#c9b48a" />
        <directionalLight position={[3, 6, 4]} intensity={0.8} color="#ffd9a8" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <pointLight position={[-4, 3.5, 3]} intensity={0.6} color="#f4d9a8" />
        <pointLight position={[4, 3.5, 3]} intensity={0.6} color="#f4d9a8" />
        <Room />
        <Decor />
        <JacketRack active={section === "jackets"} />
        <ShoeWall active={section === "shoes"} />
        <AccessoryTable active={section === "accessories"} />
        <Mirror position={[3.8, 0, 4.2]} rotationY={-Math.PI * 0.75} label="Profile" active={section === "profile"} accent="#b9d4c8" />
        <Mirror position={[-3.8, 0, 4.2]} rotationY={Math.PI * 0.75} label="AI Stylist" active={section === "ai-stylist"} accent="#c9b6e4" />
        <FittingArea active={section === "fitting"} />
        {SECTIONS.filter((s) => s.id !== "overview").map((s) => (
          <Hotspot key={s.id} position={[s.marker[0], 0.02, s.marker[2]]} color={s.accent}
            focused={section === s.id} onSelect={() => setSection(s.id)} />
        ))}
        <CameraRig section={section} yaw={yaw} pitch={pitch} />
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      </Canvas>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 55%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{ background: `radial-gradient(circle at 50% 60%, ${current.accent}18, transparent 45%)` }} />
      <HUD section={section} onSelect={setSection} />
    </div>
  );
}
