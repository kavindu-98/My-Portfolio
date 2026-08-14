/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PROJECT DATA
============================================================ */

const projects = [
  {
    number: "01",
    year: "2024 — 2026",
    category: "SAAS / PMS",
    title: "Property",
    subtitle: "Management System",
    description:
      "A production SaaS platform connecting restaurant operations, reservations, POS, inventory and customer workflows into one integrated system.",
    client: "Talentfort (Pvt) Ltd",
    tech: ["REACT", "NODE.JS", "MYSQL", "WEBSOCKET"],
    github: "https://github.com/kavindu-98",
    visual: "network",
  },

  {
    number: "02",
    year: "2023 — 2025",
    category: "ENTERPRISE / HR",
    title: "Human Resource",
    subtitle: "Information System",
    description:
      "Enterprise HR software covering employee management, attendance, leave workflows and automated payroll processing.",
    client: "Talentfort (Pvt) Ltd",
    tech: ["REACT", "NODE.JS", "MYSQL", "JWT"],
    github: "https://github.com/kavindu-98",
    visual: "dashboard",
  },

  {
    number: "03",
    year: "2023 — 2024",
    category: "WEB PLATFORM",
    title: "Travel Agency",
    subtitle: "Booking Platform",
    description:
      "Full-stack travel platform with location intelligence, interactive maps, dynamic travel data and booking workflows.",
    client: "Talentfort (Pvt) Ltd",
    tech: ["NEXT.JS", "TYPESCRIPT", "REDUX", "AWS"],
    github: "https://github.com/kavindu-98",
    visual: "map",
  },

  {
    number: "04",
    year: "2022 — 2026",
    category: "ERP / ENTERPRISE",
    title: "Enterprise",
    subtitle: "ERP Ecosystem",
    description:
      "Scalable business ecosystem spanning POS, inventory, manufacturing, supply chain, finance, HRM and operational management.",
    client: "Talentfort (Pvt) Ltd",
    tech: ["REACT", "NODE.JS", "SQL", "MONGODB"],
    github: "https://github.com/kavindu-98",
    visual: "system",
  },

  {
    number: "05",
    year: "2024 — 2026",
    category: "CREATIVE / WEB",
    title: "Digital",
    subtitle: "Experiences",
    description:
      "Creative web experiences combining interaction design, animation and modern frontend engineering for independent projects.",
    client: "Freelance",
    tech: ["REACT", "VITE", "GSAP", "TAILWIND"],
    github: "https://github.com/kavindu-98",
    visual: "creative",
  },

  {
    number: "06",
    year: "2022 — 2024",
    category: "MICROSOFT / ERP",
    title: "Dynamics 365",
    subtitle: "Business Solutions",
    description:
      "Business Central customizations and low-code business solutions using AL, PowerApps and PowerAutomate.",
    client: "SRIQ Corporation (Pvt) Ltd",
    tech: ["DYNAMICS 365", "AL", "POWERAPPS", "AZURE DEVOPS"],
    github: "https://github.com/kavindu-98",
    visual: "blocks",
  },
];

/* ============================================================
   VISUAL SYSTEMS
============================================================ */

