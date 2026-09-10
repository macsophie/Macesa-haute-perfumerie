import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Compass, Sparkles, MapPin, BookOpen, Menu, X, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, ActiveTab } from '../types';
import { luxuryEase } from '../motion/motionSystem';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  cartCount: number;
  openCart: () => void;
  openSearch: () => void;
  openBespoke: () => void;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  cartCount,
  openCart,
  openSearch,
  openBespoke,
  wishlistCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'catalog', label: 'Collections', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'pyramid', label: 'Olfactory Notes', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'Scent Finder', icon: <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> },
    { id: 'the-house', label: 'The House', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'boutiques', label: 'Boutiques', icon: <MapPin className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#FAF8F5]/92 backdrop-blur-md shadow-xs border-b border-[#E2DBD0]' 
        : 'bg-[#FAF8F5]/98 backdrop-blur-xs border-b border-[#E8E4DC]'
    }`}>
      {/* Top Announcement Bar */}
      <div className="bg-[#181716] text-[#E8E4DC] text-[11px] font-sans tracking-[0.18em] py-2 px-4 uppercase text-center border-b border-[#2C2A28]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#A8A29A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            Maison Fondée à Grasse
          </span>
          <span className="mx-auto flex items-center gap-2">
            <span className="text-[#C5A880]">✦</span>
            Complimentary 2ml discovery flacons &amp; signature gift box with every order
            <span className="text-[#C5A880]">✦</span>
          </span>
          <button 
            id="nav-top-bespoke-btn"
            onClick={openBespoke}
            className="hidden md:inline-block text-[#C5A880] hover:text-[#E8E4DC] transition-colors underline decoration-[#C5A880]/50 underline-offset-4 cursor-pointer"
          >
            Private Consultation
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16 sm:h-18' : 'h-20 sm:h-22'
        }`}>
          
          {/* Left Column: Brand Logo & Mobile Menu Trigger */}
          <div className="flex items-center justify-start shrink-0 gap-3 sm:gap-4">
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#181716] hover:text-[#C5A880] transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Mark on Left Hand Side */}
            <div 
              id="navbar-brand-logo"
              className="flex flex-col items-start justify-center cursor-pointer select-none group transition-all"
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-display tracking-[0.38em] pl-[0.05em] text-2xl sm:text-3xl font-medium text-[#181716] transition-colors group-hover:text-[#9E7D52] leading-none">
                MACESA
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.38em] text-[#8C8479] uppercase mt-1 transition-colors group-hover:text-[#181716] whitespace-nowrap">
                Haute Parfumerie • Paris
              </span>
            </div>
          </div>

          {/* Center Column: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center space-x-5 xl:space-x-8 px-4 flex-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative text-[11px] xl:text-[12px] uppercase tracking-[0.2em] font-sans transition-colors py-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#181716] font-medium'
                      : 'text-[#6B665F] hover:text-[#181716]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#181716]"
                      transition={{ duration: 0.35, ease: luxuryEase }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Column: Currency Selector & Action Icons */}
          <div className="flex items-center shrink-0 justify-end space-x-2.5 sm:space-x-4 lg:space-x-5">
            {/* Currency Selector */}
            <div className="relative inline-block text-left">
              <select
                id="currency-selector"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-[11px] font-sans tracking-[0.15em] uppercase text-[#4A453E] hover:text-[#181716] cursor-pointer py-1 pr-1 border-none focus:ring-0 focus:outline-none transition-colors"
                aria-label="Select Currency"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Search Trigger */}
            <button
              id="nav-search-btn"
              onClick={openSearch}
              className="p-2 text-[#4A453E] hover:text-[#181716] hover:bg-[#F2ECE3] transition-luxury cursor-pointer"
              title="Search Fragrances & Notes"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Indicator */}
            <button
              id="nav-wishlist-btn"
              onClick={() => {
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative p-2 text-[#4A453E] hover:text-[#181716] hover:bg-[#F2ECE3] transition-luxury hidden sm:block cursor-pointer"
              title="Saved Fragrances"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A880] text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              id="nav-cart-btn"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-1.5 bg-[#181716] text-[#FAF8F5] hover:bg-[#2E2B28] rounded-none transition-luxury group cursor-pointer active:scale-98"
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A880] group-hover:scale-105 transition-transform" />
              <span className="text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
                Bag
              </span>
              <motion.span 
                key={cartCount}
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                className="w-4 h-4 bg-[#C5A880] text-[#181716] text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="lg:hidden bg-[#FAF8F5] border-t border-[#E8E4DC] px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              <button
                id="mobile-nav-home"
                onClick={() => {
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left text-sm uppercase tracking-[0.25em] font-sans py-2 border-b border-[#EFEBE3] cursor-pointer ${
                  activeTab === 'home' ? 'text-[#181716] font-semibold' : 'text-[#6B665F]'
                }`}
              >
                Home Flagship
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-sm uppercase tracking-[0.25em] font-sans py-2 border-b border-[#EFEBE3] flex items-center justify-between cursor-pointer ${
                    activeTab === link.id ? 'text-[#181716] font-semibold' : 'text-[#6B665F]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.icon}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  id="mobile-nav-bespoke"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBespoke();
                  }}
                  className="w-full py-3 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-sans cursor-pointer hover:bg-[#C5A880] hover:text-[#181716] transition-luxury"
                >
                  Book Private Scent Consultation
                </button>
                <div className="text-center text-[11px] text-[#8C8479] tracking-wider pt-2">
                  Domaine MACESA • Grasse &amp; Paris
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
