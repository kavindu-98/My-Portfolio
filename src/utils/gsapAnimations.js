/** @format */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ============================================================
 * SHARED MOTION SETTINGS
 * ============================================================
 */

const getReduceMotion = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * ============================================================
 * ANIMATE ELEMENT IN ON SCROLL
 * ============================================================
 */

export const animateInOnScroll = (element, delay = 0) => {
  if (!element) return null;

  if (getReduceMotion()) {
    gsap.set(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    });

    return null;
  }

  return gsap.fromTo(
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
        invalidateOnRefresh: true,
      },
    },
  );
};

/**
 * ============================================================
 * PARALLAX
 * ============================================================
 */

export const createParallax = (element, speed = 0.5) => {
  if (!element) return null;

  return gsap.to(element, {
    y: () => element.offsetHeight * speed,
    ease: "none",

    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
};

/**
 * ============================================================
 * STAGGER ANIMATION
 * ============================================================
 */

export const staggerAnimateIn = (selector, staggerDelay = 0.1) => {
  if (typeof document === "undefined") return null;

  const elements = document.querySelectorAll(selector);

  if (!elements.length) return null;

  if (getReduceMotion()) {
    gsap.set(elements, {
      opacity: 1,
      y: 0,
    });

    return null;
  }

  /*
   * IMPORTANT:
   *
   * Do not use a fragile parentElement as the trigger.
   * The parent can change size or layout.
   *
   * Use the first element's closest stable section/container.
   */
  const firstElement = elements[0];

  const trigger =
    firstElement.closest("[data-scroll-section]") ||
    firstElement.parentElement ||
    firstElement;

  return gsap.fromTo(
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
        trigger,
        start: "top 75%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    },
  );
};

/**
 * ============================================================
 * CONTINUOUS ROTATION
 * ============================================================
 */

export const createRotation = (element, duration = 20) => {
  if (!element) return null;

  return gsap.to(element, {
    rotation: 360,
    duration,
    ease: "none",
    repeat: -1,
  });
};

/**
 * ============================================================
 * GLOW PULSE
 * ============================================================
 */

export const createGlowPulse = (element) => {
  if (!element) return null;

  return gsap.to(element, {
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
 * ============================================================
 * CHARACTER TEXT REVEAL
 * ============================================================
 */

export const createTextReveal = (element) => {
  if (!element) return null;

  const text = element.textContent || "";

  element.textContent = "";

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");

    span.textContent = char;

    span.style.opacity = "0";
    span.style.display = "inline-block";

    element.appendChild(span);

    return span;
  });

  if (getReduceMotion()) {
    gsap.set(chars, {
      opacity: 1,
    });

    return null;
  }

  return gsap.to(chars, {
    opacity: 1,
    duration: 0.05,
    stagger: 0.05,
    ease: "power1.inOut",

    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
      invalidateOnRefresh: true,
    },
  });
};

/**
 * ============================================================
 * SCALE IN ON SCROLL
 * ============================================================
 */

export const createScaleOnScroll = (element) => {
  if (!element) return null;

  if (getReduceMotion()) {
    gsap.set(element, {
      scale: 1,
      opacity: 1,
    });

    return null;
  }

  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.4)",

      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    },
  );
};

/**
 * ============================================================
 * WAIT FOR IMAGES
 * ============================================================
 */

const waitForImages = () => {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  const images = Array.from(document.images);

  if (!images.length) {
    return Promise.resolve();
  }

  return Promise.all(
    images.map((img) => {
      /*
       * naturalWidth > 0 is more reliable than complete alone.
       *
       * complete can also be true when an image failed.
       */
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const finish = () => {
          img.removeEventListener("load", finish);
          img.removeEventListener("error", finish);
          resolve();
        };

        img.addEventListener("load", finish, {
          once: true,
        });

        img.addEventListener("error", finish, {
          once: true,
        });
      });
    }),
  );
};

/**
 * ============================================================
 * WAIT FOR WEB FONTS
 * ============================================================
 */

