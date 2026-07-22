import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * Scroll-reveal primitives: StaggerContainer animates its RevealItem
 * children in one-by-one when the block enters the viewport. Both render
 * plain divs under prefers-reduced-motion.
 */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export const StaggerContainer = ({
  children,
  className = "",
  amount = 0.15,
}: RevealProps & { amount?: number }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem = ({ children, className = "" }: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};
