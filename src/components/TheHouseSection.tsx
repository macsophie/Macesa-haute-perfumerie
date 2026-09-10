import React from 'react';
import { BookOpen, Award, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { luxuryEase, imageReveal, fadeInUp } from '../motion/motionSystem';
import { GsapCounter } from '../utils/gsapEffects';

interface TheHouseSectionProps {
  openBespoke: () => void;
}

export const TheHouseSection: React.FC<TheHouseSectionProps> = ({ openBespoke }) => {
  return (
    <section id="the-house-section" className="py-20 sm:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Top Editorial Story with Editorial Split Layout Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: luxuryEase }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-[#9E7D52] text-xs font-sans uppercase tracking-[0.25em]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Domaine &amp; Héritage</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#181716] font-light tracking-[0.06em] leading-[1.18]">
              Born in Grasse. <br />
              <span className="italic font-serif font-normal text-[#9E7D52]">Perfected in Paris.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#544E47] font-light leading-relaxed font-sans">
              Founded on the belief that fine perfumery is an architectural art form, MACESA crafts 
              extraits de parfum free from transient marketing trends. Our botanicals are nurtured 
              in our historic Grasse domain, where dawn harvests yield the world's most evocative roses, 
              jasmines, and orange blossoms.
            </p>

            <p className="text-sm sm:text-base text-[#544E47] font-light leading-relaxed font-sans">
              We decline synthetic short-cuts. Every MACESA creation rests in temperature-regulated 
              dark stone cellars for a minimum of 90 to 140 days, allowing the oils, resins, and organic 
              French beetroot spirit to meld into seamless, velvet harmonies.
            </p>

            <div className="pt-2">
              <button
                id="the-house-book-bespoke-btn"
                onClick={openBespoke}
                className="px-7 py-4 bg-[#181716] hover:bg-[#C5A880] hover:text-[#181716] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.22em] font-medium transition-luxury cursor-pointer shadow-xs active:scale-98"
              >
                Schedule Private Consultation
              </button>
            </div>
          </motion.div>

          {/* Editorial Double Imagery with Temporal Offset & Gentle Scale Reveal */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 1.04, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: luxuryEase, delay: 0.15 }}
              className="aspect-[4/5] bg-[#EBE4D8] overflow-hidden shadow-md group border border-[#DDD5C7]"
            >
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
                alt="Grasse Perfumery Atelier"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 1.04, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 24 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: luxuryEase, delay: 0.28 }}
              className="aspect-[4/5] bg-[#EBE4D8] overflow-hidden shadow-md group border border-[#DDD5C7]"
            >
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
                alt="Crystal Flacon Maceration"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
            </motion.div>
          </div>

        </div>

        {/* Four Craftsmanship Tenets with Staggered Viewport Entrance */}
        <div className="pt-12 border-t border-[#E8E2D6] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: luxuryEase, delay: 0.05 }}
            className="space-y-3 p-6 bg-[#F4EFE6] border border-[#DDD5C7] hover:border-[#C5A880]/70 transition-luxury"
          >
            <div className="w-10 h-10 bg-[#181716] text-[#C5A880] flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#9E7D52] block">
              <GsapCounter value={120} suffix=" Days Aging" />
            </span>
            <h3 className="font-serif text-xl text-[#181716]">
              Cold Barrel Maceration
            </h3>
            <p className="text-xs text-[#6B6358] font-sans leading-relaxed">
              Never subjected to flash heat or chemical accelerators. Oils age naturally in stainless steel 
              and French oak casks to deepen harmonic facets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: luxuryEase, delay: 0.15 }}
            className="space-y-3 p-6 bg-[#F4EFE6] border border-[#DDD5C7] hover:border-[#C5A880]/70 transition-luxury"
          >
            <div className="w-10 h-10 bg-[#181716] text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#9E7D52] block">
              <GsapCounter value={34} suffix="% Pure Extrait" />
            </span>
            <h3 className="font-serif text-xl text-[#181716]">
              Ultra-High Concentrations
            </h3>
            <p className="text-xs text-[#6B6358] font-sans leading-relaxed">
              Bottled between 24% and 34% pure perfume concentration, granting unparalleled sillage 
              and 14+ hour tenacity on skin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: luxuryEase, delay: 0.25 }}
            className="space-y-3 p-6 bg-[#F4EFE6] border border-[#DDD5C7] hover:border-[#C5A880]/70 transition-luxury"
          >
            <div className="w-10 h-10 bg-[#181716] text-[#C5A880] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#9E7D52] block">
              <GsapCounter value={100} suffix="% Agricultural Origin" />
            </span>
            <h3 className="font-serif text-xl text-[#181716]">
              Organic French Beetroot Spirit
            </h3>
            <p className="text-xs text-[#6B6358] font-sans leading-relaxed">
              100% natural, agricultural alcohol distilled from French sugar beets. Odorless carrier that allows 
              raw precious florals to breathe unhindered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: luxuryEase, delay: 0.35 }}
            className="space-y-3 p-6 bg-[#F4EFE6] border border-[#DDD5C7] hover:border-[#C5A880]/70 transition-luxury"
          >
            <div className="w-10 h-10 bg-[#181716] text-[#C5A880] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#9E7D52] block">
              Founded <GsapCounter value={1928} />
            </span>
            <h3 className="font-serif text-xl text-[#181716]">
              Hand-Poured Crystal Flacons
            </h3>
            <p className="text-xs text-[#6B6358] font-sans leading-relaxed">
              Custom thick-walled European crystal bottles fitted with magnetic weighted brass caps and 
              bespoke personalized diamond engraving.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
