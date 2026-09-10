import { Variants } from 'motion/react';

// Refined luxury editorial easing curves
// Smooth deceleration, no bounce, no elastic snap
export const luxuryEase = [0.16, 1, 0.3, 1] as const;
export const luxuryEaseOut = [0.22, 1, 0.36, 1] as const;
export const gentleEase = [0.25, 0.1, 0.25, 1] as const;

// Common durations (seconds)
export const duration = {
  micro: 0.2,
  card: 0.4,
  content: 0.65,
  hero: 0.85,
  editorial: 0.95
};

// Fade & Translate upward
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.content,
      ease: luxuryEase
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.content,
      ease: luxuryEase
    }
  }
};

// Subtle Image Reveal (opacity + slight vertical shift + 1.03 -> 1 scale)
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.03, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: duration.editorial,
      ease: luxuryEase
    }
  }
};

// Staggered Container
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Flacon Card Reveal
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: luxuryEase
    }
  }
};

// Bottle Dissolve / Crossfade for Fragrance Selector
export const bottleDissolve: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(3px)'
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: luxuryEase
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(3px)',
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.7, 0.2]
    }
  }
};

// Fragrance Details Crossfade (Text, notes, price)
export const infoCrossfade: Variants = {
  initial: {
    opacity: 0,
    y: 12
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: luxuryEase,
      delay: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1]
    }
  }
};

// Modal Animation (Bespoke, Product Details, Search)
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: luxuryEase
    }
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1]
    }
  }
};

// Drawer Animation (Cart Drawer from Right)
export const drawerVariants: Variants = {
  hidden: { x: '100%', opacity: 0.9 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: luxuryEase
    }
  },
  exit: {
    x: '100%',
    opacity: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.35, 0, 0.7, 0.2]
    }
  }
};

// Backdrop Animation
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: 'easeIn'
    }
  }
};

// Cart Item Exit (collapses smoothly when removed)
export const cartItemVariants: Variants = {
  initial: { opacity: 0, height: 0, y: -10 },
  animate: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: {
      duration: 0.3,
      ease: luxuryEase
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1]
    }
  }
};
