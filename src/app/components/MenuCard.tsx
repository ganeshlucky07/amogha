"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { MenuItem } from "../data";
import { VegBadge } from "./VegBadge";
import { useCart } from "../CartContext";

interface MenuCardProps {
  item: MenuItem;
  variant?: "default" | "pastry" | "biscuit";
}

export function MenuCard({ item, variant = "default" }: MenuCardProps) {
  const { addItem, items } = useCart();
  
  const isInCart = items.some((cartItem) => cartItem.id === item.id);
  const cartQuantity = items.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

  const handleAddToCart = () => {
    addItem(item);
  };

  if (variant === "pastry") {
    return (
      <motion.div
        whileHover={{
          boxShadow: "0 8px 32px rgba(244, 63, 94, 0.3)",
          scale: 1.02,
          rotateY: 5,
        }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-rose-100 hover:border-rose-300 group relative"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-200/50 to-transparent rounded-bl-full" />
        
        <div className="h-28 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
          <motion.span 
            className="text-5xl"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            🍰
          </motion.span>
          {/* Sparkle effects */}
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-2 right-2 text-yellow-400"
          >
            ✨
          </motion.div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
            <VegBadge isVeg={item.isVeg} />
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              ₹{item.price}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              onClick={handleAddToCart}
              className={`${
                isInCart ? "bg-green-500" : "bg-gradient-to-r from-rose-400 to-pink-500"
              } text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all relative`}
            >
              {isInCart ? (
                <Check className="w-5 h-5" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartQuantity}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "biscuit") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{ y: -8, rotate: -1 }}
        className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-amber-200/50 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/30 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200/30 rounded-full blur-xl" />
        
        <div className="flex items-start gap-4 relative z-10">
          <motion.div 
            className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            🍪
          </motion.div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-amber-900 text-lg">{item.name}</h3>
              <VegBadge isVeg={item.isVeg} />
            </div>
            <p className="text-sm text-amber-700 mb-2">{item.description}</p>
            {item.weight && (
              <p className="text-xs font-semibold text-amber-600 mb-2 bg-amber-100/50 px-2 py-1 rounded-full inline-block">
                {item.weight} Pack
              </p>
            )}
            {item.perfectMatch && (
              <p className="text-xs text-amber-600 italic bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1.5 rounded-lg mb-3 border border-amber-200/50">
                ✨ {item.perfectMatch}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ₹{item.price}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleAddToCart}
                className={`${
                  isInCart ? "bg-green-500" : "bg-gradient-to-r from-amber-400 to-orange-500"
                } text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 relative`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </>
                )}
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartQuantity}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant with glassmorphism
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 hover:border-amber-200/50 hover:shadow-xl transition-all relative overflow-hidden group"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/50 transition-all duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
          <VegBadge isVeg={item.isVeg} />
        </div>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span
            className={`text-xl font-bold bg-gradient-to-r ${
              item.category === "pastries"
                ? "from-rose-500 to-pink-500"
                : item.category === "biscuits"
                ? "from-amber-500 to-orange-500"
                : "from-gray-700 to-gray-900"
            } bg-clip-text text-transparent`}
          >
            ₹{item.price}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={handleAddToCart}
            className={`${
              isInCart 
                ? "bg-green-500" 
                : "bg-gradient-to-r from-gray-700 to-gray-900"
            } text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all relative`}
          >
            {isInCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartQuantity}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
