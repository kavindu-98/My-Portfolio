/** @format */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ============================================================
 * DESIGN TOKENS — single source of truth, tune everything here
 * ============================================================
 */
const PALETTE = {
  bg: "#FCFFFD", // Base background — crisp off-white
  bgSection: "#E5FBF4", // Soft mint tint (loading screen / depth fade)
  border: "#B8EFE0", // Hairlines, dividers, thin grid
  accent: "#5DB9A2", // Buttons, nodes, status dot, active states
  text: "#1F5A4B", // Headings, body, the 3D structure itself
};

// Converts a hex string to a THREE-friendly integer.
const hexToThree = (hex) => parseInt(hex.replace("#", ""), 16);

/**
 * ============================================================
 * SCROLL TIMELINE — the single map of "what happens when"
 * 0 -> 1 across ~200vh of pinned scroll
 * ============================================================
 */
const BEATS = {
  cameraDolly: { start: 0, end: 1, from: 5, to: 2.4 },
  artifactSpin: { start: 0, end: 1, fromY: 0, toY: Math.PI * 0.6 },
  eyebrowFade: { start: 0, end: 0.18 },
  headlineSwap: { start: 0.42, end: 0.58 },
  nodesReveal: { start: 0.18, end: 0.34 },
  stackReveal: { start: 0.66, end: 0.82 },
  exitOut: { start: 0.86, end: 1 },
};

const STACK = ["REACT", "NODE", "TYPESCRIPT", "MYSQL", "NEXT.JS"];
const NAV = ["WORK", "ABOUT", "EXPERIENCE", "CONTACT"];

// Swap this for wherever you host the portrait — see note at bottom of file.
const PORTRAIT_SRC = "../assets/kavindu-portrait.jpeg";

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const range = (p, a, b) => clamp01((p - a) / Math.max(1e-6, b - a));

