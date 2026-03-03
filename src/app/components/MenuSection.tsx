"use client";

import { motion } from "framer-motion";
import { MenuItem } from "../data";
import { MenuCard } from "./MenuCard";

interface MenuSectionProps {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
  color?: "amber" | "rose" | "gray";
}

const colorClasses = {
  amber: {
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
  },
  rose: {
    bg: "bg-rose-50",
    badge: "bg-rose-100 text-rose-800",
  },
  gray: {
    bg: "bg-gray-50",
    badge: "bg-gray-100 text-gray-800",
  },
};

export function MenuSection({
  id,
  title,
  icon,
  items,
  color = "gray",
}: MenuSectionProps) {
  const colors = colorClasses[color];

  return (
    <section id={id} className={`py-12 ${colors.bg}`}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div
            className={`inline-flex items-center gap-2 ${colors.badge} px-4 py-2 rounded-full mb-4`}
          >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{title}</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <MenuCard item={item} variant="default" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
