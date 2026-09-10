"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   EARTH TEXTURE
───────────────────────────────────────────────────────────── */
function makeEarthTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d")!;
  const W = canvas.width;
  const H = canvas.height;

  const oceanGrad = ctx.createLinearGradient(0, 0, W, H);
  oceanGrad.addColorStop(0, "#020e2e");
  oceanGrad.addColorStop(0.5, "#031540");
  oceanGrad.addColorStop(1, "#010b22");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = 0.06;
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 80 + Math.random() * 120);
    g.addColorStop(0, "#1a6aff");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.globalAlpha = 1;

  const continents: [number, number, number, number, number][] = [
    [0.52, 0.28, 0.055, 0.09, -5],
    [0.52, 0.48, 0.065, 0.14, 5],
    [0.23, 0.26, 0.065, 0.1, -8],
    [0.27, 0.55, 0.05, 0.12, 6],
    [0.68, 0.25, 0.11, 0.1, -3],
    [0.77, 0.58, 0.045, 0.05, 3],
    [0.22, 0.1, 0.04, 0.05, 0],
    [0.5, 0.9, 0.22, 0.025, 0],
  ];

  continents.forEach(([cxF, cyF, rxF, ryF, rot]) => {
    const cx = cxF * W;
    const cy = cyF * H;
    const rx = rxF * W;
    const ry = ryF * H;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rot * Math.PI) / 180);

    const landGrad = ctx.createRadialGradient(-rx * 0.3, -ry * 0.3, 0, 0, 0, Math.max(rx, ry));
    landGrad.addColorStop(0, "#1a3a2a");
    landGrad.addColorStop(0.5, "#0f2a1e");
    landGrad.addColorStop(1, "#071510");

    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = landGrad;
    ctx.fill();

    const hiGrad = ctx.createRadialGradient(-rx * 0.4, -ry * 0.4, 0, 0, 0, rx * 0.7);
    hiGrad.addColorStop(0, "rgba(40,90,60,0.5)");
    hiGrad.addColorStop(1, "transparent");
    ctx.fillStyle = hiGrad;
    ctx.fill();

    ctx.restore();
  });

  ctx.globalCompositeOperation = "screen";
  continents.forEach(([cxF, cyF, rxF, ryF]) => {
    const cx = cxF * W;
    const cy = cyF * H;
    const rx = rxF * W;
    const ry = ryF * H;
    const count = Math.floor(15 + Math.random() * 20);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      const x = cx + rx * r * Math.cos(angle);
      const y = cy + ry * r * Math.sin(angle);
      const size = 1 + Math.random() * 2.5;
      const g = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      g.addColorStop(0, "rgba(255,220,100,0.9)");
      g.addColorStop(0.4, "rgba(100,160,255,0.4)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.globalCompositeOperation = "source-over";

  const northIce = ctx.createLinearGradient(0, 0, 0, H * 0.14);
  northIce.addColorStop(0, "rgba(200,230,255,0.85)");
  northIce.addColorStop(1, "transparent");
  ctx.fillStyle = northIce;
  ctx.fillRect(0, 0, W, H * 0.14);

  const southIce = ctx.createLinearGradient(0, H * 0.86, 0, H);
  southIce.addColorStop(0, "transparent");
  southIce.addColorStop(1, "rgba(200,230,255,0.7)");
  ctx.fillStyle = southIce;
  ctx.fillRect(0, H * 0.86, W, H * 0.14);

  const litGrad = ctx.createRadialGradient(W * 0.3, H * 0.25, 0, W * 0.5, H * 0.5, W * 0.65);
  litGrad.addColorStop(0, "rgba(80,140,255,0.22)");
  litGrad.addColorStop(0.5, "rgba(20,60,180,0.04)");
  litGrad.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = litGrad;
  ctx.fillRect(0, 0, W, H);

  return new THREE.CanvasTexture(canvas);
}

/* ─────────────────────────────────────────────────────────────
   SCROLL STATE
───────────────────────────────────────────────────────────── */
const scrollState = {
  raw: 0,
  smooth: 0,
  velocity: 0,
  smoothVelocity: 0,
  lastY: 0,
  lastTime: 0,
};

function useScrollTracker() {
  useEffect(() => {
    scrollState.lastY = window.scrollY;
    scrollState.lastTime = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - scrollState.lastTime, 16);
      const dy = window.scrollY - scrollState.lastY;

      scrollState.raw = window.scrollY;
      scrollState.velocity = THREE.MathUtils.clamp(dy / dt, -3, 3);

      scrollState.lastY = window.scrollY;
      scrollState.lastTime = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   GLOG RING
───────────────────────────────────────────────────────────── */
function GlowRing({
  radius,
  tubeRadius,
  color,
  glowColor,
  opacity,
  rotation,
  animate = false,
  speed = 0.003,
}: {
  radius: number;
  tubeRadius: number;
  color: string;
  glowColor: string;
  opacity: number;
  rotation: [number, number, number];
  animate?: boolean;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (animate && ref.current) {
      const boost = Math.abs(scrollState.smoothVelocity) * 0.4;
      ref.current.rotation.z += (speed + boost * speed * 20) * (delta * 60);
    }
  });

  return (
    <group ref={ref} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, tubeRadius, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[radius, tubeRadius * 3.5, 12, 128]} />
        <meshBasicMaterial color={glowColor} transparent opacity={opacity * 0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[radius, tubeRadius * 7, 8, 96]} />
        <meshBasicMaterial color={glowColor} transparent opacity={opacity * 0.07} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   ORBITAL SATELLITE
───────────────────────────────────────────────────────────── */
function OrbitalSphere({
  radius,
  orbitRotation,
  phase,
  size,
  color,
  speed,
}: {
  radius: number;
  orbitRotation: [number, number, number];
  phase: number;
  size: number;
  color: string;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const angle = useRef(phase);

  useFrame((_, delta) => {
    const boost = Math.abs(scrollState.smoothVelocity) * 0.6;
    angle.current += (speed + Math.sign(speed) * boost * 0.05) * delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = angle.current;
    }
  });

  return (
    <group rotation={orbitRotation}>
      <group ref={groupRef}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size * 2.5, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size * 5, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   NEBULA CLOUD
───────────────────────────────────────────────────────────── */
function NebulaCloud({
  position,
  scale,
  color,
  opacity,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOLO PLANET — scroll reactive, NO logo, NO terrain
───────────────────────────────────────────────────────────── */
function HoloPlanet() {
  const planetGroup = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitsRef = useRef<THREE.Group>(null);

  const earthRotation = useRef(0);
  const groupRotationY = useRef(0);
  const groupRotationX = useRef(0);
  const orbitRotation = useRef(0);

  const earthTexture = useMemo(() => makeEarthTexture(512), []);

  useFrame((_, delta) => {
    if (!planetGroup.current || !coreRef.current || !orbitsRef.current) return;

    scrollState.smooth = THREE.MathUtils.lerp(scrollState.smooth, scrollState.raw, 0.08);
    scrollState.smoothVelocity = THREE.MathUtils.lerp(scrollState.smoothVelocity, scrollState.velocity, 0.08);

    const vel = scrollState.smoothVelocity;
    const absVel = Math.abs(vel);

    const baseEarthSpeed = 0.04;
    const scrollBoost = absVel * 2.2;

    const earthSpeed = baseEarthSpeed + scrollBoost;
    earthRotation.current += earthSpeed * delta * Math.sign(vel || 1);
    coreRef.current.rotation.y = earthRotation.current;

    const scrollProgress = scrollState.smooth * 0.00035;

    groupRotationY.current = THREE.MathUtils.lerp(groupRotationY.current, scrollProgress + vel * 0.15, 0.06);
    planetGroup.current.rotation.y = groupRotationY.current;

    const targetTilt = Math.sin(scrollState.smooth * 0.0008) * 0.08 + vel * 0.05;
    groupRotationX.current = THREE.MathUtils.lerp(groupRotationX.current, targetTilt, 0.05);
    planetGroup.current.rotation.x = groupRotationX.current;

    const targetScale = 1 + absVel * 0.03;
    const cur = planetGroup.current.scale.x;
    const next = THREE.MathUtils.lerp(cur, targetScale, 0.08);
    planetGroup.current.scale.setScalar(next);

    orbitRotation.current += (0.008 + absVel * 0.15) * delta;
    orbitsRef.current.rotation.y = orbitRotation.current;

    scrollState.velocity *= 0.9;
  });

  const PLANET_R = 2.2;

  return (
    <group ref={planetGroup} position={[1.6, 0.3, 0]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[PLANET_R, 48, 48]} />
        <meshStandardMaterial map={earthTexture} roughness={0.65} metalness={0.05} emissive="#0a1a40" emissiveIntensity={0.3} />
      </mesh>

      <mesh>
        <sphereGeometry args={[PLANET_R + 0.008, 24, 12]} />
        <meshBasicMaterial color="#1a50cc" wireframe transparent opacity={0.07} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[PLANET_R, 24, 24]} />
        <meshBasicMaterial color="#1a5aff" transparent opacity={0.08} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh scale={1.18}>
        <sphereGeometry args={[PLANET_R, 24, 24]} />
        <meshBasicMaterial color="#2255ee" transparent opacity={0.055} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh scale={1.08}>
        <sphereGeometry args={[PLANET_R, 24, 24]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.04} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={orbitsRef}>
        <GlowRing radius={3.5} tubeRadius={0.018} color="#f4c430" glowColor="#ffd700" opacity={0.85} rotation={[1.3, 0.15, 0.05]} animate speed={0.004} />
        <GlowRing radius={4.1} tubeRadius={0.014} color="#22d3ee" glowColor="#38bdf8" opacity={0.7} rotation={[-0.7, 0.35, 0.2]} animate speed={-0.003} />
        <GlowRing radius={3.0} tubeRadius={0.01} color="#a855f7" glowColor="#c084fc" opacity={0.45} rotation={[0.4, -0.5, -0.7]} animate speed={0.002} />
        <GlowRing radius={2.55} tubeRadius={0.007} color="#60a5fa" glowColor="#3b82f6" opacity={0.3} rotation={[0.8, 0.2, 1.1]} />

        <OrbitalSphere radius={3.5} orbitRotation={[1.3, 0.15, 0.05]} phase={0.8} size={0.07} color="#22d3ee" speed={0.4} />
        <OrbitalSphere radius={4.1} orbitRotation={[-0.7, 0.35, 0.2]} phase={2.2} size={0.1} color="#60a5fa" speed={-0.25} />
        <OrbitalSphere radius={3.0} orbitRotation={[0.4, -0.5, -0.7]} phase={1.5} size={0.055} color="#c084fc" speed={0.55} />
        <OrbitalSphere radius={4.1} orbitRotation={[-0.7, 0.35, 0.2]} phase={5.0} size={0.065} color="#22d3ee" speed={-0.25} />
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORLD
───────────────────────────────────────────────────────────── */
function World() {
  useScrollTracker();

  return (
    <>
      <fog attach="fog" args={["#020617", 10, 28]} />

      <ambientLight intensity={0.5} color="#aaccff" />
      <directionalLight position={[-4, 5, 4]} intensity={3.5} color="#8bb8ff" />
      <directionalLight position={[5, -2, -3]} intensity={0.6} color="#5533aa" />
      <pointLight position={[0, 0, 5]} intensity={10} distance={12} color="#22d3ee" />
      <pointLight position={[0, -5, 2]} intensity={4} distance={10} color="#1a3aff" />

      <Stars radius={90} depth={50} count={1500} factor={3.5} saturation={0.6} fade speed={0.35} />
      <Sparkles count={100} scale={[20, 14, 10]} size={1.2} speed={0.15} opacity={0.25} color="#88bbff" />

      <NebulaCloud position={[-7, 2, -8]} scale={5} color="#0a1a6a" opacity={0.18} />
      <NebulaCloud position={[7, -1, -9]} scale={4} color="#0a0a40" opacity={0.14} />
      <NebulaCloud position={[0, -3, -10]} scale={7} color="#040820" opacity={0.25} />
      <NebulaCloud position={[-3, 3, -7]} scale={3.5} color="#0d1550" opacity={0.12} />

      <HoloPlanet />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────────────── */
export default function ScrollWorld() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <World />
      </Canvas>
    </div>
  );
}