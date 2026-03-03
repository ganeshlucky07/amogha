"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "../CartContext";
import { AnimatedLogo } from "./AnimatedLogo";

export function Header() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
        {/* Floating shapes */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedLogo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm"
          >
            {/* Location Badge */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>Jodimetla, Pocharam</span>
            </div>
            
            {/* Hours Badge */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4" />
              <span>7AM - 10PM</span>
            </div>
            
            {/* Cart Button with unique styling */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-white text-amber-600 px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShoppingCart className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Cart</span>
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/10 backdrop-blur-sm">
        <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 1440 32" preserveAspectRatio="none">
          <path
            fill="rgba(255,255,255,0.2)"
            d="M0,16 C480,32 960,0 1440,16 L1440,32 L0,32 Z"
          />
        </svg>
      </div>
    </header>
  );
}
