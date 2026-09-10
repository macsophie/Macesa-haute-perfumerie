import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { BoutiqueLocation } from '../types';
import { luxuryEase } from '../motion/motionSystem';

interface BoutiquesSectionProps {
  boutiques: BoutiqueLocation[];
  openBespoke: (city?: string) => void;
}

export const BoutiquesSection: React.FC<BoutiquesSectionProps> = ({ boutiques, openBespoke }) => {
  return (
    <section id="boutiques-section" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E8E2D6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[#9E7D52] text-xs font-sans uppercase tracking-[0.25em]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Salons &amp; Flagships</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#181716] font-light tracking-[0.06em]">
            Our Global Ateliers
          </h2>
          <p className="text-sm sm:text-base text-[#615A52] font-light leading-relaxed font-sans">
            Step into our sanctuary boutiques for a private olfactory immersion, flacon personalization, 
            and archival fragrance explorations with our resident scent sommeliers.
          </p>
        </motion.div>

        {/* Boutiques Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boutiques.map((b, i) => (
            <motion.div 
              key={b.name || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: luxuryEase, delay: i * 0.1 }}
              className="bg-[#FFFFFF] border border-[#DDD5C7] hover:border-[#C5A880] transition-luxury flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md group"
            >
              <div className="relative aspect-[16/10] bg-[#ECE5DA] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />
                {b.isFlagship && (
                  <span className="absolute top-3 left-3 bg-[#181716] text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] font-sans px-2.5 py-1 shadow-xs">
                    Maison Flagship
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#9E7D52]">
                    {b.city}, {b.country}
                  </div>
                  <h3 className="font-serif text-2xl text-[#181716] group-hover:text-[#9E7D52] transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-xs text-[#6B6358] font-sans leading-relaxed">
                    {b.address}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#EDE7DC] text-xs font-sans text-[#544E47]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#8C8479]" />
                    <span>{b.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#8C8479]" />
                    <span>{b.phone}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openBespoke(b.city)}
                    className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#181716] text-[#181716] hover:text-[#FAF8F5] border border-[#DDD5C7] hover:border-[#181716] text-[11px] font-sans uppercase tracking-[0.18em] transition-luxury cursor-pointer active:scale-98"
                  >
                    Reserve In-Salon Tasting
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
