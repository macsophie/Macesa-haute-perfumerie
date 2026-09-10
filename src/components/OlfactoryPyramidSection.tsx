import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, Currency } from '../types';
import { formatPrice, getFragrancePrice } from '../utils/formatters';
import { luxuryEase, infoCrossfade } from '../motion/motionSystem';

interface OlfactoryPyramidSectionProps {
  fragrances: Fragrance[];
  currency: Currency;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const OlfactoryPyramidSection: React.FC<OlfactoryPyramidSectionProps> = ({
  fragrances,
  currency,
  onSelectFragrance
}) => {
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base'>('heart');
  const [selectedAccord, setSelectedAccord] = useState<string>('Florentine Iris Butter');

  const rawMaterials = [
    {
      name: 'Florentine Iris Butter',
      tier: 'heart',
      origin: 'Tuscany, Italy',
      timeframe: 'Matured for 36 months underground',
      profile: 'Powdery, velvety, aristocratic violet root with cool silvery suede undertones.',
      featuredIn: 'santal-imperial'
    },
    {
      name: 'Rosa Centifolia Absolute',
      tier: 'heart',
      origin: 'Domaine MACESA, Grasse',
      timeframe: 'Hand-harvested at 5:00 AM in May',
      profile: 'Hundred-petaled honeyed rose with dewy morning freshness and spice.',
      featuredIn: 'rose-dispahan'
    },
    {
      name: 'Night-Blooming Jasmine',
      tier: 'heart',
      origin: 'Grasse, France',
      timeframe: 'Nocturnal harvest under moonrise',
      profile: 'Intoxicating indolic white floral with velvet tea and warm nectar accents.',
      featuredIn: 'nuit-celeste'
    },
    {
      name: 'Guatemalan Cardamom',
      tier: 'top',
      origin: 'Alta Verapaz',
      timeframe: 'Cold-pressed fresh pod distillation',
      profile: 'Crystalline green resinous spice with camphoric sparkle and eucalyptus breath.',
      featuredIn: 'santal-imperial'
    },
    {
      name: 'Amalfi Lemon & Guérande Salt',
      tier: 'top',
      origin: 'Amalfi & Brittany',
      timeframe: 'Solar ocean steam capture',
      profile: 'Crystalline salinity contrasting sun-bleached citrus peel and coastal breeze.',
      featuredIn: 'vetiver-mineral'
    },
    {
      name: 'Australian Sandalwood',
      tier: 'base',
      origin: 'Albany, Western Australia',
      timeframe: 'Heartwood distillation aged in oak',
      profile: 'Sacred milky cream woods with buttery resonance and meditative stillness.',
      featuredIn: 'santal-imperial'
    },
    {
      name: 'Bourbon Vanilla Bean',
      tier: 'base',
      origin: 'Madagascar',
      timeframe: 'Sun-cured dark orchid pods',
      profile: 'Smoky, charred, non-gourmand resinous orchid warmth with leathery depth.',
      featuredIn: 'nuit-celeste'
    },
    {
      name: 'Haitian Vetiver Roots',
      tier: 'base',
      origin: 'Les Cayes, Haiti',
      timeframe: 'Washed subterranean roots',
      profile: 'Earth-bound smoky root, nutty hazelnut facet with fresh damp grass elegance.',
      featuredIn: 'vetiver-mineral'
    },
    {
      name: 'Tuscan Suede Accord',
      tier: 'heart',
      origin: 'Florence, Italy',
      timeframe: 'Vegetable-tanned glove leather',
      profile: 'Tactile, buttery soft antique leather with sweet herbal dried thyme.',
      featuredIn: 'cuir-nomade'
    }
  ];

  const currentMaterial = rawMaterials.find((m) => m.name === selectedAccord) || rawMaterials[0];
  const linkedFragrance = fragrances.find((f) => f.id === currentMaterial.featuredIn);

  return (
    <section id="pyramid-section" className="py-16 sm:py-24 bg-[#F5F0E6] border-y border-[#E2DBD0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[#9E7D52] text-xs font-sans uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5" />
            <span>L'Art de la Composition</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#181716] font-light tracking-[0.06em]">
            The Olfactory Pyramid
          </h2>
          <p className="text-sm sm:text-base text-[#615A52] font-light leading-relaxed font-sans">
            A master fragrance evolves in temporal phases. Discover how raw botanicals unfold 
            from the first effervescent top note to the enduring, 24-hour base resonance.
          </p>
        </motion.div>

        {/* 3-Tier Visual Pyramid Buttons */}
        <div className="max-w-2xl mx-auto mb-12 space-y-2">
          {/* Top Tier */}
          <button
            id="pyramid-tier-top"
            onClick={() => setActiveTier('top')}
            className={`w-full py-3.5 px-6 transition-luxury text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-between border cursor-pointer ${
              activeTier === 'top'
                ? 'bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-md'
                : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
            }`}
          >
            <span className="font-medium">1. Notes de Tête — The Revelation</span>
            <span className="text-[10px] text-[#C5A880] tracking-wider">0 – 30 Minutes</span>
          </button>

          {/* Heart Tier */}
          <button
            id="pyramid-tier-heart"
            onClick={() => setActiveTier('heart')}
            className={`w-full py-4 px-8 transition-luxury text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-between border cursor-pointer ${
              activeTier === 'heart'
                ? 'bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-md'
                : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
            }`}
          >
            <span className="font-medium">2. Notes de Cœur — The Soul &amp; Identity</span>
            <span className="text-[10px] text-[#C5A880] tracking-wider">30 Min – 4 Hours</span>
          </button>

          {/* Base Tier */}
          <button
            id="pyramid-tier-base"
            onClick={() => setActiveTier('base')}
            className={`w-full py-5 px-10 transition-luxury text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-between border cursor-pointer ${
              activeTier === 'base'
                ? 'bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-md'
                : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
            }`}
          >
            <span className="font-medium">3. Notes de Fond — The Tenacity &amp; Sillage</span>
            <span className="text-[10px] text-[#C5A880] tracking-wider">4 – 24+ Hours</span>
          </button>
        </div>

        {/* Interactive Accord Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Botanical Material Selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="lg:col-span-6 bg-[#FAF8F5] border border-[#DDD5C7] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMaterial.name}
                  variants={infoCrossfade}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479] block mb-1">
                      Provenance &amp; Raw Material
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#181716]">
                      {currentMaterial.name}
                    </h3>
                    <span className="text-xs text-[#9E7D52] font-sans tracking-wider block mt-1">
                      Origin: {currentMaterial.origin} • {currentMaterial.timeframe}
                    </span>
                  </div>

                  <p className="text-sm text-[#544E47] font-light leading-relaxed font-sans border-l-2 border-[#C5A880] pl-4 py-1 min-h-[48px]">
                    "{currentMaterial.profile}"
                  </p>
                </motion.div>
              </AnimatePresence>

              <div>
                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479] block mb-3">
                  Select Botanical Essence
                </label>
                <div className="flex flex-wrap gap-2">
                  {rawMaterials.map((mat) => (
                    <button
                      key={mat.name}
                      onClick={() => {
                        setSelectedAccord(mat.name);
                        setActiveTier(mat.tier as any);
                      }}
                      className={`px-3 py-1.5 text-xs font-sans tracking-wider transition-luxury border cursor-pointer ${
                        selectedAccord === mat.name
                          ? 'bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-xs'
                          : 'bg-[#F2ECE3] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
                      }`}
                    >
                      {mat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8E2D6] text-xs font-sans text-[#756E63] flex items-center justify-between">
              <span>Extracted using traditional Grasse enfleurage &amp; molecular hydro-distillation.</span>
            </div>
          </motion.div>

          {/* Right Column: Featured Creation Linking */}
          {linkedFragrance && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: luxuryEase, delay: 0.15 }}
              className="lg:col-span-6 bg-[#201E1C] text-[#FAF8F5] border border-[#38332E] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-[#C5A880] text-[10px] font-sans uppercase tracking-[0.2em] mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>The Creation Celebrating This Note</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={linkedFragrance.id}
                    variants={infoCrossfade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col sm:flex-row gap-6 items-center"
                  >
                    <div 
                      className="w-32 aspect-[4/5] bg-[#161514] overflow-hidden cursor-pointer shrink-0 border border-[#3E3832] group"
                      onClick={() => onSelectFragrance(linkedFragrance)}
                    >
                      <img
                        src={linkedFragrance.heroImage}
                        alt={linkedFragrance.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        loading="lazy"
                      />
                    </div>

                    <div className="space-y-2 text-center sm:text-left">
                      <h4 
                        onClick={() => onSelectFragrance(linkedFragrance)}
                        className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] cursor-pointer hover:text-[#C5A880] transition-colors"
                      >
                        {linkedFragrance.name}
                      </h4>
                      <p className="text-xs text-[#9E978E] uppercase tracking-wider font-sans">
                        {linkedFragrance.concentration} • {linkedFragrance.family}
                      </p>
                      <p className="text-xs text-[#B5AFA6] line-clamp-3 font-sans leading-relaxed">
                        {linkedFragrance.shortDescription}
                      </p>
                      <div className="pt-2 font-serif text-xl text-[#C5A880]">
                        {formatPrice(getFragrancePrice(linkedFragrance, currency), currency)}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-6 mt-6 border-t border-[#312E2A] flex justify-end">
                <button
                  onClick={() => onSelectFragrance(linkedFragrance)}
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#D4BC98] text-[#181716] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-luxury flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Experience {linkedFragrance.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
