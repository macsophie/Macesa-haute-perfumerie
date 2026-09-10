import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Calendar, Clock, MapPin, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BOUTIQUES } from '../data/fragrances';
import { luxuryEase, backdropVariants, modalVariants } from '../motion/motionSystem';

interface BespokeConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: string;
}

export const BespokeConsultationModal: React.FC<BespokeConsultationModalProps> = ({
  isOpen,
  onClose,
  initialCity
}) => {
  const [consultationType, setConsultationType] = useState<'in-salon' | 'virtual'>('in-salon');
  const [selectedCity, setSelectedCity] = useState<string>(initialCity || 'Paris');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [scentInterests, setScentInterests] = useState<string[]>(['Woody & Amber']);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialCity) {
      setSelectedCity(initialCity);
      setConsultationType('in-salon');
    }
  }, [initialCity]);

  const toggleInterest = (family: string) => {
    if (scentInterests.includes(family)) {
      setScentInterests(scentInterests.filter((f) => f !== family));
    } else {
      setScentInterests([...scentInterests, family]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-[#141312]/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div 
            id="bespoke-modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 bg-[#FAF8F5] max-w-2xl w-full border border-[#DDD5C7] shadow-2xl p-6 sm:p-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#181716] hover:text-[#C5A880] transition-colors cursor-pointer"
              aria-label="Close booking"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: luxuryEase }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-[#181716] text-[#C5A880] rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#181716]">
                  Rendez-Vous Enregistré
                </h3>
                <p className="text-xs sm:text-sm text-[#5C554C] font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, {fullName}. Our Maître Parfumeur has received your reservation request for {selectedCity}. 
                  A private liaison will contact you via {email} with custom preparatory notes within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-8 py-3 bg-[#181716] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#C5A880] hover:text-[#181716] transition-luxury cursor-pointer"
                  >
                    Return to House
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#9E7D52] text-xs font-sans uppercase tracking-[0.25em] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Private Atelier Session</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#181716] font-light tracking-[0.06em]">
                    Bespoke Olfactory Consultation
                  </h3>
                  <p className="text-xs text-[#6B6358] font-sans mt-1">
                    Experience an intimate 60-minute sensory evaluation with a MACESA fragrance architect.
                  </p>
                </div>

                {/* Consultation Type Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('in-salon')}
                    className={`p-3 border text-left transition-luxury cursor-pointer ${
                      consultationType === 'in-salon'
                        ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                        : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider mb-1">
                      <MapPin className="w-4 h-4 text-[#C5A880]" />
                      <span>In-Salon Atelier</span>
                    </div>
                    <span className="text-[11px] text-[#A39C90] block">At one of our global flagship salons</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('virtual')}
                    className={`p-3 border text-left transition-luxury cursor-pointer ${
                      consultationType === 'virtual'
                        ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                        : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider mb-1">
                      <Video className="w-4 h-4 text-[#C5A880]" />
                      <span>Virtual Salon</span>
                    </div>
                    <span className="text-[11px] text-[#A39C90] block">Includes pre-shipped sensory flight kit</span>
                  </button>
                </div>

                {/* City Selection (if in-salon) */}
                {consultationType === 'in-salon' && (
                  <div>
                    <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479] block mb-2">
                      Select Flagship Salon
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BOUTIQUES.map((b) => (
                        <button
                          key={b.city}
                          type="button"
                          onClick={() => setSelectedCity(b.city)}
                          className={`p-2 text-center text-xs font-sans tracking-wide transition-luxury border cursor-pointer ${
                            selectedCity === b.city
                              ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                              : 'bg-[#FAF8F5] text-[#4A443D] border-[#DDD5C7] hover:border-[#181716]'
                          }`}
                        >
                          {b.city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scent Interests */}
                <div>
                  <label className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#8C8479] block mb-2">
                    Olfactory Profiles of Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Woody & Amber', 'Floral Sublime', 'Oriental & Spices', 'Fresh Citrus & Aromatic'].map((family) => (
                      <button
                        key={family}
                        type="button"
                        onClick={() => toggleInterest(family)}
                        className={`px-3 py-1.5 text-xs font-sans tracking-wide transition-luxury border cursor-pointer ${
                          scentInterests.includes(family)
                            ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                            : 'bg-[#FAF8F5] text-[#544E47] border-[#DDD5C7] hover:border-[#181716]'
                        }`}
                      >
                        {family}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#756E63] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Lady Vivienne Montgomery"
                      className="w-full bg-[#FFFFFF] border border-[#DDD5C7] p-2.5 text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#756E63] mb-1">
                      Privilege Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vivienne@montgomery.com"
                      className="w-full bg-[#FFFFFF] border border-[#DDD5C7] p-2.5 text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="text-xs font-sans">
                  <label className="block text-[10px] uppercase tracking-wider text-[#756E63] mb-1">
                    Preferred Date &amp; Notes
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Next Tuesday afternoon; interested in bespoke wedding fragrance"
                    className="w-full bg-[#FFFFFF] border border-[#DDD5C7] p-2.5 text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#181716] hover:bg-[#C5A880] hover:text-[#181716] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.25em] font-medium transition-luxury cursor-pointer shadow-md active:scale-98"
                >
                  Request Consultation Appointment
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
