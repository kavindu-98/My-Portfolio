/** @format */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate element in on scroll — fade + rise + scale + blur.
 * This is the SAME motion signature as Hero3D's chapter reveals
 * and About's content/visual columns, so every section that uses
 * this (Contact, and any future section) reads as one system
 * instead of a patchwork of different entrance styles.
 */
export const animateInOnScroll = (element, delay = 0) => {
  if (!element) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    gsap.set(element, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
    return;
  }

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
      scale: 0.97,
      filter: "blur(6px)",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

/**
 * Parallax effect on scroll — unchanged.
 */
export const createParallax = (element, speed = 0.5) => {
  if (!element) return;

  gsap.to(element, {
    y: () => gsap.getProperty(element, "offsetHeight") * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
};

/**
 * Stagger animation for multiple elements — same chapter language
 * applied to a group, so lists (skills, highlights, cards) read
 * consistently with single-element reveals.
 */
export const staggerAnimateIn = (selector, staggerDelay = 0.1) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: elements[0]?.parentElement,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

/**
 * Continuous rotation — unchanged, used for wireframe/network motifs.
 */
export const createRotation = (element, duration = 20) => {
  if (!element) return;

  gsap.to(element, {
    rotation: 360,
    duration,
    ease: "none",
    repeat: -1,
  });
};

/**
 * Glow pulse — recolored to the mint accent so it matches the
 * rest of the site instead of the old indigo/purple values.
 */
export const createGlowPulse = (element) => {
  if (!element) return;

  gsap.to(element, {
    boxShadow: [
      "0 0 20px rgba(95, 214, 196, 0.35)",
      "0 0 40px rgba(139, 232, 207, 0.55)",
      "0 0 20px rgba(95, 214, 196, 0.35)",
    ],
    duration: 2,
    repeat: -1,
    ease: "sine.inOut",
  });
};

/**
 * Character-by-character text reveal — unchanged. Prefer GSAP's
 * SplitText plugin (already used in Hero3D/About) for new work;
 * this remains as a dependency-free fallback.
 */
export const createTextReveal = (element) => {
  if (!element) return;

  const text = element.textContent;
  element.textContent = "";

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = "0";
    span.style.display = "inline-block";
    element.appendChild(span);
    return span;
  });

  gsap.to(chars, {
    opacity: 1,
    duration: 0.05,
    stagger: 0.05,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Scale-in on scroll — unchanged.
 */
export const createScaleOnScroll = (element) => {
  if (!element) return;

  gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

/**
 * ============================================================
 * CENTRALIZED REFRESH
 *
 * Hero3D, Projects, and Experience each independently call
 * ScrollTrigger.refresh() on mount. Whichever one runs LAST wins
 * and can invalidate measurements the others just made — a real
 * source of mistimed/overlapping animations between sections.
 *
 * Delete every per-component `requestAnimationFrame(() =>
 * ScrollTrigger.refresh())` call and call this ONCE from your
 * top-level App component instead, after everything has mounted
 * and images have had a chance to load (images changing size
 * after load is the #1 cause of stale ScrollTrigger measurements).
 * ============================================================
 */
export const refreshScrollTriggersOnce = () => {
  const images = Array.from(document.images);

  const waitForImages = Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          }),
    ),
  );

  waitForImages.then(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
};
