import {
  Code,
  TerminalSquare,
  Cpu,
  Database,
  Globe,
  Bot,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface Decoration {
  Icon: typeof Code;
  className: string;
  animate: { y: number[]; x: number[]; rotate: number[] };
  duration: number;
  delay?: number;
  opacity: string;
  blur?: boolean;
}

const decorations: Decoration[] = [
  {
    Icon: Code,
    className:
      "absolute top-[8%] left-[6%] w-[6%] aspect-square rotate-12",
    animate: { y: [0, -14, 0], x: [0, 8, 0], rotate: [12, 6, 12] },
    duration: 9,
    delay: 0,
    opacity: "opacity-[0.10] dark:opacity-[0.12]",
  },
  {
    Icon: Database,
    className:
      "absolute top-[14%] left-[52%] w-[4%] aspect-square -rotate-12",
    animate: { y: [0, 12, 0], x: [0, 14, 0], rotate: [-12, -18, -12] },
    duration: 8,
    delay: 0.6,
    opacity: "opacity-[0.08] dark:opacity-[0.10]",
  },
  {
    Icon: TerminalSquare,
    className:
      "absolute top-[20%] right-[7%] w-[7.5%] aspect-square -rotate-6",
    animate: { y: [0, 16, 0], x: [0, -10, 0], rotate: [-6, -2, -6] },
    duration: 11,
    delay: 1.2,
    opacity: "opacity-[0.09] dark:opacity-[0.11]",
    blur: true,
  },
  {
    Icon: Cpu,
    className:
      "absolute top-[42%] left-[16%] w-[5%] aspect-square rotate-45",
    animate: { y: [0, -18, 0], x: [0, -8, 0], rotate: [45, 50, 45] },
    duration: 10,
    delay: 2,
    opacity: "opacity-[0.11] dark:opacity-[0.13]",
  },
  {
    Icon: Workflow,
    className:
      "absolute top-[55%] right-[18%] w-[4%] aspect-square rotate-6",
    animate: { y: [0, -12, 0], x: [0, -10, 0], rotate: [6, 12, 6] },
    duration: 8.5,
    delay: 2.4,
    opacity: "opacity-[0.08] dark:opacity-[0.10]",
  },
  {
    Icon: Globe,
    className:
      "absolute bottom-[16%] right-[8%] w-[7.5%] aspect-square rotate-12",
    animate: { y: [0, -16, 0], x: [0, -10, 0], rotate: [12, 8, 12] },
    duration: 12,
    delay: 1.8,
    opacity: "opacity-[0.09] dark:opacity-[0.11]",
    blur: true,
  },
  {
    Icon: Bot,
    className:
      "absolute bottom-[10%] left-[34%] w-[5%] aspect-square -rotate-12",
    animate: { y: [0, 16, 0], x: [0, 12, 0], rotate: [-12, -6, -12] },
    duration: 9.5,
    delay: 3,
    opacity: "opacity-[0.10] dark:opacity-[0.12]",
  },
];

const BackgroundDecorations = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="text-formal-900 dark:text-formal-50">
        {decorations.map(
          ({ Icon, className, animate, duration, delay, opacity, blur }) => (
            <motion.div
              key={className}
              className={`${className} ${opacity} ${
                blur ? "blur-[2px]" : ""
              }`}
              animate={prefersReducedMotion ? undefined : animate}
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }
              }
            >
              <Icon className="w-full h-full" strokeWidth={1.25} />
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default BackgroundDecorations;
