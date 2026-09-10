import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * GSAP-powered smooth animated number counter that triggers on viewport entrance.
 * Provides high-precision deceleration for luxury metrics (e.g., 34%, 120 days, 1928).
 */
export const useGsapCounter = (
  targetNumber: number,
  options?: {
    duration?: number;
    delay?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }
) => {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const {
    duration = 1.8,
    delay = 0.2,
    prefix = '',
    suffix = '',
    decimals = 0
  } = options || {};

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let hasAnimated = false;
    const obj = { val: 0 };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          gsap.to(obj, {
            val: targetNumber,
            duration,
            delay,
            ease: 'power3.out',
            onUpdate: () => {
              if (el) {
                const formatted = decimals > 0 
                  ? obj.val.toFixed(decimals) 
                  : Math.round(obj.val).toString();
                el.innerText = `${prefix}${formatted}${suffix}`;
              }
            }
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(obj);
    };
  }, [targetNumber, duration, delay, prefix, suffix, decimals]);

  return elementRef;
};

/**
 * Convenient React wrapper component for GSAP counter animation.
 */
export const GsapCounter: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}> = ({ value, prefix = '', suffix = '', decimals = 0, duration = 1.6, className = '' }) => {
  const ref = useGsapCounter(value, { prefix, suffix, decimals, duration });
  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
};

/**
 * GSAP QuickTo 3D Perspective Tilt & Specular Light Sheen for Luxury Flacons.
 * Smooth 60fps tracking without React component re-renders.
 */
export const useGsapCardTilt = (enabled: boolean = true) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !enabled) return;

    // Set 3D perspective on the card
    gsap.set(card, {
      transformPerspective: 1000,
      transformStyle: 'preserve-3d'
    });

    const setRotateX = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });
    const setRotateY = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });
    const setScale = gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateYVal = ((x - centerX) / centerX) * 7; // Max +/- 7 deg
      const rotateXVal = -((y - centerY) / centerY) * 7;

      setRotateX(rotateXVal);
      setRotateY(rotateYVal);
      setScale(1.015);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(card);
    };
  }, [enabled]);

  return cardRef;
};
