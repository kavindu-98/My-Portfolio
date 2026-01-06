/** @format */

import { useEffect } from "react";

/**
 * Custom hook for optimized smooth scrolling
 * Improves scroll performance by throttling and using requestAnimationFrame
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scroll behavior to all anchor links
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();

      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
};

/**
 * Scroll throttling hook for better performance
 */
export const useScrollOptimization = (callback, delay = 100) => {
  useEffect(() => {
    let timeoutId = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (callback) callback();
          ticking = false;
        });
        ticking = true;
      }

      // Additional debounce
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (callback) callback();
      }, delay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};
