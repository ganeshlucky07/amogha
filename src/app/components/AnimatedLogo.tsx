"use client";

import { motion } from "framer-motion";
import { SHOP_INFO } from "../data";

export function AnimatedLogo() {
  // Split name for display: "Amogha" as main, rest as subtitle
  const nameParts = SHOP_INFO.name.split(" ");
  const mainName = nameParts[0]; // "Amogha"
  const subName = nameParts.slice(1).join(" "); // "Pure Ghee Sweets & Bakers"

  return (
    <div className="relative flex items-center gap-3">
      {/* Animated Sweet Icon */}
      <div className="relative w-12 h-12">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-white/40"
        />
        
        {/* Inner rotating ring (opposite direction) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-dotted border-white/30"
        />
        
        {/* Center icon with pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-2xl">🧁</span>
        </motion.div>
        
        {/* Floating particles */}
        <motion.div
          animate={{ 
            y: [-5, 5, -5],
            x: [-2, 2, -2],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-1 -right-1 text-xs"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ 
            y: [5, -5, 5],
            x: [2, -2, 2],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -bottom-1 -left-1 text-xs"
        >
          🌟
        </motion.div>
      </div>

      {/* Text with gradient */}
      <div className="flex flex-col">
        <motion.span 
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {mainName}
        </motion.span>
        <motion.span 
          className="text-[10px] md:text-xs text-white/80 tracking-wider uppercase leading-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subName}
        </motion.span>
      </div>
    </div>
  );
}
