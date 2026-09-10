import React, { useState } from 'react';
import { X, Sparkles, Droplets, Clock, Compass, ShieldCheck, Gift, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, Currency } from '../types';
import { formatPrice, getFragrancePrice } from '../utils/formatters';
import { luxuryEase, backdropVariants, modalVariants, infoCrossfade } from '../motion/motionSystem';

interface ProductDetailModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  currency: Currency;
  onAddToCart: (fragrance: Fragrance, sizeMl: number, price: number, engravingText?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  fragrance,
  onClose,
  currency,
  onAddToCart
}) => {
  if (!fragrance) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(
    fragrance.sizes.length > 1 ? 1 : 0
  );
  const [activeNoteTab, setActiveNoteTab] = useState<'top' | 'heart' | 'base'>('top');
  const [activeImage, setActiveImage] = useState<string>(fragrance.heroImage);
  const [engravingEnabled, setEngravingEnabled] = useState<boolean>(false);
  const [engravingText, setEngravingText] = useState<string>('');
  const [engravingFont, setEngravingFont] = useState<'serif' | 'italic'>('serif');
  const [giftBoxSelected, setGiftBoxSelected] = useState<boolean>(true);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const currentSize = fragrance.sizes[selectedSizeIndex] || fragrance.sizes[0];
  const calculatedPrice = getFragrancePrice(fragrance, currency, currentSize.priceMultiplier);

  const handleAdd = () => {
    onAddToCart(
      fragrance,
      currentSize.ml,
      calculatedPrice,
      engravingEnabled && engravingText.trim() ? engravingText.trim().toUpperCase() : undefined
    );
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-[#141312]/80 backdrop-blur-xs cursor-pointer"
      />

      {/* Modal Dialog */}
      <motion.div
        id="product-detail-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 bg-[#FAF8F5] max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-[#E0DACF] shadow-2xl"
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#181716] border border-[#E0DACF] transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Visual Gallery & Live Engraving Plate Preview */}
          <div className="lg:col-span-6 bg-[#F4EFE6] p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E0DACF]">
            <div>
              {/* Active Image Stage with Crossfade */}
              <div className="relative aspect-[4/5] bg-[#EBE4D8] overflow-hidden shadow-inner mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={fragrance.name}
                    variants={infoCrossfade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                {/* Simulated Engraved Plaque on Flacon */}
                {engravingEnabled && engravingText.trim() && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-12 inset-x-10 flex justify-center pointer-events-none"
                  >
                    <div className="bg-gradient-to-b from-[#E6D4B5] via-[#C5A880] to-[#9E7D52] p-[1px] shadow-lg">
                      <div className="bg-[#1D1B19]/90 backdrop-blur-xs px-4 py-2 border border-[#E6D4B5]/40 text-center">
                        <span className="text-[8px] tracking-[0.3em] uppercase text-[#C5A880] block font-sans">
                          MACESA • ATELIER
                        </span>
                        <span className={`text-xs sm:text-sm tracking-[0.25em] text-[#FAF8F5] block ${
                          engravingFont === 'italic' ? 'font-serif italic' : 'font-display uppercase'
                        }`}>
                          {engravingText.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveImage(fragrance.heroImage)}
                  className={`relative w-20 aspect-square overflow-hidden border-2 transition-luxury cursor-pointer ${
                    activeImage === fragrance.heroImage ? 'border-[#181716]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={fragrance.heroImage} alt="Flacon Studio" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(fragrance.lifestyleImage)}
                  className={`relative w-20 aspect-square overflow-hidden border-2 transition-luxury cursor-pointer ${
                    activeImage === fragrance.lifestyleImage ? 'border-[#181716]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={fragrance.lifestyleImage} alt="Lifestyle Atmosphere" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Maceration & Longevity Highlights */}
            <div className="mt-8 pt-6 border-t border-[#DDD5C7] grid grid-cols-2 gap-4 text-xs font-sans text-[#544F47]">
              <div>
                <span className="text-[10px] text-[#8C8479] uppercase tracking-wider block">Longevity & Sillage</span>
                <span className="font-serif text-sm text-[#181716] font-medium">{fragrance.longevity}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8C8479] uppercase tracking-wider block">Maturation Period</span>
                <span className="font-serif text-sm text-[#181716] font-medium">{fragrance.macerationMonths} Months in Oak & Steel</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scent Narrative, Olfactory Pyramid, Engraving & Acquisition */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Header Details */}
              <div>
                <div className="flex items-center gap-2 text-[#9E7D52] text-xs uppercase tracking-[0.2em] font-sans mb-1">
                  <span>{fragrance.family}</span>
                  <span>•</span>
                  <span className="font-medium text-[#181716]">{fragrance.concentration}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#181716] font-light tracking-[0.06em]">
                  {fragrance.name}
                </h3>
                <p className="text-xs text-[#8C8479] italic font-serif mt-1">
                  Formula N° {fragrance.formulaNumber} • Master Parfumeur: {fragrance.perfumer}
                </p>
              </div>

              {/* Poetic Description */}
              <p className="text-sm text-[#544E47] font-light leading-relaxed font-sans">
                {fragrance.fullDescription}
              </p>

              {/* Volume / Size Selection */}
              <div>
                <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479] block mb-2">
                  Select Flacon Dimension
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {fragrance.sizes.map((size, idx) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 text-center transition-luxury border cursor-pointer ${
                        selectedSizeIndex === idx
                          ? 'bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
                      }`}
                    >
                      <span className="block font-serif text-lg font-medium">{size.ml}ml</span>
                      <span className="block text-[10px] uppercase font-sans text-[#A8A196]">{size.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Olfactory Pyramid Accord Tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479]">
                    Olfactory Architecture
                  </label>
                  <div className="flex gap-2 text-xs font-sans">
                    {(['top', 'heart', 'base'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveNoteTab(tab)}
                        className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-luxury cursor-pointer ${
                          activeNoteTab === tab
                            ? 'bg-[#181716] text-[#FAF8F5]'
                            : 'text-[#6B6358] hover:text-[#181716]'
                        }`}
                      >
                        {tab === 'top' ? 'Top (Tête)' : tab === 'heart' ? 'Heart (Cœur)' : 'Base (Fond)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note Details */}
                <div className="bg-[#F2EDE4] p-4 border border-[#E0D8CC] space-y-2 min-h-[90px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeNoteTab}
                      variants={infoCrossfade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-2"
                    >
                      {fragrance.notes[activeNoteTab].map((note, i) => (
                        <div key={i} className="flex items-start justify-between text-xs font-sans">
                          <div>
                            <span className="font-serif text-sm text-[#181716] font-medium block">
                              {note.name}
                            </span>
                            <span className="text-[#696359] text-[11px]">{note.description}</span>
                          </div>
                          {note.origin && (
                            <span className="text-[9px] uppercase tracking-wider text-[#9E7D52] bg-[#FAF8F5] px-2 py-0.5 border border-[#DDD5C8] whitespace-nowrap">
                              {note.origin}
                            </span>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bespoke Bottle Engraving Option */}
              <div className="pt-2 border-t border-[#E8E4DC] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#544E47] flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      id="enable-engraving-checkbox"
                      checked={engravingEnabled}
                      onChange={(e) => setEngravingEnabled(e.target.checked)}
                      className="accent-[#C5A880] w-4 h-4 cursor-pointer"
                    />
                    <span>Complimentary Monogram Engraving</span>
                  </label>
                  <span className="text-[10px] text-[#C5A880] uppercase tracking-wider">Free Service</span>
                </div>

                {engravingEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-[#F2EDE4] border border-[#E0D8CC] space-y-2 overflow-hidden"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="engraving-text-input"
                        maxLength={18}
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        placeholder="e.g. M.C. • PARIS"
                        className="flex-grow bg-[#FAF8F5] border border-[#D4CCBF] px-3 py-2 text-xs uppercase tracking-widest font-sans text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                      <button
                        type="button"
                        onClick={() => setEngravingFont(engravingFont === 'serif' ? 'italic' : 'serif')}
                        className="px-3 py-2 bg-[#FAF8F5] border border-[#D4CCBF] text-[10px] uppercase font-sans tracking-wider cursor-pointer"
                        title="Toggle font style"
                      >
                        {engravingFont === 'serif' ? 'Serif Roman' : 'Script Italic'}
                      </button>
                    </div>
                    <p className="text-[10px] text-[#8C8479]">
                      Max 18 characters. Diamond-etched onto the gold flacon plaque in our Paris atelier.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Gift Box Checkbox */}
              <div className="flex items-center justify-between text-xs font-sans text-[#544E47] pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="gift-box-checkbox"
                    checked={giftBoxSelected}
                    onChange={(e) => setGiftBoxSelected(e.target.checked)}
                    className="accent-[#C5A880] w-4 h-4 cursor-pointer"
                  />
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
                    MACESA Signature Gift Packaging (Gold Embossed Box & Wax Seal)
                  </span>
                </label>
                <span className="text-[10px] text-[#C5A880] uppercase tracking-wider">Complimentary</span>
              </div>

              {/* Bottom Actions: Price and Add to Bag */}
              <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#8C8479] uppercase tracking-wider block font-sans">
                    Total Investment
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#181716] font-medium">
                    {formatPrice(calculatedPrice, currency)}
                  </span>
                </div>

                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`py-4 px-8 text-xs font-sans uppercase tracking-[0.25em] font-medium transition-luxury flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 ${
                    addedSuccess
                      ? 'bg-[#3B6E4A] text-[#FAF8F5]'
                      : 'bg-[#181716] hover:bg-[#C5A880] hover:text-[#181716] text-[#FAF8F5]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span>Acquire Creation</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};
