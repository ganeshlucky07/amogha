"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, IndianRupee } from "lucide-react";

interface PriceFilterProps {
  onFilterChange: (filter: "all" | "under100") => void;
}

export function PriceFilter({ onFilterChange }: PriceFilterProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "under100">("all");

  const handleFilter = (filter: "all" | "under100") => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3 py-4 bg-white border-b border-gray-100"
    >
      <div className="flex items-center gap-2 text-gray-600 mr-2">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
        <button
          onClick={() => handleFilter("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeFilter === "all"
              ? "bg-gray-800 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => handleFilter("under100")}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeFilter === "under100"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <IndianRupee className="w-3 h-3" />
          Under ₹100
        </button>
      </div>
    </motion.div>
  );
}
