/** @format */

import React from "react";
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

const Footer = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/kavindu-98",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/kavindu-abeykoon",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      href: "mailto:kavinduumayanga058@gmail.com",
      label: "Email",
    },
    {
      icon: FaPhone,
      href: "tel:+94768510781",
      label: "Phone",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#f1f9f6] text-[#1f5a4b] border-t border-[rgba(31,90,75,0.13)]">
      {/* ====================================================
          BACKGROUND GRID
      ==================================================== */}

      <div
        className="
          absolute inset-0
          pointer-events-none
          opacity-40
          bg-[linear-gradient(rgba(31,90,75,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(31,90,75,0.08)_1px,transparent_1px)]
          bg-[size:70px_70px]
          [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
        "
      />

      {/* ====================================================
          GREEN GLOW
      ==================================================== */}

      <motion.div
        className="
          absolute
          -bottom-48
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#5db9a2]/10
          blur-[100px]
          pointer-events-none
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.25, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20">
        {/* ==================================================
            TOP LABEL
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="flex items-center justify-between mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#5db9a2]" />

            <span
              className="
                font-mono
                text-[9px]
                tracking-[0.23em]
                text-[#5db9a2]
              "
            >
              PORTFOLIO / 2026
            </span>
          </div>

          <span
            className="
              hidden sm:block
              font-mono
              text-[8px]
              tracking-[0.15em]
              text-[#66877f]
              opacity-60
            "
          >
            SOFTWARE ENGINEER
          </span>
        </motion.div>

        {/* ==================================================
            MAIN GRID
        ================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10">
          {/* ==================================================
              BRAND
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
            className="space-y-6"
          >
            <motion.h3
              whileHover={{
                x: 3,
              }}
              className="
                text-3xl
                font-semibold
                tracking-[-0.06em]
                text-[#1f5a4b]
              "
            >
              Kavindu Abeykoon
              <span className="text-[#5db9a2]">.</span>
            </motion.h3>

            <p
              className="
                max-w-sm
                font-sans
                text-[11px]
                leading-[1.8]
                text-[#66877f]
              "
            >
              Full Stack Software Engineer focused on building scalable
              applications, enterprise systems, and thoughtful digital
              experiences.
            </p>

            {/* SOCIAL LINKS */}

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={social.label}
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
                    className="
                      group
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      border
                      border-[rgba(31,90,75,0.13)]
                      bg-[#fcfffd]/70
                      text-[#66877f]
                      transition-all
                      duration-300
                      hover:border-[#5db9a2]
                      hover:bg-[#e5fbf4]
                      hover:text-[#1f5a4b]
                    "
                  >
                    <Icon className="text-sm" />

                    <span
                      className="
                        absolute
                        pointer-events-none
                      "
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ==================================================
              QUICK LINKS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[#5db9a2]" />

              <h4
                className="
                  font-mono
                  text-[9px]
                  tracking-[0.18em]
                  text-[#1f5a4b]
                "
              >
                NAVIGATION
              </h4>
            </div>

            <nav className="grid grid-cols-2 gap-y-4">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={{
                    x: 5,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    font-sans
                    text-[10px]
                    text-[#66877f]
                    transition-colors
                    duration-300
                    hover:text-[#5db9a2]
                  "
                >
                  <span className="text-[#5db9a2] text-[7px]">→</span>

                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* ==================================================
              CONTACT
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-[#5db9a2]" />

              <h4
                className="
                  font-mono
                  text-[9px]
                  tracking-[0.18em]
                  text-[#1f5a4b]
                "
              >
                GET IN TOUCH
              </h4>
            </div>

            <p
              className="
                text-[11px]
                leading-[1.8]
                text-[#66877f]
                mb-6
                max-w-xs
              "
            >
              Have an idea or project in mind? Let's build something meaningful
              together.
            </p>

            <motion.a
              href="mailto:kavinduumayanga058@gmail.com"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                inline-flex
                items-center
                gap-3
                px-5
                py-3
                bg-[#5db9a2]
                text-white
                font-mono
                text-[9px]
                tracking-[0.12em]
                border
                border-[#5db9a2]
                transition-all
                duration-300
                hover:bg-[#1f5a4b]
                hover:border-[#1f5a4b]
                hover:shadow-[0_15px_35px_rgba(31,90,75,0.16)]
              "
            >
              <FaEnvelope />
              LET'S TALK
              <span>→</span>
            </motion.a>
          </motion.div>
        </div>

        {/* ==================================================
            DIVIDER
        ================================================== */}

        <div className="mt-16 mb-8 h-px bg-[rgba(31,90,75,0.13)]" />

        {/* ==================================================
            BOTTOM
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
          "
        >
          <p
            className="
              font-mono
              text-[8px]
              tracking-[0.1em]
              text-[#66877f]
            "
          >
            © {new Date().getFullYear()} KAVINDU ABEYKOON
          </p>

          <motion.p
            whileHover={{
              scale: 1.03,
            }}
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              tracking-[0.1em]
              text-[#66877f]
            "
          >
            MADE WITH
            <FaHeart className="text-[#5db9a2] text-[9px]" />
            REACT & TAILWIND
          </motion.p>

          {/* BACK TO TOP */}

          <motion.button
            onClick={scrollToTop}
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              tracking-[0.12em]
              text-[#66877f]
              transition-colors
              duration-300
              hover:text-[#5db9a2]
            "
          >
            BACK TO TOP
            <span
              className="
                w-8
                h-8
                flex
                items-center
                justify-center
                border
                border-[rgba(31,90,75,0.13)]
                bg-[#fcfffd]/70
                transition-all
                duration-300
                hover:border-[#5db9a2]
                hover:bg-[#e5fbf4]
              "
            >
              <FaArrowUp className="text-[9px]" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
