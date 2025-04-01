import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = "" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Background layer for better visibility */}
      <div className={`fixed left-0 right-0 h-2 bg-black/20 backdrop-blur-sm z-[99999] ${className}`} />

      {/* Main progress line - matches website palette */}
      <motion.div
        className={`fixed left-0 right-0 h-1.5 bg-[#7C3AED] transform origin-left z-[99999] ${className}`}
        style={{ scaleX }}
      />

      {/* Bright glow effect */}
      <motion.div
        className={`fixed left-0 right-0 h-1.5 transform origin-left z-[99999] ${className}`}
        style={{ scaleX }}
      >
        <div className="absolute inset-0 bg-[#7C3AED] blur-[6px] opacity-70" />
      </motion.div>

      {/* Bright beam overlay */}
      <motion.div
        className={`fixed left-0 right-0 h-1.5 transform origin-left overflow-hidden z-[99999] ${className}`}
        style={{ scaleX }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse-fast" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#9F7AEA] opacity-90" />
      </motion.div>

      {/* Top highlight */}
      <motion.div
        className={`fixed left-0 right-0 h-[1px] bg-white/30 transform origin-left z-[99999] ${className} -translate-y-[1px]`}
        style={{ scaleX }}
      />

      {/* Shadow for better contrast */}
      <div 
        className={`fixed left-0 right-0 h-1 bg-gradient-to-b from-black/10 to-transparent z-[99999] ${className}`}
        style={{ transform: 'translateY(1.5px)' }}
      />
    </>
  );
}

// Add this to your tailwind.config.js if not already present:
// animation: {
//   'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
// } 