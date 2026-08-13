/** @format */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, Draggable, InertiaPlugin);

const PALETTE = {
  bg: "#FCFFFD",
  bgSection: "#E5FBF4",
  border: "#B8EFE0",
  accent: "#5DB9A2",
  text: "#1F5A4B",
};

/**
 * Tools only — no invented percentages. A precise number like "88%" on a
 * skill is arbitrary on a portfolio anyway; a clean, honest list of what
 * you actually use is more credible and, done right, more interesting.
 */
const CATEGORIES = [
  {
    name: "Frontend",
    tools: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "Redux",
    ],
  },
  {
    name: "Backend",
    tools: ["Node.js", "Express.js", "REST APIs", "WebSocket", "OAuth / JWT"],
  },
  {
    name: "Database & Cloud",
    tools: ["MongoDB", "MySQL", "AWS", "Google Cloud", "Docker"],
  },
  {
    name: "Tools & Platforms",
    tools: ["Git", "Jira", "Linux", "Vite", "Azure DevOps"],
  },
];

const ALL_TOOLS = CATEGORIES.flatMap((c) => c.tools);

const SOFT_SKILLS = [
  "Problem Solving",
  "Team Collaboration",
  "Communication",
  "Project Management",
  "Mentoring",
];
const INTERESTS = [
  "Web3 & Blockchain",
  "AI / ML Integration",
  "WebXR & Metaverse",
  "Performance Optimization",
  "Open Source",
];

