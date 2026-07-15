export function Decor() {
  return (
    <group>
      <group position={[-7, 0, 4]}>
        <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.35, 0.28, 0.6, 16]} /><meshStandardMaterial color="#1a1613" roughness={0.8} /></mesh>
        {[[0,1.1,0],[0.2,1.3,0.1],[-0.15,1.25,-0.1],[0.1,1.5,-0.05]].map((p, i) => (
          <mesh key={i} position={p as [number,number,number]}><sphereGeometry args={[0.35, 12, 12]} /><meshStandardMaterial color="#2f4a35" roughness={0.9} /></mesh>
        ))}
      </group>
      <mesh position={[6.5, 0.35, 4.5]} rotation={[0, -0.3, 0]} castShadow><boxGeometry args={[0.8, 0.6, 0.35]} /><meshStandardMaterial color="#5a3a2a" roughness={0.6} /></mesh>
      <group position={[3.5, 0.05, 4.8]}>
        {[0, 0.06, 0.12].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow><boxGeometry args={[0.35, 0.05, 0.28]} /><meshStandardMaterial color={["#3a2a1e","#5a3a2a","#c4a878"][i]} roughness={0.7} /></mesh>
        ))}
      </group>
      {[-2.5, 2.5].map((x) => (
        <group key={x} position={[x, 3.2, -4.98]}>
          <mesh><planeGeometry args={[0.9, 1.2]} /><meshStandardMaterial color="#c4a878" /></mesh>
          <mesh position={[0, 0, 0.01]}><planeGeometry args={[0.78, 1.08]} /><meshStandardMaterial color="#241d18" /></mesh>
        </group>
      ))}
      <group position={[0, 4.7, 2]}>
        <mesh><cylinderGeometry args={[0.02, 0.02, 0.4, 6]} /><meshStandardMaterial color="#c4a878" metalness={0.9} roughness={0.2} /></mesh>
        <mesh position={[0, -0.3, 0]}><sphereGeometry args={[0.18, 20, 16]} /><meshStandardMaterial color="#f4d9a8" emissive="#f4d9a8" emissiveIntensity={1.6} /></mesh>
        <pointLight position={[0, -0.3, 0]} intensity={1.8} distance={10} color="#ffdca0" />
      </group>
    </group>
  );
}