const Hero3D = () => {
  const containerRef = useRef(null);
  const canvasHostRef = useRef(null);
  const stateRef = useRef({ progress: 0 });
  const navRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("K / 01");

  // ---- Loading sequence: two quick beats, under 900ms total ----
  useEffect(() => {
    const t1 = setTimeout(() => setLoadingLabel("INITIALIZING…"), 320);
    const t2 = setTimeout(() => setLoaded(true), 760);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!canvasHostRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;

    // ---- Scene ----
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(hexToThree(PALETTE.bg));
    scene.fog = new THREE.Fog(hexToThree(PALETTE.bg), 6, 14);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.15, BEATS.cameraDolly.from);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
    );
    canvasHostRef.current.appendChild(renderer.domElement);

    // ---- Lighting: soft studio light on a light backdrop ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.6);
    key.position.set(4, 6, 6);
    scene.add(key);
    const rim = new THREE.PointLight(hexToThree(PALETTE.accent), 1.1, 20);
    rim.position.set(-3, -2, 3);
    scene.add(rim);

    /**
     * ---- The Digital Engineer: one signature artifact ----
     * A precision frame (edges of an icosahedron) with a handful of
     * glowing "connection nodes" at select vertices, tied together
     * with thin structural struts. Reads as architecture + network,
     * not a generic gem or planet.
     */
    const artifact = new THREE.Group();

    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const edges = new THREE.EdgesGeometry(coreGeo);
    const frame = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: hexToThree(PALETTE.text),
        transparent: true,
        opacity: 0.7,
      }),
    );
    artifact.add(frame);

    // Connection nodes: small emissive spheres at a subset of vertices.
    const posAttr = coreGeo.attributes.position;
    const uniqueVerts = [];
    const seen = new Set();
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const key = v
        .toArray()
        .map((n) => n.toFixed(2))
        .join(",");
      if (!seen.has(key)) {
        seen.add(key);
        uniqueVerts.push(v);
      }
    }
    const nodeIndices = [0, 3, 6, 9, 11, 2].filter(
      (i) => i < uniqueVerts.length,
    );
    const nodeGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const nodeMat = new THREE.MeshPhongMaterial({
      color: hexToThree(PALETTE.accent),
      emissive: hexToThree(PALETTE.accent),
      emissiveIntensity: 0.85,
    });
    const nodes = nodeIndices.map((i) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat.clone());
      node.position.copy(uniqueVerts[i]);
      node.userData.baseScale = 1;
      artifact.add(node);
      return node;
    });

    // Thin struts from the artifact's core to each node — reads as a
    // circuit/network being traced across the structure.
    const strutPositions = [];
    nodeIndices.forEach((i) => {
      strutPositions.push(0, 0, 0, ...uniqueVerts[i].toArray());
    });
    const strutGeo = new THREE.BufferGeometry();
    strutGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(strutPositions, 3),
    );
    const struts = new THREE.LineSegments(
      strutGeo,
      new THREE.LineBasicMaterial({
        color: hexToThree(PALETTE.accent),
        transparent: true,
        opacity: 0.4,
      }),
    );
    artifact.add(struts);

    // Positioned to sit over the portrait panel on the right, not on the name.
    artifact.rotation.set(0.35, 0.5, 0.08);
    artifact.scale.setScalar(isMobile ? 0.72 : 1);
    artifact.position.x = isMobile ? 0 : 1.55;
    artifact.position.y = 0.1;
    scene.add(artifact);

    // ---- Atmospheric particles (sparse, quiet) ----
    const particleCount = isMobile ? 18 : 40;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: hexToThree(PALETTE.border),
        size: 0.035,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    // ---- Mouse parallax: extremely subtle, never fights the text ----
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!reduceMotion) window.addEventListener("mousemove", onMouseMove);

    // ---- Render loop ----
    let raf = null;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!reduceMotion) {
        artifact.rotation.y += 0.0015;
        artifact.rotation.x += 0.0006;
        artifact.position.x += (mouseX * 0.12 - artifact.position.x) * 0.03;
        artifact.position.y += (mouseY * 0.08 - artifact.position.y) * 0.03;
        camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.02;

        nodes.forEach((node, i) => {
          const pulse = 1 + Math.sin(t * 1.4 + i) * 0.18;
          node.scale.setScalar(pulse);
        });
        particles.rotation.y += 0.00025;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize ----
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ---- Scroll storytelling: one ScrollTrigger drives progress 0->1 ----
    let st;
    if (!reduceMotion) {
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=180%",
        scrub: 0.6,
        pin: true,
        onUpdate: (self) => {
          stateRef.current.progress = self.progress;
          applyProgress(self.progress);
        },
      });
    }

    function applyProgress(p) {
      const { cameraDolly, artifactSpin } = BEATS;
      const dollyT = range(p, cameraDolly.start, cameraDolly.end);
      camera.position.z = gsap.utils.interpolate(
        cameraDolly.from,
        cameraDolly.to,
        dollyT,
      );
      const spinT = range(p, artifactSpin.start, artifactSpin.end);
      artifact.rotation.y += (artifactSpin.toY * spinT) / 4000; // gentle bias, additive
      frame.material.opacity = 0.7 - dollyT * 0.15;
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      if (st) st.kill();
      canvasHostRef.current?.removeChild(renderer.domElement);
      coreGeo.dispose();
      edges.dispose();
      nodeGeo.dispose();
      strutGeo.dispose();
      particleGeo.dispose();
      renderer.dispose();
    };
  }, []);

  // ---- DOM-side scroll reveals (headline swap, stack labels, indicators) ----
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;
    let raf;
    const tick = () => {
      setProgress(stateRef.current.progress);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const headlineT = range(
    progress,
    BEATS.headlineSwap.start,
    BEATS.headlineSwap.end,
  );
  const stackT = range(
    progress,
    BEATS.stackReveal.start,
    BEATS.stackReveal.end,
  );
  const exitT = range(progress, BEATS.exitOut.start, BEATS.exitOut.end);
  const eyebrowOpacity =
    1 - range(progress, BEATS.eyebrowFade.start, BEATS.eyebrowFade.end);

  // ---- Tiny magnetic nudge for nav links / CTA ----
  const magnet = (el, e) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.15;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.15;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const resetMagnet = (el) => {
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={containerRef}
      style={{ background: PALETTE.bg }}
      className="relative w-full h-[100vh] overflow-hidden"
    >
      {/* ---------- Loading sequence ---------- */}
      <div
        aria-hidden={loaded}
        style={{
          background: PALETTE.bg,
          color: PALETTE.text,
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? "none" : "auto",
          transition: "opacity 380ms ease",
        }}
        className="absolute inset-0 z-50 flex items-center justify-center"
      >
        <span
          style={{ letterSpacing: "0.08em" }}
          className="font-mono text-sm tracking-widest"
        >
          {loadingLabel}
        </span>
      </div>

      {/* ---------- Portrait panel: full-bleed, duotoned, right side (desktop only —
           on mobile the wireframe artifact carries the visual, per the brief's
           "don't shrink the desktop layout" rule) ---------- */}
      <div className="absolute inset-0 z-[1] hidden md:flex justify-end">
        <div
          style={{
            WebkitMaskImage:
              "linear-gradient(to left, black 55%, transparent 96%)",
            maskImage: "linear-gradient(to left, black 55%, transparent 96%)",
          }}
          className="relative h-full w-[52%]"
        >
          <img
            src={PORTRAIT_SRC}
            alt="Kavindu Abeykoon"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.08) brightness(1.04)" }}
          />
          {/* Duotone tint: maps shadows/highlights into the palette */}
          <div
            style={{
              background: `linear-gradient(155deg, ${PALETTE.accent} 0%, ${PALETTE.text} 100%)`,
              mixBlendMode: "multiply",
              opacity: 0.86,
            }}
            className="absolute inset-0"
          />
          <div
            style={{ background: PALETTE.bg, opacity: 0.06 }}
            className="absolute inset-0"
          />
          {/* Scroll-driven scan line sweeping the portrait */}
          <div
            style={{
              top: `${clamp01(progress) * 92}%`,
              background: `linear-gradient(90deg, transparent, ${PALETTE.accent}, transparent)`,
              opacity: progress > 0.02 ? 0.75 : 0,
            }}
            className="absolute left-0 right-0 h-[2px] transition-opacity duration-300"
          />
        </div>
      </div>

      {/* ---------- 3D canvas layer (wireframe overlays the portrait) ---------- */}
      <div ref={canvasHostRef} className="absolute inset-0 z-[2]" />

      {/* ---------- Subtle grain, for the "not flat" quality bar ---------- */}
      <div
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          opacity: 0.035,
          mixBlendMode: "multiply",
        }}
        className="pointer-events-none absolute inset-0 z-[3]"
      />

      {/* ---------- Thin grid line, top hairline ---------- */}
      <div
        style={{ borderColor: PALETTE.border, opacity: 0.7 }}
        className="absolute top-0 left-0 right-0 border-t z-10"
      />

      {/* ---------- Top bar: identity + nav ---------- */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-6 md:px-10 pt-6 md:pt-8">
        <div
          style={{ color: PALETTE.text }}
          className="font-mono text-xs md:text-sm tracking-widest"
        >
          KAVINDU&nbsp;/&nbsp;26
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              ref={(el) => (navRef.current[i] = el)}
              onMouseMove={(e) => magnet(navRef.current[i], e)}
              onMouseLeave={() => resetMagnet(navRef.current[i])}
              style={{ color: PALETTE.bg }}
              className="group relative font-mono text-xs tracking-[0.18em] transition-[letter-spacing] duration-300 hover:tracking-[0.26em]"
            >
              {item}
              <span
                style={{ background: PALETTE.accent }}
                className="absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Mobile menu affordance */}
        <button
          aria-label="Open menu"
          style={{ borderColor: PALETTE.border, color: PALETTE.text }}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border"
        >
          <span className="font-mono text-[10px]">≡</span>
        </button>
      </div>

      {/* ---------- Status indicator ---------- */}
      <div
        style={{
          opacity: eyebrowOpacity,
          transform: `translateY(${exitT * -30}px)`,
        }}
        className="absolute top-20 md:top-24 left-6 md:left-10 z-20 flex items-center gap-2"
      >
        <span
          style={{ background: PALETTE.accent }}
          className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
        />
        <span
          style={{ color: PALETTE.text, opacity: 0.75 }}
          className="font-mono text-[10px] md:text-xs tracking-widest"
        >
          AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES
        </span>
      </div>

      {/* ---------- Hero typography — left-anchored, editorial, never under the photo ---------- */}
      <div
        style={{
          transform: `translateY(${exitT * -60}px)`,
          opacity: 1 - exitT,
        }}
        className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-10 pointer-events-none md:max-w-[56%]"
      >
        <div
          style={{ color: PALETTE.accent, opacity: eyebrowOpacity }}
          className="font-mono text-[11px] md:text-xs tracking-[0.3em] mb-5 md:mb-6"
        >
          SOFTWARE ENGINEER · CREATIVE DEVELOPER
        </div>

        <h1
          style={{ color: PALETTE.text, letterSpacing: "-0.03em" }}
          className="font-sans font-semibold leading-[0.92] text-[15vw] md:text-[7vw] lg:text-[6vw]"
        >
          KAVINDU
          <br />
          ABEYKOON
        </h1>

        {/* Headline swap: SOFTWARE ENGINEER -> BUILDING DIGITAL SYSTEMS */}
        <div className="relative mt-5 md:mt-6 h-7 md:h-8 w-full max-w-md">
          <span
            style={{
              color: PALETTE.text,
              opacity: 1 - headlineT,
              transform: `translateY(${-headlineT * 12}px)`,
            }}
            className="absolute inset-0 font-mono text-xs md:text-sm tracking-[0.22em] transition-opacity"
          >
            SOFTWARE ENGINEER
          </span>
          <span
            style={{
              color: PALETTE.text,
              opacity: headlineT,
              transform: `translateY(${(1 - headlineT) * 12}px)`,
            }}
            className="absolute inset-0 font-mono text-xs md:text-sm tracking-[0.22em] transition-opacity"
          >
            BUILDING DIGITAL SYSTEMS
          </span>
        </div>

        <p
          style={{ color: PALETTE.text, opacity: 0.72 * eyebrowOpacity + 0.28 }}
          className="mt-6 max-w-sm text-sm md:text-base leading-relaxed"
        >
          Building thoughtful digital products,
          <br />
          from interfaces to scalable systems.
        </p>
      </div>

      {/* ---------- Floating tech stack labels — annotate the portrait like a HUD (appear ~75% scroll) ---------- */}
      <div
        style={{ opacity: stackT }}
        className="absolute inset-0 z-30 hidden md:block pointer-events-none"
      >
        {STACK.map((label, i) => {
          const positions = [
            { top: "16%", right: "8%" },
            { top: "34%", right: "38%" },
            { top: "52%", right: "6%" },
            { top: "70%", right: "34%" },
            { top: "86%", right: "10%" },
          ];
          const pos = positions[i % positions.length];
          return (
            <span
              key={label}
              style={{
                ...pos,
                color: PALETTE.bg,
                transform: `translateY(${(1 - stackT) * 10}px)`,
              }}
              className="absolute font-mono text-[10px] tracking-[0.18em] opacity-90"
            >
              <span style={{ color: PALETTE.accent }}>·</span> {label}
            </span>
          );
        })}
      </div>

      {/* ---------- Bottom bar: scroll cue + location ---------- */}
      <div
        style={{ opacity: 1 - exitT }}
        className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-6 md:px-10 pb-6 md:pb-8"
      >
        <div className="flex items-center gap-3">
          <div
            style={{ borderColor: PALETTE.border }}
            className="relative h-10 w-[2px] overflow-hidden rounded-full border"
          >
            <div
              style={{
                background: PALETTE.accent,
                height: `${clamp01(progress) * 100}%`,
              }}
              className="absolute bottom-0 left-0 right-0 transition-[height] duration-150"
            />
          </div>
          <div
            style={{ color: PALETTE.text }}
            className="font-mono text-[10px] tracking-widest"
          >
            SCROLL
            <br />
            EXPLORE
          </div>
        </div>

        <div className="font-mono text-[10px] md:text-xs tracking-widest">
          <span
            style={{ color: PALETTE.text, opacity: 0.7 }}
            className="md:hidden"
          >
            COLOMBO / SRI LANKA
          </span>
          <span
            style={{ color: PALETTE.bg, opacity: 0.85 }}
            className="hidden md:inline"
          >
            COLOMBO / SRI LANKA
          </span>
        </div>
      </div>

      {/* ---------- Bottom hairline ---------- */}
      <div
        style={{ borderColor: PALETTE.border, opacity: 0.7 }}
        className="absolute bottom-0 left-0 right-0 border-b z-10"
      />
    </div>
  );
};

export default Hero3D;
