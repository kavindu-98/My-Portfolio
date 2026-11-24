/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

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
         SINGLE PINNED MASTER TIMELINE

         The section is pinned by ScrollTrigger itself (same
         device as Hero3D's master timeline) instead of CSS
         `position: sticky`. Every card gets an exclusive slice
         of one continuous scroll-scrubbed timeline, so there is
         never more than one tween in control of any element —
         and reversing scroll direction just plays the same
         timeline backward, deterministically.
      ====================================================== */

      const SLOT = 1; // arbitrary timeline units reserved per card

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: `+=${cards.length * 80}%`,

          scrub: 1,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      cards.forEach((card, index) => {
        const position = index * SLOT;

        /* ENTER */

        master.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: SLOT * 0.6,
            ease: "power3.out",
          },
          position,
        );

        /* PREVIOUS CARDS move backward into the stack instead
           of disappearing — one tween per card per step, on the
           single shared timeline. */

        cards.slice(0, index).forEach((previous, previousIndex) => {
          const depth = index - previousIndex;

          master.to(
            previous,
            {
              y: -depth * 24,

              scale: 1 - Math.min(depth * 0.025, 0.1),

              opacity: Math.max(0.35, 0.82 - depth * 0.12),

              duration: SLOT * 0.6,

              ease: "power3.out",
            },
            position,
          );
        });
      });

      /* small settle beat on the final card before release */

      master.to({}, { duration: SLOT * 0.5 });

      /* ======================================================
         VISUAL MICRO ANIMATION — continuous, unrelated to scroll
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
         NOTE: no local ScrollTrigger.refresh() here on purpose.

         Hero3D's pin doesn't activate until ~850ms after mount
         (its loading screen), so a refresh fired here — before
         that pin exists — would cache a scroll position for
         this section that goes stale the instant Hero3D's pin
         does activate. Refreshing is handled once, centrally,
         from App.jsx (see refreshScrollTriggersOnce in
         gsapAnimations.js) — and Hero3D also fires one final
         refresh itself right after its own pin is created, to
         correct everything below it. 
      ====================================================== */
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
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
          PROJECT STAGE

          The whole .projects-section is pinned by ScrollTrigger
          (see the effect above) for the duration of the master
          timeline. This box just holds the cards.
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
