import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Keep small for a formal feel. */
  maxTilt?: number;
  /** Render as an <article> for semantic card lists. */
  as?: "div" | "article";
}

/**
 * 3D interactive card: tilts in perspective toward the pointer with a
 * moving light glare, springs back on leave. Falls back to a plain
 * container when the user prefers reduced motion.
 */
const TiltCard = ({
  children,
  className = "",
  maxTilt = 7,
  as = "div",
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 22,
  });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 30,
  });

  // Color comes from --tilt-glare so each theme picks a visible tint.
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, var(--tilt-glare), transparent 65%)`;

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * maxTilt);
    rotateX.set(-(py - 0.5) * 2 * maxTilt);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  const Tag = as === "article" ? motion.article : motion.div;

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative will-change-transform ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {/* Light glare tracking the pointer */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glare, opacity: glareOpacity }}
      />
    </Tag>
  );
};

export default TiltCard;
