"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { MenuItem } from "../data";
import { VegBadge } from "./VegBadge";
import { useCart } from "../CartContext";

interface MenuCardProps {
  item: MenuItem;
  variant?: "default" | "pastry" | "biscuit";
}

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Mobile card - CSS only animations for performance
function MobileMenuCard({ item, variant = "default" }: MenuCardProps) {
  const { addItem, items } = useCart();
  
  const isInCart = items.some((cartItem) => cartItem.id === item.id);
  const cartQuantity = items.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

  const handleAddToCart = useCallback(() => {
    addItem(item);
  }, [addItem, item]);

  if (variant === "pastry") {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-rose-100 relative active:scale-[0.98] transition-transform">
        <div className="h-24 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-4xl">🍰</span>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-800 text-base">{item.name}</h3>
            <VegBadge isVeg={item.isVeg} />
          </div>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-rose-600">
              ₹{item.price}
            </span>
            <button
              onClick={handleAddToCart}
              className={`${
                isInCart ? "bg-green-500" : "bg-rose-500"
              } text-white p-2 rounded-lg shadow active:scale-95 transition-transform relative`}
            >
              {isInCart ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              {cartQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "biscuit") {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 shadow-lg border border-amber-200 relative active:scale-[0.98] transition-transform">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" loading="lazy" decoding="async" />
            ) : (
              "🍪"
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-amber-900 text-base truncate">{item.name}</h3>
              <VegBadge isVeg={item.isVeg} />
            </div>
            <p className="text-xs text-amber-700 mb-1 line-clamp-1">{item.description}</p>
            {item.weight && (
              <p className="text-xs font-semibold text-amber-600 mb-1 bg-amber-100/50 px-2 py-0.5 rounded-full inline-block">
                {item.weight}
              </p>
            )}
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-bold text-amber-700">
                ₹{item.price}
              </span>
              <button
                onClick={handleAddToCart}
                className={`${
                  isInCart ? "bg-green-500" : "bg-amber-500"
                } text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow active:scale-95 transition-transform relative`}
              >
                {isInCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {cartQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - mobile optimized
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative active:scale-[0.98] transition-transform">
      {item.image && (
        <div className="h-24 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      
      <div className={`${item.image ? 'p-3' : 'p-4'}`}>
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-gray-800 text-base">{item.name}</h3>
          <VegBadge isVeg={item.isVeg} />
        </div>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">
            ₹{item.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`${
              isInCart 
                ? "bg-green-500" 
                : "bg-gray-800"
            } text-white p-2 rounded-lg shadow active:scale-95 transition-transform relative`}
          >
            {isInCart ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            {cartQuantity > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                {cartQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Desktop card with hover effects
function DesktopMenuCard({ item, variant = "default" }: MenuCardProps) {
  const { addItem, items } = useCart();
  
  const isInCart = items.some((cartItem) => cartItem.id === item.id);
  const cartQuantity = items.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

  const handleAddToCart = useCallback(() => {
    addItem(item);
  }, [addItem, item]);

  if (variant === "pastry") {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-rose-100 hover:border-rose-300 group relative transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-200/50 to-transparent rounded-bl-full" />
        
        <div className="h-28 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-5xl">🍰</span>
          )}
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
            <span className="text-xl font-bold text-rose-600">
              ₹{item.price}
            </span>
            <button
              onClick={handleAddToCart}
              className={`${
                isInCart ? "bg-green-500" : "bg-rose-500"
              } text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all relative`}
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
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "biscuit") {
    return (
      <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-amber-200/50 relative overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/30 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200/30 rounded-full blur-xl" />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            ) : (
              "🍪"
            )}
          </div>
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
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-amber-700">
                ₹{item.price}
              </span>
              <button
                onClick={handleAddToCart}
                className={`${
                  isInCart ? "bg-green-500" : "bg-amber-500"
                } text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-1.5 relative`}
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
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - desktop
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/50 hover:border-amber-200/50 hover:shadow-xl hover:-translate-y-2 transition-all relative group">
      {item.image && (
        <div className="h-28 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      
      <div className={`${item.image ? 'p-4' : 'p-5'}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
          <VegBadge isVeg={item.isVeg} />
        </div>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">
            ₹{item.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`${
              isInCart 
                ? "bg-green-500" 
                : "bg-gray-800"
            } text-white p-2.5 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all relative`}
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
          </button>
        </div>
      </div>
    </div>
  );
}

// Main component that detects mobile and renders appropriate version
function MenuCardComponent({ item, variant = "default" }: MenuCardProps) {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileMenuCard item={item} variant={variant} />;
  }
  
  return <DesktopMenuCard item={item} variant={variant} />;
}

// Export memoized version to prevent unnecessary re-renders
export const MenuCard = memo(MenuCardComponent, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id && 
         prevProps.variant === nextProps.variant;
});
