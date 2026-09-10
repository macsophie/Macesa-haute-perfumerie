import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, Currency } from '../types';
import { formatPrice, getFragrancePrice } from '../utils/formatters';
import { luxuryEase, backdropVariants, modalVariants } from '../motion/motionSystem';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fragrances: Fragrance[];
  currency: Currency;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  fragrances,
  currency,
  onSelectFragrance
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    return fragrances.filter((f) => {
      const nameMatch = f.name.toLowerCase().includes(q);
      const familyMatch = f.family.toLowerCase().includes(q);
      const accordMatch = f.accords.some((a) => a.toLowerCase().includes(q));
      const topNoteMatch = f.notes.top.some((n) => n.name.toLowerCase().includes(q));
      const heartNoteMatch = f.notes.heart.some((n) => n.name.toLowerCase().includes(q));
      const baseNoteMatch = f.notes.base.some((n) => n.name.toLowerCase().includes(q));
      const descMatch = f.shortDescription.toLowerCase().includes(q);
      return nameMatch || familyMatch || accordMatch || topNoteMatch || heartNoteMatch || baseNoteMatch || descMatch;
    });
  }, [searchQuery, fragrances]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-[#141312]/85 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div 
            id="search-modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 bg-[#FAF8F5] max-w-2xl w-full border border-[#DDD5C7] shadow-2xl p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#181716] hover:text-[#C5A880] transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#181716] pb-3">
                <Search className="w-6 h-6 text-[#C5A880]" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by essence, accord, or perfumer..."
                  className="w-full bg-transparent text-lg font-serif text-[#181716] placeholder-[#9E978E] focus:outline-none"
                />
              </div>

              {/* Quick Suggestion Pills */}
              {!searchQuery && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479]">
                    Curated Olfactory Inquiries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Sandalwood', 'Centifolia Rose', 'Smoky Vanilla', 'Iris Butter', 'Oud & Leather'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 bg-[#F2EDE4] hover:bg-[#E7DFD2] text-[#4A443D] text-xs font-sans tracking-wide transition-luxury cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Results */}
              {searchQuery && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479]">
                    {searchResults.length} {searchResults.length === 1 ? 'Creation Found' : 'Creations Found'}
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="py-8 text-center text-[#8C8479] text-xs font-sans">
                      No olfactory creation corresponds to "{searchQuery}".
                    </div>
                  ) : (
                    <div className="divide-y divide-[#EAE4D8]">
                      {searchResults.map((fragrance) => (
                        <div
                          key={fragrance.id}
                          onClick={() => {
                            onSelectFragrance(fragrance);
                            onClose();
                          }}
                          className="py-3 flex items-center justify-between hover:bg-[#F4EFE6] px-2 transition-luxury cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={fragrance.heroImage}
                              alt={fragrance.name}
                              className="w-12 aspect-[4/5] object-cover bg-[#E8E2D6]"
                            />
                            <div>
                              <h4 className="font-serif text-base text-[#181716] group-hover:text-[#9E7D52] transition-colors">
                                {fragrance.name}
                              </h4>
                              <p className="text-[11px] text-[#8C8479] font-sans">
                                {fragrance.concentration} • {fragrance.family}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-serif text-sm text-[#181716]">
                              {formatPrice(getFragrancePrice(fragrance, currency), currency)}
                            </span>
                            <ArrowRight className="w-4 h-4 text-[#8C8479] group-hover:translate-x-1 group-hover:text-[#181716] transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
