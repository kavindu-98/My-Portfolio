/** @format */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT_SRC = "/images/kavindu-portrait.png";

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

  /* ============================================================
     LOADER
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
     THREE.JS

     Geometry detail, node count, and pixel-ratio cap are chosen
     once at mount based on viewport width. This isn't re-checked
     on resize/rotation — rebuilding WebGL geometry live is heavy
     and device class (phone vs desktop) essentially never changes
     mid-session. Camera framing and network position/scale DO
     need to respond live to aspect-ratio changes, and that's
     handled separately below, in the GSAP matchMedia block.
  ============================================================ */

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;

    const isMobile = window.innerWidth <= 900;

    const scene = new THREE.Scene();

    scene.background = new THREE.Color("#f5f8f6");

    /* ==========================================================
       CAMERA
    ========================================================== */

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 50 : 42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, isMobile ? 8.5 : 7);

    /* ==========================================================
       RENDERER
    ========================================================== */

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.4 : 1.7),
    );

    renderer.setSize(window.innerWidth, window.innerHeight, false);

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    /* ==========================================================
       LIGHT
    ========================================================== */

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));

    /* ==========================================================
       MAIN NETWORK
       Base position/scale here is just the resting state before
       any scroll animation runs — the GSAP matchMedia block resets
       this to a breakpoint-appropriate value the instant it mounts,
       so these two numbers barely matter, but keeping them mobile-
       aware too avoids a one-frame flash of the desktop framing.
    ========================================================== */

    const network = new THREE.Group();

    network.position.set(isMobile ? 0.75 : 1.55, 0, 0);

    network.scale.set(
      isMobile ? 0.85 : 1.1,
      isMobile ? 0.85 : 1.1,
      isMobile ? 0.85 : 1.1,
    );

    scene.add(network);

    networkRef.current = network;

    /* ==========================================================
       CORE — one detail level lower on mobile
    ========================================================== */

    const coreGeometry = new THREE.IcosahedronGeometry(1.55, isMobile ? 1 : 2);

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

    const innerGeometry = new THREE.IcosahedronGeometry(1.02, isMobile ? 1 : 2);

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
       NODES — fewer on mobile (16 vs 24)
    ========================================================== */

    const nodePositions = [];

    const nodeCount = isMobile ? 16 : 24;

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
        isMobile ? 8 : 12,
        isMobile ? 8 : 12,
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
       ORBIT RINGS — fewer segments on mobile
    ========================================================== */

    const createRing = (radius, rotation, opacity) => {
      const geometry = new THREE.RingGeometry(
        radius,
        radius + 0.008,
        isMobile ? 64 : 128,
      );

      const material = new THREE.MeshBasicMaterial({
        color: "#58dcca",
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      });

      const ring = new THREE.Mesh(geometry, material);

      ring.rotation.set(rotation.x, rotation.y, rotation.z);

      network.add(ring);

      return {
        ring,
        geometry,
        material,
      };
    };

    const ring1Data = createRing(
      1.95,
      {
        x: 0.4,
        y: 0.8,
        z: 0.2,
      },
      0.2,
    );

    const ring2Data = createRing(
      2.1,
      {
        x: 1.2,
        y: 0.2,
        z: 0.8,
      },
      0.14,
    );

    const ring3Data = createRing(
      1.55,
      {
        x: 0.8,
        y: 1.4,
        z: 0.5,
      },
      0.12,
    );

    const ring1 = ring1Data.ring;
    const ring2 = ring2Data.ring;
    const ring3 = ring3Data.ring;

    /* ==========================================================
       MOUSE — parallax only matters with a real cursor; touch
       devices just never fire mousemove, so this is naturally
       inert on mobile without needing a separate guard.
    ========================================================== */

    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;

      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    /* ==========================================================
       RESIZE
    ========================================================== */

    const handleResize = () => {
      const width = window.innerWidth;

      const height = window.innerHeight;

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth <= 900 ? 1.4 : 1.7),
      );

      /*
       * Do NOT call ScrollTrigger.refresh()
       * directly here.
       *
       * The centralized refresh system handles
       * ScrollTrigger measurements.
       */
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

      /* Core */

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

      ring1Data.geometry.dispose();
      ring1Data.material.dispose();

      ring2Data.geometry.dispose();
      ring2Data.material.dispose();

      ring3Data.geometry.dispose();
      ring3Data.material.dispose();

      nodes.children.forEach((node) => {
        node.geometry.dispose();
        node.material.dispose();
      });

      renderer.dispose();

      scene.clear();

      networkRef.current = null;
    };
  }, []);

  /* ============================================================
     HERO SCROLLTRIGGER

     Uses gsap.matchMedia() so the pin distance, camera targets,
     and network position/scale are each breakpoint-specific —
     and so the whole timeline rebuilds automatically if the
     device crosses the breakpoint (e.g. rotating a tablet from
     portrait to landscape), without a page reload.
  ============================================================ */

  useEffect(() => {
    if (!ready || !sectionRef.current) {
      return;
    }

    const section = sectionRef.current;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 900px)",
        isDesktop: "(min-width: 901px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isMobile, reduceMotion } = context.conditions;

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

        /* ======================================================
           REDUCED MOTION
        ====================================================== */

        if (reduceMotion) {
          gsap.set([name, engineer, system, stack, work, portrait], {
            clearProps: "all",
          });

          return;
        }

        /* ======================================================
           BREAKPOINT-SPECIFIC FRAMING

           Every number that positions the 3D network or camera
           lives here, in one place, per breakpoint — instead of
           being scattered as magic numbers through the timeline
           below. Mobile's narrower field of view needs smaller
           offsets across the board or the network mesh clips out
           of frame during the mid-timeline moves.
        ====================================================== */

        const M = isMobile
          ? {
              pinEnd: "+=360%",
              scrub: 1.1,
              netX0: 0.75,
              netScale0: 0.85,
              cameraZ0: 8.5,
              netX1: 0.25,
              cameraZ1: 8.7,
              netScale2: 1.05,
              cameraZ2: 9.0,
              cameraZ3: 8.2,
              cameraX3: 0.05,
              rotY3: 0.8,
              netX4: 1.15,
              netScale4: 0.6,
              cameraZ4: 10.5,
              cameraX4: -0.1,
              portraitEnabled: false,
            }
          : {
              pinEnd: "+=500%",
              scrub: 1.4,
              netX0: 1.55,
              netScale0: 1.1,
              cameraZ0: 7,
              netX1: 0.4,
              cameraZ1: 7.8,
              netScale2: 1.25,
              cameraZ2: 6.7,
              cameraZ3: 6.7,
              cameraX3: 0.1,
              rotY3: 1.2,
              netX4: 2.1,
              netScale4: 0.75,
              cameraZ4: 8.5,
              cameraX4: -0.2,
              portraitEnabled: true,
            };

        /* ======================================================
           INITIAL STATES
        ====================================================== */

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

        if (M.portraitEnabled) {
          gsap.set(portrait, {
            autoAlpha: 0,
            x: 64,
            scale: 1.05,
            filter: "blur(16px)",
          });
        } else {
          /* Portrait is display:none via CSS below 900px anyway —
             this just keeps GSAP's own bookkeeping consistent so
             nothing tries to fade in a hidden element. */
          gsap.set(portrait, { autoAlpha: 0 });
        }

        /* ======================================================
           RESET THREE TARGETS
        ====================================================== */

        cameraTarget.current.x = 0;
        cameraTarget.current.y = 0;
        cameraTarget.current.z = M.cameraZ0;

        rotationTarget.current.x = 0;
        rotationTarget.current.y = 0;
        rotationTarget.current.z = 0;

        gsap.set(network.position, {
          x: M.netX0,
          y: 0,
          z: 0,
        });

        gsap.set(network.scale, {
          x: M.netScale0,
          y: M.netScale0,
          z: M.netScale0,
        });

        /* ======================================================
           MASTER TIMELINE
        ====================================================== */

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: M.pinEnd,

            pin: true,

            scrub: M.scrub,

            anticipatePin: 1,

            invalidateOnRefresh: true,

            fastScrollEnd: true,

            pinSpacing: true,

            refreshPriority: 100,
          },
        });

        /* ======================================================
           01 — NAME
        ====================================================== */

        timeline.to(
          {},
          {
            duration: 1,
          },
        );

        /* ======================================================
           EXIT NAME
        ====================================================== */

        timeline.to(name, {
          autoAlpha: 0,
          y: -90,
          scale: 0.95,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power2.inOut",
        });

        /* ======================================================
           02 — ENGINEER
        ====================================================== */

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

        /* 3D */

        timeline.to(
          network.position,
          {
            x: M.netX1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<",
        );

        /* Portrait — desktop only */

        if (M.portraitEnabled) {
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
        }

        /* HOLD */

        timeline.to(
          {},
          {
            duration: 0.7,
          },
        );

        /* ======================================================
           EXIT ENGINEER
        ====================================================== */

        timeline.to(engineer, {
          autoAlpha: 0,
          y: -80,
          scale: 0.96,
          filter: "blur(9px)",
          duration: 0.75,
          ease: "power2.inOut",
        });

        /* ======================================================
           03 — SYSTEM
        ====================================================== */

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
            x: M.netScale2,
            y: M.netScale2,
            z: M.netScale2,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<",
        );

        /* Camera */

        timeline.to(
          cameraTarget.current,
          {
            z: M.cameraZ1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<",
        );

        /* Portrait — desktop only */

        if (M.portraitEnabled) {
          timeline.to(
            portrait,
            {
              x: -14,
              duration: 1.2,
              ease: "power2.inOut",
            },
            "<",
          );
        }

        /* HOLD */

        timeline.to(
          {},
          {
            duration: 0.7,
          },
        );

        /* ======================================================
           EXIT SYSTEM
        ====================================================== */

        timeline.to(system, {
          autoAlpha: 0,
          y: -80,
          scale: 0.96,
          filter: "blur(9px)",
          duration: 0.75,
          ease: "power2.inOut",
        });

        /* ======================================================
           04 — STACK
        ====================================================== */

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
            y: M.rotY3,
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
            z: M.cameraZ2,
            x: M.cameraX3,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<",
        );

        /* Portrait — desktop only */

        if (M.portraitEnabled) {
          timeline.to(
            portrait,
            {
              x: 0,
              duration: 1.2,
              ease: "power2.inOut",
            },
            "<",
          );
        }

        /* HOLD */

        timeline.to(
          {},
          {
            duration: 0.75,
          },
        );

        /* ======================================================
           EXIT STACK
        ====================================================== */

        timeline.to(stack, {
          autoAlpha: 0,
          y: -80,
          scale: 0.96,
          filter: "blur(9px)",
          duration: 0.75,
          ease: "power2.inOut",
        });

        if (M.portraitEnabled) {
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
        }

        /* ======================================================
           05 — WORK
        ====================================================== */

        /* Hand off to About: write the network's current spin
           angle to a CSS var right as this last chapter begins.
           About reads this once on mount and starts its own
           wireframe rotation from here instead of from zero —
           the two icosahedron motifs read as one continuous
           spin carrying through the section boundary, rather
           than two separately-timed animations that happen to
           look similar. */

        timeline.call(
          () => {
            const degrees = (rotationTarget.current.y * 180) / Math.PI;
            document.documentElement.style.setProperty(
              "--hero-exit-rotation",
              `${degrees}deg`,
            );
          },
          [],
          "<",
        );

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
            x: M.netX4,
            duration: 1.3,
            ease: "power3.inOut",
          },
          "<",
        );

        timeline.to(
          network.scale,
          {
            x: M.netScale4,
            y: M.netScale4,
            z: M.netScale4,
            duration: 1.3,
            ease: "power3.inOut",
          },
          "<",
        );

        timeline.to(
          cameraTarget.current,
          {
            z: M.cameraZ4,
            x: M.cameraX4,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<",
        );

        /* ======================================================
           FINAL HOLD
        ====================================================== */

        timeline.to(
          {},
          {
            duration: 1,
          },
        );

        /* ======================================================
           SAVE REFERENCE
        ====================================================== */

        section.__heroTimeline = timeline;

        /*
         * IMPORTANT:
         *
         * Do NOT call ScrollTrigger.refresh()
         * here immediately.
         *
         * The centralized refresh system will run
         * after fonts + images are ready.
         */

        /* matchMedia calls this automatically when the breakpoint
           changes or the component unmounts — this is the ctx.revert()
           equivalent for a single matched condition. */
        return () => {
          if (section.__heroTimeline === timeline) {
            delete section.__heroTimeline;
          }
        };
      },
    );

    /* ==========================================================
       WAIT FOR FONT + IMAGE LAYOUT
    ========================================================== */

    let refreshTimer;

    const scheduleRefresh = () => {
      clearTimeout(refreshTimer);

      refreshTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          });
        });
      }, 50);
    };

    /* Fonts */

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleRefresh);
    }

    /* Images */

    const images = Array.from(section.querySelectorAll("img"));

    const imagePromises = images.map((img) => {
      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });

        img.addEventListener("error", resolve, { once: true });
      });
    });

    Promise.all(imagePromises).then(scheduleRefresh);

    /* Immediate stable refresh */

    scheduleRefresh();

    /* ==========================================================
       RESIZE OBSERVER
    ========================================================== */

    let resizeObserver = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        scheduleRefresh();
      });

      resizeObserver.observe(section);
    }

    /* ==========================================================
       CLEANUP
    ========================================================== */

    return () => {
      clearTimeout(refreshTimer);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      mm.revert();
    };
  }, [ready]);

  /* ============================================================
     RENDER
  ============================================================ */

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
           LOADER
        ====================================================== */

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
          color: #123c35;
        }

        .hero3d__loader-track {
          width: 96px;
          height: 1px;
          background: rgba(23, 63, 56, 0.14);
          overflow: hidden;
        }

        .hero3d__loader-fill {
          width: 100%;
          height: 100%;
          transform-origin: left;
          background: #65dcca;
          transition: transform 700ms ease;
        }

        /* ======================================================
           PORTRAIT
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

          will-change:
            transform,
            opacity,
            filter;
        }

        .hero3d__portrait::before {
          content: "";

          position: absolute;

          left: 0;
          top: 20%;

          width: 1px;
          height: 60%;

          background: rgba(
            23,
            63,
            56,
            0.25
          );
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
              rgba(
                7,
                18,
                15,
                0.82
              ) 100%
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

          box-shadow:
            0 0 16px
            rgba(
              139,
              232,
              207,
              0.65
            );

          animation:
            hero3dPortraitScan
            7s
            ease-in-out
            infinite;
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

          font-family:
            "IBM Plex Mono",
            monospace;

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
            rgba(
              26,
              72,
              64,
              0.08
            );
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
           MOBILE NAV TOGGLE (hamburger)
        ====================================================== */

        .hero3d__nav-toggle {
          display: none;

          width: 34px;
          height: 34px;

          align-items: center;
          justify-content: center;

          background: transparent;
          border: 1px solid rgba(23, 63, 56, 0.18);
          border-radius: 4px;

          cursor: pointer;
        }

        .hero3d__nav-toggle span {
          display: block;
          width: 14px;
          height: 1px;
          background: #123c35;
          position: relative;
        }

        .hero3d__nav-toggle span::before,
        .hero3d__nav-toggle span::after {
          content: "";
          position: absolute;
          left: 0;
          width: 14px;
          height: 1px;
          background: #123c35;
        }

        .hero3d__nav-toggle span::before {
          top: -5px;
        }

        .hero3d__nav-toggle span::after {
          top: 5px;
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
            rgba(
              36,
              76,
              69,
              0.62
            );
        }

        .hero3d__status-dot {
          width: 6px;
          height: 6px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #78dbc9;

          box-shadow:
            0 0 14px
            rgba(
              120,
              219,
              201,
              0.8
            );
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

          width:
            min(
              720px,
              58vw
            );

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
            rgba(
              25,
              68,
              61,
              0.65
            );
        }

        /* ======================================================
           ENGINEER
        ====================================================== */

        .hero3d__chapter--engineer {
          left: 8%;

          width:
            min(
              760px,
              58vw
            );
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
            rgba(
              31,
              74,
              67,
              0.65
            );
        }

        /* ======================================================
           SYSTEM
        ====================================================== */

        .hero3d__chapter--system {
          left: 10%;

          width:
            min(
              650px,
              50vw
            );
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
            rgba(
              30,
              75,
              68,
              0.48
            );
        }

        /* ======================================================
           STACK
        ====================================================== */

        .hero3d__chapter--stack {
          left: 8%;

          width:
            min(
              760px,
              56vw
            );
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
            rgba(
              47,
              119,
              107,
              0.25
            );

          border-radius: 100px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.14em;

          color:
            rgba(
              25,
              76,
              68,
              0.72
            );

          background:
            rgba(
              255,
              255,
              255,
              0.28
            );

          backdrop-filter: blur(8px);
        }

        /* ======================================================
           WORK
        ====================================================== */

        .hero3d__chapter--work {
          left: 9%;

          width:
            min(
              700px,
              60vw
            );
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
            rgba(
              27,
              73,
              65,
              0.62
            );
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
            rgba(
              27,
              73,
              65,
              0.55
            );
        }

        .hero3d__work-line span {
          width: 55px;

          height: 1px;

          background: #63d4c2;
        }

        /* ======================================================
           3D LABELS
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
            rgba(
              31,
              78,
              70,
              0.58
            );
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
            rgba(
              25,
              69,
              62,
              0.7
            );
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
            rgba(
              30,
              74,
              67,
              0.35
            );
        }

        .hero3d__index span:first-child {
          color: #4ecab7;
        }

        /* ======================================================
           TABLET (901px was the old cliff — 769–1024 now steps
           down gradually instead of jumping straight to phone
           layout)
        ====================================================== */

        @media (max-width: 1024px) {
          .hero3d__chapter {
            width: min(640px, 62vw);
          }

          .hero3d__portrait {
            width: 30%;
          }

          .hero3d__label--node {
            right: 38%;
          }

          .hero3d__label--react {
            right: 34%;
          }

          .hero3d__label--mysql {
            right: 40%;
          }

          .hero3d__label--api {
            right: 36%;
          }
        }

        @media (max-width: 900px) {
          .hero3d__chapter {
            left: 28px !important;

            width:
              calc(
                100% - 56px
              );
          }

          .hero3d__side-text {
            display: none;
          }

          .hero3d__portrait {
            display: none;
          }

          .hero3d__labels {
            display: none;
          }
        }

        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 640px) {
          .hero3d {
            min-height: 100svh;
            height: 100svh;
          }

          .hero3d__nav {
            padding: 16px 18px;
          }

          .hero3d__nav nav {
            display: none;
          }

          .hero3d__nav-toggle {
            display: flex;
          }

          .hero3d__status {
            top: 66px;

            left: 18px;

            right: 18px;

            max-width: none;

            line-height: 1.5;

            font-size: 8px;

            letter-spacing: 0.14em;
          }

          .hero3d__chapter {
            left: 18px !important;

            width:
              calc(
                100% - 36px
              );
          }

          .hero3d__chapter--name {
            top: 52%;
          }

          .hero3d__chapter--name h1 {
            font-size:
              clamp(
                3rem,
                15vw,
                4.5rem
              );

            line-height: 0.86;
          }

          .hero3d__chapter--name p {
            font-size: 12px;
            margin-top: 20px;
          }

          .hero3d__eyebrow {
            font-size: 9px;
            letter-spacing: 0.22em;
          }

          .hero3d__chapter-number {
            margin-bottom: 16px;
          }

          .hero3d__chapter--engineer h2 {
            font-size:
              clamp(
                2.6rem,
                12vw,
                4rem
              );
          }

          .hero3d__chapter--system h2 {
            font-size:
              clamp(
                2.3rem,
                11vw,
                3.6rem
              );
          }

          .hero3d__chapter--stack h2 {
            font-size:
              clamp(
                2.3rem,
                11vw,
                3.6rem
              );
          }

          .hero3d__chapter--work h2 {
            font-size:
              clamp(
                2.6rem,
                13vw,
                4.2rem
              );
          }

          .hero3d__chapter-description {
            gap: 12px;
            margin-top: 24px;
          }

          .hero3d__chapter-description span {
            font-size: 20px;
          }

          .hero3d__tech-list {
            margin-top: 24px;
            gap: 6px;
          }

          .hero3d__tech-list span {
            padding: 7px 11px;
            font-size: 7px;
          }

          .hero3d__scroll {
            left: 16px;
            bottom: 18px;
          }

          .hero3d__scroll-line {
            height: 34px;
          }

          .hero3d__index {
            right: 16px;
            bottom: 18px;
            gap: 9px;
          }
        }

        /* ======================================================
           VERY SMALL / LANDSCAPE PHONES
        ====================================================== */

        @media (max-width: 400px) {
          .hero3d__chapter--name h1 {
            font-size: 2.5rem;
          }

          .hero3d__chapter--engineer h2,
          .hero3d__chapter--system h2,
          .hero3d__chapter--stack h2 {
            font-size: 2.1rem;
          }
        }

        @media (max-width: 900px) and (orientation: landscape) {
          .hero3d {
            min-height: 100svh;
            height: 100svh;
          }

          .hero3d__chapter {
            top: 50% !important;
          }

          .hero3d__status {
            display: none;
          }
        }

        /* ======================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {
          .hero3d__portrait-scan {
            animation: none;
          }
        }
      `}</style>

      <section ref={sectionRef} className="hero3d">
        {/* ====================================================
            LOADER
        ==================================================== */}

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
              style={{
                transform: loaded ? "scaleX(1)" : "scaleX(0.65)",
              }}
            />
          </div>
        </div>

        {/* ====================================================
            THREE.JS
        ==================================================== */}

        <canvas ref={canvasRef} className="hero3d__canvas" />

        <div className="hero3d__grid" />

        <div className="hero3d__noise" />

        {/* ====================================================
            PORTRAIT — CSS hides this below 900px; the JS side
            (M.portraitEnabled) independently skips animating it
            there too, so there's no dead animation running on a
            hidden element.
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

          {/* Purely decorative placeholder toggle for mobile —
              wire this to your real mobile-menu state if you
              have one; shown here so the header doesn't look
              broken/empty on phones where the nav links hide. */}
          <button className="hero3d__nav-toggle" aria-label="Open menu">
            <span />
          </button>
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
            FLOATING TECH LABELS — CSS hides these below 900px
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
