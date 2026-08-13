/** @format */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ============================================================
   HERO 3D
   Cinematic Software Engineer Portfolio
   ============================================================ */

const PALETTE = {
  bg: "#F5F7F5",
  bgDark: "#0B1714",
  surface: "#DDE8E3",
  line: "#A9BBB5",
  accent: "#65C7AE",
  accentBright: "#8BE8CF",
  text: "#173B32",
  darkText: "#07120F",
  white: "#F7FFFC",
};

const PORTRAIT_SRC = "../../public/images/kavindu-portrait.png";

const NAV = ["WORK", "ABOUT", "EXPERIENCE", "CONTACT"];

const TECH_STACK = [
  "REACT",
  "NODE.JS",
  "TYPESCRIPT",
  "MYSQL",
  "NEXT.JS",
  "MONGODB",
];

const CHAPTERS = ["ARRIVAL", "DEPTH", "SYSTEM", "STACK", "ENGINEER", "WORK"];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const progressBetween = (value, start, end) =>
  clamp((value - start) / Math.max(end - start, 0.0001));

const hex = (value) => parseInt(value.replace("#", ""), 16);

/* ============================================================
   Component
   ============================================================ */

const Hero3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const nameRef = useRef(null);
  const engineerRef = useRef(null);
  const systemRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const gridRef = useRef(null);
  const cursorRef = useRef(null);

  const stateRef = useRef({
    progress: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState("K / 01");

  const [activeChapter, setActiveChapter] = useState(0);

  /* ============================================================
     Loading
     ============================================================ */

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLoadingText("INITIALIZING SYSTEM...");
    }, 250);

    const t2 = setTimeout(() => {
      setLoadingText("LOADING EXPERIENCE...");
    }, 480);

    const t3 = setTimeout(() => {
      setLoaded(true);
    }, 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  /* ============================================================
     Hero Name Reveal
     ============================================================ */

  useEffect(() => {
    if (!loaded || !nameRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const split = new SplitText(nameRef.current, {
      type: "lines,chars",
      mask: "lines",
    });

    gsap.fromTo(
      split.chars,
      {
        yPercent: 120,
        opacity: 0,
        rotateX: 70,
      },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.025,
        ease: "power4.out",
        delay: 0.1,
      },
    );

    return () => {
      split.revert();
    };
  }, [loaded]);

  /* ============================================================
     Progress UI
     ============================================================ */

  useEffect(() => {
    let raf;

    const update = () => {
      setProgress(stateRef.current.progress);

      const nextChapter = Math.min(
        CHAPTERS.length - 1,
        Math.floor(stateRef.current.progress * CHAPTERS.length),
      );

      setActiveChapter(nextChapter);

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);

    return () => cancelAnimationFrame(raf);
  }, []);

  /* ============================================================
     Three.js Scene
     ============================================================ */

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isMobile = window.innerWidth < 768;

    /* ------------------------------------------------------------
       Scene
       ------------------------------------------------------------ */

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(hex(PALETTE.bg));

    scene.fog = new THREE.Fog(
      hex(PALETTE.bg),
      isMobile ? 7 : 8,
      isMobile ? 15 : 20,
    );

    /* ------------------------------------------------------------
       Camera
       ------------------------------------------------------------ */

    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(0.1, 0.1, 8.2);

    /* ------------------------------------------------------------
       Renderer
       ------------------------------------------------------------ */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.8),
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    canvasRef.current.appendChild(renderer.domElement);

    /* ------------------------------------------------------------
       Lights
       ------------------------------------------------------------ */

    const ambient = new THREE.AmbientLight(0xffffff, 1.1);

    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);

    keyLight.position.set(5, 7, 8);

    scene.add(keyLight);

    const accentLight = new THREE.PointLight(hex(PALETTE.accent), 4, 15);

    accentLight.position.set(-4, 1, 5);

    scene.add(accentLight);

    const secondAccent = new THREE.PointLight(hex(PALETTE.accentBright), 2, 12);

    secondAccent.position.set(4, -3, 3);

    scene.add(secondAccent);

    /* ============================================================
       MAIN ENGINEERING SYSTEM
       ============================================================ */

    const system = new THREE.Group();

    system.position.set(1.35, 0.05, 0);

    system.rotation.set(
      THREE.MathUtils.degToRad(8),
      THREE.MathUtils.degToRad(-15),
      THREE.MathUtils.degToRad(3),
    );

    scene.add(system);

    /* ------------------------------------------------------------
       Outer architecture
       ------------------------------------------------------------ */

    const outerGeometry = new THREE.IcosahedronGeometry(2.15, 1);

    const outerEdges = new THREE.EdgesGeometry(outerGeometry);

    const outerMaterial = new THREE.LineBasicMaterial({
      color: hex(PALETTE.text),
      transparent: true,
      opacity: 0.32,
    });

    const outerFrame = new THREE.LineSegments(outerEdges, outerMaterial);

    system.add(outerFrame);

    /* ------------------------------------------------------------
       Mid architecture
       ------------------------------------------------------------ */

    const midGeometry = new THREE.IcosahedronGeometry(1.55, 1);

    const midEdges = new THREE.EdgesGeometry(midGeometry);

    const midMaterial = new THREE.LineBasicMaterial({
      color: hex(PALETTE.accent),
      transparent: true,
      opacity: 0.6,
    });

    const midFrame = new THREE.LineSegments(midEdges, midMaterial);

    system.add(midFrame);

    /* ------------------------------------------------------------
       Core
       ------------------------------------------------------------ */

    const coreGeometry = new THREE.IcosahedronGeometry(0.72, 2);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: hex(PALETTE.surface),
      transparent: true,
      opacity: 0.32,
      roughness: 0.2,
      metalness: 0.15,
      transmission: 0.15,
    });

    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    system.add(core);

    /* ------------------------------------------------------------
       Core ring
       ------------------------------------------------------------ */

    const ringGeometry = new THREE.TorusGeometry(1.25, 0.012, 8, 120);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: hex(PALETTE.accent),
      transparent: true,
      opacity: 0.55,
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);

    ring1.rotation.x = Math.PI / 2.3;

    system.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());

    ring2.rotation.y = Math.PI / 2.8;

    ring2.scale.setScalar(0.82);

    system.add(ring2);

    const ring3 = new THREE.Mesh(ringGeometry, ringMaterial.clone());

    ring3.rotation.z = Math.PI / 3;

    ring3.scale.setScalar(0.64);

    system.add(ring3);

    /* ============================================================
       UNIQUE VERTICES
       ============================================================ */

    const sourcePosition = outerGeometry.attributes.position;

    const uniqueVertices = [];
    const vertexSet = new Set();

    for (let i = 0; i < sourcePosition.count; i++) {
      const vector = new THREE.Vector3().fromBufferAttribute(sourcePosition, i);

      const key = vector
        .toArray()
        .map((v) => v.toFixed(2))
        .join(",");

      if (!vertexSet.has(key)) {
        vertexSet.add(key);
        uniqueVertices.push(vector);
      }
    }

    const selectedIndices = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18].filter(
      (index) => index < uniqueVertices.length,
    );

    /* ============================================================
       NODES
       ============================================================ */

    const nodeGeometry = new THREE.SphereGeometry(
      isMobile ? 0.065 : 0.085,
      16,
      16,
    );

    const nodes = [];

    selectedIndices.forEach((index, nodeIndex) => {
      const material = new THREE.MeshStandardMaterial({
        color: hex(PALETTE.accentBright),
        emissive: hex(PALETTE.accent),
        emissiveIntensity: 1.8,
        roughness: 0.25,
      });

      const node = new THREE.Mesh(nodeGeometry, material);

      node.position.copy(uniqueVertices[index]);

      node.userData = {
        basePosition: node.position.clone(),
        index: nodeIndex,
      };

      system.add(node);

      nodes.push(node);
    });

    /* ============================================================
       CONNECTIONS
       ============================================================ */

    const connectionGroup = new THREE.Group();

    system.add(connectionGroup);

    const connectionLines = [];

    const connectionPairs = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 0],
      [0, 4],
      [2, 7],
      [3, 8],
      [1, 6],
    ];

    connectionPairs.forEach(([a, b]) => {
      if (!nodes[a] || !nodes[b]) return;

      const geometry = new THREE.BufferGeometry();

      const positions = new Float32Array([
        nodes[a].position.x,
        nodes[a].position.y,
        nodes[a].position.z,

        nodes[b].position.x,
        nodes[b].position.y,
        nodes[b].position.z,
      ]);

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const material = new THREE.LineBasicMaterial({
        color: hex(PALETTE.accent),
        transparent: true,
        opacity: 0,
      });

      const line = new THREE.LineSegments(geometry, material);

      connectionGroup.add(line);

      connectionLines.push(line);
    });

    /* ============================================================
       DATA STREAMS
       ============================================================ */

    const streamGroup = new THREE.Group();

    system.add(streamGroup);

    const streams = [];

    for (let streamIndex = 0; streamIndex < 12; streamIndex++) {
      const geometry = new THREE.BufferGeometry();

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.8, Math.sin(streamIndex) * 0.7, 0),

        new THREE.Vector3(-0.7, Math.cos(streamIndex) * 1.2, 0.4),

        new THREE.Vector3(0.3, Math.sin(streamIndex * 1.4), 0),

        new THREE.Vector3(1.8, Math.cos(streamIndex) * 0.7, 0.2),
      ]);

      const points = curve.getPoints(40);

      geometry.setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: hex(PALETTE.accent),
        transparent: true,
        opacity: 0,
      });

      const line = new THREE.Line(geometry, material);

      line.visible = true;

      streamGroup.add(line);

      streams.push(line);
    }

    /* ============================================================
       FLOATING PARTICLES
       ============================================================ */

    const particleCount = isMobile ? 55 : 120;

    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 15;

      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;

      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: hex(PALETTE.line),
      size: isMobile ? 0.025 : 0.035,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);

    scene.add(particles);

    /* ============================================================
       ENGINEERING GRID
       ============================================================ */

    const gridGroup = new THREE.Group();

    scene.add(gridGroup);

    const gridMaterial = new THREE.LineBasicMaterial({
      color: hex(PALETTE.line),
      transparent: true,
      opacity: 0.16,
    });

    for (let i = -8; i <= 8; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.65, -4, -2),
        new THREE.Vector3(i * 0.65, 4, -2),
      ]);

      gridGroup.add(new THREE.Line(geometry, gridMaterial));
    }

    for (let i = -5; i <= 5; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-6, i * 0.7, -2),
        new THREE.Vector3(6, i * 0.7, -2),
      ]);

      gridGroup.add(new THREE.Line(geometry, gridMaterial));
    }

    /* ============================================================
       Mouse
       ============================================================ */

    const handleMouseMove = (event) => {
      stateRef.current.mouseX = (event.clientX / window.innerWidth) * 2 - 1;

      stateRef.current.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    /* ============================================================
       Scene animation state
       ============================================================ */

    const sceneState = {
      cameraZ: 8.2,
      cameraX: 0.1,
      cameraY: 0.1,

      systemX: 1.35,
      systemY: 0.05,
      systemScale: 1,

      outerOpacity: 0.32,
      midOpacity: 0.6,

      connectionOpacity: 0,
      streamOpacity: 0,

      gridOpacity: 0.16,
    };

    /* ============================================================
       Master Scroll Timeline
       ============================================================ */

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=360%",
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,

        onUpdate: (self) => {
          stateRef.current.progress = self.progress;
        },
      },
    });

    /* ------------------------------------------------------------
       CHAPTER 01
       0 → 15%
       ------------------------------------------------------------ */

    master.to(
      sceneState,
      {
        cameraZ: 7.2,
        systemScale: 1.08,
        duration: 1,
        ease: "none",
      },
      0,
    );

    /* ------------------------------------------------------------
       CHAPTER 02
       15 → 35%
       Camera enters system
       ------------------------------------------------------------ */

    master.to(
      sceneState,
      {
        cameraZ: 4.6,
        cameraX: -0.4,
        cameraY: 0.2,
        systemX: 0.8,
        systemScale: 1.35,
        duration: 2,
        ease: "none",
      },
      1,
    );

    master.to(
      system.rotation,
      {
        x: system.rotation.x + 0.35,
        y: system.rotation.y + 1.4,
        z: system.rotation.z + 0.15,
        duration: 2,
        ease: "none",
      },
      1,
    );

    master.to(
      ring1.rotation,
      {
        z: Math.PI * 1.4,
        duration: 2,
        ease: "none",
      },
      1,
    );

    master.to(
      ring2.rotation,
      {
        x: Math.PI * 1.7,
        duration: 2,
        ease: "none",
      },
      1,
    );

    /* ------------------------------------------------------------
       CHAPTER 03
       35 → 55%
       Architecture comes alive
       ------------------------------------------------------------ */

    master.to(
      sceneState,
      {
        cameraZ: 3.0,
        cameraX: 0.5,
        systemX: 0,
        systemScale: 1.55,
        connectionOpacity: 0.7,
        streamOpacity: 0.3,
        duration: 2,
        ease: "none",
      },
      3,
    );

    master.to(
      outerMaterial,
      {
        opacity: 0.12,
        duration: 2,
        ease: "none",
      },
      3,
    );

    master.to(
      midMaterial,
      {
        opacity: 0.85,
        duration: 2,
        ease: "none",
      },
      3,
    );

    connectionLines.forEach((line, index) => {
      master.to(
        line.material,
        {
          opacity: 0.5,
          duration: 0.35,
          ease: "none",
        },
        3 + index * 0.08,
      );
    });

    streams.forEach((stream, index) => {
      master.to(
        stream.material,
        {
          opacity: 0.15,
          duration: 0.4,
          ease: "none",
        },
        3.5 + index * 0.06,
      );
    });

    /* ------------------------------------------------------------
       CHAPTER 04
       55 → 70%
       Technology system
       ------------------------------------------------------------ */

    master.to(
      sceneState,
      {
        cameraZ: 4.1,
        cameraX: 1.2,
        systemX: 1.8,
        systemScale: 1.15,
        duration: 1.5,
        ease: "none",
      },
      5,
    );

    master.to(
      ring3.rotation,
      {
        y: Math.PI * 2,
        duration: 1.5,
        ease: "none",
      },
      5,
    );

    /* ------------------------------------------------------------
       CHAPTER 05
       70 → 88%
       Portrait reveal
       ------------------------------------------------------------ */

    master.to(
      sceneState,
      {
        cameraZ: 5.3,
        cameraX: 2.1,
        cameraY: 0.1,
        systemX: 2.7,
        systemScale: 0.85,
        duration: 1.8,
        ease: "none",
      },
      6.5,
    );

    master.to(
      system.rotation,
      {
        x: system.rotation.x - 0.2,
        y: system.rotation.y + 0.7,
        duration: 1.8,
        ease: "none",
      },
      6.5,
    );

    /* ------------------------------------------------------------
       CHAPTER 06
       88 → 100%
       Exit
       ------------------------------------------------------------ */

    master.to(
      sceneState,
      {
        cameraZ: 10,
        cameraX: 0,
        cameraY: -0.4,
        systemX: 5,
        systemScale: 2.4,
        duration: 1.5,
        ease: "power2.inOut",
      },
      8.3,
    );

    master.to(
      system.rotation,
      {
        x: system.rotation.x + 0.8,
        y: system.rotation.y + 2.5,
        z: system.rotation.z + 0.4,
        duration: 1.5,
        ease: "none",
      },
      8.3,
    );

    /* ============================================================
       Render loop
       ============================================================ */

    const clock = new THREE.Clock();

    let animationFrame;

    const render = () => {
      animationFrame = requestAnimationFrame(render);

      const elapsed = clock.getElapsedTime();

      const mouseX = stateRef.current.mouseX;

      const mouseY = stateRef.current.mouseY;

      if (!reduceMotion) {
        /* Mouse camera */
        camera.position.x +=
          (sceneState.cameraX + mouseX * 0.18 - camera.position.x) * 0.045;

        camera.position.y +=
          (sceneState.cameraY + mouseY * 0.12 - camera.position.y) * 0.045;

        /* Camera depth */
        camera.position.z += (sceneState.cameraZ - camera.position.z) * 0.08;

        /* System */
        system.position.x += (sceneState.systemX - system.position.x) * 0.07;

        system.position.y +=
          (sceneState.systemY + mouseY * 0.08 - system.position.y) * 0.04;

        system.scale.lerp(
          new THREE.Vector3(
            sceneState.systemScale,
            sceneState.systemScale,
            sceneState.systemScale,
          ),
          0.06,
        );

        /* Gentle idle movement */
        system.rotation.x += Math.sin(elapsed * 0.35) * 0.0006;

        system.rotation.z += Math.cos(elapsed * 0.25) * 0.0004;

        /* Rings */
        ring1.rotation.z += 0.0015;

        ring2.rotation.x += 0.001;

        ring3.rotation.y += 0.0018;

        /* Core */
        core.rotation.x += 0.0012;

        core.rotation.y += 0.0018;

        /* Nodes */
        nodes.forEach((node, index) => {
          const pulse = 1 + Math.sin(elapsed * 2 + index * 0.8) * 0.2;

          node.scale.setScalar(pulse);
        });

        /* Particles */
        particles.rotation.y += 0.0003;

        particles.rotation.x += 0.00005;

        /* Grid */
        gridGroup.position.z = -2 + Math.sin(elapsed * 0.15) * 0.08;
      }

      camera.lookAt(system.position.x * 0.15, system.position.y, 0);

      renderer.render(scene, camera);
    };

    render();

    /* ============================================================
       Resize
       ============================================================ */

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.8),
      );
    };

    window.addEventListener("resize", handleResize);

    /* ============================================================
       Cleanup
       ============================================================ */

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animationFrame);

      master.kill();

      outerGeometry.dispose();
      outerEdges.dispose();
      outerMaterial.dispose();

      midGeometry.dispose();
      midEdges.dispose();
      midMaterial.dispose();

      coreGeometry.dispose();
      coreMaterial.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();

      nodeGeometry.dispose();

      connectionLines.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });

      streams.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });

      particleGeometry.dispose();
      particleMaterial.dispose();

      gridMaterial.dispose();

      renderer.dispose();

      if (
        canvasRef.current &&
        renderer.domElement.parentNode === canvasRef.current
      ) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  /* ============================================================
     DOM Scroll Animation
     ============================================================ */

  useEffect(() => {
    if (!loaded) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const p = progress;

      /* --------------------------------------------------------
         Hero title
         -------------------------------------------------------- */

      if (nameRef.current) {
        const exit = progressBetween(p, 0.78, 1);

        gsap.set(nameRef.current, {
          y: -exit * 180,
          scale: 1 - exit * 0.12,
          opacity: 1 - exit,
        });
      }

      /* --------------------------------------------------------
         Engineer title
         -------------------------------------------------------- */

      if (engineerRef.current) {
        const enter = progressBetween(p, 0.28, 0.43);

        const leave = progressBetween(p, 0.55, 0.7);

        gsap.set(engineerRef.current, {
          opacity: enter * (1 - leave),
          y: (1 - enter) * 80 - leave * 80,
          scale: 0.92 + enter * 0.08,
        });
      }

      /* --------------------------------------------------------
         System title
         -------------------------------------------------------- */

      if (systemRef.current) {
        const enter = progressBetween(p, 0.42, 0.56);

        const leave = progressBetween(p, 0.68, 0.78);

        gsap.set(systemRef.current, {
          opacity: enter * (1 - leave),
          y: (1 - enter) * 100 - leave * 80,
          scale: 0.9 + enter * 0.1,
        });
      }

      /* --------------------------------------------------------
         Portrait
         -------------------------------------------------------- */

      if (portraitWrapRef.current) {
        const enter = progressBetween(p, 0.67, 0.83);

        const exit = progressBetween(p, 0.88, 1);

        gsap.set(portraitWrapRef.current, {
          clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
          scale: 1.05 - enter * 0.05 + exit * 0.15,
          opacity: enter * (1 - exit),
        });
      }

      /* --------------------------------------------------------
         Portrait image movement
         -------------------------------------------------------- */

      if (portraitRef.current) {
        const imageMove = progressBetween(p, 0.67, 0.9);

        gsap.set(portraitRef.current, {
          scale: 1.08 - imageMove * 0.08,
          x: (1 - imageMove) * 80,
        });
      }

      /* --------------------------------------------------------
         Grid
         -------------------------------------------------------- */

      if (gridRef.current) {
        gsap.set(gridRef.current, {
          opacity: 0.15 + p * 0.25,
          scale: 1 + p * 0.1,
        });
      }
    });

    return () => ctx.revert();
  }, [progress, loaded]);

  /* ============================================================
     Magnetic Navigation
     ============================================================ */

  const handleMagneticMove = (event, element) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);

    const y = event.clientY - (rect.top + rect.height / 2);

    gsap.to(element, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const resetMagnetic = (element) => {
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  /* ============================================================
     Chapter Helpers
     ============================================================ */

  const chapterProgress = progress * CHAPTERS.length;

  /* ============================================================
     Render
     ============================================================ */

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: PALETTE.bg,
        color: PALETTE.text,
      }}
    >
      {/* ======================================================
          LOADING
      ====================================================== */}

      <div
        className="absolute inset-0 z-[100] flex items-center justify-center"
        style={{
          background: PALETTE.bg,
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? "none" : "auto",
          transition: "opacity 500ms ease",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="font-mono text-[10px] tracking-[0.3em]"
            style={{
              color: PALETTE.text,
            }}
          >
            {loadingText}
          </div>

          <div
            className="h-px w-24 overflow-hidden"
            style={{
              background: PALETTE.line,
            }}
          >
            <div
              className="h-full w-full origin-left"
              style={{
                background: PALETTE.accent,
                transform: loaded ? "scaleX(1)" : "scaleX(0.7)",
                transition: "transform 700ms ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          BACKGROUND GRID
      ====================================================== */}

      <div ref={gridRef} className="pointer-events-none absolute inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                ${PALETTE.line} 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                ${PALETTE.line} 1px,
                transparent 1px
              )
            `,
            backgroundSize: "90px 90px",
            maskImage:
              "radial-gradient(circle at 65% 50%, black, transparent 72%)",
            opacity: 0.22,
          }}
        />
      </div>

      {/* ======================================================
          THREE.JS
      ====================================================== */}

      <div ref={canvasRef} className="absolute inset-0 z-[2]" />

      {/* ======================================================
          GRAIN
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-[50]"
        style={{
          opacity: 0.045,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ======================================================
          TOP BORDER
      ====================================================== */}

      <div
        className="absolute top-0 left-0 right-0 z-[60] border-t"
        style={{
          borderColor: PALETTE.line,
          opacity: 0.7,
        }}
      />

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <header className="absolute top-0 left-0 right-0 z-[70] flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8">
        <div
          className="font-mono text-xs tracking-[0.18em]"
          style={{
            color: PALETTE.text,
          }}
        >
          KAVINDU / 26
        </div>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative font-mono text-[10px] tracking-[0.2em]"
              style={{
                color: PALETTE.text,
              }}
              onMouseMove={(event) =>
                handleMagneticMove(event, event.currentTarget)
              }
              onMouseLeave={(event) => resetMagnetic(event.currentTarget)}
            >
              {item}

              <span
                className="absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{
                  background: PALETTE.accent,
                }}
              />

              <span
                className="absolute -right-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: PALETTE.accent,
                }}
              />
            </a>
          ))}
        </nav>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border md:hidden"
          style={{
            borderColor: PALETTE.line,
            color: PALETTE.text,
          }}
          aria-label="Open menu"
        >
          <span className="font-mono text-xs">+</span>
        </button>
      </header>

      {/* ======================================================
          AVAILABILITY
      ====================================================== */}

      <div className="absolute left-6 top-20 z-[60] flex items-center gap-2 md:left-10 md:top-24">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{
            background: PALETTE.accent,
          }}
        />

        <span
          className="font-mono text-[9px] tracking-[0.18em] md:text-[10px]"
          style={{
            color: PALETTE.text,
            opacity: 0.65,
          }}
        >
          AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES
        </span>
      </div>

      {/* ======================================================
          MAIN HERO NAME
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-[40] flex items-center px-6 md:px-10"
        style={{
          perspective: "1000px",
        }}
      >
        <div className="relative w-full max-w-5xl">
          <div
            className="mb-5 font-mono text-[10px] tracking-[0.3em] md:text-xs"
            style={{
              color: PALETTE.accent,
            }}
          >
            SOFTWARE ENGINEER
            <span
              style={{
                opacity: 0.45,
              }}
            >
              {" "}
              ·{" "}
            </span>
            CREATIVE DEVELOPER
          </div>

          <h1
            ref={nameRef}
            className="font-sans font-semibold leading-[0.84] tracking-[-0.07em]"
            style={{
              color: PALETTE.text,
              fontSize: "clamp(4rem, 9vw, 9.5rem)",
            }}
          >
            KAVINDU
            <br />
            ABEYKOON
          </h1>

          <div className="mt-7 max-w-md">
            <p
              className="text-sm leading-relaxed md:text-base"
              style={{
                color: PALETTE.text,
                opacity: 0.65,
              }}
            >
              Building thoughtful digital products,
              <br />
              from interfaces to scalable systems.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          ENGINEER STATEMENT
      ====================================================== */}

      <div
        ref={engineerRef}
        className="pointer-events-none absolute inset-0 z-[45] flex items-center justify-center px-6 text-center"
        style={{
          opacity: 0,
          transform: "translateY(80px) scale(.92)",
        }}
      >
        <div>
          <div
            className="mb-6 font-mono text-[10px] tracking-[0.35em]"
            style={{
              color: PALETTE.accent,
            }}
          >
            CHAPTER / 03
          </div>

          <h2
            className="font-sans font-semibold leading-[0.88] tracking-[-0.06em]"
            style={{
              color: PALETTE.text,
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
            }}
          >
            SOFTWARE
            <br />
            ENGINEER
          </h2>
        </div>
      </div>

      {/* ======================================================
          DIGITAL SYSTEM STATEMENT
      ====================================================== */}

      <div
        ref={systemRef}
        className="pointer-events-none absolute inset-0 z-[46] flex items-center justify-start px-6 md:px-10"
        style={{
          opacity: 0,
          transform: "translateY(100px) scale(.9)",
        }}
      >
        <div>
          <div
            className="mb-6 font-mono text-[10px] tracking-[0.35em]"
            style={{
              color: PALETTE.accent,
            }}
          >
            SYSTEM / 04
          </div>

          <h2
            className="font-sans font-semibold leading-[0.88] tracking-[-0.06em]"
            style={{
              color: PALETTE.text,
              fontSize: "clamp(3rem, 7vw, 7rem)",
            }}
          >
            I BUILD
            <br />
            DIGITAL
            <br />
            SYSTEMS
          </h2>
        </div>
      </div>

      {/* ======================================================
          TECH STACK
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[48]">
        {TECH_STACK.map((tech, index) => {
          const positions = [
            {
              top: "18%",
              right: "8%",
            },
            {
              top: "31%",
              right: "27%",
            },
            {
              top: "47%",
              right: "8%",
            },
            {
              top: "62%",
              right: "25%",
            },
            {
              top: "74%",
              right: "8%",
            },
            {
              top: "84%",
              right: "28%",
            },
          ];

          const position = positions[index];

          const techProgress = progressBetween(
            progress,
            0.51 + index * 0.018,
            0.58 + index * 0.018,
          );

          return (
            <div
              key={tech}
              className="absolute hidden md:flex items-center gap-2"
              style={{
                top: position.top,
                right: position.right,
                opacity: techProgress,
                transform: `translateY(${(1 - techProgress) * 20}px)`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: PALETTE.accent,
                  boxShadow: `0 0 12px ${PALETTE.accent}`,
                }}
              />

              <span
                className="font-mono text-[9px] tracking-[0.22em]"
                style={{
                  color: PALETTE.text,
                }}
              >
                {tech}
              </span>

              <span
                className="h-px w-8"
                style={{
                  background: PALETTE.line,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ======================================================
          PORTRAIT
      ====================================================== */}

      <div
        ref={portraitWrapRef}
        className="pointer-events-none absolute right-0 top-0 z-[30] hidden h-full w-[54%] overflow-hidden md:block"
        style={{
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        <div
          ref={portraitRef}
          className="relative h-full w-full"
          style={{
            transform: "scale(1.08) translateX(80px)",
          }}
        >
          <img
            src={PORTRAIT_SRC}
            alt="Kavindu Abeykoon"
            className="h-full w-full object-cover"
            style={{
              filter: "grayscale(1) contrast(1.12) brightness(.92)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  120deg,
                  ${PALETTE.bg} 0%,
                  transparent 45%
                ),
                linear-gradient(
                  160deg,
                  ${PALETTE.accent} 0%,
                  ${PALETTE.text} 100%
                )
              `,
              mixBlendMode: "multiply",
              opacity: 0.75,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                  180deg,
                  transparent 55%,
                  ${PALETTE.darkText} 100%
                )`,
              opacity: 0.35,
            }}
          />

          {/* Scan line */}

          <div
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${progress * 100}%`,
              background: `linear-gradient(
                  90deg,
                  transparent,
                  ${PALETTE.accentBright},
                  transparent
                )`,
              boxShadow: `0 0 15px ${PALETTE.accent}`,
            }}
          />

          {/* Portrait metadata */}

          <div className="absolute bottom-10 right-8">
            <div
              className="font-mono text-[9px] tracking-[0.25em]"
              style={{
                color: PALETTE.white,
                opacity: 0.8,
              }}
            >
              KAVINDU ABeykoon
            </div>

            <div
              className="mt-2 font-mono text-[8px] tracking-[0.18em]"
              style={{
                color: PALETTE.white,
                opacity: 0.55,
              }}
            >
              SOFTWARE ENGINEER / 2026
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          EXPERIENCE DATA
      ====================================================== */}

      <div
        className="pointer-events-none absolute bottom-24 left-6 z-[60] md:left-10"
        style={{
          opacity: progressBetween(progress, 0.7, 0.8),
        }}
      >
        <div className="flex items-end gap-4">
          <span
            className="font-sans font-semibold leading-none tracking-[-0.06em]"
            style={{
              color: PALETTE.text,
              fontSize: "clamp(3rem, 5vw, 5rem)",
            }}
          >
            03+
          </span>

          <span
            className="pb-1 font-mono text-[9px] leading-relaxed tracking-[0.18em]"
            style={{
              color: PALETTE.text,
              opacity: 0.65,
            }}
          >
            YEARS
            <br />
            ENGINEERING
          </span>
        </div>
      </div>

      {/* ======================================================
          CHAPTER NAVIGATION
      ====================================================== */}

      <div className="absolute right-6 top-1/2 z-[70] hidden -translate-y-1/2 md:block">
        <div className="flex flex-col gap-4">
          {CHAPTERS.map((chapter, index) => {
            const active = index === activeChapter;

            return (
              <div
                key={chapter}
                className="flex items-center justify-end gap-3"
              >
                <span
                  className="font-mono text-[7px] tracking-[0.16em] transition-opacity duration-300"
                  style={{
                    color: PALETTE.text,
                    opacity: active ? 0.8 : 0.25,
                  }}
                >
                  {chapter}
                </span>

                <span
                  className="h-px transition-all duration-300"
                  style={{
                    width: active ? 32 : 10,
                    background: active ? PALETTE.accent : PALETTE.line,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================
          SCROLL INDICATOR
      ====================================================== */}

      <div className="absolute bottom-7 left-6 z-[70] flex items-end gap-3 md:left-10">
        <div
          className="relative h-12 w-px overflow-hidden"
          style={{
            background: PALETTE.line,
          }}
        >
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: `${progress * 100}%`,
              background: PALETTE.accent,
              boxShadow: `0 0 8px ${PALETTE.accent}`,
            }}
          />
        </div>

        <div
          className="font-mono text-[9px] leading-relaxed tracking-[0.2em]"
          style={{
            color: PALETTE.text,
          }}
        >
          SCROLL
          <br />
          EXPLORE
        </div>
      </div>

      {/* ======================================================
          LOCATION
      ====================================================== */}

      <div className="absolute bottom-7 right-6 z-[70] md:right-10">
        <div
          className="font-mono text-[9px] tracking-[0.18em]"
          style={{
            color: PALETTE.text,
            opacity: 0.55,
          }}
        >
          SRI LANKA
          <span
            className="mx-2"
            style={{
              color: PALETTE.accent,
            }}
          >
            /
          </span>
          2026
        </div>
      </div>

      {/* ======================================================
          BOTTOM BORDER
      ====================================================== */}

      <div
        className="absolute bottom-0 left-0 right-0 z-[60] border-b"
        style={{
          borderColor: PALETTE.line,
          opacity: 0.7,
        }}
      />

      {/* ======================================================
          EXIT TITLE
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-[80] flex items-center justify-center"
        style={{
          opacity: progressBetween(progress, 0.9, 1),
        }}
      >
        <div className="text-center">
          <div
            className="mb-5 font-mono text-[9px] tracking-[0.35em]"
            style={{
              color: PALETTE.accent,
            }}
          >
            CHAPTER / 06
          </div>

          <div
            className="font-sans font-semibold tracking-[-0.06em]"
            style={{
              color: PALETTE.text,
              fontSize: "clamp(3rem, 7vw, 7rem)",
            }}
          >
            SELECTED
            <br />
            WORK
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