const waitForFonts = async () => {
  if (typeof document === "undefined") return;

  if (!document.fonts) return;

  try {
    /*
     * Wait for the fonts actually used by the portfolio.
     */
    await Promise.all([
      document.fonts.load('400 16px "Inter"'),
      document.fonts.load('500 16px "Inter"'),
      document.fonts.load('600 16px "Inter"'),
      document.fonts.load('700 16px "Inter"'),
      document.fonts.load('900 16px "Inter"'),

      document.fonts.load('400 16px "IBM Plex Mono"'),
      document.fonts.load('500 16px "IBM Plex Mono"'),
      document.fonts.load('600 16px "IBM Plex Mono"'),
    ]);

    await document.fonts.ready;
  } catch (error) {
    console.warn("[GSAP] Font loading warning:", error);
  }
};

/**
 * ============================================================
 * WAIT FOR BROWSER LAYOUT
 * ============================================================
 *
 * Two frames are not always enough when a pinned section
 * changes the document flow.
 *
 * We use THREE frames:
 *
 * Frame 1 -> React/layout changes
 * Frame 2 -> browser calculates layout
 * Frame 3 -> ScrollTrigger can measure final positions
 * ============================================================
 */

const waitForLayout = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  });

/**
 * ============================================================
 * WAIT FOR PAGE ASSETS
 * ============================================================
 */

export const waitForPageAssets = async () => {
  await Promise.all([waitForImages(), waitForFonts()]);

  await waitForLayout();
};

/**
 * ============================================================
 * KILL / RESET REFRESH STATE
 * ============================================================
 */

let refreshPromise = null;

/**
 * Reset the internal refresh promise.
 *
 * This is useful when:
 *
 * - React remounts the app
 * - route changes
 * - development StrictMode runs effects twice
 * - new sections are dynamically mounted
 */
export const resetScrollTriggerRefresh = () => {
  refreshPromise = null;
};

/**
 * ============================================================
 * CENTRALIZED SCROLLTRIGGER REFRESH
 * ============================================================
 *
 * IMPORTANT:
 *
 * This function should be called ONLY by App.jsx.
 *
 * Do NOT call it separately from:
 *
 * Hero3D
 * Projects
 * Experience
 * Skills
 * About
 * Contact
 *
 * ============================================================
 */

export const refreshScrollTriggersOnce = () => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  /*
   * If refresh already started, return the same promise.
   */
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      /*
       * Wait until images, fonts and browser layout are stable.
       */
      await waitForPageAssets();

      /*
       * Give React/browser one more opportunity to finish
       * layout calculations.
       */
      await waitForLayout();

      /*
       * Refresh AFTER every ScrollTrigger has been created.
       */
      ScrollTrigger.refresh();

      /*
       * Pinned Hero3D sections can modify document flow.
       *
       * Let the browser apply the pin spacer before the final
       * measurement.
       */
      await waitForLayout();

      ScrollTrigger.refresh();
    } catch (error) {
      console.error("[GSAP] ScrollTrigger refresh failed:", error);

      /*
       * Never allow a refresh error to break the portfolio.
       */
      ScrollTrigger.refresh();
    }

    return true;
  })();

  return refreshPromise;
};

/**
 * ============================================================
 * FORCE REFRESH
 * ============================================================
 *
 * Use this only when content changes dynamically.
 *
 * Example:
 *
 * - Projects loaded from API
 * - Images inserted dynamically
 * - Filter changes project height
 * - Accordion opens/closes
 * ============================================================
 */

export const refreshScrollTriggers = async () => {
  if (typeof window === "undefined") return;

  await waitForLayout();

  ScrollTrigger.refresh();
};

/**
 * ============================================================
 * DEBUG HELPER
 * ============================================================
 *
 * Temporarily call this from App.jsx if you need to inspect
 * the exact trigger positions.
 *
 * Remove it for production.
 * ============================================================
 */

export const debugScrollTriggers = () => {
  if (typeof window === "undefined") return;

  console.table(
    ScrollTrigger.getAll().map((trigger, index) => ({
      index,
      id: trigger.vars.id || "-",
      trigger: trigger.trigger?.className || trigger.trigger?.tagName || "-",
      start: trigger.start,
      end: trigger.end,
      pin: !!trigger.pin,
    })),
  );
};
