"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedProgressBarProps {
  percentage: number;
  color?: string;
  backgroundColor?: string;
  height?: string;
  className?: string;
  startAnimation?: boolean;
  duration?: number;
}

export default function AnimatedProgressBar({
  percentage,
  color = "bg-emerald-500",
  backgroundColor = "bg-gray-200",
  height = "h-2",
  className = "",
  startAnimation = true,
  duration = 1.5,
}: AnimatedProgressBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`w-full ${backgroundColor} rounded-full ${height} ${className} overflow-hidden`}
    >
      <motion.div
        className={`${height} ${color} rounded-full`}
        initial={{ width: "0%" }}
        animate={startAnimation && isInView ? { width: `${percentage}%` } : {}}
        transition={{
          duration,
          ease: "easeOut",
          delay: 0.2,
        }}
      />
    </div>
  );
}

// Circular progress bar component
interface AnimatedCircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  startAnimation?: boolean;
  duration?: number;
}

export function AnimatedCircularProgress({
  percentage,
  size = 100,
  strokeWidth = 8,
  color = "#10b981",
  backgroundColor = "#e5e7eb",
  className = "",
  startAnimation = true,
  duration = 2,
}: AnimatedCircularProgressProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            startAnimation && isInView
              ? {
                  strokeDashoffset:
                    circumference - (percentage / 100) * circumference,
                }
              : {}
          }
          transition={{
            duration,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
      </svg>

      {/* Percentage text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={startAnimation && isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: duration * 0.2,
        }}
      >
        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
          {Math.round(percentage)}%
        </span>
      </motion.div>
    </div>
  );
}
