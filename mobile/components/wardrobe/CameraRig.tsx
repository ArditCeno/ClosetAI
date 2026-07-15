import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { getSection, type SectionId } from "./sections";

interface Props { section: SectionId; yaw: number; pitch: number; }
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function CameraRig({ section, yaw, pitch }: Props) {
  const { camera } = useThree();
  const startPos = useRef(new Vector3());
  const startTarget = useRef(new Vector3());
  const endPos = useRef(new Vector3());
  const endTarget = useRef(new Vector3());
  const currentTarget = useRef(new Vector3());
  const progress = useRef(1);

  useEffect(() => {
    const s = getSection(section);
    startPos.current.copy(camera.position);
    startTarget.current.copy(currentTarget.current);
    endPos.current.set(...s.camera);
    endTarget.current.set(...s.target);
    progress.current = 0;
  }, [section, camera]);

  useFrame((_, delta) => {
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta / 1.4);
      const t = ease(progress.current);
      camera.position.lerpVectors(startPos.current, endPos.current, t);
      currentTarget.current.lerpVectors(startTarget.current, endTarget.current, t);
    }
    const offset = new Vector3().subVectors(camera.position, currentTarget.current);
    const radius = offset.length();
    const baseYaw = Math.atan2(offset.x, offset.z);
    const basePitch = Math.asin(offset.y / radius);
    const finalYaw = baseYaw + yaw * 0.35;
    const finalPitch = Math.max(-0.4, Math.min(0.5, basePitch + pitch * 0.25));
    const cy = Math.cos(finalPitch);
    const desired = new Vector3(
      currentTarget.current.x + Math.sin(finalYaw) * radius * cy,
      currentTarget.current.y + Math.sin(finalPitch) * radius,
      currentTarget.current.z + Math.cos(finalYaw) * radius * cy,
    );
    camera.position.lerp(desired, 0.08);
    camera.lookAt(currentTarget.current);
  });
  return null;
}
