import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Fragrance, Currency } from '../types';
import { formatPrice, getFragrancePrice } from '../utils/formatters';
import { luxuryEase, infoCrossfade } from '../motion/motionSystem';

interface ScentFinderQuizProps {
  fragrances: Fragrance[];
  currency: Currency;
  onSelectFragrance: (fragrance: Fragrance) => void;
  onQuickAdd: (fragrance: Fragrance) => void;
}

export const ScentFinderQuiz: React.FC<ScentFinderQuizProps> = ({
  fragrances,
  currency,
  onSelectFragrance,
  onQuickAdd
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [recommendedId, setRecommendedId] = useState<string | null>(null);

  const questions = [
    {
      step: 0,
      title: 'What presence or aura do you wish to project?',
      subtitle: 'The first impression of your signature scent',
      options: [
        { id: 'woody', label: 'Commanding & Architectural', desc: 'Meditative woods, noble iris butter, and smoked cedar', matches: 'santal-imperial' },
        { id: 'floral', label: 'Nocturnal & Intoxicating', desc: 'Velvet hundred-petaled rose with spicy saffron and oud', matches: 'rose-dispahan' },
        { id: 'oriental', label: 'Seductive & Enigmatic', desc: 'Dark night-blooming jasmine steeped in smoked tonka and vanilla', matches: 'nuit-celeste' },
        { id: 'fresh', label: 'Invigorating & Confident', desc: 'Crisp Atlantic sea salt, Amalfi lemon, and earthy vetiver roots', matches: 'vetiver-mineral' },
        { id: 'leather', label: 'Bold, Tactile & Aristocratic', desc: 'Tuscan glove leather warmed with wild raspberry and incense', matches: 'cuir-nomade' }
      ]
    },
    {
      step: 1,
      title: 'Which atmosphere or setting resonates most with you?',
      subtitle: 'The landscape in which your soul feels most at home',
      options: [
        { id: 'library', label: 'Antique French Salon with Oak Casks', desc: 'Rich leather-bound books, polished cedarwood, and quiet contemplation', matches: 'santal-imperial' },
        { id: 'rose-garden', label: 'A Grasse Rose Field in the Twilight Mist', desc: 'Dew-drenched petals releasing deep crimson nectar into the evening breeze', matches: 'rose-dispahan' },
        { id: 'midnight', label: 'A Midnight Terrace in Paris Under Stars', desc: 'Warm shadows, flickering candlelight, and sweet balsamic smoke', matches: 'nuit-celeste' },
        { id: 'riviera', label: 'Sun-Bleached Cliffs Overlooking the Mediterranean', desc: 'Crashing turquoise surf, fresh sea spray, and sunlit pine needles', matches: 'vetiver-mineral' }
      ]
    },
    {
      step: 2,
      title: 'Which concentration & sillage do you seek?',
      subtitle: 'How long and how intensely your fragrance projects',
      options: [
        { id: 'ultra-heavy', label: 'Extrait de Parfum (32% - 34% Pure Oil)', desc: 'Unprecedented 14+ hour longevity with an enveloping, hypnotic trail', matches: 'santal-imperial' },
        { id: 'balanced', label: 'Eau de Parfum Intense (24% - 26%)', desc: '10 to 12 hour longevity with elegant, radiant diffusion', matches: 'rose-dispahan' },
        { id: 'versatile', label: 'Discovery Wardrobe Experience', desc: 'Rotate five diverse creations for different days, seasons, and moods', matches: 'coffret-decouverte' }
      ]
    }
  ];

  const handleSelectOption = (matches: string) => {
    const updated = { ...answers, [currentStep]: matches };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate outcome
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        const matchWinner = updated[0] || 'santal-imperial';
        setRecommendedId(matchWinner);
      }, 750);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedId(null);
  };

  const recommendedFragrance = fragrances.find((f) => f.id === recommendedId) || fragrances[0];

  return (
    <section id="scent-finder-quiz" className="py-16 sm:py-24 bg-[#1B1918] text-[#FAF8F5] relative overflow-hidden">
      {/* Subtle Golden Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-sans uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnostic Olfactif Privé</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#FAF8F5] font-light tracking-[0.06em]">
            Find Your Signature Scent
          </h2>
          <p className="text-sm text-[#B5AFA6] font-light font-sans max-w-xl mx-auto">
            Answer three sensorial questions curated by our Maîtres Parfumeurs 
            to uncover the MACESA creation that aligns with your essence.
          </p>
        </motion.div>

        {/* Quiz Progress Bar */}
        {!recommendedId && !isCalculating && (
          <div className="mb-10">
            <div className="flex justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C8479] mb-2">
              <span>Phase {currentStep + 1} of {questions.length}</span>
              <span>Personalized Calibration</span>
            </div>
            <div className="h-1 bg-[#2E2A27] w-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#C5A880]"
                initial={false}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.45, ease: luxuryEase }}
              />
            </div>
          </div>
        )}

        {/* Question Stage with AnimatePresence Step Transition */}
        <AnimatePresence mode="wait">
          {!recommendedId && !isCalculating && (
            <motion.div
              key={currentStep}
              variants={infoCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-[#24211F] border border-[#3E3833] p-6 sm:p-10 shadow-xl space-y-8"
            >
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
                  {questions[currentStep].title}
                </h3>
                <p className="text-xs text-[#9E978E] font-sans tracking-wider mt-1">
                  {questions[currentStep].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={option.id}
                    id={`quiz-option-${currentStep}-${idx}`}
                    onClick={() => handleSelectOption(option.matches)}
                    className="p-4 sm:p-5 text-left border border-[#3B3530] bg-[#1E1C1A] hover:bg-[#2A2623] hover:border-[#C5A880] transition-luxury flex items-start justify-between group cursor-pointer active:scale-[0.99]"
                  >
                    <div className="space-y-1">
                      <span className="font-serif text-lg sm:text-xl text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors block">
                        {option.label}
                      </span>
                      <span className="text-xs text-[#9E978E] font-sans leading-relaxed block">
                        {option.desc}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C8479] group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all mt-1 shrink-0 ml-4" />
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C8479] hover:text-[#C5A880] transition-colors cursor-pointer"
                >
                  ← Back to previous question
                </button>
              )}
            </motion.div>
          )}

          {/* Calculating Screen */}
          {isCalculating && (
            <motion.div
              key="calculating"
              variants={infoCrossfade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-[#24211F] border border-[#3E3833] p-12 text-center space-y-4 shadow-xl"
            >
              <div className="w-12 h-12 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="font-serif text-2xl text-[#FAF8F5]">
                Analyzing Olfactory Harmonies...
              </h3>
              <p className="text-xs text-[#9E978E] font-sans tracking-wider">
                Evaluating notes balance, maceration profile, and personal resonance.
              </p>
            </motion.div>
          )}

          {/* Result Stage */}
          {recommendedId && !isCalculating && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="bg-[#24211F] border border-[#C5A880]/60 p-6 sm:p-10 shadow-2xl space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#3B3530] pb-6 gap-4">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A880] block">
                    ✦ 98.4% Olfactory Resonance ✦
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] mt-1">
                    Your Signature: {recommendedFragrance.name}
                  </h3>
                  <span className="text-xs text-[#9E978E] font-sans uppercase tracking-wider block mt-1">
                    {recommendedFragrance.concentration} • {recommendedFragrance.family}
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#8C8479] hover:text-[#C5A880] font-sans uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Product Card Inside Result */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div 
                  className="md:col-span-5 aspect-[4/5] bg-[#161514] overflow-hidden border border-[#3E3833] cursor-pointer group"
                  onClick={() => onSelectFragrance(recommendedFragrance)}
                >
                  <img
                    src={recommendedFragrance.heroImage}
                    alt={recommendedFragrance.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>

                <div className="md:col-span-7 space-y-5">
                  <p className="text-sm text-[#D1CCC4] font-light leading-relaxed font-sans">
                    {recommendedFragrance.shortDescription}
                  </p>

                  <div className="bg-[#1C1A18] p-4 border border-[#35302C] space-y-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] block">
                      Harmonic Accord Match
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {recommendedFragrance.accords.map((accord, idx) => (
                        <span 
                          key={idx}
                          className="text-xs font-sans bg-[#2A2623] text-[#FAF8F5] px-2.5 py-1 border border-[#3E3833]"
                        >
                          {accord}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] text-[#8C8479] uppercase tracking-wider block font-sans">
                        Full Flacon (100ml)
                      </span>
                      <span className="font-serif text-2xl text-[#FAF8F5]">
                        {formatPrice(getFragrancePrice(recommendedFragrance, currency), currency)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectFragrance(recommendedFragrance)}
                        className="px-5 py-3 bg-transparent hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#181716] border border-[#DDD5C7] text-xs font-sans uppercase tracking-[0.2em] transition-luxury cursor-pointer active:scale-98"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onQuickAdd(recommendedFragrance)}
                        className="px-6 py-3 bg-[#C5A880] hover:bg-[#D4BC98] text-[#181716] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-luxury flex items-center gap-2 cursor-pointer shadow-sm active:scale-98"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Acquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
