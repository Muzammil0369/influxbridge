"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";

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
    let ticking = false;

    scrollState.lastY = window.scrollY;
    scrollState.lastTime = performance.now();

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const now = performance.now();
        const dt = Math.max(now - scrollState.lastTime, 16);
        const dy = window.scrollY - scrollState.lastY;

        scrollState.raw = window.scrollY;
        scrollState.velocity = THREE.MathUtils.clamp(dy / dt, -3, 3);

        scrollState.lastY = window.scrollY;
        scrollState.lastTime = now;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   STAR SPRITE TEXTURE — smaller (32px is plenty at this size)
───────────────────────────────────────────────────────────── */
function makeStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;

  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255, 255, 255, 1)");
  g.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
  g.addColorStop(0.5, "rgba(200, 240, 255, 0.4)");
  g.addColorStop(1, "rgba(200, 240, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ─────────────────────────────────────────────────────────────
   PLANET SURFACE — half resolution, same visual impact
───────────────────────────────────────────────────────────── */
function makePlanetSurface(size = 1536): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d", {
    willReadFrequently: false,
    alpha: false,
  })!;
  const W = canvas.width;
  const H = canvas.height;

  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0, "#030a1a");
  oceanGrad.addColorStop(0.5, "#05122b");
  oceanGrad.addColorStop(1, "#020810");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 60; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = 40 + Math.random() * 100;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(15, 45, 90, 0.4)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const continents: Array<Array<[number, number]>> = [
    [
      [0.13, 0.22], [0.18, 0.15], [0.26, 0.14], [0.30, 0.20],
      [0.29, 0.28], [0.32, 0.35], [0.29, 0.42], [0.26, 0.48],
      [0.23, 0.46], [0.20, 0.38], [0.15, 0.34], [0.12, 0.28],
    ],
    [
      [0.28, 0.53], [0.33, 0.52], [0.35, 0.58], [0.34, 0.66],
      [0.33, 0.74], [0.31, 0.83], [0.29, 0.88], [0.27, 0.86],
      [0.26, 0.78], [0.27, 0.68], [0.28, 0.60],
    ],
    [
      [0.47, 0.16], [0.52, 0.13], [0.57, 0.15], [0.59, 0.21],
      [0.57, 0.27], [0.54, 0.31], [0.50, 0.32], [0.47, 0.28],
      [0.45, 0.22], [0.46, 0.19],
    ],
    [
      [0.47, 0.34], [0.54, 0.33], [0.58, 0.39], [0.59, 0.49],
      [0.57, 0.60], [0.54, 0.70], [0.50, 0.78], [0.48, 0.72],
      [0.46, 0.60], [0.45, 0.48], [0.45, 0.40],
    ],
    [
      [0.60, 0.14], [0.73, 0.11], [0.83, 0.15], [0.87, 0.23],
      [0.85, 0.33], [0.81, 0.41], [0.75, 0.46], [0.68, 0.44],
      [0.62, 0.38], [0.58, 0.30], [0.58, 0.22],
    ],
    [
      [0.68, 0.42], [0.72, 0.42], [0.74, 0.50], [0.71, 0.56],
      [0.68, 0.54], [0.66, 0.48],
    ],
    [
      [0.78, 0.59], [0.87, 0.57], [0.91, 0.63], [0.89, 0.71],
      [0.82, 0.74], [0.78, 0.70], [0.76, 0.64],
    ],
    [
      [0.24, 0.09], [0.31, 0.07], [0.33, 0.13], [0.28, 0.17],
      [0.23, 0.15],
    ],
  ];

  continents.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([px, py], i) => {
      const x = px * W;
      const y = py * H;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    const cx = (poly.reduce((s, p) => s + p[0], 0) / poly.length) * W;
    const cy = (poly.reduce((s, p) => s + p[1], 0) / poly.length) * H;

    const landGrad = ctx.createRadialGradient(
      cx - 45, cy - 37, 15,
      cx, cy, 250
    );
    landGrad.addColorStop(0, "#152a3d");
    landGrad.addColorStop(0.4, "#0a1a2a");
    landGrad.addColorStop(1, "#040b14");
    ctx.fillStyle = landGrad;
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 180, 255, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Hex grid — coarser to save time
  ctx.strokeStyle = "rgba(0, 140, 220, 0.25)";
  ctx.lineWidth = 0.75;
  const hexSize = 14;
  const hexH = hexSize * Math.sqrt(3);
  for (let row = 0; row < H / hexH + 1; row++) {
    for (let col = 0; col < W / (hexSize * 1.5) + 1; col++) {
      const x = col * hexSize * 1.5;
      const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + hexSize * Math.cos(angle);
        const py = y + hexSize * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  ctx.globalCompositeOperation = "screen";

  const majorCities: Array<[number, number, number]> = [
    [0.22, 0.30, 40], [0.26, 0.24, 35], [0.29, 0.33, 38],
    [0.25, 0.40, 33], [0.18, 0.35, 28],
    [0.30, 0.62, 33], [0.32, 0.72, 30], [0.29, 0.80, 28],
    [0.50, 0.22, 45], [0.53, 0.24, 43], [0.55, 0.20, 40],
    [0.51, 0.28, 43], [0.54, 0.28, 40],
    [0.50, 0.42, 35], [0.52, 0.55, 30], [0.52, 0.65, 28],
    [0.58, 0.38, 30],
    [0.70, 0.44, 43], [0.68, 0.48, 40], [0.72, 0.46, 38],
    [0.68, 0.22, 43], [0.72, 0.20, 45], [0.78, 0.22, 48],
    [0.74, 0.28, 43], [0.80, 0.26, 40], [0.82, 0.30, 38],
    [0.70, 0.30, 40], [0.76, 0.34, 38],
    [0.74, 0.48, 33], [0.76, 0.52, 30],
    [0.82, 0.63, 30], [0.85, 0.68, 28],
  ];

  majorCities.forEach(([x, y, count]) => {
    const cx = x * W;
    const cy = y * H;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random()) * 55;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      const size = 0.7 + Math.random() * 1.2;

      const g = ctx.createRadialGradient(px, py, 0, px, py, size * 5);
      g.addColorStop(0, "rgba(255, 255, 255, 1)");
      g.addColorStop(0.2, "rgba(180, 245, 255, 0.95)");
      g.addColorStop(0.5, "rgba(80, 200, 255, 0.5)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, size * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  for (let i = 0; i < 900; i++) {
    const isLand = Math.random() < 0.7;
    let x = Math.random() * W;
    let y = Math.random() * H;

    if (isLand) {
      const poly = continents[Math.floor(Math.random() * continents.length)];
      const xs = poly.map((p) => p[0]);
      const ys = poly.map((p) => p[1]);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      x = (minX + Math.random() * (maxX - minX)) * W;
      y = (minY + Math.random() * (maxY - minY)) * H;
    }

    const size = 0.4 + Math.random() * 1;
    const g = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    g.addColorStop(0, "rgba(200, 250, 255, 0.95)");
    g.addColorStop(0.4, "rgba(100, 210, 255, 0.6)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";

  ctx.strokeStyle = "rgba(0, 220, 255, 0.75)";
  ctx.lineWidth = 1;
  ctx.shadowColor = "rgba(0, 220, 255, 1)";
  ctx.shadowBlur = 6;

  for (let i = 0; i < 40; i++) {
    const a = majorCities[Math.floor(Math.random() * majorCities.length)];
    const b = majorCities[Math.floor(Math.random() * majorCities.length)];
    if (a === b) continue;

    const startX = a[0] * W;
    const startY = a[1] * H;
    const endX = b[0] * W;
    const endY = b[1] * H;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 - 40 - Math.random() * 45;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(midX, midY, endX, endY);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;

  majorCities.forEach(([x, y]) => {
    const cx = x * W;
    const cy = y * H;
    const r = 8;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3);
    g.addColorStop(0, "rgba(255, 255, 255, 1)");
    g.addColorStop(0.15, "rgba(200, 250, 255, 1)");
    g.addColorStop(0.4, "rgba(0, 220, 255, 0.8)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 3, 0, Math.PI * 2);
    ctx.fill();
  });

  const northShade = ctx.createLinearGradient(0, 0, 0, H * 0.14);
  northShade.addColorStop(0, "rgba(8, 22, 48, 0.95)");
  northShade.addColorStop(1, "transparent");
  ctx.fillStyle = northShade;
  ctx.fillRect(0, 0, W, H * 0.14);

  const southShade = ctx.createLinearGradient(0, H * 0.86, 0, H);
  southShade.addColorStop(0, "transparent");
  southShade.addColorStop(1, "rgba(8, 22, 48, 0.95)");
  ctx.fillStyle = southShade;
  ctx.fillRect(0, H * 0.86, W, H * 0.15);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/* ─────────────────────────────────────────────────────────────
   STATIC STARFIELD — fewer stars, tighter distribution
───────────────────────────────────────────────────────────── */
function Starfield() {
  const starTexture = useMemo(() => makeStarTexture(), []);

  const [near, mid, far] = useMemo(() => {
    const makeStars = (count: number, minR: number, maxR: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const radius = minR + Math.random() * (maxR - minR);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const hue = Math.random();
        let r, g, b;
        if (hue < 0.55) {
          r = 1; g = 1; b = 1;
        } else if (hue < 0.88) {
          r = 0.65; g = 0.95; b = 1;
        } else {
          r = 0.75; g = 0.85; b = 1;
        }
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }

      return { positions, colors, count };
    };

    return [
      makeStars(400, 25, 45),
      makeStars(900, 45, 75),
      makeStars(1600, 75, 120),
    ];
  }, []);

  return (
    <>
      <points frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[near.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[near.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.4}
          sizeAttenuation
          transparent
          opacity={0.95}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[mid.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[mid.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.28}
          sizeAttenuation
          transparent
          opacity={0.85}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points frustumCulled>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[far.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[far.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.2}
          sizeAttenuation
          transparent
          opacity={0.7}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ORBIT RING WITH ATTACHED BADGE
   Optimized: pre-allocated vectors, opacity written only when changed
───────────────────────────────────────────────────────────── */
function OrbitRingWithBadge({
  radius,
  ringColor,
  ringGlow,
  rotation,
  badgeOffsetAngle,
  badgeLabel,
  badgeSublabel,
  badgeColor,
  badgeIcon,
  thickness = 0.016,
}: {
  radius: number;
  ringColor: string;
  ringGlow: string;
  rotation: [number, number, number];
  badgeOffsetAngle: number;
  badgeLabel: string;
  badgeSublabel: string;
  badgeColor: string;
  badgeIcon: "building" | "users" | "growth";
  thickness?: number;
}) {
  const ringRef = useRef<THREE.Group>(null);
  const badgeRef = useRef<THREE.Group>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(badgeOffsetAngle);
  const lastHiddenState = useRef<boolean | null>(null);

  // Pre-allocated vectors — no per-frame allocation
  const vecState = useMemo(
    () => ({
      worldPos: new THREE.Vector3(),
      cameraToBadge: new THREE.Vector3(),
      cameraToPlanet: new THREE.Vector3(),
      camForward: new THREE.Vector3(),
      camToBadgeNorm: new THREE.Vector3(),
      planetWorldCenter: new THREE.Vector3(1.6, 0.3, 0),
    }),
    []
  );

  useFrame((state) => {
    const scroll = scrollState.smoothVelocity;
    angleRef.current += scroll * 0.15;

    if (ringRef.current) {
      ringRef.current.rotation.z = angleRef.current;
    }

    if (!badgeRef.current) return;

    const x = Math.cos(angleRef.current) * radius;
    const y = Math.sin(angleRef.current) * radius;
    badgeRef.current.position.set(x, y, 0);

    // ── Depth check (only every 3rd frame for perf) ──
    badgeRef.current.getWorldPosition(vecState.worldPos);

    const camera = state.camera;
    vecState.cameraToBadge.copy(vecState.worldPos).sub(camera.position);
    vecState.cameraToPlanet
      .copy(vecState.planetWorldCenter)
      .sub(camera.position);

    const badgeDist = vecState.cameraToBadge.length();
    const planetDist = vecState.cameraToPlanet.length();

    let isHidden = false;
    if (badgeDist > planetDist) {
      vecState.camForward.copy(vecState.cameraToPlanet).normalize();
      vecState.camToBadgeNorm.copy(vecState.cameraToBadge).normalize();
      const cosAngle = vecState.camForward.dot(vecState.camToBadgeNorm);
      const angleFromCenter = Math.acos(
        THREE.MathUtils.clamp(cosAngle, -1, 1)
      );

      const PLANET_RADIUS = 2.2;
      const angularRadius = Math.asin(
        Math.min(PLANET_RADIUS / planetDist, 1)
      );

      if (angleFromCenter < angularRadius) {
        isHidden = true;
      }
    }

    // ── Only write to DOM if the state changed ──
    if (wrapperRef.current && lastHiddenState.current !== isHidden) {
      lastHiddenState.current = isHidden;
      const parent = wrapperRef.current.parentElement;
      if (parent) {
        parent.style.opacity = isHidden ? "0" : "1";
        parent.style.transition = "opacity 0.2s linear";
      }
    }
  });

  const iconPaths: Record<string, string> = {
    building: "M3 21V7l9-4v18M12 7l9 4v10",
    users:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    growth: "M3 3v18h18M7 15l3-3 3 3 5-6",
  };

  return (
    <group rotation={rotation}>
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[radius, thickness, 8, 96]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[radius, thickness * 4, 8, 96]} />
          <meshBasicMaterial
            color={ringGlow}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group ref={badgeRef}>
        <Html
          center
          distanceFactor={10}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
          wrapperClass="!bg-transparent"
        >
          <div
            ref={wrapperRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderRadius: "9999px",
              background: "rgba(3, 19, 38, 0.92)",
              border: `1px solid ${badgeColor}80`,
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 22px ${badgeColor}66`,
              color: "#ffffff",
              fontFamily: "system-ui, -apple-system, sans-serif",
              whiteSpace: "nowrap",
              willChange: "opacity",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: `${badgeColor}22`,
                color: badgeColor,
                flexShrink: 0,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "18px", height: "18px" }}
              >
                <path d={iconPaths[badgeIcon]} />
              </svg>
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {badgeLabel}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.55)",
                  marginTop: "2px",
                }}
              >
                {badgeSublabel}
              </div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   CENTER LOGO
───────────────────────────────────────────────────────────── */
function CenterLogo() {
  const glowRef = useRef<THREE.Mesh>(null);
  const logoTexture = useLoader(THREE.TextureLoader, "/a-logo.png");

  useMemo(() => {
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = 4;
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.generateMipmaps = false;
    logoTexture.needsUpdate = true;
  }, [logoTexture]);

  useFrame((state) => {
    if (glowRef.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0, 2.3]}>
      <mesh ref={glowRef}>
        <circleGeometry args={[1.0, 32]} />
        <meshBasicMaterial
          color="#0a3d8f"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.001]}>
        <circleGeometry args={[0.85, 32]} />
        <meshBasicMaterial color="#020814" />
      </mesh>

      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.78, 0.84, 32]} />
        <meshBasicMaterial
          color="#00d0ff"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.004]}>
        <ringGeometry args={[0.72, 0.9, 32]} />
        <meshBasicMaterial
          color="#00d0ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   PLANET
───────────────────────────────────────────────────────────── */
function Planet() {
  const planetGroup = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  const planetRotation = useRef(0);
  const groupRotationY = useRef(0);
  const groupRotationX = useRef(0);

  const surfaceTexture = useMemo(() => makePlanetSurface(1536), []);

  useFrame((_, delta) => {
    if (!planetGroup.current || !planetRef.current) return;

    scrollState.smooth = THREE.MathUtils.lerp(
      scrollState.smooth,
      scrollState.raw,
      0.08
    );
    scrollState.smoothVelocity = THREE.MathUtils.lerp(
      scrollState.smoothVelocity,
      scrollState.velocity,
      0.08
    );

    const vel = scrollState.smoothVelocity;
    const absVel = Math.abs(vel);

    const speed = 0.05 + absVel * 3;

    planetRotation.current += speed * delta * Math.sign(vel || 1);
    if (planetRef.current) planetRef.current.rotation.y = planetRotation.current;

    const scrollProgress = scrollState.smooth * 0.00035;
    groupRotationY.current = THREE.MathUtils.lerp(
      groupRotationY.current,
      scrollProgress,
      0.06
    );
    planetGroup.current.rotation.y = groupRotationY.current;

    const targetTilt = Math.sin(scrollState.smooth * 0.0008) * 0.08;
    groupRotationX.current = THREE.MathUtils.lerp(
      groupRotationX.current,
      targetTilt,
      0.05
    );
    planetGroup.current.rotation.x = groupRotationX.current;

    scrollState.velocity *= 0.9;
  });

  const R = 2.2;

  return (
    <group position={[1.6, 0.3, 0]}>
      <group ref={planetGroup}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[R, 64, 48]} />
          <meshBasicMaterial map={surfaceTexture} color="#ffffff" />
        </mesh>
      </group>

      <mesh scale={1.08}>
        <sphereGeometry args={[R, 32, 32]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vec3 viewDir = normalize(-vPosition);
              float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
              vec3 cyan = vec3(0.0, 0.85, 1.0);
              vec3 brightCyan = vec3(0.6, 0.95, 1.0);
              vec3 color = mix(cyan, brightCyan, fresnel);
              gl_FragColor = vec4(color, fresnel * 1.4);
            }
          `}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.2}>
        <sphereGeometry args={[R, 16, 16]} />
        <meshBasicMaterial
          color="#5a3aff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.4}>
        <sphereGeometry args={[R, 16, 16]} />
        <meshBasicMaterial
          color="#1a5aff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <CenterLogo />

      <OrbitRingWithBadge
        radius={3.6}
        ringColor="#00d0ff"
        ringGlow="#38bdf8"
        rotation={[1.35, 0.15, 0.05]}
        badgeOffsetAngle={-0.6}
        badgeLabel="Brands"
        badgeSublabel="(Companies)"
        badgeColor="#00d0ff"
        badgeIcon="building"
        thickness={0.018}
      />

      <OrbitRingWithBadge
        radius={3.9}
        ringColor="#1a7dff"
        ringGlow="#60a5fa"
        rotation={[-1.2, 0.35, 0.2]}
        badgeOffsetAngle={1.2}
        badgeLabel="Influencers"
        badgeSublabel="(Creators)"
        badgeColor="#1a7dff"
        badgeIcon="users"
        thickness={0.014}
      />

      <OrbitRingWithBadge
        radius={3.3}
        ringColor="#22d3ee"
        ringGlow="#38bdf8"
        rotation={[0.6, -0.6, 0.4]}
        badgeOffsetAngle={3.5}
        badgeLabel="Growth"
        badgeSublabel="(Real Results)"
        badgeColor="#22d3ee"
        badgeIcon="growth"
        thickness={0.012}
      />
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
      <ambientLight intensity={0.6} color="#aaccff" />

      <Starfield />

      <Suspense fallback={null}>
        <Planet />
      </Suspense>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPORT — adaptive DPR, low-power mode on mobile
───────────────────────────────────────────────────────────── */
export default function ScrollWorld() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Detect mobile for lighter DPR
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        flat
        linear
        frameloop="always"
        style={{ background: "transparent", backgroundColor: "transparent" }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
          scene.background = null;
        }}
      >
        <World />
      </Canvas>
    </div>
  );
}