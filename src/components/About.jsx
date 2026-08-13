/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * ============================================================
 * SAME TOKENS AS Hero3D — keep these two files in sync.
 * (If you centralize these in a shared file later, import from
 * there instead of redefining — see note at bottom.)
 * ============================================================
 */
const PALETTE = {
  bg: "#FCFFFD",
  bgSection: "#E5FBF4",
  border: "#B8EFE0",
  accent: "#5DB9A2",
  text: "#1F5A4B",
};

const STATS = [
  { value: "20+", label: "Projects" },
  { value: "1.5+", label: "Years Exp" },
];

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const visualRef = useRef(null);
  const wireframeRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let split;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([contentRef.current, visualRef.current], { opacity: 1 });
        return;
      }

      // Headline: splits into characters, staggers up as it enters view —
      // same device as the hero name, carried forward into this section.
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

      // Text column: rises in as the section enters view.
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

      // Visual column: same reveal, slightly delayed — echoes the hero's
      // staggered beats instead of everything landing at once.
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

      // The wireframe motif keeps rotating as you scroll through the
      // section — same device as the hero artifact, carried forward
      // as continuity rather than a one-off decoration.
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
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: PALETTE.bgSection }}
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        {/* Section index — a real sequence marker (02 of the page's flow) */}
        <div
          style={{ color: PALETTE.accent }}
          className="font-mono text-xs tracking-[0.3em] mb-16 flex items-center gap-3"
        >
          <span
            style={{ background: PALETTE.accent }}
            className="inline-block h-1.5 w-1.5 rounded-full"
          />
          02 — ABOUT
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ---------- Content ---------- */}
          <div ref={contentRef} className="space-y-7">
            <h2
              ref={headingRef}
              style={{ color: PALETTE.text, letterSpacing: "-0.02em" }}
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
              I'm Kavindu, a full-stack software engineer with 1.5+ years of
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
              <a
                href="/CV.pdf"
                style={{ background: PALETTE.accent, color: PALETTE.bg }}
                className="px-7 py-3 rounded-full font-mono text-xs tracking-[0.12em] font-semibold transition-transform duration-300 hover:scale-105 inline-block"
              >
                DOWNLOAD CV
              </a>
              <a
                href="https://github.com/kavindu-98"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: PALETTE.text, color: PALETTE.text }}
                className="px-7 py-3 rounded-full border font-mono text-xs tracking-[0.12em] font-semibold transition-colors duration-300 hover:bg-white/40 inline-block"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/kavindu-abeykoon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: PALETTE.text, color: PALETTE.text }}
                className="px-7 py-3 rounded-full border font-mono text-xs tracking-[0.12em] font-semibold transition-colors duration-300 hover:bg-white/40 inline-block"
              >
                LINKEDIN
              </a>
            </div>
          </div>

          {/* ---------- Visual: wireframe motif carried from the hero ---------- */}
          <div
            ref={visualRef}
            className="relative h-96 lg:h-[28rem] flex items-center justify-center"
          >
            <div
              ref={wireframeRef}
              style={{ opacity: 0.9 }}
              className="absolute w-64 h-64 md:w-80 md:h-80"
            >
              <WireframeIcon color={PALETTE.text} accent={PALETTE.accent} />
            </div>

            {/* Card, restrained — no glass/blur, just a hairline frame */}
            <div
              style={{
                borderColor: PALETTE.border,
                background: "rgba(252, 255, 253, 0.55)",
              }}
              className="relative w-full max-w-sm rounded-2xl border p-8 flex flex-col items-center text-center"
            >
              <div
                style={{ color: PALETTE.text }}
                className="font-mono text-xs tracking-[0.2em] mb-2"
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
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      style={{ color: PALETTE.accent }}
                      className="text-3xl font-semibold"
                    >
                      {stat.value}
                    </div>
                    <p
                      style={{ color: PALETTE.text, opacity: 0.6 }}
                      className="font-mono text-[10px] tracking-widest mt-1"
                    >
                      {stat.label.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
