"use client";

import { motion } from "framer-motion";
import { Gift, Coffee } from "lucide-react";
import { MenuItem } from "../data";
import { MenuCard } from "./MenuCard";

interface BiscuitsSectionProps {
  items: MenuItem[];
}

export function BiscuitsSection({ items }: BiscuitsSectionProps) {
  return (
    <section id="biscuits" className="py-12 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
            <Coffee className="w-5 h-5" />
            <span className="font-medium">Hyderabadi Chai-Time Special</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            🍪 Hyderabadi Biscuits
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Authentic Hyderabadi biscuits - from the famous Osmania to the
            delightful Chand. Perfect for your evening chai!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-amber-600">
            <Gift className="w-5 h-5" />
            <span className="font-medium">Perfect for Gifting - 250g Packs</span>
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
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <MenuCard key={item.id} item={item} variant="biscuit" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
