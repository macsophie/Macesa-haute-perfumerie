import React, { useState } from 'react';
import { Heart, Sparkles, Plus } from 'lucide-react';
import { Fragrance, Currency } from '../types';
import { formatPrice, getFragrancePrice } from '../utils/formatters';

interface FragranceCardProps {
  fragrance: Fragrance;
  currency: Currency;
  onSelect: (fragrance: Fragrance) => void;
  onQuickAdd: (fragrance: Fragrance) => void;
  isWishlisted: boolean;
  onToggleWishlist: (fragranceId: string) => void;
}

export const FragranceCard: React.FC<FragranceCardProps> = ({
  fragrance,
  currency,
  onSelect,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist
}) => {
  const currentPrice = getFragrancePrice(fragrance, currency);
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Parallax depth of +/- 8px
    setParallaxOffset({ x: x * -14, y: y * -14 });
  };

  const handleCardMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      id={`fragrance-card-${fragrance.id}`}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      className="group flex flex-col bg-[#FFFFFF] border border-[#E8E4DC] hover:border-[#C5A880]/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative shadow-xs hover:shadow-lg rounded-none"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {fragrance.isBestseller && (
          <span className="bg-[#181716] text-[#FAF8F5] text-[9px] font-sans uppercase tracking-[0.18em] px-2.5 py-1">
            Iconic Creation
          </span>
        )}
        {fragrance.isNew && (
          <span className="bg-[#C5A880] text-[#181716] text-[9px] font-sans uppercase tracking-[0.18em] px-2.5 py-1 font-medium">
            New Formula
          </span>
        )}
        {fragrance.isPrivateReserve && (
          <span className="bg-[#423930] text-[#E8E4DC] text-[9px] font-sans uppercase tracking-[0.18em] px-2.5 py-1">
            Private Reserve
          </span>
        )}
      </div>

      {/* Wishlist Button with Tactile Feedback */}
      <button
        id={`wishlist-btn-${fragrance.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(fragrance.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#6B665F] hover:text-[#B84040] rounded-full transition-all duration-200 active:scale-90 backdrop-blur-xs shadow-xs cursor-pointer"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 transition-transform duration-300 ${isWishlisted ? 'fill-[#B84040] text-[#B84040] scale-110' : 'hover:scale-105'}`} />
      </button>

      {/* Flacon Imagery with Smooth Parallax Depth Motion */}
      <div 
        onClick={() => onSelect(fragrance)}
        className="relative aspect-[4/5] bg-[#F7F4EE] overflow-hidden cursor-pointer"
      >
        <img
          src={fragrance.heroImage}
          alt={fragrance.name}
          style={{
            transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0) scale(1.06)`
          }}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out will-change-transform"
          loading="lazy"
        />
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#181716]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(fragrance);
            }}
            className="w-full py-2.5 bg-[#181716]/95 backdrop-blur-sm text-[#FAF8F5] text-[11px] font-sans uppercase tracking-[0.2em] hover:bg-[#C5A880] hover:text-[#181716] transition-colors duration-300 shadow-md cursor-pointer"
          >
            Inspect Olfactory Notes
          </button>
        </div>
      </div>

      {/* Content Details - Rock Stable */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#8C8479] font-sans tracking-[0.18em] uppercase">
            <span>{fragrance.family}</span>
            <span className="text-[#C5A880]">{fragrance.concentrationPercentage.split(' ')[0]}</span>
          </div>

          <h3 
            onClick={() => onSelect(fragrance)}
            className="font-serif text-xl text-[#181716] cursor-pointer hover:text-[#9E7D52] transition-colors duration-200"
          >
            {fragrance.name}
          </h3>

          <p className="text-xs text-[#6B665F] line-clamp-2 leading-relaxed font-sans min-h-[32px]">
            {fragrance.tagline}
          </p>
        </div>

        {/* Key Accords */}
        <div className="flex flex-wrap gap-1 pt-1">
          {fragrance.accords.slice(0, 3).map((accord, i) => (
            <span 
              key={i} 
              className="text-[10px] font-sans tracking-wider text-[#5A544C] bg-[#F2ECE3] px-2 py-0.5"
            >
              {accord}
            </span>
          ))}
        </div>

        {/* Price & Primary Action */}
        <div className="pt-3 border-t border-[#EFEBE3] flex items-center justify-between">
          <div>
            <span className="font-serif text-lg text-[#181716] font-medium">
              {formatPrice(currentPrice, currency)}
            </span>
            <span className="block text-[10px] text-[#8C8479] font-sans uppercase tracking-wider">
              {fragrance.sizes[0]?.ml ? `${fragrance.sizes[0].ml}ml / 100ml` : 'Full Flacon'}
            </span>
          </div>

          <button
            id={`card-add-btn-${fragrance.id}`}
            onClick={() => onQuickAdd(fragrance)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#181716] hover:bg-[#C5A880] hover:text-[#181716] text-[#FAF8F5] text-[11px] font-sans uppercase tracking-[0.18em] transition-colors duration-200 active:scale-95 cursor-pointer"
            title="Add 100ml to Bag"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
