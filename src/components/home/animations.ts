import { Variants } from "framer-motion";

export const fadeUpVariant: Variants = {
  // Keep content visible in SSR/no-JS output; motion is progressive enhancement.
  hidden: { opacity: 1, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
