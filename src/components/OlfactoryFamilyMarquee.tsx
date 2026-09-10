import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { OlfactoryFamily } from '../types';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { luxuryEase } from '../motion/motionSystem';

export interface FamilyWriteUpItem {
  family: OlfactoryFamily;
  title: string;
  frenchSubtitle: string;
  badge: string;
  writeUp: string;
  keyNotes: string;
}

export const OLFACTORY_FAMILY_WRITE_UPS: FamilyWriteUpItem[] = [
  {
    family: 'All',
    title: 'ALL CREATIONS',
    frenchSubtitle: 'Collection Complète',
    badge: 'ANTHOLOGY',
    writeUp: 'The Complete Haute Parfumerie Anthology — 24% to 34% pure extrait concentrations, slow barrel-macerated in French oak in Grasse.',
    keyNotes: 'Australian Sandalwood • Centifolia Rose • Smoked Vanilla • Orris Butter • Ambergris'
  },
  {
    family: 'Woody & Amber',
    title: 'WOODY & AMBER',
    frenchSubtitle: 'Boisé & Ambré',
    badge: 'ARCHITECTURAL',
    writeUp: 'Meditative Nobility & Depth — Smoked Atlas cedarwood, sacred Australian cream sandalwood, and rare Florentine orris butter resting on warm ambergris.',
    keyNotes: 'Smoked Cedar • Cream Sandalwood • Iris Pallida • Mineral Resins'
  },
  {
    family: 'Floral Sublime',
    title: 'FLORAL SUBLIME',
    frenchSubtitle: 'Fleurs Précieuses',
    badge: 'OPULENT BLOOMS',
    writeUp: 'Poetic Nocturnes in Bloom — Centifolia May rose absolute harvested at dawn in Grasse, midnight jasmine sambac, and saffron-infused violet leaves.',
    keyNotes: 'Centifolia Rose • Persian Saffron • Bulgarian Damask • Violet Leaves'
  },
  {
    family: 'Oriental & Spices',
    title: 'ORIENTAL & SPICES',
    frenchSubtitle: 'Orientaux Envoûtants',
    badge: 'ENIGMATIC WARMTH',
    writeUp: 'Sensual Balsams & Smolder — Two-year aged Madagascar Bourbon vanilla, golden cardamom coeur, and intoxicating roasted Tonka bean balsams.',
    keyNotes: 'Dark Tonka • Bourbon Vanilla • Frankincense Smoke • Cardamom Coeur'
  },
  {
    family: 'Fresh Citrus & Aromatic',
    title: 'FRESH CITRUS & AROMATIC',
    frenchSubtitle: 'Hespéridés Solaires',
    badge: 'SOLAR VITALITY',
    writeUp: 'Solar Mediterranean Radiance — Cold-pressed Calabrian bergamot, crystalline Atlantic sea salt mist, and earthy Haitian mountain vetiver roots.',
    keyNotes: 'Reggio Bergamot • Atlantic Sea Minerals • Mountain Vetiver • Clary Sage'
  },
  {
    family: 'Discovery Wardrobe',
    title: 'DISCOVERY WARDROBE',
    frenchSubtitle: 'Coffret d\'Initiation',
    badge: '5 × 10ML FLIGHT',
    writeUp: 'Sensory Initiation & Exploration — Curated flight of five 10ml travel sprays in an archival presentation coffret with full-flacon privilege voucher.',
    keyNotes: '5 × 10ml Travel Sprays • Archival Coffret • Privilege Voucher Enclosed'
  }
];

interface OlfactoryFamilyMarqueeProps {
  selectedFamily: OlfactoryFamily;
  onSelectFamily: (family: OlfactoryFamily) => void;
  className?: string;
}

