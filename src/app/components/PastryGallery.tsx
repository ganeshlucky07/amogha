"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MenuItem } from "../data";
import { MenuCard } from "./MenuCard";

interface PastryGalleryProps {
  items: MenuItem[];
}

export function PastryGallery({ items }: PastryGalleryProps) {
  return (
    <section id="pastries" className="py-12 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Fresh Daily</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            🍰 Pastry Gallery
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Indulge in our freshly baked pastries. Hover over cards to see the
            magic glow!
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <MenuCard item={item} variant="pastry" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
