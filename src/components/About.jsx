/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * ============================================================
 * SAME TOKENS AS Hero3D — reconciled to match the hero's actual
 * palette (mint/teal on off-white, IBM Plex Mono + Inter).
 * Centralize these in a shared file when convenient.
 * ============================================================
 */
const PALETTE = {
  bg: "#F5F8F6",
  bgSection: "#EFF7F4",
  border: "rgba(23, 63, 56, 0.14)",
  accent: "#5FD6C4",
  text: "#123C35",
};

const STATS = [
  { value: 20, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Years Exp" },
];

const TECH = [
  "REACT",
  "NODE.JS",
  "TYPESCRIPT",
  "MYSQL",
  "NEXT.JS",
  "MONGODB",
  "DOCKER",
  "AWS",
];

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const visualRef = useRef(null);
  const wireframeRef = useRef(null);
  const cardRef = useRef(null);
  const marqueeRef = useRef(null);
  const statRefs = useRef([]);
  const ctaRefs = useRef([]);

  /* ============================================================
     Magnetic buttons — same device as Hero3D's nav links, carried
     forward so the interaction language stays consistent.
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
     Cursor tilt on the stat card — light, spring-damped, resets
     on leave. Mirrors the hero's mouse-reactive camera in a much
     smaller, section-appropriate dose.
     ============================================================ */

  const handleCardTilt = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: px * 8,
      rotateX: py * -8,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const resetCardTilt = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let split;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            contentRef.current,
            visualRef.current,
            marqueeRef.current?.parentElement,
          ],
          { opacity: 1 },
        );
        statRefs.current.forEach((el, i) => {
          if (el)
            el.textContent = `${String(STATS[i].value).padStart(2, "0")}${STATS[i].suffix}`;
        });
        return;
      }

      /* Headline — same split-char device as the hero name */

      split = new SplitText(headingRef.current, {
        type: "chars",
        mask: "chars",
      });

      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 0.7,
        stagger: 0.018,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Text column */

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Visual column — fade/rise, slightly delayed */

      gsap.from(visualRef.current, {
        opacity: 0,
        y: 48,
        duration: 1,
        delay: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* Wireframe motif — masked wipe on entrance, then a slow
         continuous rotation as you scroll through the section. */

      gsap.fromTo(
        wireframeRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          delay: 0.25,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(wireframeRef.current, {
        rotation: 18,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      /* Stat counters — count up once, on entry */

      STATS.forEach((stat, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${String(Math.round(counter.value)).padStart(2, "0")}${stat.suffix}`;
          },
        });
      });

      /* Marquee ticker — continuous, linear, seamless loop */

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: PALETTE.bgSection, color: PALETTE.text }}
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Hairline top edge — same structural device as the hero */}
      <div
        style={{ borderColor: PALETTE.border }}
        className="absolute top-0 left-0 right-0 border-t"
      />

      {/* Faint grid, matching the hero's quiet technical texture */}
      <div
        style={{
          backgroundImage: `linear-gradient(${PALETTE.border} 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.border} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          opacity: 0.25,
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Grain, same data-uri as the hero — ties the textures together */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.02,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section index — the same chapter-marker language as the hero */}
        <div
          style={{
            color: PALETTE.accent,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
          className="text-xs tracking-[0.3em] mb-10 flex items-center gap-3"
        >
          <span
            style={{ background: PALETTE.accent }}
            className="inline-block h-1.5 w-1.5 rounded-full"
          />
          02 — ABOUT
        </div>

        {/* Marquee ticker — full-bleed skill band, hairline framed */}
        <div
          style={{ borderColor: PALETTE.border }}
          className="relative w-full overflow-hidden border-y mb-16 py-3"
        >
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
            {[...TECH, ...TECH].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                style={{
                  color: PALETTE.text,
                  opacity: 0.55,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
                className="text-[11px] tracking-[0.22em] mx-6 flex items-center gap-6"
              >
                {tech}
                <span
                  style={{ background: PALETTE.accent }}
                  className="inline-block h-1 w-1 rounded-full opacity-70"
                />
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ---------- Content ---------- */}
          <div ref={contentRef} className="space-y-7">
            <h2
              ref={headingRef}
              style={{
                color: PALETTE.text,
                letterSpacing: "-0.02em",
                fontFamily: "'Inter', sans-serif",
              }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05]"
            >
              Full-stack engineer
              <br />
              <span style={{ color: PALETTE.accent }}>& problem solver.</span>
            </h2>

            <p
              style={{ color: PALETTE.text, opacity: 0.82 }}
              className="text-base md:text-lg leading-relaxed max-w-lg"
            >
              I'm Kavindu, a full-stack software engineer with 3+ years of
              professional experience building scalable enterprise applications.
              Based in Colombo, Sri Lanka, I specialize in the MERN stack, cloud
              solutions, and modern web technologies.
            </p>

            <p
              style={{ color: PALETTE.text, opacity: 0.72 }}
              className="text-base md:text-lg leading-relaxed max-w-lg"
            >
              My focus is turning front-end and back-end expertise into real
              product outcomes — mentoring junior developers and architecting
              solutions that solve business problems. Currently at Talentfort,
              leading system optimizations that improved efficiency by 50%.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              {[
                {
                  href: "/CV.pdf",
                  label: "DOWNLOAD CV",
                  filled: true,
                },
                {
                  href: "https://github.com/kavindu-98",
                  label: "GITHUB",
                  filled: false,
                },
                {
                  href: "https://www.linkedin.com/in/kavindu-abeykoon",
                  label: "LINKEDIN",
                  filled: false,
                },
              ].map((link, i) => (
                <a
                  key={link.label}
                  ref={(el) => (ctaRefs.current[i] = el)}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onMouseMove={(e) => handleMagneticMove(e, e.currentTarget)}
                  onMouseLeave={(e) => resetMagnetic(e.currentTarget)}
                  style={
                    link.filled
                      ? { background: PALETTE.accent, color: PALETTE.bg }
                      : { borderColor: PALETTE.text, color: PALETTE.text }
                  }
                  className={`px-7 py-3 rounded-full font-mono text-xs tracking-[0.12em] font-semibold inline-block ${
                    link.filled ? "" : "border"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* ---------- Visual: wireframe motif carried from the hero ---------- */}
          <div
            ref={visualRef}
            className="relative h-96 lg:h-[28rem] flex items-center justify-center"
            style={{ perspective: 1000 }}
          >
            <div
              ref={wireframeRef}
              style={{ opacity: 0.9 }}
              className="absolute w-64 h-64 md:w-80 md:h-80"
            >
              <WireframeIcon color={PALETTE.text} accent={PALETTE.accent} />
            </div>

            {/* Card — hairline frame, subtle cursor tilt, no glass/blur */}
            <div
              ref={cardRef}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
              style={{
                borderColor: PALETTE.border,
                background: "rgba(252, 255, 253, 0.55)",
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-sm rounded-2xl border p-8 flex flex-col items-center text-center"
            >
              <div
                style={{
                  color: PALETTE.text,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
                className="text-xs tracking-[0.2em] mb-2"
              >
                FULL STACK ENGINEER
              </div>
              <div
                style={{ color: PALETTE.text, opacity: 0.65 }}
                className="text-sm"
              >
                MERN · Cloud · Enterprise Solutions
              </div>

              <div
                style={{ borderColor: PALETTE.border }}
                className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t w-full"
              >
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <div
                      ref={(el) => (statRefs.current[i] = el)}
                      style={{ color: PALETTE.accent }}
                      className="text-3xl font-semibold font-mono"
                    >
                      00{stat.suffix}
                    </div>
                    <p
                      style={{
                        color: PALETTE.text,
                        opacity: 0.6,
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                      className="text-[10px] tracking-widest mt-1"
                    >
                      {stat.label.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continuity cue — same "scroll / explore" voice as the hero,
            signalling this page keeps going rather than ending flat. */}
        <div
          style={{ color: PALETTE.text, opacity: 0.5 }}
          className="mt-24 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.25em]"
        >
          NEXT — EXPERIENCE
          <span className="about__next-arrow" style={{ color: PALETTE.accent }}>
            ↓
          </span>
        </div>
      </div>

      {/* Hairline bottom edge */}
      <div
        style={{ borderColor: PALETTE.border }}
        className="absolute bottom-0 left-0 right-0 border-b"
      />

      <style>{`
        .about__next-arrow {
          display: inline-block;
          animation: aboutBounce 1.6s ease-in-out infinite;
        }
        @keyframes aboutBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(5px); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

/**
 * A static SVG echo of the hero's icosahedron wireframe — same visual
 * language, near-zero cost (no WebGL context per section).
 */
const WireframeIcon = ({ color, accent }) => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <polygon
      points="100,10 178,58 178,142 100,190 22,142 22,58"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.55"
    />
    <polygon
      points="100,10 178,58 100,100 22,58"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="100"
      y1="10"
      x2="100"
      y2="190"
      stroke={color}
      strokeWidth="1"
      opacity="0.3"
    />
    <line
      x1="22"
      y1="58"
      x2="178"
      y2="142"
      stroke={color}
      strokeWidth="1"
      opacity="0.3"
    />
    <line
      x1="178"
      y1="58"
      x2="22"
      y2="142"
      stroke={color}
      strokeWidth="1"
      opacity="0.3"
    />
    {[
      [100, 10],
      [178, 58],
      [22, 142],
      [100, 100],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="4.5" fill={accent} />
    ))}
  </svg>
);

export default About;
