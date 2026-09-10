import React, { useState, useEffect } from 'react';
import { FRAGRANCES, BOUTIQUES } from './data/fragrances';
import { Fragrance, CartItem, Currency, ActiveTab, OlfactoryFamily } from './types';
import { getFragrancePrice } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FragranceCatalog } from './components/FragranceCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OlfactoryPyramidSection } from './components/OlfactoryPyramidSection';
import { ScentFinderQuiz } from './components/ScentFinderQuiz';
import { TheHouseSection } from './components/TheHouseSection';
import { BoutiquesSection } from './components/BoutiquesSection';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { BespokeConsultationModal } from './components/BespokeConsultationModal';
import { Footer } from './components/Footer';
import { MarqueeBanner, MarqueeItem } from './components/MarqueeBanner';
import { Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { luxuryEase } from './motion/motionSystem';

const OLFACTORY_NOTES_MARQUEE: MarqueeItem[] = [
  { text: 'FLORENTINE ORRIS BUTTER', badge: 'NOBLE ROOT' },
  { text: 'CALABRIAN COLD-PRESSED BERGAMOT' },
  { text: 'CENTIFOLIA ROSE ABSOLUTE', badge: 'GRASSE HARVEST', highlight: true },
  { text: 'SMOKED ATLAS CEDARWOOD' },
  { text: 'MADAGASCAR BOURBON VANILLA', badge: 'AGED 2 YRS' },
  { text: 'TUSCAN TANNED GLOVE LEATHER' },
  { text: 'ROYAL AMBER RESIN ACCORD', highlight: true },
  { text: 'HAITIAN MOUNTAIN VETIVER' },
  { text: 'NIGHT-BLOOMING JASMINE SAMBAC' },
  { text: 'INDIAN MYSORE SANDALWOOD', badge: 'SUSTAINABLE RESERVE' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState<boolean>(false);
  const [bespokeCity, setBespokeCity] = useState<string>('Paris');
  const [catalogFamily, setCatalogFamily] = useState<OlfactoryFamily>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved bag and wishlist from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('macesa_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem('macesa_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn('Could not read from local storage:', e);
    }
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('macesa_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to local storage:', e);
    }
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('macesa_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to local storage:', e);
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenBespoke = (city?: string) => {
    if (city) {
      setBespokeCity(city);
    }
    setIsBespokeOpen(true);
  };

  const handleAddToCart = (
    fragrance: Fragrance,
    sizeMl: number,
    price: number,
    engravingText?: string
  ) => {
    const entryId = `${fragrance.id}-${sizeMl}-${engravingText || 'none'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === entryId);
      if (existing) {
        return prev.map((item) =>
          item.id === entryId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: entryId,
          fragrance,
          sizeMl,
          price,
          quantity: 1,
          engravingText
        }
      ];
    });

    showToast(`${fragrance.name} (${sizeMl}ml) added to bag.`);
  };

  const handleQuickAdd = (fragrance: Fragrance) => {
    const defaultSize = fragrance.sizes[0] || { ml: 100, priceMultiplier: 1.0 };
    const price = getFragrancePrice(fragrance, currency, defaultSize.priceMultiplier);
    handleAddToCart(fragrance, defaultSize.ml, price);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartId));
    showToast('Flacon removed from bag.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (fragranceId: string) => {
    setWishlist((prev) => {
      const isAlready = prev.includes(fragranceId);
      if (isAlready) {
        showToast('Removed from saved creations.');
        return prev.filter((id) => id !== fragranceId);
      } else {
        showToast('Saved to your private wish list.');
        return [...prev, fragranceId];
      }
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const featuredFragrance = FRAGRANCES[0]; // Santal Impérial

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#191817]">
      
      {/* Global Luxury Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
        openBespoke={() => handleOpenBespoke('Paris')}
        wishlistCount={wishlist.length}
      />

      {/* Breadcrumb sub-banner for standalone views */}
      {activeTab !== 'home' && (
        <div className="bg-[#FAF8F5] border-b border-[#E8E2D6] py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-sans text-[#8C8479] uppercase tracking-[0.2em]">
            <button 
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-[#181716] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>←</span>
              <span>Maison Flagship</span>
            </button>
            <span className="text-[#C5A880] font-medium">
              {activeTab === 'catalog' && 'The Flacon Collection'}
              {activeTab === 'pyramid' && 'The Olfactory Pyramid'}
              {activeTab === 'quiz' && 'Scent Diagnostic Quiz'}
              {activeTab === 'the-house' && 'The House & Grasse Domaine'}
              {activeTab === 'boutiques' && 'International Salons'}
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area with Fluid Luxury Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
            >
              <HeroSection
                featuredFragrance={featuredFragrance}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
                setActiveTab={setActiveTab}
                currency={currency}
                onQuickAdd={handleQuickAdd}
              />

              {/* Haute Parfumerie Editorial Marquee Ribbon */}
              <MarqueeBanner 
                theme="dark" 
                speed={36} 
                pauseOnHover={true}
              />

              <FragranceCatalog
                fragrances={FRAGRANCES}
                currency={currency}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
                onQuickAdd={handleQuickAdd}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onSelectDiscoverySet={() => {
                  const discoverySet = FRAGRANCES.find((f) => f.id === 'coffret-decouverte');
                  if (discoverySet) setSelectedFragrance(discoverySet);
                }}
                selectedFamily={catalogFamily}
                onSelectFamily={setCatalogFamily}
              />

              <OlfactoryPyramidSection
                fragrances={FRAGRANCES}
                currency={currency}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
              />

              {/* Secondary Botanical Accords Marquee */}
              <MarqueeBanner 
                items={OLFACTORY_NOTES_MARQUEE}
                theme="light"
                speed={44}
                reverse={true}
                pauseOnHover={true}
                onItemClick={(item) => {
                  setIsSearchOpen(true);
                }}
              />

              <ScentFinderQuiz
                fragrances={FRAGRANCES}
                currency={currency}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
                onQuickAdd={handleQuickAdd}
              />

              <TheHouseSection openBespoke={() => handleOpenBespoke('Paris')} />

              <BoutiquesSection
                boutiques={BOUTIQUES}
                openBespoke={handleOpenBespoke}
              />
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
            >
              <FragranceCatalog
                fragrances={FRAGRANCES}
                currency={currency}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
                onQuickAdd={handleQuickAdd}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onSelectDiscoverySet={() => {
                  const discoverySet = FRAGRANCES.find((f) => f.id === 'coffret-decouverte');
                  if (discoverySet) setSelectedFragrance(discoverySet);
                }}
                selectedFamily={catalogFamily}
                onSelectFamily={setCatalogFamily}
              />
            </motion.div>
          )}

          {activeTab === 'pyramid' && (
            <motion.div
              key="pyramid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
            >
              <OlfactoryPyramidSection
                fragrances={FRAGRANCES}
                currency={currency}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
              />
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
            >
              <ScentFinderQuiz
                fragrances={FRAGRANCES}
                currency={currency}
                onSelectFragrance={(f) => setSelectedFragrance(f)}
                onQuickAdd={handleQuickAdd}
              />
            </motion.div>
          )}

          {activeTab === 'the-house' && (
            <motion.div
              key="the-house"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
            >
              <TheHouseSection openBespoke={() => handleOpenBespoke('Paris')} />
            </motion.div>
          )}

          {activeTab === 'boutiques' && (
            <motion.div
              key="boutiques"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
            >
              <BoutiquesSection
                boutiques={BOUTIQUES}
                openBespoke={handleOpenBespoke}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Luxury Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openBespoke={() => handleOpenBespoke('Paris')}
        onSelectCategory={(family) => {
          setCatalogFamily(family);
          setActiveTab('catalog');
        }}
      />

      {/* Interactive Overlays & Modals with Exit Animation Support */}
      <AnimatePresence>
        {selectedFragrance && (
          <ProductDetailModal
            key="product-detail-modal"
            fragrance={selectedFragrance}
            onClose={() => setSelectedFragrance(null)}
            currency={currency}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        fragrances={FRAGRANCES}
        currency={currency}
        onSelectFragrance={(f) => setSelectedFragrance(f)}
      />

      <BespokeConsultationModal
        isOpen={isBespokeOpen}
        onClose={() => setIsBespokeOpen(false)}
        initialCity={bespokeCity}
      />

      {/* Floating Subtle Luxury Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="fixed bottom-6 right-6 z-60 bg-[#181716] text-[#FAF8F5] px-5 py-3 border border-[#C5A880]/60 shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span className="text-xs font-sans tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
