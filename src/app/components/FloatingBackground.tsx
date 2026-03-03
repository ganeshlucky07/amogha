"use client";

import { motion } from "framer-motion";

const floatingItems = ["🧁", "🍰", "🍪", "🥐", "🍕", "🍔", "🍢"];

// Deterministic positions for SSR/client consistency
const getInitialPosition = (index: number) => ({
  x: ((index * 137.5) % 100) * 10, // Golden angle approximation for distribution
  y: ((index * 89) % 80) * 10,     // Prime number for variety
});

export function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-10"
          initial={getInitialPosition(index)}
          animate={{
            y: [null, -100, null],
            x: [null, ((index % 3) - 1) * 50, null],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + ((index * 3) % 10),
            repeat: Infinity,
            ease: "linear",
            delay: index * 2,
          }}
        >
          {item}
        </motion.div>
      ))}
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl" />
    </div>
  );
}
