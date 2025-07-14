"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  hoverScale?: number;
  hoverY?: number;
  startAnimation?: boolean;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  hoverScale = 1.005,
  hoverY = -4,
  startAnimation = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`${className} cursor-pointer`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        startAnimation
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.95 }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// Glass morphism card variant
interface GlassMorphismCardProps extends AnimatedCardProps {
  blur?: string;
  background?: string;
  border?: string;
}

export function GlassMorphismCard({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  hoverScale = 1.02,
  hoverY = -4,
  startAnimation = true,
  blur = "backdrop-blur-md",
  background = "bg-white/10",
  border = "border border-white/20",
}: GlassMorphismCardProps) {
  return (
    <motion.div
      className={`${className} ${blur} ${background} ${border} rounded-2xl shadow-xl cursor-pointer`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        startAnimation
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.95 }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// Staggered container for animating multiple cards
interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  startAnimation?: boolean;
}

export function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  startAnimation = true,
}: StaggeredContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={startAnimation ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
