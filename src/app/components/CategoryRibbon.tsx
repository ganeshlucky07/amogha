"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "../data";

export function CategoryRibbon() {
  const [activeCategory, setActiveCategory] = useState<string>("");

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

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToCategory(category.id)}
              className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                activeCategory === category.id
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-sm sm:text-base">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.slice(0, 8)}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
