"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface VegBadgeProps {
  isVeg?: boolean;
  className?: string;
}

export function VegBadge({ isVeg, className = "" }: VegBadgeProps) {
  if (!isVeg) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      <Leaf className="w-3 h-3" />
      <span>Veg</span>
    </motion.div>
  );
}
