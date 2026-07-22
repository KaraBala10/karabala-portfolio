import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient reading-progress bar pinned above the header. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500"
      style={{ scaleX }}
      aria-hidden
    />
  );
};

export default ScrollProgress;
