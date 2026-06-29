"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- tiny value-noise / fbm (no deps) ---------- */
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const tl = hash(xi, yi);
  const tr = hash(xi + 1, yi);
  const bl = hash(xi, yi + 1);
  const br = hash(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(tl, tr, u),
    THREE.MathUtils.lerp(bl, br, u),
    v
  );
}
function fbm(x: number, y: number) {
  let a = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    a += amp * noise2(x * f, y * f);
    f *= 2;
    amp *= 0.5;
  }
  return a;
}

/* ---------- a single stylised snowy peak ---------- */
function Peak({
  height = 4,
  radius = 2.4,
  facets = 9,
  seed = 0,
  snowLine = 0.52,
}: {
  height?: number;
  radius?: number;
  facets?: number;
  seed?: number;
  snowLine?: number;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(radius, height, facets, 44, false);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const snow = new THREE.Color("#f6fbff");
    const ice = new THREE.Color("#d3e9f6");
    const rock = new THREE.Color("#5d6f7d");
    const rockDark = new THREE.Color("#41505c");
    const colors: number[] = [];

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const h = (y + height / 2) / height; // 0 bottom -> 1 apex
      const angle = Math.atan2(z, x);
      const n = fbm(angle * 1.6 + seed * 10, h * 4 + seed);
      const taper = Math.sin(h * Math.PI); // ridges strongest mid-slope
      const disp = (n - 0.5) * 1.0 * taper * (1 - h * 0.25);
      const len = Math.hypot(x, z) || 1;

      pos.setX(i, x + (x / len) * disp);
      pos.setZ(i, z + (z / len) * disp);
      pos.setY(i, y + (n - 0.5) * 0.28 * taper);

      const line = snowLine + (n - 0.5) * 0.22;
      let c: THREE.Color;
      if (h > line) {
        c = snow.clone().lerp(ice, n * 0.45);
      } else {
        c = rock
          .clone()
          .lerp(rockDark, n)
          .lerp(snow, Math.max(0, (h - 0.25)) * 0.5);
      }
      colors.push(c.r, c.g, c.b);
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [height, radius, facets, seed, snowLine]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial vertexColors flatShading roughness={0.92} metalness={0.02} />
    </mesh>
  );
}

/* ---------- falling snow ---------- */
function Snow({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 10 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.4 + Math.random() * 0.9;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const t = performance.now() * 0.001;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      arr[i * 3] += Math.sin(t + i) * delta * 0.15; // gentle drift
      if (arr[i * 3 + 1] < -1.2) arr[i * 3 + 1] = 9;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- scene rig: gentle auto-rotate + pointer parallax ---------- */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.x * 0.04, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, pointer.y * 0.15 - 1.1, 0.05);
  });
  return <group ref={group} position={[0, -1.1, 0]}>{children}</group>;
}

export default function MountainScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.2, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#cfe9f8", 9, 20]} />
      <ambientLight intensity={0.85} color="#dff0fb" />
      <directionalLight position={[5, 8, 4]} intensity={1.7} color="#fff6e8" />
      <directionalLight position={[-6, 3, -2]} intensity={0.5} color="#9ecbe8" />

      <Rig>
        {/* back peaks for depth */}
        <group position={[-3.4, -0.4, -3]} scale={0.7}>
          <Peak height={3.4} radius={2} facets={7} seed={3} snowLine={0.45} />
        </group>
        <group position={[3.6, -0.6, -3.5]} scale={0.62}>
          <Peak height={3} radius={1.9} facets={7} seed={7} snowLine={0.48} />
        </group>
        {/* hero peak */}
        <Peak height={4.4} radius={2.5} facets={9} seed={1} snowLine={0.5} />
      </Rig>

      <Snow />
    </Canvas>
  );
}
