import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';
import { ActiveTab, OlfactoryFamily } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openBespoke: () => void;
  onSelectCategory?: (family: OlfactoryFamily) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openBespoke, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#141312] text-[#FAF8F5] border-t border-[#2B2724]">
      {/* Newsletter / Private Reserve Invitation Section */}
      <div className="border-b border-[#2B2724] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-sans uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Circle of Connoisseurs</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-light tracking-[0.06em]">
            Receive Private Reserve Allocations
          </h3>

          <p className="text-xs sm:text-sm text-[#9E978E] font-light max-w-lg mx-auto font-sans leading-relaxed">
            Gain priority access to limited vintage macerations, private salon tastings, 
            and seasonal harvests from our Grasse domaine.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-grow bg-[#221F1D] border border-[#3E3833] px-4 py-3 text-xs font-sans text-[#FAF8F5] placeholder:text-[#7A7368] focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#D4BC98] text-[#181716] text-xs font-sans uppercase tracking-[0.2em] font-medium transition-colors whitespace-nowrap"
              >
                Join Circle
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-sans tracking-wider bg-[#24201D] px-6 py-3 border border-[#C5A880]/30">
              <Check className="w-4 h-4" />
              <span>Bienvenue au Cercle Privé MACESA. An invitation has been sent.</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display tracking-[0.35em] text-2xl font-semibold text-[#FAF8F5] block">
              MACESA
            </span>
            <span className="text-[9px] font-sans tracking-[0.4em] text-[#8C8479] uppercase block">
              Haute Parfumerie d'Auteur
            </span>
            <p className="text-xs text-[#9E978E] font-sans leading-relaxed max-w-sm">
              Conceived in Grasse, France. Dedicated to the noble craft of cold-macerated extraits de parfum, 
              rare botanical sourcing, and personalized bottle architecture.
            </p>
            <div className="pt-2 text-[10px] text-[#C5A880] font-sans tracking-wider uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Grasse Protected Geographical Indication</span>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#9E978E] font-sans">
              <li>
                <button 
                  onClick={() => { 
                    onSelectCategory?.('All');
                    setActiveTab('catalog'); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Les Extraits de Parfum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { 
                    onSelectCategory?.('Woody & Amber');
                    setActiveTab('catalog'); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Private Reserve Editions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { 
                    onSelectCategory?.('Discovery Wardrobe');
                    setActiveTab('catalog'); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                  }} 
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Le Coffret Découverte
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('pyramid'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors">
                  The Olfactory Pyramid
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors">
                  Personal Scent Diagnostic
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880]">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-[#9E978E] font-sans">
              <li>
                <button onClick={() => { setActiveTab('the-house'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors">
                  Our Grasse Domaine
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('the-house'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors">
                  The Art of Cold Maceration
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('boutiques'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors">
                  International Salons
                </button>
              </li>
              <li>
                <button onClick={openBespoke} className="hover:text-[#FAF8F5] transition-colors">
                  Private Appointments
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880]">
              Concierge Care
            </h4>
            <ul className="space-y-2 text-xs text-[#9E978E] font-sans">
              <li>Worldwide Insured Delivery</li>
              <li>
                <button onClick={() => { setActiveTab('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAF8F5] transition-colors">
                  Complimentary Monogramming
                </button>
              </li>
              <li>Signature Gift Packaging</li>
              <li>
                <button onClick={openBespoke} className="hover:text-[#FAF8F5] transition-colors">
                  Bespoke Scent Consultation
                </button>
              </li>
              <li className="pt-2 text-[#C5A880] text-[10px] uppercase tracking-wider">
                concierge@macesaparfums.com
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-16 pt-8 border-t border-[#252220] flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#756E65] gap-4">
          <div>
            © {new Date().getFullYear()} MACESA HAUTE PARFUMERIE PARIS. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-[#FAF8F5] cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#FAF8F5] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#FAF8F5] cursor-pointer">Artisanal Sourcing Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
