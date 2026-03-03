"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Bike, Copy, Check, Phone } from "lucide-react";
import { useCart } from "../CartContext";
import { useState } from "react";
import { SHOP_INFO } from "../data";

interface PlatformSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlatformSelector({ isOpen, onClose }: PlatformSelectorProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  // Generate order summary text
  const orderSummary = items
    .map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
    .join("\n");

  const fullOrderText = `Order from Amogha Sweets and Bakers\n\n${orderSummary}\n\nTotal: ₹${totalPrice}`;

  const handleCopyOrder = async () => {
    await navigator.clipboard.writeText(fullOrderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwiggyClick = () => {
    window.open("https://share.google/tIDQaCw1QeD6wiz31", "_blank");
    clearCart();
    onClose();
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'd like to place an order from Amogha Sweets and Bakers:\n\n${orderSummary}\n\nTotal: ₹${totalPrice}`;
    const whatsappUrl = `https://wa.me/${SHOP_INFO.whatsappNumber.replace(/\+/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[70] p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">Complete Your Order</h2>
                    <p className="text-white/90 text-sm mt-1">
                      Choose how you want to place your order
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Summary Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-700">Order Summary</h3>
                    <button
                      onClick={handleCopyOrder}
                      className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto text-sm">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-gray-800">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                {/* Platform Buttons */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 text-center">
                    Select your preferred ordering method
                  </p>

                  {/* Swiggy */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSwiggyClick}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors"
                  >
                    <Bike className="w-6 h-6" />
                    Order on Swiggy
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>

                  {/* WhatsApp */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-6 h-6" />
                    Order on WhatsApp
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Instructions */}
                <div className="bg-amber-50 rounded-xl p-4 text-sm space-y-2">
                  <p className="text-amber-800 font-medium">
                    How it works:
                  </p>
                  <ul className="text-amber-700 list-disc list-inside space-y-1">
                    <li><strong>Swiggy:</strong> Opens restaurant page - add items manually</li>
                    <li><strong>WhatsApp:</strong> Sends order directly - pay on delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
