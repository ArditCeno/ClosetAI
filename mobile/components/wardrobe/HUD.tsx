import { SECTIONS, type SectionId, getSection } from "./sections";

interface Props { section: SectionId; onSelect: (id: SectionId) => void; }

export function HUD({ section, onSelect }: Props) {
  const current = getSection(section);
  return (
    <>
      <div className="pointer-events-none absolute left-6 top-6 z-10 select-none">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]/80">Atelier</div>
        <div className="mt-1 font-serif text-xl text-white/95">Your Wardrobe</div>
      </div>
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div key={current.id} className="animate-fade-in rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-center backdrop-blur-md"
          style={{ boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)" }}>
          <div className="text-[10px] uppercase tracking-[0.35em]" style={{ color: current.accent }}>{current.tagline}</div>
          <div className="mt-1 font-serif text-2xl text-white">{current.label}</div>
          <div className="mt-1 text-xs text-white/60">{current.hint}</div>
        </div>
      </div>
      <div className="pointer-events-auto absolute right-4 top-1/2 z-10 -translate-y-1/2">
        <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 backdrop-blur-md">
          {SECTIONS.map((s) => {
            const active = s.id === section;
            return (
              <button key={s.id} onClick={() => onSelect(s.id)}
                className="group relative flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-all hover:bg-white/5"
                style={{ background: active ? `linear-gradient(90deg, ${s.accent}22, transparent)` : undefined }}>
                <span className="h-2 w-2 rounded-full transition-all"
                  style={{ backgroundColor: s.accent, boxShadow: active ? `0 0 12px ${s.accent}` : "none", transform: active ? "scale(1.4)" : "scale(1)" }} />
                <span className="text-xs font-medium tracking-wide" style={{ color: active ? "white" : "rgba(255,255,255,0.6)" }}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-8 left-6 z-10 max-w-[180px]">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Move mouse</div>
        <div className="mt-1 text-xs text-white/70">Look around. Click a marker or the rail to travel.</div>
      </div>
    </>
  );
}
