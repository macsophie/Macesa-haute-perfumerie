import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, Droplets, ShieldCheck, ChevronLeft, ChevronRight, Eye, Plus, Compass } from 'lucide-react';
import { Fragrance, OlfactoryFamily, Currency } from '../types';
import { formatPrice, getFragrancePrice } from '../utils/formatters';
import { luxuryEase } from '../motion/motionSystem';
import gsap from 'gsap';

export interface ParallaxFamilyItem {
  family: OlfactoryFamily;
  title: string;
  frenchTitle: string;
  badge: string;
  writeUp: string;
  philosophicalNote: string;
  primaryImage: string;
  primaryLabel: string;
  secondaryImage: string;
  secondaryLabel: string;
  featuredFragranceId: string;
  featuredFragranceName: string;
  accords: string[];
  concentration: string;
  maceration: string;
  origin: string;
}

export const PARALLAX_FAMILY_DATA: ParallaxFamilyItem[] = [
  {
    family: 'All',
    title: 'ALL CREATIONS',
    frenchTitle: 'L\'Anthologie des Essences',
    badge: 'FULL ANTHOLOGY',
    writeUp: 'The Complete Haute Parfumerie Anthology — 24% to 34% pure extrait concentrations, slow barrel-macerated in French oak in Grasse.',
    philosophicalNote: 'Every formulation honors the purest French botanical traditions, marrying hand-harvested florals, aged balsamic resins, and rare woods with organic French beetroot spirit.',
    primaryImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    primaryLabel: 'Signature Flacon Portrait',
    secondaryImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    secondaryLabel: 'French Oak Cask Atelier',
    featuredFragranceId: 'santal-imperial',
    featuredFragranceName: 'Santal Impérial',
    accords: ['Cream Sandalwood', 'Orris Butter', 'Rose de Mai', 'Tonka Bean', 'Haitian Vetiver'],
    concentration: '24% — 34% Pure Parfum',
    maceration: '75 to 140 Days in Oak',
    origin: 'Grasse & Paris, France'
  },
  {
    family: 'Woody & Amber',
    title: 'WOODY & AMBER',
    frenchTitle: 'Boisé & Ambré',
    badge: 'ARCHITECTURAL NOBILITY',
    writeUp: 'Meditative Nobility & Depth — Smoked Atlas cedarwood, sacred Australian cream sandalwood, and rare Florentine orris butter resting on warm ambergris.',
    philosophicalNote: 'Evoking the stillness of historic French libraries and sun-warmed cedar paneling, this accord balances dry smoked timbers with the soft, powdered velvet of three-year cured iris pallida roots.',
    primaryImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    primaryLabel: 'Santal Impérial Flacon',
    secondaryImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    secondaryLabel: 'Tuscan Leather & Cedar Embers',
    featuredFragranceId: 'santal-imperial',
    featuredFragranceName: 'Santal Impérial',
    accords: ['Smoked Sandalwood', 'Florentine Iris', 'Atlas Cedar', 'Tuscan Leather', 'Ambergris'],
    concentration: '32% Pure Parfum',
    maceration: '120 Days Cold Matured',
    origin: 'Western Australia & Florence'
  },
  {
    family: 'Floral Sublime',
    title: 'FLORAL SUBLIME',
    frenchTitle: 'Fleurs Précieuses',
    badge: 'GRASSE DAWN HARVEST',
    writeUp: 'Poetic Nocturnes in Bloom — Centifolia May rose absolute harvested at dawn in Grasse, midnight jasmine sambac, and saffron-infused violet leaves.',
    philosophicalNote: 'Distilled during the ephemeral dawn hours when the roses release their most honeyed volatile essence, creating a luminous, velvety floral encounter draped in precious saffron threads.',
    primaryImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85',
    primaryLabel: 'Rose d\'Ispahan Flacon',
    secondaryImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
    secondaryLabel: 'Orange Blossom Groves',
    featuredFragranceId: 'rose-dispahan',
    featuredFragranceName: 'Rose d\'Ispahan',
    accords: ['Centifolia Rose', 'Persian Saffron', 'Neroli Tunisien', 'Honey Nectar', 'Oud Assafi'],
    concentration: '26% Eau de Parfum',
    maceration: '90 Days Botanical Rest',
    origin: 'Domaine MACESA, Grasse'
  },
  {
    family: 'Oriental & Spices',
    title: 'ORIENTAL & SPICES',
    frenchTitle: 'Orientaux Envoûtants',
    badge: 'MIDNIGHT ALCHEMY',
    writeUp: 'Sensual Balsams & Smolder — Two-year aged Madagascar Bourbon vanilla, golden cardamom coeur, and intoxicating roasted Tonka bean balsams.',
    philosophicalNote: 'Nocturnal flowers and warm exotic resins unfurl under a midnight sky. Charred vanilla bean pods and benzoin tears create an intoxicating trail that clings intimately to the skin.',
    primaryImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=85',
    primaryLabel: 'Nuit Céleste Extrait',
    secondaryImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
    secondaryLabel: 'Roasted Tonka & Vanilla Pods',
    featuredFragranceId: 'nuit-celeste',
    featuredFragranceName: 'Nuit Céleste',
    accords: ['Night Jasmine', 'Smoked Tonka', 'Bourbon Vanilla', 'Malabar Pepper', 'Siam Benzoin'],
    concentration: '34% Pure Extrait',
    maceration: '140 Days Matured',
    origin: 'Grasse & Madagascar'
  },
  {
    family: 'Fresh Citrus & Aromatic',
    title: 'FRESH CITRUS & AROMATIC',
    frenchTitle: 'Hespéridés Solaires',
    badge: 'RIVIERA MINERALS',
    writeUp: 'Solar Mediterranean Radiance — Cold-pressed Calabrian bergamot, crystalline Atlantic sea salt mist, and earthy Haitian mountain vetiver roots.',
    philosophicalNote: 'Inspired by the high limestone cliffs of the Côte d\'Azur where sea air meets ancient pine forests. Sharp, uplifting, and stripped of unnecessary weight to reveal pure botanical energy.',
    primaryImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
    primaryLabel: 'Vétiver Minéral Flacon',
    secondaryImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85',
    secondaryLabel: 'Mediterranean Salt Cliffs',
    featuredFragranceId: 'vetiver-mineral',
    featuredFragranceName: 'Vétiver Minéral',
    accords: ['Haitian Vetiver', 'Guérande Sea Salt', 'Amalfi Lemon', 'Clary Sage', 'Driftwood'],
    concentration: '24% Eau de Parfum',
    maceration: '75 Days Rest',
    origin: 'Calabria & Les Cayes, Haiti'
  },
  {
    family: 'Discovery Wardrobe',
    title: 'DISCOVERY WARDROBE',
    frenchTitle: 'Coffret d\'Initiation',
    badge: '5 × 10ML FLIGHT',
    writeUp: 'Sensory Initiation & Exploration — Curated flight of five 10ml travel sprays in an archival presentation coffret with full-flacon privilege voucher.',
    philosophicalNote: 'The definitive introduction to the House of MACESA. Explore our signature woody, floral, oriental, and aromatic compositions with an included credit toward your chosen full flacon.',
    primaryImage: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85',
    primaryLabel: 'Le Coffret Découverte Box',
    secondaryImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    secondaryLabel: '5 Deluxe Travel Atomisers',
    featuredFragranceId: 'coffret-decouverte',
    featuredFragranceName: 'Le Coffret Découverte',
    accords: ['5 Miniature Sprays', 'Complete Spectrum', '€60 Voucher Enclosed'],
    concentration: 'Multi-Concentration Flight',
    maceration: 'Individually Matured',
    origin: 'Archival Presentation, Paris'
  }
];

