"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   ULTRA-HD PROCEDURAL EARTH TEXTURE
───────────────────────────────────────────────────────────── */
function makeEarthTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d")!;
  const W = canvas.width;
  const H = canvas.height;

  // Deep space-blue ocean gradient with atmospheric depth
  const oceanGrad = ctx.createLinearGradient(0, 0, W, H);
  oceanGrad.addColorStop(0, "#010818");
  oceanGrad.addColorStop(0.5, "#020f30");
  oceanGrad.addColorStop(1, "#010614");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  // Bioluminescent deep-sea grid / data currents
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 100 + Math.random() * 150);
    g.addColorStop(0, "#00f0ff");
    g.addColorStop(0.5, "#1a6aff");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.globalAlpha = 1;

  // Cinematic continental plates with cybernetic tech lines
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
    landGrad.addColorStop(0, "#0d2822");
    landGrad.addColorStop(0.5, "#071814");
    landGrad.addColorStop(1, "#030c0a");

    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = landGrad;
    ctx.fill();

    const hiGrad = ctx.createRadialGradient(-rx * 0.4, -ry * 0.4, 0, 0, 0, rx * 0.7);
    hiGrad.addColorStop(0, "rgba(0,240,255,0.35)");
    hiGrad.addColorStop(1, "transparent");
    ctx.fillStyle = hiGrad;
    ctx.fill();

    ctx.restore();
  });

  // Glowing node city lights
  ctx.globalCompositeOperation = "screen";
  continents.forEach(([cxF, cyF, rxF, ryF]) => {
    const cx = cxF * W;
    const cy = cyF * H;
    const rx = rxF * W;
    const ry = ryF * H;
    const count = Math.floor(30 + Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      const x = cx + rx * r * Math.cos(angle);
      const y = cy + ry * r * Math.sin(angle);
      const size = 1 + Math.random() * 2;
      const g = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
      g.addColorStop(0, "rgba(0,240,255,0.95)");
      g.addColorStop(0.4, "rgba(100,180,255,0.5)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, size * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.globalCompositeOperation = "source-over";

  // Atmospheric polar ice caps
  const northIce = ctx.createLinearGradient(0, 0, 0, H * 0.14);
  northIce.addColorStop(0, "rgba(220,240,255,0.95)");
  northIce.addColorStop(1, "transparent");
  ctx.fillStyle = northIce;
  ctx.fillRect(0, 0, W, H * 0.14);

  const southIce = ctx.createLinearGradient(0, H * 0.86, 0, H);
  southIce.addColorStop(0, "transparent");
  southIce.addColorStop(1, "rgba(220,240,255,0.85)");
  ctx.fillStyle = southIce;
  ctx.fillRect(0, H * 0.86, W, H * 0.14);

  // Cinematic sun lighting gradient overlay
  const litGrad = ctx.createRadialGradient(W * 0.3, H * 0.25, 0, W * 0.5, H * 0.5, W * 0.65);
  litGrad.addColorStop(0, "rgba(0,180,255,0.28)");
  litGrad.addColorStop(0.5, "rgba(10,50,160,0.06)");
  litGrad.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = litGrad;
  ctx.fillRect(0, 0, W, H);

  return new THREE.CanvasTexture(canvas);
}

/* ─────────────────────────────────────────────────────────────
   SCROLL STATE TRACKING
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
   PRECISE GLOW RING
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
      ref.current.rotation.z += (speed + boost * speed * 20) * delta;
    }
  });

  return (
    <group ref={ref} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, tubeRadius, 32, 256]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[radius, tubeRadius * 3.5, 16, 256]} />
        <meshBasicMaterial color={glowColor} transparent opacity={opacity * 0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
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
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size * 3, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
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
      <sphereGeometry args={[scale, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOLO PLANET — AGENCY GRADE VISUAL FIDELITY
───────────────────────────────────────────────────────────── */
function HoloPlanet() {
  const planetGroup = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitsRef = useRef<THREE.Group>(null);

  const earthRotation = useRef(0);
  const groupRotationY = useRef(0);
  const groupRotationX = useRef(0);
  const orbitRotation = useRef(0);

  const earthTexture = useMemo(() => makeEarthTexture(1024), []);

  useFrame((_, delta) => {
    if (!planetGroup.current || !coreRef.current || !orbitsRef.current) return;

    scrollState.smooth = THREE.MathUtils.lerp(scrollState.smooth, scrollState.raw, 0.08);
    scrollState.smoothVelocity = THREE.MathUtils.lerp(scrollState.smoothVelocity, scrollState.velocity, 0.08);

    const vel = scrollState.smoothVelocity;
    const absVel = Math.abs(vel);

    const baseEarthSpeed = 0.035;
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
      {/* High-poly crisp sphere geometry */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[PLANET_R, 96, 96]} />
        <meshStandardMaterial map={earthTexture} roughness={0.6} metalness={0.1} emissive="#002244" emissiveIntensity={0.35} />
      </mesh>

      {/* Cyber wireframe grid overlay */}
      <mesh>
        <sphereGeometry args={[PLANET_R + 0.01, 32, 16]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Cinematic multi-layered atmospheric rim glow */}
      <mesh scale={1.04}>
        <sphereGeometry args={[PLANET_R, 48, 48]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.1} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh scale={1.15}>
        <sphereGeometry args={[PLANET_R, 48, 48]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={orbitsRef}>
        <GlowRing radius={3.5} tubeRadius={0.018} color="#f4c430" glowColor="#ffd700" opacity={0.9} rotation={[1.3, 0.15, 0.05]} animate speed={0.004} />
        <GlowRing radius={4.1} tubeRadius={0.014} color="#00f0ff" glowColor="#38bdf8" opacity={0.8} rotation={[-0.7, 0.35, 0.2]} animate speed={-0.003} />
        <GlowRing radius={3.0} tubeRadius={0.01} color="#a855f7" glowColor="#c084fc" opacity={0.5} rotation={[0.4, -0.5, -0.7]} animate speed={0.002} />
        <GlowRing radius={2.55} tubeRadius={0.007} color="#60a5fa" glowColor="#3b82f6" opacity={0.35} rotation={[0.8, 0.2, 1.1]} />

        <OrbitalSphere radius={3.5} orbitRotation={[1.3, 0.15, 0.05]} phase={0.8} size={0.07} color="#00f0ff" speed={0.4} />
        <OrbitalSphere radius={4.1} orbitRotation={[-0.7, 0.35, 0.2]} phase={2.2} size={0.1} color="#60a5fa" speed={-0.25} />
        <OrbitalSphere radius={3.0} orbitRotation={[0.4, -0.5, -0.7]} phase={1.5} size={0.055} color="#c084fc" speed={0.55} />
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORLD ENVIRONMENT
───────────────────────────────────────────────────────────── */
function World() {
  useScrollTracker();

  return (
    <>
      <fog attach="fog" args={["#010409", 10, 28]} />

      <ambientLight intensity={0.6} color="#aaccff" />
      <directionalLight position={[-4, 5, 4]} intensity={4.0} color="#99ccff" />
      <directionalLight position={[5, -2, -3]} intensity={0.8} color="#6644cc" />
      <pointLight position={[0, 0, 5]} intensity={12} distance={12} color="#00f0ff" />

      <Stars radius={90} depth={50} count={3500} factor={3.5} saturation={0.8} fade speed={0.35} />
      <Sparkles count={200} scale={[20, 14, 10]} size={1.3} speed={0.15} opacity={0.3} color="#00f0ff" />

      <NebulaCloud position={[-7, 2, -8]} scale={6} color="#051040" opacity={0.22} />
      <NebulaCloud position={[7, -1, -9]} scale={5} color="#020420" opacity={0.18} />
      <NebulaCloud position={[0, -3, -10]} scale={8} color="#010210" opacity={0.3} />

      <HoloPlanet />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPORT CANVAS (High-End Agency Configuration)
───────────────────────────────────────────────────────────── */
export default function ScrollWorld() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 42 }}
        dpr={[1, 2]} // Crisp rendering on high-res displays while protecting performance
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <World />
      </Canvas>
    </div>
  );
}