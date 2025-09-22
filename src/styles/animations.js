import { motion } from 'framer-motion';

// Animation variants for common UI patterns
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const slideIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 }
};

// Button tap animation
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Card hover animation
export const cardHover = {
  y: -2,
  transition: { duration: 0.2 }
};

// Stagger animations for lists
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Loading spinner animation
export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Navigation menu animations
export const mobileMenu = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "100%" },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Input field animations
export const inputFocus = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

// Success/Error message animations
export const messageAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

// Reusable animation components
export const AnimatedContainer = motion.div;
export const AnimatedCard = motion(Card);
export const AnimatedButton = motion(Button);

// Custom hooks for animations
export const useAnimationConfig = () => ({
  button: {
    whileHover: { scale: 1.02 },
    whileTap: buttonTap,
    transition: { duration: 0.2 }
  },
  
  card: {
    whileHover: cardHover,
    transition: { duration: 0.2 }
  },
  
  fadeIn: {
    initial: fadeIn.initial,
    animate: fadeIn.animate,
    transition: fadeIn.transition
  }
});