interface ParallaxOlfactoryShowcaseProps {
  selectedFamily: OlfactoryFamily;
  onSelectFamily: (family: OlfactoryFamily) => void;
  fragrances: Fragrance[];
  currency: Currency;
  onSelectFragrance: (fragrance: Fragrance) => void;
  onQuickAdd: (fragrance: Fragrance) => void;
  className?: string;
}

export const ParallaxOlfactoryShowcase: React.FC<ParallaxOlfactoryShowcaseProps> = ({
  selectedFamily,
  onSelectFamily,
  fragrances,
  currency,
  onSelectFragrance,
  onQuickAdd,
  className = ''
}) => {
  const [imagePerspective, setImagePerspective] = useState<'primary' | 'secondary'>('primary');
  
  // Section container reference for scroll parallax
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageCardRef = useRef<HTMLDivElement | null>(null);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const flaconParallaxY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const badgeParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Current active data item based on selectedFamily
  const activeIndex = PARALLAX_FAMILY_DATA.findIndex((d) => d.family === selectedFamily);
  const activeData = activeIndex !== -1 ? PARALLAX_FAMILY_DATA[activeIndex] : PARALLAX_FAMILY_DATA[0];

  // Match corresponding fragrance object
  const activeFragrance = fragrances.find((f) => f.id === activeData.featuredFragranceId) || fragrances[0];
  const activePrice = activeFragrance ? getFragrancePrice(activeFragrance, currency) : 295;

  // Handle next / prev cycling
  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PARALLAX_FAMILY_DATA.length;
    onSelectFamily(PARALLAX_FAMILY_DATA[nextIdx].family);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + PARALLAX_FAMILY_DATA.length) % PARALLAX_FAMILY_DATA.length;
    onSelectFamily(PARALLAX_FAMILY_DATA[prevIdx].family);
  };

  // Mouse-tracking 3D Parallax Tilt for flacon frame
  useEffect(() => {
    const stage = stageCardRef.current;
    if (!stage) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const quickRotateX = gsap.quickTo(stage, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const quickRotateY = gsap.quickTo(stage, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const quickTranslateX = gsap.quickTo(stage, 'x', { duration: 0.5, ease: 'power2.out' });
    const quickTranslateY = gsap.quickTo(stage, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle, aristocratic tilt angle (max 5 degrees)
      const rotY = ((x - centerX) / centerX) * 5;
      const rotX = -((y - centerY) / centerY) * 5;

      // Opposite parallax translation shift
      const transX = ((x - centerX) / centerX) * -8;
      const transY = ((y - centerY) / centerY) * -8;

      quickRotateX(rotX);
      quickRotateY(rotY);
      quickTranslateX(transX);
      quickTranslateY(transY);
    };

    const handleMouseLeave = () => {
      quickRotateX(0);
      quickRotateY(0);
      quickTranslateX(0);
      quickTranslateY(0);
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(stage);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden bg-[#181716] border border-[#332E29] mb-12 shadow-2xl ${className}`}
      id="parallax-olfactory-showcase"
    >
      {/* Background Ambient Terroir Texture with Scroll Parallax */}
      <motion.div
        style={{ y: bgParallaxY }}
        className="absolute -inset-10 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A880]/30 via-[#1C1A17] to-[#121110] will-change-transform"
      />

      {/* Top Header Bar with Family Tabs */}
      <div className="relative z-10 border-b border-[#2C2723] px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-[#141312]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#C5A880] font-semibold">
            Parallax Olfactory Stage
          </span>
          <span className="text-xs text-[#524B43]">/</span>
          <span className="text-xs font-serif italic text-[#D8D2C6]">
            {activeData.frenchTitle}
          </span>
        </div>

        {/* Family Pill Tabs for Direct Selection */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {PARALLAX_FAMILY_DATA.map((item) => {
            const isSelected = item.family === selectedFamily;
            return (
              <button
                key={item.family}
                type="button"
                onClick={() => onSelectFamily(item.family)}
                className={`text-[10px] font-sans uppercase tracking-[0.16em] px-2.5 py-1 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#C5A880] text-[#181716] font-semibold shadow-xs'
                    : 'bg-[#221F1C] text-[#A69F93] hover:text-[#FAF8F5] hover:bg-[#2B2723] border border-[#332E29]'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Write-up & Editorial Narrative (Left) + Parallax Image Stage (Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 items-center">
        
        {/* LEFT COLUMN: The Swappable Write-Up */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.family}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: luxuryEase }}
              className="space-y-6"
            >
              {/* Category Meta & Badge */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.22em] uppercase font-sans px-2.5 py-1 bg-[#2E2924] text-[#C5A880] border border-[#4D453C] font-medium">
                  {activeData.badge}
                </span>
                <span className="text-xs text-[#8C8479] font-sans tracking-[0.16em] uppercase">
                  {activeData.origin}
                </span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-tight leading-tight">
                  {activeData.title}
                </h2>
                <div className="text-sm font-serif italic text-[#C5A880]">
                  {activeData.frenchTitle}
                </div>
              </div>

              {/* Primary Marquee Write-Up Paragraph */}
              <div className="p-4 bg-[#201D1A] border-l-2 border-[#C5A880] text-[#E8E2D6] font-serif text-base sm:text-lg leading-relaxed shadow-xs">
                &ldquo;{activeData.writeUp}&rdquo;
              </div>

              {/* Philosophical Expansion */}
              <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed font-sans">
                {activeData.philosophicalNote}
              </p>

              {/* Olfactory Accords Ribbon */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C8479] block">
                  Harmonies &amp; Botanical Accords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeData.accords.map((accord, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-sans text-[#D8D2C6] bg-[#2A2622] px-2.5 py-1 border border-[#3E3832]"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Metrics (Extrait Concentration & Aging) */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#2C2723]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#8C8479] block">
                    Concentration
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#EAE4D8] font-medium font-serif">
                    <Droplets className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{activeData.concentration}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#8C8479] block">
                    Maceration Period
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#EAE4D8] font-medium font-serif">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{activeData.maceration}</span>
                  </div>
                </div>
              </div>

              {/* Call to Actions for Featured Fragrance */}
              {activeFragrance && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectFragrance(activeFragrance)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#C5A880] hover:bg-[#D4BC96] text-[#181716] text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Inspect {activeFragrance.name}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(activeFragrance)}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-[#24211E] hover:bg-[#322E2A] text-[#FAF8F5] hover:text-[#C5A880] border border-[#3E3832] text-xs font-sans uppercase tracking-[0.18em] transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Bag ({formatPrice(activePrice, currency)})</span>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: The Parallax Image Stage with Swapping Motion */}
        <div className="lg:col-span-6">
          <div className="relative perspective-[1200px]">
            
            {/* 3D Tilted Glass Frame */}
            <motion.div
              ref={stageCardRef}
              style={{ y: flaconParallaxY }}
              className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full max-w-lg mx-auto bg-[#1C1A17] border border-[#3D3730] overflow-hidden shadow-2xl group transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Image Swapper Container with Parallax Exit and Entrance */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeData.family}-${imagePerspective}`}
                  initial={{ opacity: 0, scale: 0.94, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: -20 }}
                  transition={{ duration: 0.65, ease: luxuryEase }}
                  className="w-full h-full relative cursor-pointer"
                  onClick={() => activeFragrance && onSelectFragrance(activeFragrance)}
                >
                  <img
                    src={imagePerspective === 'primary' ? activeData.primaryImage : activeData.secondaryImage}
                    alt={activeData.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
                    loading="lazy"
                  />

                  {/* Gradient Light Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-black/20 pointer-events-none" />

                  {/* Floating Top Indicator Tag */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="bg-[#181716]/90 backdrop-blur-sm text-[#C5A880] text-[9.5px] font-sans uppercase tracking-[0.2em] px-3 py-1 border border-[#3A342E]">
                      {imagePerspective === 'primary' ? activeData.primaryLabel : activeData.secondaryLabel}
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-4 inset-x-4 z-20 p-3 bg-[#181716]/85 backdrop-blur-md border border-[#332D27] flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#C5A880]">
                        Featured Flacon
                      </div>
                      <div className="font-serif text-sm text-[#FAF8F5]">
                        {activeData.featuredFragranceName}
                      </div>
                    </div>

                    <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[#A69F93] group-hover:text-[#C5A880] transition-colors flex items-center gap-1">
                      Inspect
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Perspective View Toggle Pill (Studio vs. Terroir) */}
              <div className="absolute top-4 right-4 z-30 flex items-center bg-[#181716]/90 backdrop-blur-md border border-[#3A352F] p-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePerspective('primary');
                  }}
                  className={`text-[9px] font-sans uppercase tracking-[0.16em] px-2.5 py-1 transition-all cursor-pointer ${
                    imagePerspective === 'primary'
                      ? 'bg-[#C5A880] text-[#181716] font-semibold'
                      : 'text-[#A69F93] hover:text-[#FAF8F5]'
                  }`}
                >
                  Flacon
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePerspective('secondary');
                  }}
                  className={`text-[9px] font-sans uppercase tracking-[0.16em] px-2.5 py-1 transition-all cursor-pointer ${
                    imagePerspective === 'secondary'
                      ? 'bg-[#C5A880] text-[#181716] font-semibold'
                      : 'text-[#A69F93] hover:text-[#FAF8F5]'
                  }`}
                >
                  Atelier
                </button>
              </div>

              {/* Prev / Next Cycling Arrows on the Image Stage */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-[#181716]/80 hover:bg-[#181716] text-[#FAF8F5] hover:text-[#C5A880] border border-[#38332D] backdrop-blur-xs transition-all duration-200 active:scale-90 shadow-md cursor-pointer"
                aria-label="Previous Olfactory Family"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-[#181716]/80 hover:bg-[#181716] text-[#FAF8F5] hover:text-[#C5A880] border border-[#38332D] backdrop-blur-xs transition-all duration-200 active:scale-90 shadow-md cursor-pointer"
                aria-label="Next Olfactory Family"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Floating High-Parallax Accent Badge */}
            <motion.div
              style={{ y: badgeParallaxY }}
              className="hidden sm:flex absolute -bottom-5 -left-5 z-30 bg-[#24211D] border border-[#483F35] p-3 shadow-xl items-center gap-3 pointer-events-none"
            >
              <div className="w-8 h-8 rounded-none bg-[#C5A880] text-[#181716] flex items-center justify-center font-serif text-sm font-bold">
                M
              </div>
              <div className="text-[10px] font-sans uppercase tracking-[0.16em]">
                <span className="text-[#C5A880] block font-semibold">Haute Parfumerie</span>
                <span className="text-[#9C9488]">Grasse 1928 • Paris</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};
