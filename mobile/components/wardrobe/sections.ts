import type { Vector3Tuple } from "three";

export type SectionId =
  | "overview" | "jackets" | "shoes" | "accessories"
  | "profile" | "ai-stylist" | "fitting";

export interface Section {
  id: SectionId;
  label: string;
  tagline: string;
  hint: string;
  camera: Vector3Tuple;
  target: Vector3Tuple;
  marker: Vector3Tuple;
  accent: string;
}

export const SECTIONS: Section[] = [
  { id: "overview", label: "Atelier", tagline: "Your private dressing room", hint: "Approach any area to explore.", camera: [0, 1.7, 6.2], target: [0, 1.4, 0], marker: [0, 0, 0], accent: "#d4b483" },
  { id: "jackets", label: "Jackets", tagline: "Tailored & outerwear", hint: "Hangers respond to touch. Fabric moves with light.", camera: [-3.2, 1.6, -0.4], target: [-4.6, 1.4, -2.4], marker: [-4.6, 1.4, -2.4], accent: "#c8a97e" },
  { id: "shoes", label: "Shoes", tagline: "Illuminated shelving", hint: "Each pair rotates on its plinth.", camera: [3.2, 1.5, -0.6], target: [4.7, 1.2, -2.4], marker: [4.7, 1.2, -2.4], accent: "#e0c9a6" },
  { id: "accessories", label: "Accessories", tagline: "Watches, jewelry, perfume", hint: "Open the glass cabinet to inspect.", camera: [-0.2, 1.3, -2.2], target: [-0.2, 0.9, -4.5], marker: [-0.2, 0.9, -4.5], accent: "#f2d9a8" },
  { id: "profile", label: "Profile", tagline: "The dressing mirror", hint: "The mirror knows your style history.", camera: [2.2, 1.6, 2.6], target: [3.8, 1.6, 4.2], marker: [3.8, 1.6, 4.2], accent: "#b9d4c8" },
  { id: "ai-stylist", label: "AI Stylist", tagline: "The smart mirror", hint: "Ask for a look, receive a story.", camera: [-2.2, 1.6, 2.6], target: [-3.8, 1.6, 4.2], marker: [-3.8, 1.6, 4.2], accent: "#c9b6e4" },
  { id: "fitting", label: "Fitting Room", tagline: "Outfit builder", hint: "Compose a full look in soft light.", camera: [0, 1.6, 3.0], target: [0, 1.6, 5.5], marker: [0, 0.05, 5.5], accent: "#e6c2b3" },
];

export const getSection = (id: SectionId) =>
  SECTIONS.find((s) => s.id === id) ?? SECTIONS[0];
