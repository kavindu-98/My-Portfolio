/** @format */

import React from "react";
import { motion } from "framer-motion";
import {
  useIntersectionObserver,
  useParallax,
} from "../hooks/useIntersectionObserver";

/**
 * Animated Card Component with Glassmorphism
 */
export const AnimatedCard = ({ children, delay = 0, parallax = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const offset = useParallax(parallax);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      style={{ transform: `translateY(${offset * parallax}px)` }}
      className="glass-effect hover:glass-effect-strong glow-effect transition-smooth rounded-2xl p-6"
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered Text Animation Component
 */
export const StaggeredText = ({
  text,
  as: Component = "h1",
  className = "",
}) => {
  const [ref, isVisible] = useIntersectionObserver();

  const letters = text.split("");

  return (
    <Component ref={ref} className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </Component>
  );
};

/**
 * Scroll Reveal Component
 */
export const ScrollReveal = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 3D Perspective Card Component
 */
export const Card3D = ({ children, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 10;
    const y = (e.clientX - rect.left - rect.width / 2) / 10;

    setRotateX(-x);
    setRotateY(y);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
      }
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`glass-effect transition-smooth ${className}`}
    >
      {children}
    </motion.div>
  );
};