const ProjectVisual = ({ type }) => {
  if (type === "network") {
    return (
      <div className="pv pv-network">
        <div className="network-ring network-ring-1" />
        <div className="network-ring network-ring-2" />
        <div className="network-ring network-ring-3" />

        <div className="network-core">
          <span />
        </div>

        <div className="network-node node-1" />
        <div className="network-node node-2" />
        <div className="network-node node-3" />
        <div className="network-node node-4" />
        <div className="network-node node-5" />
        <div className="network-node node-6" />

        <div className="network-connection connection-1" />
        <div className="network-connection connection-2" />
        <div className="network-connection connection-3" />
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="pv pv-dashboard">
        <div className="dash-sidebar">
          <div className="dash-logo" />

          <div className="dash-menu active" />
          <div className="dash-menu" />
          <div className="dash-menu" />
          <div className="dash-menu" />
          <div className="dash-menu" />
        </div>

        <div className="dash-content">
          <div className="dash-top">
            <div />
            <span />
          </div>

          <div className="dash-stats">
            <div />
            <div />
            <div />
          </div>

          <div className="dash-chart">
            <div className="bar bar-1" />
            <div className="bar bar-2" />
            <div className="bar bar-3" />
            <div className="bar bar-4" />
            <div className="bar bar-5" />
            <div className="bar bar-6" />
            <div className="bar bar-7" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className="pv pv-map">
        <div className="map-grid" />

        <div className="map-road road-1" />
        <div className="map-road road-2" />
        <div className="map-road road-3" />

        <div className="map-route" />

        <div className="map-pin pin-1">
          <span />
        </div>

        <div className="map-pin pin-2">
          <span />
        </div>

        <div className="map-pin pin-3">
          <span />
        </div>

        <div className="map-radius" />
      </div>
    );
  }

  if (type === "system") {
    return (
      <div className="pv pv-system">
        <div className="system-left">
          <div />
          <div />
          <div />
          <div />
        </div>

        <div className="system-center">
          <span />
          <span />
          <span />
        </div>

        <div className="system-right">
          <div />
          <div />
          <div />
          <div />
        </div>

        <div className="system-line system-line-1" />
        <div className="system-line system-line-2" />
        <div className="system-line system-line-3" />
      </div>
    );
  }

  if (type === "creative") {
    return (
      <div className="pv pv-creative">
        <div className="creative-circle circle-1" />
        <div className="creative-circle circle-2" />
        <div className="creative-circle circle-3" />

        <div className="creative-square">K</div>
      </div>
    );
  }

  return (
    <div className="pv pv-blocks">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

/* ============================================================
   PROJECT CARD
============================================================ */

const ProjectCard = ({ project, cardRef }) => {
  const contentRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    const rect = card.getBoundingClientRect();

    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;

    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(content, {
      rotateY: mouseX * 3,
      rotateX: mouseY * -3,
      x: mouseX * 5,
      y: mouseY * 5,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={contentRef} className="project-card-content">
        {/* CARD HEADER */}

        <div className="project-card-header">
          <div className="project-number">{project.number}</div>

          <div className="project-year">{project.year}</div>
        </div>

        {/* CARD BODY */}

        <div className="project-card-body">
          <div className="project-information">
            <div className="project-category">
              <span />
              {project.category}
            </div>

            <h3>
              {project.title}
              <span>{project.subtitle}</span>
            </h3>

            <p>{project.description}</p>

            <div className="project-client">
              <span>CLIENT</span>

              <strong>{project.client}</strong>
            </div>
          </div>

          {/* PROJECT VISUAL */}

          <div className="project-visual-wrapper">
            <ProjectVisual type={project.visual} />

            <div className="visual-corner top-left" />
            <div className="visual-corner top-right" />
            <div className="visual-corner bottom-left" />
            <div className="visual-corner bottom-right" />

            <span className="visual-label">SYSTEM / {project.number}</span>
          </div>
        </div>

        {/* CARD FOOTER */}

        <div className="project-card-footer">
          <div className="project-tech">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span>VIEW PROJECT</span>

            <b>↗</b>
          </a>
        </div>

        {/* DECORATIVE NUMBER */}

        <div className="project-background-number">{project.number}</div>
      </div>
    </article>
  );
};

/* ============================================================
   MAIN PROJECTS
============================================================ */

const Projects = () => {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(null);

  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    const stage = stageRef.current;

    const intro = introRef.current;

    const cards = cardsRef.current.filter(Boolean);

    if (!section || !stage || !intro || !cards.length) {
      return;
    }

    const ctx = gsap.context(() => {
      /* ======================================================
         INTRO
      ====================================================== */

      gsap.fromTo(
        intro,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );

      /* ======================================================
         CARD INITIAL STATE
      ====================================================== */

      gsap.set(cards, {
        opacity: 0,
        y: 100,
        scale: 0.94,
      });

      /* ======================================================
         PROJECT STACK
         
         IMPORTANT:
         
         The SECTION itself is NOT pinned.
         
         The STAGE is sticky through CSS.
         
         This means:
         
         HERO
           ↓
         ABOUT
           ↓
         PROJECTS
           ↓
         NEXT SECTION
         
         remains normal browser flow.
      ====================================================== */

      cards.forEach((card, index) => {
        const previousCards = cards.slice(0, index);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,

            start: "top 78%",

            end: "top 24%",

            scrub: 1.2,

            invalidateOnRefresh: true,
          },
        });

        /* ==================================================
             ENTER
          ================================================== */

        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,

          ease: "power3.out",
        });

        /* ==================================================
             PREVIOUS CARDS
             
             Instead of disappearing,
             they move backward into the stack.
          ================================================== */

        previousCards.forEach((previous, previousIndex) => {
          const depth = index - previousIndex;

          gsap.to(previous, {
            y: -depth * 24,

            scale: 1 - Math.min(depth * 0.025, 0.1),

            opacity: Math.max(0.35, 0.82 - depth * 0.12),

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {
              trigger: card,

              start: "top 78%",

              end: "top 24%",

              scrub: 1.4,

              invalidateOnRefresh: true,
            },
          });
        });
      });

      /* ======================================================
         PROGRESS
      ====================================================== */

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top bottom",

            end: "bottom top",

            scrub: 0.8,
          },
        });
      }

      /* ======================================================
         VISUAL MICRO ANIMATION
      ====================================================== */

      const rings = section.querySelectorAll(".network-ring");

      rings.forEach((ring, index) => {
        gsap.to(ring, {
          rotation: index % 2 === 0 ? 360 : -360,

          duration: 18 + index * 5,

          repeat: -1,

          ease: "none",
        });
      });

      const creativeRings = section.querySelectorAll(".creative-circle");

      creativeRings.forEach((ring, index) => {
        gsap.to(ring, {
          rotation: index % 2 === 0 ? 360 : -360,

          duration: 20 + index * 5,

          repeat: -1,

          ease: "none",
        });
      });

      /* ======================================================
         REFRESH
         
         Allows Hero/About ScrollTriggers to
         recalculate correctly before Projects.
      ====================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <style>{`

        /* ======================================================
           ROOT
        ====================================================== */

        .projects-section {
          --bg: #f1f9f6;
          --paper: #fcfffd;
          --mint: #5db9a2;
          --mint-light: #e5fbf4;
          --deep: #1f5a4b;
          --muted: #62847c;
          --line: rgba(31, 90, 75, 0.14);

          position: relative;

          width: 100%;

          min-height:
            ${projects.length * 90}vh;

          background:
            var(--bg);

          color:
            var(--deep);

          overflow: clip;

          isolation: isolate;
        }

        /* ======================================================
           BACKGROUND GRID
        ====================================================== */

        .projects-grid {
          position: absolute;

          inset: 0;

          pointer-events: none;

          opacity: 0.45;

          background-image:
            linear-gradient(
              var(--line) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--line) 1px,
              transparent 1px
            );

          background-size:
            70px 70px;

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
           HEADER
        ====================================================== */

        .projects-topbar {
          position: absolute;

          top: 0;

          left: 0;

          right: 0;

          z-index: 50;

          height: 78px;

          padding:
            0 5vw;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          border-bottom:
            1px solid
            var(--line);

          font-family:
            "IBM Plex Mono",
            monospace;
        }

        .projects-topbar-left {
          display: flex;

          align-items: center;

          gap: 10px;

          font-size: 9px;

          letter-spacing:
            0.25em;
        }

        .status-dot {
          width: 6px;

          height: 6px;

          border-radius: 50%;

          background:
            var(--mint);

          box-shadow:
            0 0 0 5px
            rgba(
              93,
              185,
              162,
              0.1
            );
        }

        .projects-topbar-right {
          font-size: 8px;

          letter-spacing:
            0.18em;

          opacity: 0.4;
        }

        /* ======================================================
           INTRO
        ====================================================== */

        .projects-intro {
          position: absolute;

          top: 17vh;

          left: 5vw;

          z-index: 20;

          max-width: 390px;
        }

        .intro-label {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 22px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing:
            0.22em;

          color:
            var(--mint);
        }

        .intro-label-line {
          width: 32px;

          height: 1px;

          background:
            var(--mint);
        }

        .projects-intro h2 {
          margin: 0;

          font-family:
            "Inter",
            sans-serif;

          font-size:
            clamp(
              4rem,
              7vw,
              7rem
            );

          line-height:
            0.82;

          font-weight: 600;

          letter-spacing:
            -0.075em;
        }

        .projects-intro h2 span {
          display: block;

          color:
            rgba(
              31,
              90,
              75,
              0.2
            );
        }

        .intro-description {
          margin-top: 28px;

          max-width: 310px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          line-height:
            1.8;

          letter-spacing:
            0.05em;

          color:
            var(--muted);

          opacity: 0.8;
        }

        /* ======================================================
           STICKY STAGE
           
           This is the important architecture.
           
           The section remains in normal document flow.
           
           Only the card stage sticks.
        ====================================================== */

        .projects-stage {
          position: sticky;

          top: 0;

          width: 100%;

          height: 100vh;

          min-height: 720px;

          z-index: 10;

          pointer-events: none;
        }

        /* ======================================================
           CARDS
        ====================================================== */

        .project-card {
          position: absolute;

          top: 50%;

          left: 58%;

          width:
            min(
              700px,
              47vw
            );

          height: 500px;

          transform:
            translate(
              -50%,
              -50%
            );

          transform-origin:
            center center;

          will-change:
            transform,
            opacity;

          opacity: 0;

          pointer-events:
            auto;

          perspective:
            1400px;
        }

        .project-card-content {
          position: relative;

          width: 100%;

          height: 100%;

          overflow: hidden;

          transform-style:
            preserve-3d;

          background:
            var(--paper);

          border:
            1px solid
            var(--line);

          box-shadow:
            0 35px 100px
            rgba(
              31,
              90,
              75,
              0.08
            );

          will-change:
            transform;
        }

        /* ======================================================
           CARD HEADER
        ====================================================== */

        .project-card-header {
          position: absolute;

          top: 0;

          left: 0;

          right: 0;

          height: 64px;

          padding:
            0 26px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          border-bottom:
            1px solid
            var(--line);

          z-index: 10;
        }

        .project-number {
          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 10px;

          letter-spacing:
            0.2em;

          color:
            var(--mint);
        }

        .project-year {
          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing:
            0.15em;

          opacity: 0.4;
        }

        /* ======================================================
           BODY
        ====================================================== */

        .project-card-body {
          position: absolute;

          top: 64px;

          bottom: 70px;

          left: 26px;

          right: 26px;

          display: grid;

          grid-template-columns:
            1fr 0.95fr;

          gap: 28px;

          align-items:
            center;
        }

        .project-information {
          position: relative;

          z-index: 4;
        }

        .project-category {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 20px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing:
            0.18em;

          color:
            var(--muted);
        }

        .project-category span {
          width: 5px;

          height: 5px;

          border-radius: 50%;

          background:
            var(--mint);
        }

        /* ======================================================
           TITLE
        ====================================================== */

        .project-information h3 {
          margin: 0;

          font-family:
            "Inter",
            sans-serif;

          font-size:
            clamp(
              2.3rem,
              3.6vw,
              4rem
            );

          line-height:
            0.88;

          letter-spacing:
            -0.07em;

          font-weight:
            600;
        }

        .project-information h3 span {
          display: block;

          color:
            rgba(
              31,
              90,
              75,
              0.23
            );
        }

        /* ======================================================
           DESCRIPTION
        ====================================================== */

        .project-information p {
          margin:
            22px 0 24px;

          max-width:
            320px;

          font-family:
            "Inter",
            sans-serif;

          font-size: 11px;

          line-height:
            1.7;

          color:
            rgba(
              31,
              90,
              75,
              0.62
            );
        }

        /* ======================================================
           CLIENT
        ====================================================== */

        .project-client {
          display: flex;

          flex-direction:
            column;

          gap: 5px;
        }

        .project-client span {
          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 7px;

          letter-spacing:
            0.2em;

          opacity: 0.4;
        }

        .project-client strong {
          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          font-weight: 400;

          letter-spacing:
            0.08em;
        }

        /* ======================================================
           VISUAL WRAPPER
        ====================================================== */

        .project-visual-wrapper {
          position: relative;

          height: 285px;

          overflow: hidden;

          background:
            var(--mint-light);

          border:
            1px solid
            var(--line);

          transform:
            translateZ(18px);
        }

        .visual-label {
          position: absolute;

          left: 18px;

          bottom: 15px;

          z-index: 20;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 7px;

          letter-spacing:
            0.18em;

          opacity: 0.4;
        }

        /* ======================================================
           CORNER MARKS
        ====================================================== */

        .visual-corner {
          position: absolute;

          width: 12px;

          height: 12px;

          z-index: 30;

          pointer-events: none;
        }

        .top-left {
          top: 9px;

          left: 9px;

          border-top:
            1px solid
            var(--mint);

          border-left:
            1px solid
            var(--mint);
        }

        .top-right {
          top: 9px;

          right: 9px;

          border-top:
            1px solid
            var(--mint);

          border-right:
            1px solid
            var(--mint);
        }

        .bottom-left {
          bottom: 9px;

          left: 9px;

          border-bottom:
            1px solid
            var(--mint);

          border-left:
            1px solid
            var(--mint);
        }

        .bottom-right {
          bottom: 9px;

          right: 9px;

          border-bottom:
            1px solid
            var(--mint);

          border-right:
            1px solid
            var(--mint);
        }

        /* ======================================================
           VISUAL BASE
        ====================================================== */

        .pv {
          position: absolute;

          inset: 0;
        }

        /* ======================================================
           NETWORK
        ====================================================== */

        .network-ring {
          position: absolute;

          left: 50%;

          top: 50%;

          border:
            1px solid
            rgba(
              31,
              90,
              75,
              0.18
            );

          border-radius: 50%;

          transform:
            translate(
              -50%,
              -50%
            );
        }

        .network-ring-1 {
          width: 110px;

          height: 110px;
        }

        .network-ring-2 {
          width: 180px;

          height: 180px;
        }

        .network-ring-3 {
          width: 250px;

          height: 160px;

          transform:
            translate(
              -50%,
              -50%
            )
            rotate(35deg);
        }

        .network-core {
          position: absolute;

          width: 40px;

          height: 40px;

          left: 50%;

          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            1px solid
            var(--mint);

          border-radius: 50%;

          display: flex;

          align-items: center;

          justify-content: center;
        }

        .network-core span {
          width: 6px;

          height: 6px;

          background:
            var(--mint);

          border-radius: 50%;
        }

        .network-node {
          position: absolute;

          width: 6px;

          height: 6px;

          border-radius: 50%;

          background:
            var(--mint);

          box-shadow:
            0 0 0 5px
            rgba(
              93,
              185,
              162,
              0.1
            );
        }

        .node-1 {
          left: 20%;

          top: 28%;
        }

        .node-2 {
          right: 19%;

          top: 23%;
        }

        .node-3 {
          right: 14%;

          top: 67%;
        }

        .node-4 {
          left: 28%;

          bottom: 18%;
        }

        .node-5 {
          left: 52%;

          top: 17%;
        }

        .node-6 {
          left: 12%;

          top: 58%;
        }

        .network-connection {
          position: absolute;

          left: 20%;

          width: 60%;

          height: 1px;

          background:
            rgba(
              31,
              90,
              75,
              0.15
            );

          top: 50%;
        }

        .connection-1 {
          transform:
            rotate(28deg);
        }

        .connection-2 {
          transform:
            rotate(-35deg);
        }

        .connection-3 {
          transform:
            rotate(70deg);
        }

        /* ======================================================
           DASHBOARD
        ====================================================== */

        .pv-dashboard {
          display: flex;

          padding: 40px;
        }

        .dash-sidebar {
          width: 38px;

          border-right:
            1px solid
            var(--line);

          padding-right: 14px;

          display: flex;

          flex-direction: column;

          gap: 16px;
        }

        .dash-logo {
          width: 18px;

          height: 18px;

          border:
            1px solid
            var(--mint);

          margin-bottom: 14px;
        }

        .dash-menu {
          width: 16px;

          height: 4px;

          background:
            rgba(
              31,
              90,
              75,
              0.18
            );
        }

        .dash-menu.active {
          background:
            var(--mint);
        }

        .dash-content {
          flex: 1;

          padding-left: 22px;
        }

        .dash-top {
          display: flex;

          justify-content:
            space-between;

          margin-bottom: 22px;
        }

        .dash-top div {
          width: 70px;

          height: 6px;

          background:
            rgba(
              31,
              90,
              75,
              0.2
            );
        }

        .dash-top span {
          width: 24px;

          height: 6px;

          background:
            var(--mint);
        }

        .dash-stats {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 8px;

          margin-bottom: 10px;
        }

        .dash-stats div {
          height: 48px;

          border:
            1px solid
            var(--line);
        }

        .dash-chart {
          height: 135px;

          border:
            1px solid
            var(--line);

          display: flex;

          align-items:
            flex-end;

          gap: 8px;

          padding:
            18px;
        }

        .bar {
          flex: 1;

          background:
            rgba(
              93,
              185,
              162,
              0.35
            );
        }

        .bar-1 {
          height: 30%;
        }

        .bar-2 {
          height: 55%;
        }

        .bar-3 {
          height: 40%;
        }

        .bar-4 {
          height: 70%;
        }

        .bar-5 {
          height: 85%;

          background:
            var(--mint);
        }

        .bar-6 {
          height: 60%;
        }

        .bar-7 {
          height: 90%;
        }

        /* ======================================================
           MAP
        ====================================================== */

        .pv-map {
          overflow: hidden;
        }

        .map-grid {
          position: absolute;

          inset: 0;

          background-image:
            linear-gradient(
              rgba(
                31,
                90,
                75,
                0.09
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                31,
                90,
                75,
                0.09
              ) 1px,
              transparent 1px
            );

          background-size:
            28px 28px;
        }

        .map-road {
          position: absolute;

          background:
            rgba(
              31,
              90,
              75,
              0.12
            );

          height: 3px;

          width: 75%;
        }

        .road-1 {
          left: 10%;

          top: 35%;

          transform:
            rotate(28deg);
        }

        .road-2 {
          left: 20%;

          top: 60%;

          transform:
            rotate(-18deg);
        }

        .road-3 {
          left: 5%;

          top: 70%;

          transform:
            rotate(48deg);
        }

        .map-route {
          position: absolute;

          left: 20%;

          top: 26%;

          width: 60%;

          height: 52%;

          border:
            2px solid
            var(--mint);

          border-color:
            var(--mint)
            transparent
            var(--mint)
            transparent;

          border-radius:
            45% 60% 40% 55%;
        }

        .map-pin {
          position: absolute;

          width: 12px;

          height: 12px;

          border-radius: 50%;

          background:
            var(--mint);

          box-shadow:
            0 0 0 7px
            rgba(
              93,
              185,
              162,
              0.1
            );
        }

        .pin-1 {
          left: 22%;

          top: 25%;
        }

        .pin-2 {
          right: 20%;

          top: 46%;
        }

        .pin-3 {
          left: 47%;

          bottom: 18%;
        }

        .map-radius {
          position: absolute;

          width: 100px;

          height: 100px;

          left: 50%;

          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            1px solid
            rgba(
              31,
              90,
              75,
              0.15
            );

          border-radius: 50%;
        }

        /* ======================================================
           SYSTEM
        ====================================================== */

        .pv-system {
          display: flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 24px;
        }

        .system-left,
        .system-right {
          display: flex;

          flex-direction:
            column;

          gap: 14px;
        }

        .system-left div,
        .system-right div {
          width: 55px;

          height: 18px;

          border:
            1px solid
            var(--line);
        }

        .system-left div:nth-child(2),
        .system-right div:nth-child(3) {
          border-color:
            var(--mint);
        }

        .system-center {
          width: 85px;

          height: 130px;

          border:
            1px solid
            var(--mint);

          display: flex;

          flex-direction:
            column;

          justify-content:
            center;

          align-items:
            center;

          gap: 13px;
        }

        .system-center span {
          width: 40px;

          height: 4px;

          background:
            rgba(
              31,
              90,
              75,
              0.2
            );
        }

        .system-center span:nth-child(2) {
          background:
            var(--mint);
        }

        .system-line {
          position: absolute;

          width: 45px;

          height: 1px;

          background:
            var(--mint);
        }

        .system-line-1 {
          left: calc(50% - 110px);
        }

        .system-line-2 {
          right: calc(50% - 110px);
        }

        .system-line-3 {
          width: 1px;

          height: 35px;

          top: 25%;

          left: 50%;
        }

        /* ======================================================
           CREATIVE
        ====================================================== */

        .pv-creative {
          display: flex;

          align-items:
            center;

          justify-content:
            center;
        }

        .creative-circle {
          position: absolute;

          border:
            1px solid
            var(--mint);

          border-radius: 50%;
        }

        .circle-1 {
          width: 75px;

          height: 75px;
        }

        .circle-2 {
          width: 150px;

          height: 150px;

          opacity: 0.55;
        }

        .circle-3 {
          width: 230px;

          height: 230px;

          opacity: 0.25;
        }

        .creative-square {
          width: 45px;

          height: 45px;

          border:
            1px solid
            var(--deep);

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          font-family:
            "Inter",
            sans-serif;

          font-size: 18px;

          z-index: 5;
        }

        /* ======================================================
           BLOCKS
        ====================================================== */

        .pv-blocks {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          grid-template-rows:
            repeat(3, 1fr);

          gap: 1px;

          padding: 45px;

          background:
            rgba(
              31,
              90,
              75,
              0.08
            );
        }

        .pv-blocks div {
          border:
            1px solid
            rgba(
              31,
              90,
              75,
              0.1
            );

          background:
            rgba(
              255,
              255,
              255,
              0.4
            );
        }

        .pv-blocks div:nth-child(1),
        .pv-blocks div:nth-child(5),
        .pv-blocks div:nth-child(9) {
          background:
            var(--mint);
        }

        /* ======================================================
           FOOTER
        ====================================================== */

        .project-card-footer {
          position: absolute;

          bottom: 0;

          left: 0;

          right: 0;

          min-height: 70px;

          padding:
            0 26px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 15px;

          border-top:
            1px solid
            var(--line);

          z-index: 10;
        }

        .project-tech {
          display: flex;

          flex-wrap: wrap;

          gap: 5px;

          max-width: 75%;
        }

        .project-tech span {
          padding:
            5px 7px;

          border:
            1px solid
            var(--line);

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 6px;

          letter-spacing:
            0.1em;

          color:
            var(--muted);
        }

        .project-link {
          display: flex;

          align-items: center;

          gap: 10px;

          flex-shrink: 0;

          color:
            var(--deep);

          text-decoration: none;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 7px;

          letter-spacing:
            0.16em;
        }

        .project-link b {
          width: 30px;

          height: 30px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            1px solid
            var(--line);

          font-size: 13px;

          font-weight: 400;

          transition:
            all 300ms ease;
        }

        .project-link:hover {
          color:
            var(--mint);
        }

        .project-link:hover b {
          transform:
            translate(
              3px,
              -3px
            );

          border-color:
            var(--mint);

          background:
            var(--mint-light);
        }

        /* ======================================================
           BACKGROUND NUMBER
        ====================================================== */

        .project-background-number {
          position: absolute;

          right: -10px;

          bottom: 34px;

          font-family:
            "Inter",
            sans-serif;

          font-size:
            17rem;

          line-height: 0.7;

          font-weight: 600;

          letter-spacing:
            -0.12em;

          color:
            rgba(
              31,
              90,
              75,
              0.035
            );

          user-select:
            none;

          pointer-events:
            none;

          z-index: 1;
        }

        /* ======================================================
           SECTION FOOTER / PROGRESS
        ====================================================== */

        .projects-progress {
          position: fixed;

          left: 5vw;

          bottom: 28px;

          width: 120px;

          height: 1px;

          background:
            var(--line);

          z-index: 100;

          pointer-events:
            none;
        }

        .projects-progress-bar {
          width: 100%;

          height: 100%;

          transform:
            scaleX(0);

          transform-origin:
            left;

          background:
            var(--mint);
        }

        .projects-side-label {
          position: absolute;

          right: 4vw;

          top: 50%;

          transform:
            translateY(-50%);

          writing-mode:
            vertical-rl;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 7px;

          letter-spacing:
            0.22em;

          opacity: 0.3;

          z-index: 20;
        }

        /* ======================================================
           TABLET
        ====================================================== */

        @media (max-width: 1100px) {

          .projects-intro {
            left: 4vw;
          }

          .project-card {
            left: 60%;

            width:
              53vw;
          }

          .project-information h3 {
            font-size:
              3rem;
          }

        }

        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 800px) {

          .projects-section {
            min-height:
              ${projects.length * 100}vh;
          }

          .projects-topbar {
            height: 65px;

            padding:
              0 20px;
          }

          .projects-topbar-right {
            display: none;
          }

          .projects-intro {
            top: 11vh;

            left: 20px;

            right: 20px;
          }

          .projects-intro h2 {
            font-size:
              4rem;
          }

          .intro-description {
            display: none;
          }

          .projects-stage {
            min-height: 650px;
          }

          .project-card {
            left: 50%;

            top: 60%;

            width:
              calc(
                100vw - 32px
              );

            height: 520px;
          }

          .project-card-body {
            grid-template-columns:
              1fr;

            gap: 14px;

            top: 64px;

            bottom: 72px;

            left: 18px;

            right: 18px;
          }

          .project-information h3 {
            font-size:
              2.5rem;
          }

          .project-information p {
            max-width:
              100%;

            margin:
              14px 0 17px;

            font-size:
              10px;
          }

          .project-visual-wrapper {
            height:
              155px;
          }

          .project-card-footer {
            padding:
              0 18px;
          }

          .project-tech {
            max-width:
              70%;
          }

          .project-tech span {
            font-size:
              5.5px;
          }

          .project-link span {
            display: none;
          }

          .project-background-number {
            font-size:
              12rem;

            bottom:
              45px;
          }

          .projects-side-label {
            display: none;
          }

          .projects-progress {
            left: 20px;

            bottom: 20px;
          }

        }

        /* ======================================================
           SMALL MOBILE
        ====================================================== */

        @media (max-width: 480px) {

          .projects-intro h2 {
            font-size:
              3.4rem;
          }

          .project-card {
            top: 61%;

            height:
              510px;
          }

          .project-information h3 {
            font-size:
              2.2rem;
          }

          .project-visual-wrapper {
            height:
              140px;
          }

          .project-card-footer {
            min-height:
              65px;
          }

        }

        /* ======================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          .project-card {
            opacity: 1 !important;

            transform:
              translate(
                -50%,
                -50%
              ) !important;
          }

          .network-ring,
          .creative-circle {
            animation: none !important;
          }

        }

      `}</style>

      {/* ========================================================
          BACKGROUND
      ======================================================== */}

      <div className="projects-grid" />

      {/* ========================================================
          TOP BAR
      ======================================================== */}

      <header className="projects-topbar">
        <div className="projects-topbar-left">
          <span className="status-dot" />

          <span>03 — PROJECTS</span>
        </div>

        <div className="projects-topbar-right">SELECTED WORK / 06</div>
      </header>

      {/* ========================================================
          INTRO
      ======================================================== */}

      <div ref={introRef} className="projects-intro">
        <div className="intro-label">
          <span className="intro-label-line" />
          SELECTED WORK
        </div>

        <h2>
          BUILT
          <span>TO SCALE.</span>
        </h2>

        <p className="intro-description">
          Production systems, enterprise platforms and digital experiences
          engineered across multiple domains.
        </p>
      </div>

      {/* ========================================================
          STICKY PROJECT STAGE
          
          This stays sticky, NOT the whole section.
      ======================================================== */}

      <div ref={stageRef} className="projects-stage">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            cardRef={(element) => {
              cardsRef.current[index] = element;
            }}
          />
        ))}
      </div>

      {/* ========================================================
          SIDE LABEL
      ======================================================== */}

      <div className="projects-side-label">
        SOFTWARE ENGINEERING / PRODUCTION SYSTEMS / 2022 — 2026
      </div>

      {/* ========================================================
          PROGRESS
      ======================================================== */}

      <div className="projects-progress">
        <div ref={progressRef} className="projects-progress-bar" />
      </div>
    </section>
  );
};

export default Projects;
