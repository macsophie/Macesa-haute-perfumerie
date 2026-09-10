import React, { useState, useMemo, useRef } from 'react';
import { Sparkles, SlidersHorizontal, ChevronLeft, ChevronRight, LayoutGrid, Rows3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, OlfactoryFamily, Currency } from '../types';
import { FragranceCard } from './FragranceCard';
import { OlfactoryFamilyMarquee } from './OlfactoryFamilyMarquee';
import { ParallaxOlfactoryShowcase } from './ParallaxOlfactoryShowcase';
import { luxuryEase } from '../motion/motionSystem';

interface FragranceCatalogProps {
  fragrances: Fragrance[];
  currency: Currency;
  onSelectFragrance: (fragrance: Fragrance) => void;
  onQuickAdd: (fragrance: Fragrance) => void;
  wishlist: string[];
  onToggleWishlist: (fragranceId: string) => void;
  onSelectDiscoverySet: () => void;
  selectedFamily?: OlfactoryFamily;
  onSelectFamily?: (family: OlfactoryFamily) => void;
}

export const FragranceCatalog: React.FC<FragranceCatalogProps> = ({
  fragrances,
  currency,
  onSelectFragrance,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
  onSelectDiscoverySet,
  selectedFamily: externalFamily,
  onSelectFamily
}) => {
  const [internalFamily, setInternalFamily] = useState<OlfactoryFamily>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const carouselRef = useRef<HTMLDivElement>(null);

  const selectedFamily = externalFamily !== undefined ? externalFamily : internalFamily;
  const handleSelectFamily = (family: OlfactoryFamily) => {
    if (onSelectFamily) {
      onSelectFamily(family);
    } else {
      setInternalFamily(family);
    }
  };

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'concentration'>('featured');

  const families: OlfactoryFamily[] = [
    'All',
    'Woody & Amber',
    'Floral Sublime',
    'Oriental & Spices',
    'Fresh Citrus & Aromatic',
    'Discovery Wardrobe'
  ];

  const filteredAndSortedFragrances = useMemo(() => {
    let result = fragrances.filter((f) => {
      if (selectedFamily === 'All') return true;
      return f.family === selectedFamily;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.prices[currency] - b.prices[currency]);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.prices[currency] - a.prices[currency]);
    } else if (sortBy === 'concentration') {
      result = [...result].sort((a, b) => (b.concentration === 'Extrait de Parfum' ? 1 : -1));
    }

    return result;
  }, [fragrances, selectedFamily, sortBy, currency]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="catalog-section" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Refined Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-sans uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Les Éléments d'Or</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#181716] font-light tracking-[0.06em]">
            The Flacon Collection
          </h2>
          <p className="text-sm sm:text-base text-[#6B665F] font-light leading-relaxed font-sans">
            Each flacon is individually numbered, hand-filled, and cold-macerated in France. 
            Bottled in custom heavy French crystal with brushed brass closures.
          </p>
        </motion.div>

        {/* Discovery Wardrobe Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: luxuryEase, delay: 0.1 }}
          className="mb-12 bg-gradient-to-r from-[#201E1C] via-[#2A2622] to-[#181716] text-[#FAF8F5] border border-[#3E3832] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A880] inline-block">
              ✦ Olfactory Initiation ✦
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
              Le Coffret Découverte — 5 × 10ml Sprays
            </h3>
            <p className="text-xs text-[#B5AFA6] max-w-xl font-sans leading-relaxed">
              Experience the 5 signature extracts in travel atomisers. Includes an enclosed privilege voucher 
              redeemable toward any full 100ml flacon within one year.
            </p>
          </div>
          <button
            id="banner-discovery-set-btn"
            onClick={onSelectDiscoverySet}
            className="px-6 py-3.5 bg-[#C5A880] hover:bg-[#D4BC98] text-[#181716] text-xs font-sans uppercase tracking-[0.22em] font-medium transition-luxury whitespace-nowrap shadow-sm cursor-pointer"
          >
            Explore Coffret
          </button>
        </motion.div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E8E4DC] mb-10">
          
          {/* Family Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {families.map((family) => {
              const isSelected = selectedFamily === family;
              return (
                <button
                  key={family}
                  id={`filter-family-${family.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => handleSelectFamily(family)}
                  className={`relative px-4 py-2 text-[11px] font-sans uppercase tracking-[0.18em] transition-luxury rounded-none cursor-pointer ${
                    isSelected
                      ? 'bg-[#181716] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#F2ECE3] text-[#5A544C] hover:bg-[#E7DFD4] hover:text-[#181716]'
                  }`}
                >
                  <span>{family}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 border border-[#C5A880] pointer-events-none"
                      transition={{ duration: 0.3, ease: luxuryEase }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls: View Switcher (Carousel/Grid) & Sort Selector */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* View Mode Switcher */}
            <div className="flex items-center border border-[#DDD6CC] bg-[#F2ECE3] p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#181716] text-[#FAF8F5]' : 'text-[#6A6359] hover:text-[#181716]'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 text-xs transition-colors cursor-pointer ${
                  viewMode === 'carousel' ? 'bg-[#181716] text-[#FAF8F5]' : 'text-[#6A6359] hover:text-[#181716]'
                }`}
                title="Carousel Gallery View"
                aria-label="Carousel Gallery View"
              >
                <Rows3 className="w-4 h-4" />
              </button>
            </div>

            {/* Carousel Navigation Buttons (visible when in carousel mode) */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="p-1.5 border border-[#DDD6CC] bg-[#F2ECE3] hover:bg-[#181716] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                  aria-label="Scroll Carousel Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="p-1.5 border border-[#DDD6CC] bg-[#F2ECE3] hover:bg-[#181716] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                  aria-label="Scroll Carousel Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8C8479]" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F2ECE3] text-[11px] font-sans uppercase tracking-[0.15em] text-[#4A453E] py-2 px-3 border border-[#DDD6CC] focus:outline-none focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
                aria-label="Sort Fragrances"
              >
                <option value="featured">Curated Selection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="concentration">Highest Concentration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Olfactory Family Editorial Write-Up Marquee (All, Woody & Amber, Floral Sublime, Oriental & Spices, Fresh Citrus & Aromatic, Discovery Wardrobe) */}
        <OlfactoryFamilyMarquee
          selectedFamily={selectedFamily}
          onSelectFamily={handleSelectFamily}
        />

        {/* Parallax Olfactory Stage: Images Swapping in Sync with Selected Write-Up */}
        <ParallaxOlfactoryShowcase
          selectedFamily={selectedFamily}
          onSelectFamily={handleSelectFamily}
          fragrances={fragrances}
          currency={currency}
          onSelectFragrance={onSelectFragrance}
          onQuickAdd={onQuickAdd}
        />

        {/* Section divider and catalog title */}
        <div className="flex items-center justify-between pb-6 pt-2 border-b border-[#E8E2D6] mb-8">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#9E7D52] block font-semibold">
              Curated Flacons &amp; Creations
            </span>
            <h3 className="font-serif text-2xl text-[#181716]">
              {selectedFamily === 'All' ? 'Complete Haute Parfumerie Anthology' : `${selectedFamily} Flacons`}
            </h3>
          </div>
          <span className="text-xs text-[#7A7368] font-sans">
            {filteredAndSortedFragrances.length} {filteredAndSortedFragrances.length === 1 ? 'Creation' : 'Creations'} Available
          </span>
        </div>

        {/* Fragrance List Display with Graceful Filtering Transitions */}
        {viewMode === 'grid' ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedFragrances.map((fragrance) => (
                <motion.div
                  key={fragrance.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.45, ease: luxuryEase }}
                >
                  <FragranceCard
                    fragrance={fragrance}
                    currency={currency}
                    onSelect={onSelectFragrance}
                    onQuickAdd={onQuickAdd}
                    isWishlisted={wishlist.includes(fragrance.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Horizontal Carousel / Slider with Momentum and Smooth Snap */
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedFragrances.map((fragrance) => (
                <motion.div
                  key={fragrance.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.45, ease: luxuryEase }}
                  className="w-[300px] sm:w-[340px] flex-shrink-0 snap-start"
                >
                  <FragranceCard
                    fragrance={fragrance}
                    currency={currency}
                    onSelect={onSelectFragrance}
                    onQuickAdd={onQuickAdd}
                    isWishlisted={wishlist.includes(fragrance.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
