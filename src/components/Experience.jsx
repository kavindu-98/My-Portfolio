/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const itemsRef = useRef([]);

  const experiences = [
    {
      number: "01",
      role: "Software Engineer",
      company: "Talentfort (Pvt) Ltd.",
      period: "October 2025 — August 2026",
      description:
        "Leading MERN stack architecture and refactoring enterprise systems. Mentoring junior developers and driving quality standards through code reviews.",
      highlights: [
        "Led MERN stack architecture optimization across Property Management & ERP systems",
        "Implemented OAuth/JWT security and third-party API integrations",
        "Mentored junior developers on Next.js, TypeScript, and React patterns",
        "Improved operational efficiency by 50% through system optimization",
      ],
    },

    {
      number: "02",
      role: "Associate Software Engineer",
      company: "Talentfort (Pvt) Ltd.",
      period: "July 2024 — October 2025",
      description:
        "Developed full-stack MERN applications for enterprise clients across ERP, HRIS, POS and management systems.",
      highlights: [
        "Built scalable front-end architectures with React.js",
        "Reduced page load times through performance optimization and lazy loading",
        "Integrated OAuth, JWT, Payment Gateways and Geolocation APIs",
        "Conducted peer code reviews and mentored junior developers",
      ],
    },

    {
      number: "03",
      role: "Associate Technical Consultant",
      company: "SRIQ Corporation (Pvt) Limited",
      period: "March 2023 — January 2024",
      description:
        "Customized ERP solutions using Microsoft Dynamics 365 Business Central with AL and PowerPlatform tools.",
      highlights: [
        "Developed customized ERP solutions using AL",
        "Built low-code solutions using PowerApps and PowerAutomate",
        "Collaborated with clients to gather requirements",
        "Used Azure DevOps for source control, CI/CD and backlog management",
      ],
    },

    {
      number: "04",
      role: "Technical Consultant Intern",
      company: "SRIQ Corporation (Pvt) Limited",
      period: "September 2022 — March 2023",
      description:
        "Gained hands-on experience customizing Microsoft Dynamics 365 Business Central and exploring low-code business solutions.",
      highlights: [
        "Customized Microsoft Dynamics 365 Business Central using AL",
        "Explored PowerPlatform tools",
        "Applied ERP knowledge to developer testing",
        "Worked with Azure DevOps for version control and task management",
      ],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !timeline || !progress || !items.length) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ======================================================
         DESKTOP
         
         01 RIGHT  -> CENTER
         02 LEFT   -> CENTER
         03 RIGHT  -> CENTER
         04 LEFT   -> CENTER
      ====================================================== */

      mm.add("(min-width: 801px)", () => {
        /* ----------------------------------------------------
           INITIAL PROGRESS
        ---------------------------------------------------- */

        gsap.set(progress, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        /* ----------------------------------------------------
           VERTICAL TIMELINE PROGRESS
        ---------------------------------------------------- */

        gsap.to(progress, {
          scaleY: 1,
          ease: "none",

          scrollTrigger: {
            trigger: timeline,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        /* ----------------------------------------------------
           EXPERIENCE CARDS
        ---------------------------------------------------- */

        items.forEach((item, index) => {
          const content = item.querySelector(".experience-content");
          const dot = item.querySelector(".experience-dot");
          const marker = item.querySelector(".experience-marker");
          const year = item.querySelector(".experience-year");
          const highlightItems = item.querySelectorAll(".experience-highlight");

          const isRight = index % 2 === 0;

          /*
           * IMPORTANT:
           *
           * The card itself remains in its normal grid column.
           *
           * GSAP only moves the card visually.
           *
           * 01 / 03:
           * RIGHT -> CENTER
           *
           * 02 / 04:
           * LEFT -> CENTER
           */

          gsap.set(content, {
            x: isRight ? 180 : -180,
            opacity: 0,
            scale: 0.96,
          });

          /* --------------------------------------------------
             DOT INITIAL STATE
          -------------------------------------------------- */

          gsap.set(dot, {
            scale: 1,
            backgroundColor: "rgba(31, 90, 75, 0.25)",
            borderColor: "#f1f9f6",
            boxShadow: "0 0 0 1px rgba(31, 90, 75, 0.12)",
          });

          /* --------------------------------------------------
             MARKER INITIAL STATE
          -------------------------------------------------- */

          gsap.set(marker, {
            width: 0,
            opacity: 0,
          });

          /* --------------------------------------------------
             HIGHLIGHTS INITIAL STATE
          -------------------------------------------------- */

          gsap.set(highlightItems, {
            opacity: 0,
            x: isRight ? 12 : -12,
          });

          /* --------------------------------------------------
             SCROLL TIMELINE
          -------------------------------------------------- */

          const itemTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,

              start: "top 78%",
              end: "top 38%",

              scrub: 1.15,

              invalidateOnRefresh: true,
            },
          });

          /* ==================================================
             STEP 1
             
             CARD MOVES FROM SIDE TO CENTER
          ================================================== */

          itemTimeline.to(
            content,
            {
              x: 0,
              opacity: 1,
              scale: 1,

              duration: 1,

              ease: "power3.out",
            },
            0,
          );

          /* ==================================================
             STEP 2
             
             CONNECTOR LINE EXTENDS
          ================================================== */

          itemTimeline.to(
            marker,
            {
              width: "calc(50% - 25px)",
              opacity: 1,

              duration: 0.8,

              ease: "power2.out",
            },
            0.1,
          );

          /* ==================================================
             STEP 3
             
             DOT ACTIVATES WHEN CARD REACHES CENTER
          ================================================== */

          itemTimeline.to(
            dot,
            {
              scale: 1.45,

              backgroundColor: "#5DB9A2",

              borderColor: "#E5FBF4",

              boxShadow:
                "0 0 0 7px rgba(93,185,162,0.12), 0 0 28px rgba(93,185,162,0.35)",

              duration: 0.35,

              ease: "back.out(2)",
            },
            0.7,
          );

          /* ==================================================
             STEP 4
             
             YEAR BECOMES ACTIVE
          ================================================== */

          itemTimeline.to(
            year,
            {
              color: "#5DB9A2",

              duration: 0.3,

              ease: "power2.out",
            },
            0.7,
          );

          /* ==================================================
             STEP 5
             
             HIGHLIGHTS REVEAL
          ================================================== */

          if (highlightItems.length) {
            itemTimeline.to(
              highlightItems,
              {
                opacity: 1,
                x: 0,

                stagger: 0.07,

                duration: 0.35,

                ease: "power2.out",
              },
              0.78,
            );
          }

          /* ==================================================
             PREVIOUS CARD FADES SLIGHTLY
          ================================================== */

          if (index > 0) {
            const previousItem = items[index - 1];

            gsap.to(previousItem, {
              opacity: 0.5,

              scrollTrigger: {
                trigger: item,

                start: "top 62%",
                end: "top 42%",

                scrub: 1,

                invalidateOnRefresh: true,
              },
            });
          }
        });
      });

      /* ======================================================
         MOBILE
         
         No horizontal card movement.
         
         Timeline moves to LEFT.
         Cards remain stable and readable.
      ====================================================== */

      mm.add("(max-width: 800px)", () => {
        gsap.set(progress, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        gsap.to(progress, {
          scaleY: 1,

          ease: "none",

          scrollTrigger: {
            trigger: timeline,

            start: "top 75%",
            end: "bottom 75%",

            scrub: 1,

            invalidateOnRefresh: true,
          },
        });

        items.forEach((item, index) => {
          const content = item.querySelector(".experience-content");
          const dot = item.querySelector(".experience-dot");
          const marker = item.querySelector(".experience-marker");
          const year = item.querySelector(".experience-year");
          const highlightItems = item.querySelectorAll(".experience-highlight");

          /* --------------------------------------------------
             MOBILE INITIAL STATE
          -------------------------------------------------- */

          gsap.set(content, {
            x: 0,
            opacity: 0,
            y: 35,
            scale: 0.98,
          });

          gsap.set(dot, {
            scale: 1,

            backgroundColor: "rgba(31, 90, 75, 0.25)",

            borderColor: "#f1f9f6",

            boxShadow: "0 0 0 1px rgba(31, 90, 75, 0.12)",
          });

          gsap.set(marker, {
            width: 0,
            opacity: 0,
          });

          gsap.set(highlightItems, {
            opacity: 0,
            x: -10,
          });

          /* --------------------------------------------------
             MOBILE SCROLL ANIMATION
          -------------------------------------------------- */

          const mobileTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,

              start: "top 82%",
              end: "top 52%",

              scrub: 1,

              invalidateOnRefresh: true,
            },
          });

          /* CARD RISES */

          mobileTimeline.to(
            content,
            {
              y: 0,
              opacity: 1,
              scale: 1,

              duration: 0.8,

              ease: "power3.out",
            },
            0,
          );

          /* CONNECTOR */

          mobileTimeline.to(
            marker,
            {
              width: "30px",
              opacity: 1,

              duration: 0.5,

              ease: "power2.out",
            },
            0.15,
          );

          /* DOT */

          mobileTimeline.to(
            dot,
            {
              scale: 1.35,

              backgroundColor: "#5DB9A2",

              borderColor: "#E5FBF4",

              boxShadow:
                "0 0 0 6px rgba(93,185,162,0.12), 0 0 22px rgba(93,185,162,0.3)",

              duration: 0.35,

              ease: "back.out(2)",
            },
            0.5,
          );

          /* YEAR */

          mobileTimeline.to(
            year,
            {
              color: "#5DB9A2",

              duration: 0.25,
            },
            0.5,
          );

          /* HIGHLIGHTS */

          if (highlightItems.length) {
            mobileTimeline.to(
              highlightItems,
              {
                opacity: 1,

                x: 0,

                stagger: 0.06,

                duration: 0.3,

                ease: "power2.out",
              },
              0.6,
            );
          }
        });
      });

      /* ======================================================
         REDUCED MOTION
      ====================================================== */

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, {
          opacity: 1,
        });

        items.forEach((item) => {
          const content = item.querySelector(".experience-content");
          const dot = item.querySelector(".experience-dot");
          const marker = item.querySelector(".experience-marker");
          const highlights = item.querySelectorAll(".experience-highlight");

          gsap.set(content, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          });

          gsap.set(dot, {
            scale: 1.2,
            backgroundColor: "#5DB9A2",
          });

          gsap.set(marker, {
            width: "30px",
            opacity: 1,
          });

          gsap.set(highlights, {
            opacity: 1,
            x: 0,
          });
        });

        gsap.set(progress, {
          scaleY: 1,
        });
      }

      /* ======================================================
         HEADER REVEAL
      ====================================================== */

      const header = section.querySelector(".experience-header");

      if (header) {
        gsap.fromTo(
          header,
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
      }

      /* ======================================================
         BACKGROUND GRID
      ====================================================== */

      const grid = section.querySelector(".experience-grid");

      if (grid) {
        gsap.to(grid, {
          y: 120,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top bottom",
            end: "bottom top",

            scrub: 2,
          },
        });
      }

      /* ======================================================
         SIDE TEXT
      ====================================================== */

      const sideText = section.querySelector(".experience-side-text");

      if (sideText) {
        gsap.to(sideText, {
          y: -80,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top bottom",
            end: "bottom top",

            scrub: 2,
          },
        });
      }

      /* ======================================================
         REFRESH SCROLLTRIGGER
      ====================================================== */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="experience-section">
      <style>{`

        /* ====================================================
           DESIGN TOKENS
        ==================================================== */

        .experience-section {
          --bg: #f1f9f6;
          --paper: #fcfffd;

          --green: #5db9a2;
          --green-light: #e5fbf4;
          --green-dark: #1f5a4b;

          --text: #1f5a4b;

          --muted: #66877f;

          --line: rgba(31, 90, 75, 0.13);

          position: relative;

          width: 100%;

          min-height: 230vh;

          background: var(--bg);

          color: var(--text);

          overflow: clip;

          isolation: isolate;
        }

        /* ====================================================
           BACKGROUND
        ==================================================== */

        .experience-grid {
          position: absolute;

          inset: -150px 0 0;

          pointer-events: none;

          opacity: 0.42;

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

          background-size: 70px 70px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 12%,
              black 88%,
              transparent
            );

          z-index: -2;
        }

        /* ====================================================
           TOP BAR
        ==================================================== */

        .experience-topbar {
          position: absolute;

          top: 0;

          left: 0;

          right: 0;

          height: 76px;

          padding: 0 5vw;

          display: flex;

          align-items: center;

          justify-content: space-between;

          border-bottom: 1px solid var(--line);

          font-family:
            "IBM Plex Mono",
            monospace;

          z-index: 20;
        }

        .experience-top-left {
          display: flex;

          align-items: center;

          gap: 10px;

          font-size: 8px;

          letter-spacing: 0.22em;
        }

        .experience-status {
          width: 6px;

          height: 6px;

          border-radius: 50%;

          background: var(--green);

          box-shadow:
            0 0 0 5px
            rgba(93, 185, 162, 0.1);
        }

        .experience-top-right {
          font-size: 8px;

          letter-spacing: 0.15em;

          opacity: 0.35;
        }

        /* ====================================================
           HEADER
        ==================================================== */

        .experience-header {
          position: relative;

          max-width: 1200px;

          margin: 0 auto;

          padding: 150px 5vw 90px;

          z-index: 5;
        }

        .experience-label {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 22px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing: 0.23em;

          color: var(--green);
        }

        .experience-label-line {
          width: 34px;

          height: 1px;

          background: var(--green);
        }

        .experience-header h2 {
          margin: 0;

          font-family:
            "Inter",
            sans-serif;

          font-size:
            clamp(
              4rem,
              8vw,
              8rem
            );

          line-height: 0.82;

          letter-spacing: -0.08em;

          font-weight: 600;
        }

        .experience-header h2 span {
          display: block;

          color:
            rgba(
              31,
              90,
              75,
              0.2
            );
        }

        .experience-header-description {
          max-width: 430px;

          margin-top: 30px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          line-height: 1.8;

          letter-spacing: 0.04em;

          color: var(--muted);

          opacity: 0.85;
        }

        /* ====================================================
           TIMELINE
        ==================================================== */

        .experience-timeline {
          position: relative;

          width:
            min(
              1100px,
              90%
            );

          margin: 0 auto;

          padding: 20px 0 160px;
        }

        /* ====================================================
           BASE LINE
        ==================================================== */

        .experience-line {
          position: absolute;

          top: 0;

          bottom: 0;

          left: 50%;

          width: 1px;

          transform:
            translateX(-50%);

          background:
            rgba(
              31,
              90,
              75,
              0.11
            );

          z-index: 1;
        }

        /* ====================================================
           GREEN PROGRESS LINE
        ==================================================== */

        .experience-line-progress {
          position: absolute;

          top: 0;

          left: 0;

          width: 100%;

          height: 100%;

          background:
            linear-gradient(
              to bottom,
              var(--green),
              rgba(
                93,
                185,
                162,
                0.55
              ),
              transparent
            );

          transform:
            scaleY(0);

          transform-origin:
            top center;

          box-shadow:
            0 0 16px
            rgba(
              93,
              185,
              162,
              0.18
            );
        }

        /* ====================================================
           EXPERIENCE ITEM
        ==================================================== */

        .experience-item {
          position: relative;

          width: 100%;

          min-height: 400px;

          display: grid;

          grid-template-columns:
            1fr 1fr;

          align-items: center;

          z-index: 3;
        }

        /* ----------------------------------------------------
           RIGHT SIDE CARDS
           
           01 / 03
        ---------------------------------------------------- */

        .experience-item:nth-child(odd) {
          padding-right: 70px;
        }

        /* ----------------------------------------------------
           LEFT SIDE CARDS
           
           02 / 04
        ---------------------------------------------------- */

        .experience-item:nth-child(even) {
          padding-left: 70px;
        }

        /* ====================================================
           CARD
        ==================================================== */

        .experience-content {
          position: relative;

          padding: 30px;

          background:
            rgba(
              252,
              255,
              253,
              0.62
            );

          border:
            1px solid var(--line);

          backdrop-filter:
            blur(12px);

          will-change:
            transform,
            opacity;

          transition:
            border-color 400ms ease,
            background 400ms ease,
            box-shadow 400ms ease;
        }

        .experience-item:nth-child(odd)
        .experience-content {
          grid-column: 1;
        }

        .experience-item:nth-child(even)
        .experience-content {
          grid-column: 2;
        }

        .experience-content:hover {
          border-color:
            rgba(
              93,
              185,
              162,
              0.45
            );

          background:
            rgba(
              252,
              255,
              253,
              0.9
            );

          box-shadow:
            0 25px 80px
            rgba(
              31,
              90,
              75,
              0.07
            );
        }

        /* ====================================================
           NUMBER
        ==================================================== */

        .experience-number {
          position: absolute;

          top: 18px;

          right: 20px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.2em;

          color: var(--green);

          opacity: 0.65;
        }

        /* ====================================================
           YEAR
        ==================================================== */

        .experience-year {
          display: inline-block;

          margin-bottom: 35px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.17em;

          color: var(--muted);

          transition:
            color 300ms ease;
        }

        /* ====================================================
           ROLE
        ==================================================== */

        .experience-role {
          margin: 0;

          font-family:
            "Inter",
            sans-serif;

          font-size:
            clamp(
              1.8rem,
              3vw,
              3rem
            );

          line-height: 0.95;

          letter-spacing: -0.06em;

          font-weight: 600;
        }

        /* ====================================================
           COMPANY
        ==================================================== */

        .experience-company {
          margin-top: 10px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing: 0.08em;

          color: var(--green-dark);
        }

        /* ====================================================
           DESCRIPTION
        ==================================================== */

        .experience-description {
          max-width: 500px;

          margin: 23px 0;

          font-family:
            "Inter",
            sans-serif;

          font-size: 11px;

          line-height: 1.75;

          color:
            rgba(
              31,
              90,
              75,
              0.62
            );
        }

        /* ====================================================
           HIGHLIGHTS
        ==================================================== */

        .experience-highlights {
          list-style: none;

          padding: 0;

          margin: 0;

          display: flex;

          flex-direction: column;

          gap: 10px;
        }

        .experience-highlight {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          font-family:
            "Inter",
            sans-serif;

          font-size: 10px;

          line-height: 1.5;

          color:
            rgba(
              31,
              90,
              75,
              0.68
            );

          opacity: 0;
        }

        .highlight-dot {
          flex-shrink: 0;

          width: 5px;

          height: 5px;

          margin-top: 5px;

          border-radius: 50%;

          background:
            var(--green);
        }

        /* ====================================================
           TIMELINE DOT
        ==================================================== */

        .experience-dot {
          position: absolute;

          left: 50%;

          top: 50%;

          width: 12px;

          height: 12px;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            3px solid var(--bg);

          border-radius: 50%;

          background:
            rgba(
              31,
              90,
              75,
              0.25
            );

          box-shadow:
            0 0 0 1px
            rgba(
              31,
              90,
              75,
              0.12
            );

          z-index: 10;

          will-change:
            transform,
            background-color,
            box-shadow;
        }

        /* ====================================================
           CONNECTOR
        ==================================================== */

        .experience-marker {
          position: absolute;

          top: 50%;

          height: 1px;

          width: 0;

          opacity: 0;

          background:
            var(--green);

          z-index: 5;

          box-shadow:
            0 0 10px
            rgba(
              93,
              185,
              162,
              0.3
            );
        }

        /* ----------------------------------------------------
           RIGHT CARD CONNECTOR
           
           Timeline -> RIGHT CARD
        ---------------------------------------------------- */

        .experience-item:nth-child(odd)
        .experience-marker {
          left: 50%;

          transform-origin:
            left center;
        }

        /* ----------------------------------------------------
           LEFT CARD CONNECTOR
           
           Timeline -> LEFT CARD
        ---------------------------------------------------- */

        .experience-item:nth-child(even)
        .experience-marker {
          right: 50%;

          transform-origin:
            right center;
        }

        /* ====================================================
           SIDE TEXT
        ==================================================== */

        .experience-side-text {
          position: absolute;

          right: 3vw;

          top: 48%;

          writing-mode:
            vertical-rl;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 7px;

          letter-spacing: 0.2em;

          color: var(--muted);

          opacity: 0.35;

          z-index: 5;
        }

        /* ====================================================
           END
        ==================================================== */

        .experience-end {
          position: relative;

          max-width: 1100px;

          margin: 0 auto;

          padding: 80px 5vw 140px;

          text-align: center;
        }

        .experience-end-line {
          width: 1px;

          height: 60px;

          margin:
            0 auto 30px;

          background:
            linear-gradient(
              to bottom,
              var(--green),
              transparent
            );
        }

        .experience-end p {
          margin: 0;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.25em;

          color: var(--muted);
        }

        /* ====================================================
           TABLET / MOBILE
        ==================================================== */

        @media (max-width: 800px) {

          .experience-section {
            min-height: auto;
          }

          /* ------------------------------------------------
             TOP BAR
          ------------------------------------------------ */

          .experience-topbar {
            height: 65px;

            padding:
              0 20px;
          }

          .experience-top-right {
            display: none;
          }

          /* ------------------------------------------------
             HEADER
          ------------------------------------------------ */

          .experience-header {
            padding:
              125px 20px 70px;
          }

          .experience-header h2 {
            font-size:
              clamp(
                3.5rem,
                14vw,
                5rem
              );
          }

          .experience-header-description {
            max-width: 320px;

            font-size: 9px;
          }

          /* ------------------------------------------------
             TIMELINE
          ------------------------------------------------ */

          .experience-timeline {
            width:
              calc(
                100% - 40px
              );

            padding:
              20px 0 80px;
          }

          /* ------------------------------------------------
             MOVE TIMELINE TO LEFT
          ------------------------------------------------ */

          .experience-line {
            left: 12px;

            transform:
              translateX(-50%);
          }

          /* ------------------------------------------------
             ITEMS
          ------------------------------------------------ */

          .experience-item {
            min-height: auto;

            display: block;

            padding:
              45px 0 75px 42px !important;
          }

          /* ------------------------------------------------
             CARD
          ------------------------------------------------ */

          .experience-content {
            width: 100%;

            padding:
              24px 20px;

            transform:
              none;
          }

          .experience-item:nth-child(odd)
          .experience-content,
          .experience-item:nth-child(even)
          .experience-content {
            grid-column: auto;
          }

          /* ------------------------------------------------
             DOT
          ------------------------------------------------ */

          .experience-dot {
            left: 12px;

            top: 52px;
          }

          /* ------------------------------------------------
             CONNECTOR
          ------------------------------------------------ */

          .experience-marker {
            left: 12px !important;

            right: auto !important;

            top: 52px;

            width: 30px;

            opacity: 1;

            transform:
              translateX(0);

            transform-origin:
              left center !important;
          }

          /* ------------------------------------------------
             TYPOGRAPHY
          ------------------------------------------------ */

          .experience-year {
            margin-bottom: 24px;

            font-size: 8px;
          }

          .experience-role {
            font-size:
              clamp(
                1.75rem,
                8vw,
                2.3rem
              );
          }

          .experience-company {
            font-size: 8px;
          }

          .experience-description {
            font-size: 10px;

            line-height: 1.7;

            margin:
              20px 0;
          }

          .experience-highlight {
            font-size: 9px;

            line-height: 1.55;
          }

          /* ------------------------------------------------
             SIDE TEXT
          ------------------------------------------------ */

          .experience-side-text {
            display: none;
          }

          /* ------------------------------------------------
             END
          ------------------------------------------------ */

          .experience-end {
            padding:
              40px 20px 100px;
          }
        }

        /* ====================================================
           SMALL MOBILE
        ==================================================== */

        @media (max-width: 480px) {

          .experience-header {
            padding:
              115px 18px 60px;
          }

          .experience-header h2 {
            font-size:
              3.4rem;
          }

          .experience-header-description {
            max-width: 290px;

            font-size: 8px;
          }

          .experience-timeline {
            width:
              calc(
                100% - 30px
              );
          }

          .experience-item {
            padding:
              40px 0 65px 38px !important;
          }

          .experience-dot {
            left: 10px;

            top: 48px;
          }

          .experience-marker {
            left: 10px !important;

            top: 48px;

            width: 28px;
          }

          .experience-content {
            padding:
              22px 17px;
          }

          .experience-number {
            right: 15px;

            font-size: 7px;
          }

          .experience-role {
            font-size:
              1.7rem;
          }

          .experience-description {
            font-size: 9px;
          }

          .experience-highlight {
            font-size: 8.5px;
          }
        }

        /* ====================================================
           VERY SMALL DEVICES
        ==================================================== */

        @media (max-width: 360px) {

          .experience-header h2 {
            font-size:
              3rem;
          }

          .experience-content {
            padding:
              20px 15px;
          }

          .experience-role {
            font-size:
              1.55rem;
          }

          .experience-highlight {
            font-size:
              8px;
          }
        }

        /* ====================================================
           REDUCED MOTION
        ==================================================== */

        @media (prefers-reduced-motion: reduce) {

          .experience-content {
            opacity: 1 !important;

            transform:
              none !important;
          }

          .experience-highlight {
            opacity: 1 !important;

            transform:
              none !important;
          }

          .experience-marker {
            opacity: 1 !important;
          }

          .experience-dot {
            background:
              var(--green) !important;
          }
        }

      `}</style>

      {/* ======================================================
          BACKGROUND GRID
      ====================================================== */}

      <div className="experience-grid" />

      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <div className="experience-topbar">
        <div className="experience-top-left">
          <span className="experience-status" />

          <span>04 — EXPERIENCE</span>
        </div>

        <div className="experience-top-right">
          CAREER / ENGINEERING / 2022 — 2026
        </div>
      </div>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="experience-header">
        <div className="experience-label">
          <span className="experience-label-line" />
          CAREER JOURNEY
        </div>

        <h2>
          HOW I<span>GOT HERE.</span>
        </h2>

        <p className="experience-header-description">
          From enterprise consulting to full-stack software engineering — each
          role added another layer to the way I build systems.
        </p>
      </div>

      {/* ======================================================
          TIMELINE
      ====================================================== */}

      <div ref={timelineRef} className="experience-timeline">
        {/* BASE LINE */}

        <div className="experience-line">
          <div ref={progressRef} className="experience-line-progress" />
        </div>

        {experiences.map((experience, index) => (
          <article
            key={experience.number}
            ref={(element) => {
              itemsRef.current[index] = element;
            }}
            className="experience-item"
          >
            {/* TIMELINE DOT */}

            <div className="experience-dot" />

            {/* HORIZONTAL CONNECTION */}

            <div className="experience-marker" />

            {/* CONTENT */}

            <div className="experience-content">
              <div className="experience-number">{experience.number}</div>

              <span className="experience-year">{experience.period}</span>

              <h3 className="experience-role">{experience.role}</h3>

              <div className="experience-company">{experience.company}</div>

              <p className="experience-description">{experience.description}</p>

              <ul className="experience-highlights">
                {experience.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="experience-highlight">
                    <span className="highlight-dot" />

                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* ======================================================
          SIDE LABEL
      ====================================================== */}

      <div className="experience-side-text">
        SOFTWARE ENGINEERING / ENTERPRISE SYSTEMS / CONTINUOUS GROWTH
      </div>

      {/* ======================================================
          END
      ====================================================== */}

      <div className="experience-end">
        <div className="experience-end-line" />

        <p>STILL BUILDING.</p>
      </div>
    </section>
  );
};

export default Experience;
