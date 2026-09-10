import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

export interface MarqueeItem {
  text: string;
  subtext?: string;
  badge?: string;
  highlight?: boolean;
  family?: string;
}

interface MarqueeBannerProps {
  items?: MarqueeItem[];
  theme?: 'dark' | 'light' | 'gold';
  speed?: number; // seconds for full loop (higher = slower, more elegant)
  reverse?: boolean;
  pauseOnHover?: boolean;
  activeItem?: string;
  onItemClick?: (item: MarqueeItem) => void;
  className?: string;
}

const DEFAULT_HAUTE_ITEMS: MarqueeItem[] = [
  { text: 'EXTRAIT DE PARFUM', badge: '34% CONCENTRATION', highlight: true },
  { text: 'MAISON FONDÉE À GRASSE, 1928' },
  { text: 'COLD BARREL MACERATED IN FRENCH OAK', badge: '120 DAYS' },
  { text: 'HAND-HARVESTED ROSES DE MAI' },
  { text: 'ARTISANAL BLOWN CRYSTAL FLACONS' },
  { text: 'ORGANIC FRENCH BEETROOT SPIRIT', highlight: true },
  { text: 'SANS FIXATEURS CHIMIQUES' },
  { text: 'FLAGSHIPS: PARIS • LONDON • TOKYO • NEW YORK' },
  { text: 'ARCHIVAL OLFACTORY PYRAMID' },
];

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  items = DEFAULT_HAUTE_ITEMS,
  theme = 'dark',
  speed = 42,
  reverse = false,
  pauseOnHover = true,
  activeItem,
  onItemClick,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Set initial position
    const totalDistance = 50; // percentage
    gsap.set(track, { xPercent: reverse ? -totalDistance : 0 });

    const tween = gsap.to(track, {
      xPercent: reverse ? 0 : -totalDistance,
      duration: speed,
      ease: 'none',
      repeat: -1,
      paused: false
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [speed, reverse]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.6, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.in' });
    }
  };

  // Theme Styling
  const themeStyles = {
    dark: 'bg-[#141312] text-[#E8E2D6] border-y border-[#2E2A26]',
    light: 'bg-[#F4EFE6] text-[#2C2723] border-y border-[#DDD5C7]',
    gold: 'bg-[#C5A880] text-[#181716] border-y border-[#B39368]'
  };

  const badgeStyles = {
    dark: 'bg-[#2A2622] text-[#C5A880] border border-[#484139]',
    light: 'bg-[#EAE3D6] text-[#826640] border border-[#D5CCBE]',
    gold: 'bg-[#181716] text-[#FAF8F5] border border-[#181716]'
  };

  const separatorColor = {
    dark: 'text-[#C5A880]',
    light: 'text-[#9E7D52]',
    gold: 'text-[#181716]'
  };

  // We render 2 identical sets for seamless continuous GSAP looping
  const renderItemSet = (ariaHidden: boolean = false) => (
    <div className="flex items-center shrink-0 space-x-8 sm:space-x-12 pr-8 sm:pr-12" aria-hidden={ariaHidden}>
      {items.map((item, index) => {
        const isActive = activeItem && (activeItem === item.family || activeItem === item.text);
        return (
          <div
            key={`${item.text}-${index}`}
            onClick={() => onItemClick?.(item)}
            className={`inline-flex items-center gap-3 select-none transition-all duration-300 py-1 px-2.5 rounded-none ${
              isActive
                ? 'bg-[#C5A880]/15 ring-1 ring-[#C5A880]/70'
                : ''
            } ${
              onItemClick ? 'cursor-pointer hover:opacity-85 hover:scale-[1.01]' : 'cursor-default'
            }`}
          >
            {item.badge && (
              <span className={`text-[9.5px] tracking-[0.16em] uppercase font-sans px-2 py-0.5 whitespace-nowrap font-medium ${badgeStyles[theme]} ${
                isActive ? 'border-[#C5A880] text-[#C5A880]' : ''
              }`}>
                {item.badge}
              </span>
            )}

            <span className={`text-[11px] sm:text-xs tracking-[0.24em] uppercase font-sans whitespace-nowrap ${
              isActive
                ? 'text-[#C5A880] font-semibold'
                : item.highlight
                ? 'font-semibold text-current'
                : 'font-normal text-current'
            }`}>
              {item.text}
            </span>

            {item.subtext && (
              <span className="text-[11.5px] sm:text-xs font-serif italic text-inherit opacity-85 tracking-wide max-w-md sm:max-w-xl truncate">
                — {item.subtext}
              </span>
            )}

            <span className={`text-xs ${separatorColor[theme]} opacity-70 pl-2`}>
              ✦
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden py-3 sm:py-3.5 select-none ${themeStyles[theme]} ${className}`}
      role="region"
      aria-label="Editorial Maison Marquee"
    >
      {/* Subtle edge fade masks for seamless horizontal transition */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-current to-transparent opacity-10 pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-current to-transparent opacity-10 pointer-events-none z-10" />

      {/* Ticker Track */}
      <div ref={trackRef} className="flex whitespace-nowrap w-fit will-change-transform">
        {renderItemSet(false)}
        {renderItemSet(true)}
      </div>
    </div>
  );
};
