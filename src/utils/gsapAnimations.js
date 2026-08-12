/** @format */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate element in on scroll
 */
export const animateInOnScroll = (element, delay = 0) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
        markers: false,
      },
      delay,
    },
  );
};

/**
 * Parallax effect on scroll
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
      markers: false,
    },
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerAnimateIn = (selector, staggerDelay = 0.1) => {
  const elements = document.querySelectorAll(selector);

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: elements[0]?.parentElement,
        start: "top 75%",
        end: "top 25%",
        scrub: false,
        markers: false,
      },
    },
  );
};

/**
 * Rotate animation
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
 * Glow pulse animation
 */
export const createGlowPulse = (element) => {
  if (!element) return;

  gsap.to(element, {
    boxShadow: [
      "0 0 20px rgba(99, 102, 241, 0.5)",
      "0 0 40px rgba(139, 92, 246, 0.8)",
      "0 0 20px rgba(99, 102, 241, 0.5)",
    ],
    duration: 2,
    repeat: -1,
    ease: "sine.inOut",
  });
};

/**
 * Text reveal animation
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
 * Scale animation on scroll
 */
export const createScaleOnScroll = (element) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        end: "top 25%",
        scrub: false,
      },
    },
  );
};
