/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Same tokens as Hero3D / About — keep in sync, or centralize into
 * a shared `theme.js` once you've settled the palette for good.
 */
const PALETTE = {
  bg: "#FCFFFD",
  bgSection: "#E5FBF4",
  border: "#B8EFE0",
  accent: "#5DB9A2",
  text: "#1F5A4B",
};

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Redux", level: 85 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 92 },
      { name: "WebSocket", level: 85 },
      { name: "OAuth / JWT", level: 88 },
    ],
  },
  {
    name: "Database & Cloud",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 90 },
      { name: "AWS", level: 85 },
      { name: "Google Cloud", level: 80 },
      { name: "Docker", level: 82 },
    ],
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git", level: 92 },
      { name: "Jira", level: 85 },
      { name: "Linux", level: 80 },
      { name: "Vite", level: 88 },
      { name: "Azure DevOps", level: 82 },
    ],
  },
];

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
  const cardsWrapRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set("[data-skill-card]", { opacity: 1, rotationX: 0, y: 0 });
        gsap.set(".skill-bar-fill", { width: "var(--level)" });
        return;
      }

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
      });

      // Cards tilt in from a slight 3D lean — perspective lives on the
      // grid wrapper, each card rotates back to flat as it settles.
      const cards = gsap.utils.toArray(
        "[data-skill-card]",
        cardsWrapRef.current,
      );
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          rotationX: -18,
          y: 40,
          transformOrigin: "top center",
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      // Skill bars fill once, as each card's bars enter view.
      gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
        const level = parseFloat(bar.getAttribute("data-level"));
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          },
        );
      });

      // Small wireframe accent keeps turning through the section —
      // the same continuity device used in Hero3D and About.
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
    });

    return () => ctx.revert();
  }, []);

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

      {/* Corner wireframe accent — quiet, top-right */}
      <div
        ref={iconRef}
        style={{ opacity: 0.5 }}
        className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 hidden md:block"
      >
        <WireframeIcon color={PALETTE.text} accent={PALETTE.accent} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div ref={titleRef} className="mb-16">
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
            style={{ color: PALETTE.text, letterSpacing: "-0.02em" }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05]"
          >
            Technical <span style={{ color: PALETTE.accent }}>expertise.</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div
          ref={cardsWrapRef}
          style={{ perspective: "1400px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={category.name}
              data-skill-card
              style={{
                borderColor: PALETTE.border,
                background: PALETTE.bgSection,
              }}
              className="group rounded-2xl border p-7 transition-colors duration-300 hover:border-[var(--accent)]"
            >
              <div className="mb-8">
                <div
                  style={{ color: PALETTE.accent }}
                  className="font-mono text-xs tracking-widest mb-3"
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{ color: PALETTE.text }}
                  className="text-lg font-semibold"
                >
                  {category.name}
                </h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        style={{ color: PALETTE.text, opacity: 0.85 }}
                        className="text-sm"
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{ color: PALETTE.accent }}
                        className="font-mono text-[11px] font-semibold"
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{ background: PALETTE.border }}
                      className="w-full h-1.5 rounded-full overflow-hidden"
                    >
                      <div
                        className="skill-bar-fill h-full rounded-full"
                        data-level={skill.level}
                        style={{
                          background: PALETTE.accent,
                          width: 0,
                          "--level": `${skill.level}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft skills + interests */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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
