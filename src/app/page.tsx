"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { menuItems, SHOP_INFO } from "./data";
import { MenuCard } from "./components/MenuCard";
import { Header } from "./components/Header";
import { CategoryRibbon } from "./components/CategoryRibbon";
import { PriceFilter } from "./components/PriceFilter";
import { MenuSection } from "./components/MenuSection";
import { BiscuitsSection } from "./components/BiscuitsSection";
import { PastryGallery } from "./components/PastryGallery";
import { LocationSection } from "./components/LocationSection";
import { CartDrawer } from "./components/CartDrawer";
import { FloatingBackground } from "./components/FloatingBackground";
import { useCart } from "./CartContext";

function HomeContent() {
  const [priceFilter, setPriceFilter] = useState<"all" | "under100">("all");
  const { setIsOpen, totalItems } = useCart();

  const filteredItems = useMemo(() => {
    if (priceFilter === "under100") {
      return menuItems.filter((item) => item.price < 100);
    }
    return menuItems;
  }, [priceFilter]);

  const pizzas = filteredItems.filter((item) => item.category === "pizza");
  const burgers = filteredItems.filter((item) => item.category === "burgers");
  const snacks = filteredItems.filter((item) => item.category === "snacks");
  const puffs = filteredItems.filter((item) => item.category === "puffs");
  const biscuits = filteredItems.filter((item) => item.category === "biscuits");
  const pastries = filteredItems.filter((item) => item.category === "pastries");
  const cakes = filteredItems.filter((item) => item.category === "cakes");
  const sweets = filteredItems.filter((item) => item.category === "sweets");
  const namkeens = filteredItems.filter((item) => item.category === "namkeens");
  const hotdogs = filteredItems.filter((item) => item.category === "hotdogs");
  const sandwiches = filteredItems.filter((item) => item.category === "sandwiches");

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-rose-50 relative">
      <FloatingBackground />
      <div className="relative z-10">
        <Header />
        <CategoryRibbon />
        <PriceFilter onFilterChange={setPriceFilter} />

        {priceFilter === "all" ? (
          <>
            {sweets.length > 0 && (
              <MenuSection
                id="sweets"
                title="Sweets"
                icon="🍬"
                items={sweets}
                color="rose"
              />
            )}
            {namkeens.length > 0 && (
              <MenuSection
                id="namkeens"
                title="Namkeens"
                icon="🥜"
                items={namkeens}
                color="amber"
              />
            )}
            {pizzas.length > 0 && (
              <MenuSection
                id="pizza"
                title="Pizza"
                icon="🍕"
                items={pizzas}
                color="amber"
              />
            )}
            {burgers.length > 0 && (
              <MenuSection
                id="burgers"
                title="Burgers"
                icon="🍔"
                items={burgers}
                color="gray"
              />
            )}
            {hotdogs.length > 0 && (
              <MenuSection
                id="hotdogs"
                title="Hot Dogs"
                icon="🌭"
                items={hotdogs}
                color="amber"
              />
            )}
            {sandwiches.length > 0 && (
              <MenuSection
                id="sandwiches"
                title="Sandwiches"
                icon="🥪"
                items={sandwiches}
                color="gray"
              />
            )}
            {snacks.length > 0 && (
              <MenuSection
                id="snacks"
                title="Chat & Snacks"
                icon="🍢"
                items={snacks}
                color="amber"
              />
            )}
            {puffs.length > 0 && (
              <MenuSection
                id="puffs"
                title="Puffs"
                icon="🥐"
                items={puffs}
                color="amber"
              />
            )}
            {biscuits.length > 0 && <BiscuitsSection items={biscuits} />}
            {pastries.length > 0 && <PastryGallery items={pastries} />}
            {cakes.length > 0 && (
              <MenuSection
                id="cakes"
                title="Cakes"
                icon="🎂"
                items={cakes}
                color="rose"
              />
            )}
          </>
        ) : (
          <Under100Section filteredItems={filteredItems} />
        )}

        <LocationSection />

        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-full shadow-lg z-40 flex items-center gap-2 font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            Order
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </motion.button>
        )}

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-lg">{SHOP_INFO.name}</h3>
                <p className="text-gray-400 text-sm">
                  Fresh • Delicious • Hyderabadi Special
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-5 h-5" />
                View Cart ({totalItems} items)
              </motion.button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p className="flex items-center justify-center gap-1">
                Made with <Heart className="w-4 h-4 text-rose-500" /> in Hyderabad
                © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>

        <CartDrawer />
      </div>
    </main>
  );
}

// Optimized Under100Section with chunked rendering for mobile performance
interface Under100SectionProps {
  filteredItems: typeof menuItems;
}

const Under100Section = memo(function Under100Section({ filteredItems }: Under100SectionProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Show 12 items initially, load more on scroll for mobile performance
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 12, filteredItems.length));
  }, [filteredItems.length]);

  return (
    <section className="py-12 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Items Under ₹100
          </h2>
          <p className="text-gray-600">
            Quick bites and treats that won&apos;t break the bank!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Showing {visibleItems.length} of {filteredItems.length} items
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-amber-600 active:scale-95 transition-all"
            >
              Load More ({filteredItems.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default function Home() {
  return (
    <HomeContent />
  );
}
