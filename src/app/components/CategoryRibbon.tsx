"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "../data";

export function CategoryRibbon() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map((cat) => ({
        id: cat.id,
        element: document.getElementById(cat.id),
      }));

      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Category-specific gradient colors for hover
  const getCategoryGradient = (categoryId: string) => {
    const gradients: Record<string, string> = {
      sweets: "from-rose-400 to-pink-500",
      namkeens: "from-amber-400 to-orange-500",
      pizza: "from-orange-400 to-red-500",
      burgers: "from-yellow-400 to-orange-500",
      hotdogs: "from-red-400 to-orange-500",
      sandwiches: "from-green-400 to-emerald-500",
      snacks: "from-amber-400 to-yellow-500",
      puffs: "from-orange-300 to-amber-400",
      biscuits: "from-amber-300 to-orange-400",
      pastries: "from-pink-400 to-rose-500",
      cakes: "from-purple-400 to-pink-500",
    };
    return gradients[categoryId] || "from-amber-400 to-orange-500";
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            const isHovered = hoveredCategory === category.id;
            const gradient = getCategoryGradient(category.id);

            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => scrollToCategory(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                    : "bg-gray-100 text-gray-700 hover:text-white"
                }`}
              >
                {/* Animated gradient background on hover */}
                {!isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 hover:opacity-100 transition-opacity duration-300`}
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />
                )}

                {/* Glow effect on hover */}
                {!isActive && isHovered && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-xl opacity-50 -z-10`}
                    layoutId="glow"
                  />
                )}

                {/* Icon with animation */}
                <motion.span
                  className="relative z-10"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.icon}
                </motion.span>

                {/* Text */}
                <span className="relative z-10">{category.name}</span>

                {/* Shine effect on hover */}
                {isHovered && !isActive && (
                  <motion.div
                    className="absolute inset-0 -translate-x-full"
                    animate={{ translateX: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
