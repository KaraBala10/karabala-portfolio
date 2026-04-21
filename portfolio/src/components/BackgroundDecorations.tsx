import {
  Code,
  TerminalSquare,
  Cpu,
  Database,
  Globe,
  Bot,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="opacity-[0.1] dark:opacity-[0.1] text-formal-900 dark:text-formal-50 transition-opacity duration-500">
        <motion.div
          className="absolute top-[10%] left-[10%]"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code className="w-32 h-32 lg:w-40 lg:h-40 rotate-12" />
        </motion.div>

        <motion.div
          className="absolute top-[30%] right-[10%]"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <TerminalSquare className="w-40 h-40 lg:w-48 lg:h-48 -rotate-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[15%]"
          animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Cpu className="w-24 h-24 lg:w-32 lg:h-32 rotate-45" />
        </motion.div>

        <motion.div
          className="absolute top-[15%] right-[35%]"
          animate={{ y: [0, 12, 0], x: [0, 15, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Database className="w-20 h-20 lg:w-28 lg:h-28 -rotate-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] right-[15%]"
          animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <Globe className="w-36 h-36 lg:w-48 lg:h-48 rotate-12" />
        </motion.div>

        <motion.div
          className="absolute top-[60%] left-[5%]"
          animate={{ y: [0, 18, 0], x: [0, 15, 0] }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <Bot className="w-28 h-28 lg:w-36 lg:h-36 -rotate-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-[5%] left-[45%]"
          animate={{ y: [0, -12, 0], x: [0, -12, 0] }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <Workflow className="w-20 h-20 lg:w-28 lg:h-28 rotate-6" />
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundDecorations;
