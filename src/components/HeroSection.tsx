import React, { useState } from 'react';
import { ArrowRight, Sparkles, Droplets, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, Currency, ActiveTab } from '../types';
import { FRAGRANCES } from '../data/fragrances';
import { formatPrice, getFragrancePrice } from '../utils/formatters';
import { luxuryEase, fadeInUp, bottleDissolve, infoCrossfade } from '../motion/motionSystem';
import { GsapCounter, useGsapCardTilt } from '../utils/gsapEffects';

interface HeroSectionProps {
  featuredFragrance: Fragrance;
  onSelectFragrance: (fragrance: Fragrance) => void;
  setActiveTab: (tab: ActiveTab) => void;
  currency: Currency;
  onQuickAdd: (fragrance: Fragrance) => void;
}

const HERO_SELECTOR_ITEMS = [
  { code: 'LUMIÈRE', id: 'santal-imperial', subtitle: 'Santal Impérial' },
  { code: 'NOIR', id: 'nuit-celeste', subtitle: 'Nuit Céleste' },
  { code: 'ÉCLAT', id: 'cuir-nomade', subtitle: 'Cuir Nomade' },
  { code: 'ROSÉ', id: 'rose-dispahan', subtitle: "Rose d'Ispahan" },
  { code: 'VERT', id: 'vetiver-mineral', subtitle: 'Vétiver Minéral' }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredFragrance,
  onSelectFragrance,
  setActiveTab,
  currency,
  onQuickAdd
}) => {
  const [activeFragranceId, setActiveFragranceId] = useState<string>(featuredFragrance.id || 'santal-imperial');
  const tiltCardRef = useGsapCardTilt();

  // Find currently selected fragrance or fallback
  const activeFragrance = FRAGRANCES.find((f) => f.id === activeFragranceId) || featuredFragrance;
  const currentPrice = getFragrancePrice(activeFragrance, currency);

  return (
    <section className="relative overflow-hidden bg-[#181716] text-[#FAF8F5]">
      {/* Background Ambience / Subtle Golden Radial Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5A880] via-[#2A2622] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Manifesto & Call to Action */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tagline / Eyebrow with gentle entrance */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: luxuryEase, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C2926] border border-[#45403B] text-[#C5A880] text-[11px] font-sans tracking-[0.25em] uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Parfumerie d'Auteur</span>
            </motion.div>

            {/* Editorial Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: luxuryEase, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.08em] leading-[1.12] text-[#F7F4EE]">
                The Architecture <br />
                <span className="italic font-serif font-normal text-[#C5A880]">of Scent.</span>
              </h1>
              <p className="text-[#B5AFA6] text-base sm:text-lg font-light leading-relaxed max-w-xl font-sans">
                Conceived in our Grasse atelier and slow-matured across 120 days of cold barrel maceration. 
                Pure extraits de parfum capturing the raw magnetism of earth, rare florals, and sacred resins.
              </p>
            </motion.div>

            {/* CTAs with tactile transitions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: luxuryEase, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                id="hero-explore-collection-btn"
                onClick={() => {
                  setActiveTab('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#C5A880] text-[#181716] text-xs uppercase tracking-[0.25em] font-sans font-medium hover:bg-[#D4BC98] transition-luxury flex items-center justify-center gap-3 shadow-lg group cursor-pointer"
              >
                <span>Explore The Flacons</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                id="hero-scent-finder-btn"
                onClick={() => {
                  setActiveTab('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-transparent text-[#FAF8F5] border border-[#524C44] text-xs uppercase tracking-[0.25em] font-sans hover:border-[#C5A880] hover:text-[#C5A880] transition-luxury flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find Your Scent</span>
              </button>
            </motion.div>

            {/* Three Craftsmanship Pillars with GSAP Precision Rollup */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: luxuryEase, delay: 0.48 }}
              className="pt-8 border-t border-[#312E2A] grid grid-cols-3 gap-4 text-[#A8A29A]"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#C5A880] text-xs font-serif italic mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>
                    <GsapCounter value={34} suffix="% Pure Extrait" />
                  </span>
                </div>
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#8A847B]">
                  Unmatched Longevity
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#C5A880] text-xs font-serif italic mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    <GsapCounter value={120} suffix="-Day Maceration" />
                  </span>
                </div>
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#8A847B]">
                  Cold Cask Matured
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#C5A880] text-xs font-serif italic mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>French Craftsmanship</span>
                </div>
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#8A847B]">
                  Grasse 1928 &amp; Paris
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Spotlight Flacon Card & Scent Selector with GSAP 3D perspective tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div 
              ref={tiltCardRef}
              className="relative bg-[#201E1C] border border-[#3A3530] p-6 sm:p-7 rounded-none transition-all duration-300 hover:border-[#C5A880]/60 shadow-2xl"
            >
              
              {/* Fragrance Selector Bar */}
              <div className="mb-5 pb-4 border-b border-[#34302C]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8C8479]">
                    Select Creation
                  </span>
                  <span className="text-[10px] font-serif italic text-[#C5A880]">
                    Dissolve to inspect
                  </span>
                </div>

                {/* Refined Luxury Fragrance Tabs */}
                <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
                  {HERO_SELECTOR_ITEMS.map((item) => {
                    const isSelected = activeFragranceId === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`hero-selector-${item.code.toLowerCase()}`}
                        onClick={() => setActiveFragranceId(item.id)}
                        className={`relative px-2.5 py-1.5 text-[11px] font-sans uppercase tracking-[0.16em] transition-luxury cursor-pointer text-center flex-1 ${
                          isSelected
                            ? 'text-[#FAF8F5] font-medium'
                            : 'text-[#8A837A] hover:text-[#D4BC98]'
                        }`}
                      >
                        <span>{item.code}</span>
                        {isSelected && (
                          <motion.div
                            layoutId="heroSelectorIndicator"
                            className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#C5A880]"
                            transition={{ duration: 0.35, ease: luxuryEase }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fragrance Imagery with Normalized Container & Fluid Dissolve Transition */}
              <div 
                className="relative aspect-[4/5] overflow-hidden bg-[#151413] cursor-pointer mb-5 border border-[#2D2925]"
                onClick={() => onSelectFragrance(activeFragrance)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFragrance.id}
                    variants={bottleDissolve}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeFragrance.heroImage}
                      alt={activeFragrance.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-104 brightness-95 contrast-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181716] via-transparent to-transparent opacity-60 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Badge */}
                <div className="absolute top-3 left-3 z-20 bg-[#181716]/90 border border-[#C5A880]/40 px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.2em] text-[#C5A880]">
                  Signature Flacon
                </div>

                {/* Floating Note Accords Pill */}
                <div className="absolute bottom-4 left-4 right-4 text-center z-20 pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFragrance.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: luxuryEase }}
                      className="inline-block bg-[#181716]/85 backdrop-blur-sm border border-[#3E3933] px-3 py-1.5 text-[11px] text-[#E8E4DC] font-sans tracking-wider"
                    >
                      {activeFragrance.accords.slice(0, 3).join(' • ')}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Title, Details & Notes with Graceful Crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFragrance.id}
                  variants={infoCrossfade}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 
                        onClick={() => onSelectFragrance(activeFragrance)}
                        className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] cursor-pointer hover:text-[#C5A880] transition-colors"
                      >
                        {activeFragrance.name}
                      </h3>
                      <p className="text-xs text-[#9E978E] uppercase tracking-[0.2em] font-sans mt-0.5">
                        {activeFragrance.concentration} • {activeFragrance.family}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xl sm:text-2xl text-[#C5A880]">
                        {formatPrice(currentPrice, currency)}
                      </span>
                      <span className="block text-[10px] text-[#8A847B] tracking-wider uppercase font-sans">
                        100ml / 3.4 oz
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#B5AFA6] line-clamp-2 leading-relaxed font-sans min-h-[36px]">
                    {activeFragrance.tagline}
                  </p>

                  {/* Quick Actions with Tactile Transitions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      id="hero-inspect-flacon-btn"
                      onClick={() => onSelectFragrance(activeFragrance)}
                      className="py-3 px-3 text-center border border-[#524C44] hover:border-[#C5A880] text-[#E8E4DC] hover:text-[#C5A880] text-[11px] font-sans uppercase tracking-[0.2em] transition-luxury cursor-pointer"
                    >
                      Inspect Notes
                    </button>
                    <button
                      id="hero-quick-add-btn"
                      onClick={() => onQuickAdd(activeFragrance)}
                      className="py-3 px-3 text-center bg-[#C5A880] hover:bg-[#D4BC98] text-[#181716] text-[11px] font-sans uppercase tracking-[0.2em] font-medium transition-luxury cursor-pointer"
                    >
                      Acquire Flacon
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
