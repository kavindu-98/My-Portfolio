/** @format */

import React, { useEffect, useRef } from "react";
import { animateInOnScroll } from "../utils/gsapAnimations";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      animateInOnScroll(titleRef.current);
    }

    if (formRef.current) {
      animateInOnScroll(formRef.current, 0.1);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted");
  };
  const socials = [
    {
      icon: FaGithub,
      url: "https://github.com/kavindu-98",
      name: "GitHub",
    },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/in/kavindu-abeykoon",
      name: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      url: "mailto:kavinduumayanga058@gmail.com",
      name: "Email",
    },
    {
      icon: FaPhone,
      url: "tel:0768510781",
      name: "Phone",
    },
  ];

  return (
    <section ref={containerRef} id="contact" className="contact-section">
      <style>{`
        /* ====================================================
           DESIGN TOKENS
        ==================================================== */

        .contact-section {
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
          min-height: 100vh;

          padding: 140px 0 120px;

          background: var(--bg);
          color: var(--text);

          overflow: hidden;
          isolation: isolate;
        }

        /* ====================================================
           BACKGROUND GRID
        ==================================================== */

        .contact-grid {
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

          z-index: -3;
        }

        /* ====================================================
           FLOATING GREEN GLOW
        ==================================================== */

        .contact-glow {
          position: absolute;

          width: 420px;
          height: 420px;

          border-radius: 50%;

          filter: blur(100px);

          pointer-events: none;

          opacity: 0.18;

          z-index: -2;
        }

        .contact-glow-one {
          top: 25%;
          left: -180px;

          background: var(--green);
        }

        .contact-glow-two {
          top: 45%;
          right: -180px;

          background: #8dd8c1;
        }

        /* ====================================================
           CONTAINER
        ==================================================== */

        .contact-container {
          position: relative;

          width: min(1100px, 90%);

          margin: 0 auto;

          z-index: 5;
        }

        /* ====================================================
           HEADER
        ==================================================== */

        .contact-header {
          max-width: 850px;

          margin: 0 auto 80px;

          text-align: center;
        }

        .contact-label {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 25px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          letter-spacing: 0.23em;

          color: var(--green);

          text-transform: uppercase;
        }

        .contact-label-line {
          width: 34px;

          height: 1px;

          background: var(--green);
        }

        .contact-header h2 {
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

          color: var(--text);
        }

        .contact-header h2 span {
          display: block;

          color:
            rgba(
              31,
              90,
              75,
              0.2
            );
        }

        .contact-description {
          max-width: 500px;

          margin: 32px auto 0;

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
           FORM WRAPPER
        ==================================================== */

        .contact-form-wrapper {
          position: relative;

          max-width: 850px;

          margin: 0 auto;

          padding: 45px;

          background:
            rgba(
              252,
              255,
              253,
              0.72
            );

          border:
            1px solid
            var(--line);

          backdrop-filter: blur(14px);

          box-shadow:
            0 30px 100px
            rgba(
              31,
              90,
              75,
              0.06
            );

          transition:
            border-color 400ms ease,
            box-shadow 400ms ease;
        }

        .contact-form-wrapper:hover {
          border-color:
            rgba(
              93,
              185,
              162,
              0.4
            );

          box-shadow:
            0 35px 100px
            rgba(
              31,
              90,
              75,
              0.09
            );
        }

        /* ====================================================
           FORM GRID
        ==================================================== */

        .contact-form {
          display: flex;

          flex-direction: column;

          gap: 25px;
        }

        .contact-row {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 25px;
        }

        /* ====================================================
           FORM FIELD
        ==================================================== */

        .contact-field {
          display: flex;

          flex-direction: column;
        }

        .contact-field label {
          margin-bottom: 9px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.18em;

          color: var(--green-dark);

          text-transform: uppercase;
        }

        .contact-field input,
        .contact-field textarea {
          width: 100%;

          padding:
            15px 16px;

          background:
            rgba(
              241,
              249,
              246,
              0.7
            );

          border:
            1px solid
            rgba(
              31,
              90,
              75,
              0.12
            );

          color: var(--text);

          font-family:
            "Inter",
            sans-serif;

          font-size: 11px;

          outline: none;

          transition:
            border-color 300ms ease,
            background 300ms ease,
            box-shadow 300ms ease;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color:
            rgba(
              102,
              135,
              127,
              0.65
            );
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color:
            rgba(
              93,
              185,
              162,
              0.65
            );

          background:
            rgba(
              252,
              255,
              253,
              0.95
            );

          box-shadow:
            0 0 0 3px
            rgba(
              93,
              185,
              162,
              0.08
            );
        }

        .contact-field textarea {
          min-height: 150px;

          resize: vertical;

          line-height: 1.7;
        }

        /* ====================================================
           SUBMIT BUTTON
        ==================================================== */

        .contact-submit-wrapper {
          padding-top: 8px;
        }

        .contact-submit {
          position: relative;

          width: 100%;

          padding: 16px 25px;

          border: 1px solid var(--green);

          background: var(--green);

          color: white;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 9px;

          font-weight: 600;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          cursor: pointer;

          overflow: hidden;

          transition:
            background 300ms ease,
            color 300ms ease,
            box-shadow 300ms ease,
            transform 300ms ease;
        }

        .contact-submit:hover {
          background: var(--green-dark);

          border-color: var(--green-dark);

          box-shadow:
            0 15px 35px
            rgba(
              31,
              90,
              75,
              0.18
            );

          transform: translateY(-2px);
        }

        /* ====================================================
           SOCIAL SECTION
        ==================================================== */

        .contact-social {
          margin-top: 75px;

          text-align: center;
        }

        .contact-social-label {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          margin-bottom: 28px;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.2em;

          color: var(--muted);
        }

        .contact-social-line {
          width: 30px;

          height: 1px;

          background: var(--line);
        }

        .contact-social-links {
          display: flex;

          justify-content: center;

          gap: 12px;

          flex-wrap: wrap;
        }

        .contact-social-link {
  position: relative;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(252, 255, 253, 0.7);

  border: 1px solid var(--line);

  color: var(--muted);

  text-decoration: none;

  transition:
    border-color 300ms ease,
    background 300ms ease,
    color 300ms ease,
    box-shadow 300ms ease;

  will-change: transform;
}

.contact-social-link:hover {
  border-color: var(--green);

  background: var(--green-light);

  color: var(--green-dark);

  box-shadow:
    0 12px 30px
    rgba(31, 90, 75, 0.1);
}

        /* ====================================================
           TOOLTIP
        ==================================================== */

        .contact-tooltip {
          position: absolute;

          bottom: calc(100% + 10px);

          left: 50%;

          transform:
            translateX(-50%)
            translateY(5px);

          padding:
            6px 9px;

          background:
            var(--green-dark);

          color: white;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 7px;

          letter-spacing: 0.08em;

          white-space: nowrap;

          opacity: 0;

          pointer-events: none;

          transition:
            opacity 200ms ease,
            transform 200ms ease;
        }

        .contact-social-link:hover
        .contact-tooltip {
          opacity: 1;

          transform:
            translateX(-50%)
            translateY(0);
        }

        /* ====================================================
           BOTTOM STATEMENT
        ==================================================== */

        .contact-end {
          margin-top: 90px;

          text-align: center;
        }

        .contact-end-line {
          width: 1px;

          height: 55px;

          margin: 0 auto 25px;

          background:
            linear-gradient(
              to bottom,
              var(--green),
              transparent
            );
        }

        .contact-end p {
          margin: 0;

          font-family:
            "IBM Plex Mono",
            monospace;

          font-size: 8px;

          letter-spacing: 0.25em;

          color: var(--muted);
        }

        /* ====================================================
           MOBILE
        ==================================================== */

        @media (max-width: 800px) {

          .contact-section {
            padding:
              120px 0 90px;
          }

          .contact-container {
            width:
              calc(
                100% - 40px
              );
          }

          .contact-header {
            margin-bottom: 60px;
          }

          .contact-header h2 {
            font-size: 4rem;
          }

          .contact-description {
            max-width: 330px;
          }

          .contact-form-wrapper {
            padding: 28px 22px;
          }

          .contact-row {
            grid-template-columns: 1fr;

            gap: 25px;
          }

          .contact-social {
            margin-top: 60px;
          }
        }

        /* ====================================================
           SMALL MOBILE
        ==================================================== */

        @media (max-width: 480px) {

          .contact-header h2 {
            font-size: 3.5rem;
          }

          .contact-form-wrapper {
            padding:
              24px 18px;
          }

          .contact-field input,
          .contact-field textarea {
            padding:
              13px 14px;
          }

          .contact-social-link {
            width: 44px;
            height: 44px;
          }
        }

        /* ====================================================
           REDUCED MOTION
        ==================================================== */

        @media (prefers-reduced-motion: reduce) {

          .contact-social-link,
          .contact-submit {
            transition: none;
          }
        }
      `}</style>

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="contact-grid" />

      <div className="contact-glow contact-glow-one" />
      <div className="contact-glow contact-glow-two" />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="contact-container">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div ref={titleRef} className="contact-header">
          <div className="contact-label">
            <span className="contact-label-line" />
            GET IN TOUCH
          </div>

          <h2>
            LET'S WORK
            <span>TOGETHER.</span>
          </h2>

          <p className="contact-description">
            Have a project in mind? Let's collaborate and turn your ideas into
            thoughtful, scalable digital experiences.
          </p>
        </div>

        {/* ====================================================
            FORM
        ==================================================== */}

        <div ref={formRef} className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            {/* NAME + EMAIL */}

            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="name">Name</label>

                <input id="name" type="text" placeholder="Your name" required />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* SUBJECT */}

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>

              <input
                id="subject"
                type="text"
                placeholder="Project inquiry"
                required
              />
            </div>

            {/* MESSAGE */}

            <div className="contact-field">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                placeholder="Tell me about your project..."
                rows="6"
                required
              />
            </div>

            {/* SUBMIT */}

            <div className="contact-submit-wrapper">
              <button type="submit" className="contact-submit">
                Send Message →
              </button>
            </div>
          </form>
        </div>

        {/* ====================================================
            SOCIAL LINKS
        ==================================================== */}

        <div className="contact-social">
          <div className="contact-social-label">
            <span className="contact-social-line" />
            OR REACH OUT DIRECTLY
            <span className="contact-social-line" />
          </div>

          <div className="contact-social-links">
            {socials.map((social, index) => {
              const Icon = social.icon;

              const isExternal =
                !social.url.startsWith("mailto:") &&
                !social.url.startsWith("tel:");

              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="contact-social-link group"
                >
                  <Icon className="text-[18px]" />

                  <span className="contact-tooltip">{social.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            END
        ==================================================== */}

        <div className="contact-end">
          <div className="contact-end-line" />

          <p>AVAILABLE FOR NEW PROJECTS.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