const SkillsModern = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const iconRef = useRef(null);
  const chipsWrapRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(0);
  const prevFlipState = useRef(null);

  // ---- SplitText headline reveal, on scroll-in ----
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !titleRef.current) return;

    const split = new SplitText(titleRef.current, {
      type: "chars",
      mask: "chars",
    });

    gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      duration: 0.7,
      stagger: 0.02,
      ease: "power4.out",
      scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
    });

    gsap.to(iconRef.current, {
      rotation: 24,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    return () => split.revert();
  }, []);

  // ---- Flip: chip grid morphs when the category tab changes ----
  useLayoutEffect(() => {
    if (!chipsWrapRef.current) return;
    if (!prevFlipState.current) return; // first render — nothing to animate from

    Flip.from(prevFlipState.current, {
      duration: 0.55,
      ease: "power3.inOut",
      stagger: 0.02,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03 },
        ),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 }),
    });
  }, [activeCategory]);

  const handleTabChange = (idx) => {
    if (idx === activeCategory || !chipsWrapRef.current) return;
    prevFlipState.current = Flip.getState(chipsWrapRef.current.children);
    setActiveCategory(idx);
  };

  // ---- Marquee: auto-scrolls, draggable, coasts to a stop with inertia ----
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const halfWidth = track.scrollWidth / 2;
    const wrap = gsap.utils.wrap(-halfWidth, 0);
    let xPos = 0;
    let autoScroll = !reduceMotion;
    let raf;

    const tick = () => {
      if (autoScroll) {
        xPos -= 0.55;
        xPos = wrap(xPos);
        gsap.set(track, { x: xPos });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const draggables = Draggable.create(track, {
      type: "x",
      inertia: true,
      onPress() {
        autoScroll = false;
      },
      onDrag() {
        xPos = wrap(this.x);
        gsap.set(track, { x: xPos });
      },
      onThrowUpdate() {
        xPos = wrap(this.x);
        gsap.set(track, { x: xPos });
      },
      onThrowComplete() {
        autoScroll = true;
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      draggables.forEach((d) => d.kill());
    };
  }, []);

  const activeTools = CATEGORIES[activeCategory].tools;

  return (
    <section
      ref={sectionRef}
      style={{ background: PALETTE.bg }}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div
        style={{ borderColor: PALETTE.border }}
        className="absolute top-0 left-0 right-0 border-t"
      />

      <div
        ref={iconRef}
        style={{ opacity: 0.5 }}
        className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 hidden md:block"
      >
        <WireframeIcon color={PALETTE.text} accent={PALETTE.accent} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <div
            style={{ color: PALETTE.accent }}
            className="font-mono text-xs tracking-[0.3em] mb-6 flex items-center gap-3"
          >
            <span
              style={{ background: PALETTE.accent }}
              className="inline-block h-1.5 w-1.5 rounded-full"
            />
            03 — SKILLS
          </div>
          <h2
            ref={titleRef}
            style={{ color: PALETTE.text, letterSpacing: "-0.02em" }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05]"
          >
            Tools I reach for.
          </h2>
        </div>

        {/* ---------- Category tabs ---------- */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat, idx) => {
            const active = idx === activeCategory;
            return (
              <button
                key={cat.name}
                onClick={() => handleTabChange(idx)}
                style={{
                  borderColor: active ? PALETTE.accent : PALETTE.border,
                  background: active ? PALETTE.accent : "transparent",
                  color: active ? PALETTE.bg : PALETTE.text,
                }}
                className="px-5 py-2.5 rounded-full border font-mono text-xs tracking-[0.12em] transition-colors duration-300"
              >
                {cat.name.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* ---------- Tool chips — layout morphs via Flip on tab change ---------- */}
        <div
          ref={chipsWrapRef}
          className="flex flex-wrap gap-3 mb-20 min-h-[3rem]"
        >
          {activeTools.map((tool) => (
            <span
              key={tool}
              style={{
                borderColor: PALETTE.border,
                color: PALETTE.text,
                background: PALETTE.bgSection,
              }}
              className="px-5 py-2.5 rounded-full border text-sm"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* ---------- Marquee: every tool, one continuous line, drag it ---------- */}
        <div
          style={{ borderColor: PALETTE.border }}
          className="relative border-t border-b py-6 -mx-6 md:-mx-10 overflow-hidden select-none"
        >
          <div
            ref={marqueeTrackRef}
            className="flex w-max gap-10 cursor-grab active:cursor-grabbing whitespace-nowrap px-6 md:px-10"
          >
            {[...ALL_TOOLS, ...ALL_TOOLS].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                style={{ color: PALETTE.text }}
                className="text-2xl md:text-3xl font-semibold tracking-tight opacity-80 flex items-center gap-10"
              >
                {tool}
                <span style={{ color: PALETTE.accent }} className="text-lg">
                  ●
                </span>
              </span>
            ))}
          </div>
        </div>
        <p
          style={{ color: PALETTE.text, opacity: 0.45 }}
          className="font-mono text-[10px] tracking-widest mt-3 text-center"
        >
          DRAG TO EXPLORE
        </p>

        {/* ---------- Soft skills + interests ---------- */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            style={{
              borderColor: PALETTE.border,
              background: PALETTE.bgSection,
            }}
            className="rounded-2xl border p-8"
          >
            <h3
              style={{ color: PALETTE.text }}
              className="text-base font-semibold mb-6 font-mono tracking-widest"
            >
              SOFT SKILLS
            </h3>
            <div className="space-y-3">
              {SOFT_SKILLS.map((skill) => (
                <div
                  key={skill}
                  style={{ color: PALETTE.text }}
                  className="flex items-center gap-3 text-sm opacity-85"
                >
                  <span
                    style={{ background: PALETTE.accent }}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  />
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderColor: PALETTE.border,
              background: PALETTE.bgSection,
            }}
            className="rounded-2xl border p-8"
          >
            <h3
              style={{ color: PALETTE.text }}
              className="text-base font-semibold mb-6 font-mono tracking-widest"
            >
              INTERESTS
            </h3>
            <div className="space-y-3">
              {INTERESTS.map((interest) => (
                <div
                  key={interest}
                  style={{ color: PALETTE.text }}
                  className="flex items-center gap-3 text-sm opacity-85"
                >
                  <span
                    style={{ borderColor: PALETTE.accent }}
                    className="w-1.5 h-1.5 rounded-full border flex-shrink-0"
                  />
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WireframeIcon = ({ color, accent }) => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <polygon
      points="100,10 178,58 178,142 100,190 22,142 22,58"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.5"
    />
    <polygon
      points="100,10 178,58 100,100 22,58"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.35"
    />
    {[
      [100, 10],
      [178, 58],
      [22, 142],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill={accent} />
    ))}
  </svg>
);

export default SkillsModern;
