// frontend/utils/animations.js

// Smooth fade-in for containers
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Wait 0.1s between each child item
      delayChildren: 0.2, // Wait 0.2s before starting the whole show
    },
  },
};

// Springy pop-up effect for items
export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }, // Bouncy effect
  },
};

// Simple fade up animation
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};