export const OlfactoryFamilyMarquee: React.FC<OlfactoryFamilyMarqueeProps> = ({
  selectedFamily,
  onSelectFamily,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Active family writeup item
  const currentWriteUp = OLFACTORY_FAMILY_WRITE_UPS.find((f) => f.family === selectedFamily) || OLFACTORY_FAMILY_WRITE_UPS[0];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respect reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    gsap.set(track, { xPercent: 0 });

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 55, // Slow, regal, legible panning
      ease: 'none',
      repeat: -1
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.8, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.in' });
    }
  };

  const renderTickerList = (ariaHidden: boolean = false) => (
    <div className="flex items-center shrink-0 space-x-8 sm:space-x-12 pr-8 sm:pr-12" aria-hidden={ariaHidden}>
      {OLFACTORY_FAMILY_WRITE_UPS.map((item) => {
        const isSelected = selectedFamily === item.family;
        return (
          <button
            key={item.family}
            type="button"
            onClick={() => onSelectFamily(item.family)}
            className={`group inline-flex items-center gap-3.5 py-1.5 px-3.5 border transition-all duration-300 select-none text-left cursor-pointer ${
              isSelected
                ? 'bg-[#262320] border-[#C5A880] shadow-sm'
                : 'bg-[#1C1A18]/90 border-[#38332E] hover:border-[#C5A880]/60 hover:bg-[#221F1C]'
            }`}
            title={`Select ${item.title}`}
          >
            {/* Category Badge */}
            <span
              className={`text-[9.5px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-[#C5A880] text-[#181716] font-semibold'
                  : 'bg-[#2A2622] text-[#C5A880] border border-[#484139] group-hover:border-[#C5A880]/80'
              }`}
            >
              {item.badge}
            </span>

            {/* Category Title */}
            <span
              className={`text-xs tracking-[0.24em] uppercase font-sans whitespace-nowrap font-medium transition-colors ${
                isSelected ? 'text-[#FAF8F5] font-semibold' : 'text-[#E0DAD0] group-hover:text-[#FAF8F5]'
              }`}
            >
              {item.title}
            </span>

            {/* Poetic Write-Up */}
            <span className="text-xs font-serif italic text-[#B5AFA6] tracking-wide whitespace-nowrap opacity-90 max-w-sm sm:max-w-md md:max-w-lg truncate">
              — {item.writeUp}
            </span>

            {/* Active Indicator or Star */}
            {isSelected ? (
              <span className="text-[10px] text-[#C5A880] tracking-wider uppercase font-sans flex items-center gap-1 font-semibold pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                Active
              </span>
            ) : (
              <span className="text-xs text-[#C5A880]/60 pl-1">✦</span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={`space-y-3 mb-10 ${className}`}>
      {/* Continuous Marquee Ticker */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden py-3 bg-[#181716] border-y border-[#38332E] shadow-inner select-none"
        role="region"
        aria-label="Olfactory Families Marquee"
      >
        {/* Soft edge gradients for seamless infinite scroll aesthetic */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#181716] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#181716] to-transparent pointer-events-none z-10" />

        {/* GSAP Scrolling Track */}
        <div ref={trackRef} className="flex whitespace-nowrap w-fit will-change-transform">
          {renderTickerList(false)}
          {renderTickerList(true)}
        </div>
      </div>

      {/* Selected Family Spotlight Editorial Narrative (Graceful fade transition) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWriteUp.family}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: luxuryEase }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 bg-[#F2ECE3] border border-[#DDD5C7] text-xs font-sans text-[#4A453E]"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8B6B3F] bg-[#EAE2D5] px-2 py-0.5 border border-[#D5CABB]">
              {currentWriteUp.frenchSubtitle}
            </span>
            <p className="text-xs text-[#2A2622] font-serif italic">
              {currentWriteUp.writeUp}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#7A7368] whitespace-nowrap">
            <span className="text-[#8B6B3F] font-medium uppercase tracking-wider text-[10px]">Harmonies:</span>
            <span className="font-light">{currentWriteUp.keyNotes}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
