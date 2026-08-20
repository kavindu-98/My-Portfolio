/** @format */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT_SRC = "../../public/images/kavindu-portrait.png";

const Hero3D = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const nameRef = useRef(null);
  const engineerRef = useRef(null);
  const systemRef = useRef(null);
  const stackRef = useRef(null);
  const workRef = useRef(null);
  const portraitRef = useRef(null);

  const networkRef = useRef(null);
  const cameraTarget = useRef({
    x: 0,
    y: 0,
    z: 7,
  });

  const rotationTarget = useRef({
    x: 0,
    y: 0,
    z: 0,
  });

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState("K / 26");

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingText("INITIALIZING SYSTEM..."), 250);
    const t2 = setTimeout(() => setLoadingText("LOADING EXPERIENCE..."), 480);
    const t3 = setTimeout(() => setLoaded(true), 850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  /* ============================================================
     THREE.JS
  ============================================================ */

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const scene = new THREE.Scene();

    scene.background = new THREE.Color("#f5f8f6");

    /* Camera */

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, 7);

    /* Renderer */

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    /* Light */

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    /* ==========================================================
       MAIN NETWORK
    ========================================================== */

    const network = new THREE.Group();

    network.position.set(1.55, 0, 0);

    network.scale.set(1.1, 1.1, 1.1);

    scene.add(network);

    networkRef.current = network;

    /* ==========================================================
       CORE
    ========================================================== */

    const coreGeometry = new THREE.IcosahedronGeometry(1.55, 2);

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: "#63dfcf",
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });

    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    network.add(core);

    /* ==========================================================
       INNER CORE
    ========================================================== */

    const innerGeometry = new THREE.IcosahedronGeometry(1.02, 2);

    const innerMaterial = new THREE.MeshBasicMaterial({
      color: "#4ed6c3",
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const inner = new THREE.Mesh(innerGeometry, innerMaterial);

    network.add(inner);

    /* ==========================================================
       OUTER CORE
    ========================================================== */

    const outerGeometry = new THREE.IcosahedronGeometry(2.05, 1);

    const outerMaterial = new THREE.MeshBasicMaterial({
      color: "#718d88",
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });

    const outer = new THREE.Mesh(outerGeometry, outerMaterial);

    network.add(outer);

    /* ==========================================================
       NODES
    ========================================================== */

    const nodePositions = [];

    const nodeCount = 24;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);

      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const radius = 1.75 + Math.sin(i * 2.2) * 0.1;

      nodePositions.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),

          radius * Math.sin(phi) * Math.sin(theta),

          radius * Math.cos(phi),
        ),
      );
    }

    const nodes = new THREE.Group();

    network.add(nodes);

    nodePositions.forEach((position, index) => {
      const geometry = new THREE.SphereGeometry(
        index % 4 === 0 ? 0.085 : 0.055,
        12,
        12,
      );

      const material = new THREE.MeshBasicMaterial({
        color: index % 4 === 0 ? "#6ee9dc" : "#9ae8df",
      });

      const node = new THREE.Mesh(geometry, material);

      node.position.copy(position);

      nodes.add(node);
    });

    /* ==========================================================
       CONNECTIONS
    ========================================================== */

    const linePositions = [];

    for (let i = 0; i < nodePositions.length; i++) {
      const current = nodePositions[i];

      const nearest = nodePositions
        .map((point, index) => ({
          index,
          distance: current.distanceTo(point),
        }))
        .filter((item) => item.index !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      nearest.forEach((item) => {
        if (item.index > i && item.distance < 1.5) {
          const target = nodePositions[item.index];

          linePositions.push(
            current.x,
            current.y,
            current.z,

            target.x,
            target.y,
            target.z,
          );
        }
      });
    }

    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#829a95",
      transparent: true,
      opacity: 0.42,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

    network.add(lines);

    /* ==========================================================
       ORBIT RINGS
    ========================================================== */

    const createRing = (radius, rotation, opacity) => {
      const geometry = new THREE.RingGeometry(radius, radius + 0.008, 128);

      const material = new THREE.MeshBasicMaterial({
        color: "#58dcca",
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      });

      const ring = new THREE.Mesh(geometry, material);

      ring.rotation.set(rotation.x, rotation.y, rotation.z);

      network.add(ring);

      return ring;
    };

    const ring1 = createRing(1.95, { x: 0.4, y: 0.8, z: 0.2 }, 0.2);

    const ring2 = createRing(2.1, { x: 1.2, y: 0.2, z: 0.8 }, 0.14);

    const ring3 = createRing(1.55, { x: 0.8, y: 1.4, z: 0.5 }, 0.12);

    /* ==========================================================
       MOUSE
    ========================================================== */

    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;

      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    /* ==========================================================
       RESIZE
    ========================================================== */

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    /* ==========================================================
       ANIMATION
    ========================================================== */

    const clock = new THREE.Clock();

    let animationFrame;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      /* Smooth rotation */

      core.rotation.x += (rotationTarget.current.x - core.rotation.x) * 0.025;

      core.rotation.y += (rotationTarget.current.y - core.rotation.y) * 0.025;

      outer.rotation.x +=
        (rotationTarget.current.x * 0.7 - outer.rotation.x) * 0.02;

      outer.rotation.y +=
        (rotationTarget.current.y * 0.7 - outer.rotation.y) * 0.02;

      inner.rotation.x +=
        (rotationTarget.current.x * 1.3 - inner.rotation.x) * 0.03;

      inner.rotation.y +=
        (rotationTarget.current.y * 1.3 - inner.rotation.y) * 0.03;

      /* Organic movement */

      core.rotation.z = Math.sin(elapsed * 0.25) * 0.04;

      inner.rotation.z = Math.cos(elapsed * 0.2) * 0.05;

      nodes.rotation.y = Math.sin(elapsed * 0.18) * 0.05;

      /* Rings */

      ring1.rotation.z += 0.0007;
      ring2.rotation.x += 0.0005;
      ring3.rotation.y += 0.0006;

      /* Mouse parallax */

      network.rotation.x +=
        (mouse.current.y * -0.08 - network.rotation.x) * 0.025;

      network.rotation.y +=
        (mouse.current.x * 0.1 - network.rotation.y) * 0.025;

      /* Camera */

      camera.position.x +=
        (cameraTarget.current.x + mouse.current.x * 0.15 - camera.position.x) *
        0.035;

      camera.position.y +=
        (cameraTarget.current.y - mouse.current.y * 0.08 - camera.position.y) *
        0.035;

      camera.position.z += (cameraTarget.current.z - camera.position.z) * 0.035;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    setReady(true);

    /* ==========================================================
       CLEANUP
    ========================================================== */

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("resize", handleResize);

      coreGeometry.dispose();
      coreMaterial.dispose();

      innerGeometry.dispose();
      innerMaterial.dispose();

      outerGeometry.dispose();
      outerMaterial.dispose();

      lineGeometry.dispose();
      lineMaterial.dispose();

      renderer.dispose();

      scene.clear();
    };
  }, []);

  /* ============================================================
     GSAP SCROLL
  ============================================================ */

  useEffect(() => {
    if (!ready || !loaded) return;

    const ctx = gsap.context(() => {
      const name = nameRef.current;
      const engineer = engineerRef.current;
      const system = systemRef.current;
      const stack = stackRef.current;
      const work = workRef.current;
      const portrait = portraitRef.current;
      const network = networkRef.current;

      if (
        !name ||
        !engineer ||
        !system ||
        !stack ||
        !work ||
        !portrait ||
        !network
      ) {
        return;
      }

      /* ========================================================
         INITIAL STATES
      ======================================================== */

      gsap.set(name, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set([engineer, system, stack, work], {
        autoAlpha: 0,
        y: 90,
        scale: 0.96,
        filter: "blur(10px)",
      });

      gsap.set(portrait, {
        autoAlpha: 0,
        x: 64,
        scale: 1.05,
        filter: "blur(16px)",
      });

      /* ========================================================
         MASTER TIMELINE
      ======================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: "+=500%",

          pin: true,

          scrub: 1.4,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          fastScrollEnd: true,
        },
      });

      /* ========================================================
         01 — NAME
      ======================================================== */

      timeline.to(
        {},
        {
          duration: 1,
        },
      );

      /* ========================================================
         EXIT NAME
      ======================================================== */

      timeline.to(name, {
        autoAlpha: 0,
        y: -90,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power2.inOut",
      });

      /* ========================================================
         02 — ENGINEER
      ======================================================== */

      timeline.fromTo(
        engineer,
        {
          autoAlpha: 0,
          y: 90,
          scale: 0.94,
          filter: "blur(12px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "<0.2",
      );

      /* Move 3D */

      timeline.to(
        network.position,
        {
          x: 0.4,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* Portrait enters — identity reveal, a beat behind the
         headline so it reads as a considered arrival rather
         than everything landing at once. */

      timeline.fromTo(
        portrait,
        {
          autoAlpha: 0,
          x: 64,
          scale: 1.05,
          filter: "blur(16px)",
        },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "<0.15",
      );

      /* HOLD */

      timeline.to(
        {},
        {
          duration: 0.7,
        },
      );

      /* ========================================================
         EXIT ENGINEER
      ======================================================== */

      timeline.to(engineer, {
        autoAlpha: 0,
        y: -80,
        scale: 0.96,
        filter: "blur(9px)",
        duration: 0.75,
        ease: "power2.inOut",
      });

      /* ========================================================
         03 — SYSTEM
      ======================================================== */

      timeline.fromTo(
        system,
        {
          autoAlpha: 0,
          y: 90,
          scale: 0.94,
          filter: "blur(12px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "<0.18",
      );

      /* Network grows */

      timeline.to(
        network.scale,
        {
          x: 1.25,
          y: 1.25,
          z: 1.25,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* Camera */

      timeline.to(
        cameraTarget.current,
        {
          z: 7.8,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* Portrait — quiet parallax drift, stays on screen */

      timeline.to(
        portrait,
        {
          x: -14,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* HOLD */

      timeline.to(
        {},
        {
          duration: 0.7,
        },
      );

      /* ========================================================
         EXIT SYSTEM
      ======================================================== */

      timeline.to(system, {
        autoAlpha: 0,
        y: -80,
        scale: 0.96,
        filter: "blur(9px)",
        duration: 0.75,
        ease: "power2.inOut",
      });

      /* ========================================================
         04 — STACK
      ======================================================== */

      timeline.fromTo(
        stack,
        {
          autoAlpha: 0,
          y: 90,
          scale: 0.94,
          filter: "blur(12px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "<0.18",
      );

      /* 3D rotation */

      timeline.to(
        rotationTarget.current,
        {
          x: 0.3,
          y: 1.2,
          z: 0.1,
          duration: 1.5,
          ease: "none",
        },
        "<",
      );

      /* Camera */

      timeline.to(
        cameraTarget.current,
        {
          z: 6.7,
          x: 0.1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* Portrait settles back to center */

      timeline.to(
        portrait,
        {
          x: 0,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* HOLD */

      timeline.to(
        {},
        {
          duration: 0.75,
        },
      );

      /* ========================================================
         EXIT STACK — portrait leaves in the same breath so WORK
         opens on a clean, uncluttered frame
      ======================================================== */

      timeline.to(stack, {
        autoAlpha: 0,
        y: -80,
        scale: 0.96,
        filter: "blur(9px)",
        duration: 0.75,
        ease: "power2.inOut",
      });

      timeline.to(
        portrait,
        {
          autoAlpha: 0,
          x: -48,
          scale: 0.96,
          filter: "blur(12px)",
          duration: 0.75,
          ease: "power2.inOut",
        },
        "<",
      );

      /* ========================================================
         05 — WORK
      ======================================================== */

      timeline.fromTo(
        work,
        {
          autoAlpha: 0,
          y: 90,
          scale: 0.94,
          filter: "blur(12px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "<0.18",
      );

      /* 3D moves away */

      timeline.to(
        network.position,
        {
          x: 2.1,
          duration: 1.3,
          ease: "power3.inOut",
        },
        "<",
      );

      timeline.to(
        network.scale,
        {
          x: 0.75,
          y: 0.75,
          z: 0.75,
          duration: 1.3,
          ease: "power3.inOut",
        },
        "<",
      );

      timeline.to(
        cameraTarget.current,
        {
          z: 8.5,
          x: -0.2,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<",
      );

      /* ========================================================
         FINAL HOLD
      ======================================================== */

      timeline.to(
        {},
        {
          duration: 1,
        },
      );
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [ready, loaded]);

  return (
    <>
      <style>{`

        /* ======================================================
           GLOBAL
        ====================================================== */

        .hero3d {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          overflow: hidden;
          isolation: isolate;

          background: #f5f8f6;
          color: #123c35;
        }

        .hero3d *,
        .hero3d *::before,
        .hero3d *::after {
          box-sizing: border-box;
        }

        /* ======================================================
           CANVAS
        ====================================================== */

        .hero3d__canvas {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          display: block;

          z-index: 1;

          pointer-events: none;
        }

        /* ======================================================
           GRID
        ====================================================== */

        .hero3d__grid {
          position: absolute;
          inset: 0;

          z-index: 0;

          pointer-events: none;

          opacity: 0.5;

          background-image:
            linear-gradient(
              rgba(37, 100, 91, 0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(37, 100, 91, 0.07) 1px,
              transparent 1px
            );

          background-size: 72px 72px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 12%,
              black 88%,
              transparent
            );
        }

        /* ======================================================
           NOISE
        ====================================================== */

        .hero3d__noise {
          position: absolute;
          inset: 0;

          z-index: 15;

          pointer-events: none;

          opacity: 0.025;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.45'/%3E%3C/svg%3E");
        }

        /* ======================================================
           PORTRAIT
           A quiet, grayscale panel on the right. Soft feathered
           edge instead of a hard line, one thin divider rule,
           and a small caption — no color overlay on the photo.
        ====================================================== */

        .hero3d__portrait {
          position: absolute;

          top: 0;
          right: 0;

          width: 34%;
          height: 100%;

          z-index: 13;

          overflow: hidden;

          pointer-events: none;

          -webkit-mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              black 20%
            );

          mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              black 20%
            );

          will-change: transform, opacity, filter;
        }

        .hero3d__portrait::before {
          content: "";

          position: absolute;

          left: 0;
          top: 20%;

          width: 1px;
          height: 60%;

          background: rgba(23, 63, 56, 0.25);
        }

        .hero3d__portrait-image {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: top center;

          filter:
            grayscale(0.9)
            contrast(1.05)
            brightness(0.98);
        }

        .hero3d__portrait-scrim {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              transparent 55%,
              rgba(7, 18, 15, 0.82) 100%
            );
        }

        .hero3d__portrait-scan {
          position: absolute;

          left: 0;
          right: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #8be8cf,
              transparent
            );

          box-shadow: 0 0 16px rgba(139, 232, 207, 0.65);

          animation: hero3dPortraitScan 7s ease-in-out infinite;
        }

        @keyframes hero3dPortraitScan {
          0% {
            top: 10%;
            opacity: 0;
          }
          12% {
            opacity: 0.75;
          }
          50% {
            top: 86%;
            opacity: 0.75;
          }
          62% {
            opacity: 0;
          }
          100% {
            top: 86%;
            opacity: 0;
          }
        }

        .hero3d__portrait-caption {
          position: absolute;

          right: 22px;
          bottom: 28px;

          text-align: right;
        }

        .hero3d__portrait-caption span {
          display: block;

          font-family: "IBM Plex Mono", monospace;

          letter-spacing: 0.22em;

          color: #f7fffc;
        }

        .hero3d__portrait-caption span:first-child {
          font-size: 9px;
          opacity: 0.85;
        }

        .hero3d__portrait-caption span:last-child {
          margin-top: 6px;

          font-size: 8px;

          opacity: 0.55;
        }

        /* ======================================================
           NAV
        ====================================================== */

        .hero3d__nav {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;

          padding: 18px 24px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          z-index: 30;

          border-bottom:
            1px solid
            rgba(26, 72, 64, 0.08);
        }

        .hero3d__logo {
          font-family:
            "IBM Plex Mono",
            "Courier New",
            monospace;

          font-size: 11px;

          font-weight: 500;

          letter-spacing: 0.22em;

          color: #183f38;
        }

        .hero3d__logo span {
          margin-left: 7px;
          opacity: 0.5;
        }

        .hero3d__nav nav {
          display: flex;
          gap: 32px;
        }

        .hero3d__nav a {
          position: relative;

          color: #173e37;

          text-decoration: none;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing: 0.2em;

          transition: opacity 250ms ease;
        }

        .hero3d__nav a::after {
          content: "";

          position: absolute;

          left: 0;
          bottom: -6px;

          width: 0;
          height: 1px;

          background: #65dcca;

          transition:
            width 350ms
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );
        }

        .hero3d__nav a:hover {
          opacity: 0.6;
        }

        .hero3d__nav a:hover::after {
          width: 100%;
        }

        /* ======================================================
           STATUS
        ====================================================== */

        .hero3d__status {
          position: absolute;

          top: 76px;
          left: 24px;

          z-index: 30;

          display: flex;
          align-items: center;

          gap: 9px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing: 0.19em;

          color:
            rgba(36, 76, 69, 0.62);
        }

        .hero3d__status-dot {
          width: 6px;
          height: 6px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #78dbc9;

          box-shadow:
            0 0 14px
            rgba(120, 219, 201, 0.8);
        }

        /* ======================================================
           CONTENT
        ====================================================== */

        .hero3d__content {
          position: absolute;
          inset: 0;

          z-index: 10;

          pointer-events: none;
        }

        /* ======================================================
           CHAPTER
        ====================================================== */

        .hero3d__chapter {
          position: absolute;

          top: 50%;
          left: 24px;

          width: min(720px, 58vw);

          transform:
            translateY(-50%);

          will-change:
            transform,
            opacity,
            filter;
        }

        /* ======================================================
           NAME
        ====================================================== */

        .hero3d__chapter--name {
          top: 56%;
        }

        .hero3d__eyebrow {
          margin-bottom: 24px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 10px;

          letter-spacing: 0.3em;

          color: #55cbb8;
        }

        .hero3d__eyebrow span {
          margin: 0 8px;
          opacity: 0.5;
        }

        .hero3d__chapter--name h1 {
          margin: 0;

          font-family:
            "Inter",
            "Arial Black",
            sans-serif;

          font-size:
            clamp(
              4rem,
              7.5vw,
              8rem
            );

          line-height: 0.78;

          letter-spacing: -0.075em;

          font-weight: 900;

          color: #133f36;
        }

        .hero3d__chapter--name p {
          margin-top: 30px;

          font-family:
            "Inter",
            sans-serif;

          font-size: 13px;

          line-height: 1.6;

          color:
            rgba(25, 68, 61, 0.65);
        }

        /* ======================================================
           ENGINEER
        ====================================================== */

        .hero3d__chapter--engineer {
          left: 8%;

          width: min(760px, 58vw);
        }

        .hero3d__chapter-number {
          margin-bottom: 22px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing: 0.28em;

          color: #62cdbb;
        }

        .hero3d__chapter--engineer h2,
        .hero3d__chapter--system h2,
        .hero3d__chapter--stack h2,
        .hero3d__chapter--work h2 {
          margin: 0;

          font-family:
            "Inter",
            "Arial Black",
            sans-serif;

          font-weight: 900;

          line-height: 0.82;

          letter-spacing: -0.075em;

          color: #173f37;
        }

        .hero3d__chapter--engineer h2 {
          font-size:
            clamp(
              4rem,
              6.6vw,
              7.4rem
            );
        }

        .hero3d__chapter-description {
          margin-top: 35px;

          display: flex;

          align-items: flex-start;

          gap: 16px;
        }

        .hero3d__chapter-description span {
          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 26px;

          color: #54cdbb;
        }

        .hero3d__chapter-description p {
          margin: 3px 0 0;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          line-height: 1.7;

          letter-spacing: 0.18em;

          color:
            rgba(31, 74, 67, 0.65);
        }

        /* ======================================================
           SYSTEM
        ====================================================== */

        .hero3d__chapter--system {
          left: 10%;

          width: min(650px, 50vw);
        }

        .hero3d__chapter--system h2 {
          font-size:
            clamp(
              3.5rem,
              6.3vw,
              6.7rem
            );
        }

        .hero3d__side-text {
          position: absolute;

          left: 110%;
          bottom: 12px;

          width: 120px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          line-height: 2;

          letter-spacing: 0.22em;

          color:
            rgba(30, 75, 68, 0.48);
        }

        /* ======================================================
           STACK
        ====================================================== */

        .hero3d__chapter--stack {
          left: 8%;

          width: min(760px, 56vw);
        }

        .hero3d__chapter--stack h2 {
          font-size:
            clamp(
              3.7rem,
              6.4vw,
              7rem
            );
        }

        .hero3d__tech-list {
          margin-top: 35px;

          display: flex;

          flex-wrap: wrap;

          gap: 8px;
        }

        .hero3d__tech-list span {
          padding: 9px 13px;

          border:
            1px solid
            rgba(47, 119, 107, 0.25);

          border-radius: 100px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.14em;

          color:
            rgba(25, 76, 68, 0.72);

          background:
            rgba(255, 255, 255, 0.28);

          backdrop-filter: blur(8px);
        }

        /* ======================================================
           WORK
        ====================================================== */

        .hero3d__chapter--work {
          left: 9%;

          width: min(700px, 60vw);
        }

        .hero3d__chapter--work h2 {
          font-size:
            clamp(
              4rem,
              7vw,
              7.5rem
            );
        }

        .hero3d__chapter--work p {
          margin-top: 28px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 10px;

          line-height: 1.8;

          letter-spacing: 0.15em;

          color:
            rgba(27, 73, 65, 0.62);
        }

        .hero3d__work-line {
          margin-top: 34px;

          display: flex;

          align-items: center;

          gap: 12px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.2em;

          color:
            rgba(27, 73, 65, 0.55);
        }

        .hero3d__work-line span {
          width: 55px;

          height: 1px;

          background: #63d4c2;
        }

        /* ======================================================
           3D LABELS
           Kept clear of the portrait's 34% right column so they
           never sit on top of the photo.
        ====================================================== */

        .hero3d__labels {
          position: absolute;
          inset: 0;

          z-index: 12;

          pointer-events: none;
        }

        .hero3d__label {
          position: absolute;

          display: flex;

          align-items: center;

          gap: 7px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.18em;

          color:
            rgba(31, 78, 70, 0.58);
        }

        .hero3d__label i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #6adac9;
        }

        .hero3d__label--node {
          top: 30%;
          right: 44%;
        }

        .hero3d__label--react {
          top: 43%;
          right: 40%;
        }

        .hero3d__label--mysql {
          top: 63%;
          right: 46%;
        }

        .hero3d__label--api {
          top: 70%;
          right: 42%;
        }

        /* ======================================================
           SCROLL
        ====================================================== */

        .hero3d__scroll {
          position: absolute;

          left: 23px;
          bottom: 35px;

          z-index: 30;

          display: flex;

          align-items: center;

          gap: 12px;
        }

        .hero3d__scroll-line {
          width: 1px;
          height: 48px;

          background:
            linear-gradient(
              to bottom,
              #62d6c5,
              transparent
            );
        }

        .hero3d__scroll-text {
          display: flex;

          flex-direction: column;

          gap: 3px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.2em;

          color:
            rgba(25, 69, 62, 0.7);
        }

        /* ======================================================
           INDEX
        ====================================================== */

        .hero3d__index {
          position: absolute;

          right: 24px;
          bottom: 30px;

          z-index: 30;

          display: flex;

          gap: 13px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.15em;

          color:
            rgba(30, 74, 67, 0.35);
        }

        .hero3d__index span:first-child {
          color: #4ecab7;
        }

        /* ======================================================
           TABLET
        ====================================================== */

        @media (max-width: 900px) {

          .hero3d__chapter {
            left: 28px !important;

            width:
              calc(100% - 56px);
          }

          .hero3d__side-text {
            display: none;
          }

          .hero3d__portrait {
            display: none;
          }

          .hero3d__label--node {
            right: 10%;
          }

          .hero3d__label--mysql {
            right: 8%;
          }

        }

        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 640px) {

          .hero3d {
            min-height: 650px;
          }

          .hero3d__nav {
            padding: 17px 18px;
          }

          .hero3d__nav nav {
            display: none;
          }

          .hero3d__status {
            top: 70px;

            left: 18px;

            max-width: 230px;

            line-height: 1.6;
          }

          .hero3d__chapter {
            left: 18px !important;

            width:
              calc(100% - 36px);
          }

          .hero3d__chapter--name {
            top: 54%;
          }

          .hero3d__chapter--name h1 {
            font-size:
              clamp(
                3.6rem,
                18vw,
                6rem
              );
          }

          .hero3d__chapter--engineer h2 {
            font-size:
              clamp(
                3.3rem,
                15vw,
                5.5rem
              );
          }

          .hero3d__chapter--system h2 {
            font-size:
              clamp(
                3rem,
                14vw,
                5rem
              );
          }

          .hero3d__chapter--stack h2 {
            font-size:
              clamp(
                3rem,
                14vw,
                5rem
              );
          }

          .hero3d__chapter--work h2 {
            font-size:
              clamp(
                3.5rem,
                16vw,
                5.5rem
              );
          }

          .hero3d__labels {
            display: none;
          }

          .hero3d__scroll {
            left: 18px;
            bottom: 22px;
          }

          .hero3d__index {
            right: 18px;
            bottom: 22px;
          }

        }

        .hero3d__loader {
          position: absolute;
          inset: 0;
          z-index: 200;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 18px;

          background: #f5f8f6;

          transition: opacity 550ms ease;
        }

        .hero3d__loader-text {
          font-family: "IBM Plex Mono", monospace;

          font-size: 10px;
          letter-spacing: 0.3em;

          color: #173f37;
        }

        .hero3d__loader-track {
          width: 96px;
          height: 1px;

          background: rgba(23, 63, 55, 0.15);

          overflow: hidden;
        }

        .hero3d__loader-fill {
          width: 100%;
          height: 100%;

          transform-origin: left;

          background: #63d4c2;

          transition: transform 700ms ease;
        }

      `}</style>

      <section ref={sectionRef} className="hero3d">
        <div
          className="hero3d__loader"
          style={{
            opacity: loaded ? 0 : 1,
            pointerEvents: loaded ? "none" : "auto",
          }}
        >
          <div className="hero3d__loader-text">{loadingText}</div>
          <div className="hero3d__loader-track">
            <div
              className="hero3d__loader-fill"
              style={{ transform: loaded ? "scaleX(1)" : "scaleX(0.65)" }}
            />
          </div>
        </div>
        {/* ====================================================
            THREE.JS
        ==================================================== */}

        <canvas ref={canvasRef} className="hero3d__canvas" />

        {/* Background */}

        <div className="hero3d__grid" />

        <div className="hero3d__noise" />

        {/* ====================================================
            PORTRAIT
        ==================================================== */}

        <div ref={portraitRef} className="hero3d__portrait">
          <img
            src={PORTRAIT_SRC}
            alt="Kavindu Abeykoon"
            className="hero3d__portrait-image"
          />

          <div className="hero3d__portrait-scrim" />

          <div className="hero3d__portrait-scan" />

          <div className="hero3d__portrait-caption">
            <span>KAVINDU ABEYKOON</span>
            <span>SOFTWARE ENGINEER / 2026</span>
          </div>
        </div>

        {/* ====================================================
            NAV
        ==================================================== */}

        <header className="hero3d__nav">
          <div className="hero3d__logo">
            KAVINDU
            <span>/ 26</span>
          </div>

          <nav>
            <a href="#work">WORK</a>

            <a href="#about">ABOUT</a>

            <a href="#contact">CONTACT</a>
          </nav>
        </header>

        {/* ====================================================
            STATUS
        ==================================================== */}

        <div className="hero3d__status">
          <span className="hero3d__status-dot" />
          AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES
        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="hero3d__content">
          {/* 01 */}

          <div
            ref={nameRef}
            className="
              hero3d__chapter
              hero3d__chapter--name
            "
          >
            <div className="hero3d__eyebrow">
              SOFTWARE ENGINEER
              <span>·</span>
              CREATIVE DEVELOPER
            </div>

            <h1>
              KAVINDU
              <br />
              ABEYKOON
            </h1>

            <p>
              Building thoughtful digital products,
              <br />
              from interfaces to scalable systems.
            </p>
          </div>

          {/* 02 */}

          <div
            ref={engineerRef}
            className="
              hero3d__chapter
              hero3d__chapter--engineer
            "
          >
            <div className="hero3d__chapter-number">SYSTEM / 01</div>

            <h2>
              SOFTWARE
              <br />
              ENGINEER
            </h2>

            <div className="hero3d__chapter-description">
              <span>03+</span>

              <p>
                YEARS BUILDING
                <br />
                PRODUCTION SYSTEMS
              </p>
            </div>
          </div>

          {/* 03 */}

          <div
            ref={systemRef}
            className="
              hero3d__chapter
              hero3d__chapter--system
            "
          >
            <div className="hero3d__chapter-number">SYSTEM / 02</div>

            <h2>
              I BUILD
              <br />
              DIGITAL
              <br />
              SYSTEMS
            </h2>

            <div className="hero3d__side-text">
              ARCHITECTURE
              <br />
              INTERACTION
              <br />
              PERFORMANCE
            </div>
          </div>

          {/* 04 */}

          <div
            ref={stackRef}
            className="
              hero3d__chapter
              hero3d__chapter--stack
            "
          >
            <div className="hero3d__chapter-number">SYSTEM / 03</div>

            <h2>
              ENGINEERED
              <br />
              FOR SCALE
            </h2>

            <div className="hero3d__tech-list">
              <span>REACT</span>
              <span>NODE.JS</span>
              <span>MYSQL</span>
              <span>TYPESCRIPT</span>
              <span>NEXT.JS</span>
              <span>DOCKER</span>
            </div>
          </div>

          {/* 05 */}

          <div
            ref={workRef}
            className="
              hero3d__chapter
              hero3d__chapter--work
            "
          >
            <div className="hero3d__chapter-number">SYSTEM / 04</div>

            <h2>
              SELECTED
              <br />
              WORK
            </h2>

            <p>
              Real products.
              <br />
              Real systems.
              <br />
              Real-world constraints.
            </p>

            <div className="hero3d__work-line">
              <span />
              SCROLL TO EXPLORE
            </div>
          </div>
        </div>

        {/* ====================================================
            FLOATING TECH LABELS
        ==================================================== */}

        <div className="hero3d__labels">
          <div
            className="
              hero3d__label
              hero3d__label--node
            "
          >
            <i />
            NODE.JS
          </div>

          <div
            className="
              hero3d__label
              hero3d__label--react
            "
          >
            <i />
            REACT
          </div>

          <div
            className="
              hero3d__label
              hero3d__label--mysql
            "
          >
            <i />
            MYSQL
          </div>

          <div
            className="
              hero3d__label
              hero3d__label--api
            "
          >
            <i />
            API
          </div>
        </div>

        {/* ====================================================
            SCROLL
        ==================================================== */}

        <div className="hero3d__scroll">
          <div className="hero3d__scroll-line" />

          <div className="hero3d__scroll-text">
            <span>SCROLL</span>

            <span>EXPLORE</span>
          </div>
        </div>

        {/* ====================================================
            INDEX
        ==================================================== */}

        <div className="hero3d__index">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>
      </section>
    </>
  );
};

export default Hero3D;
