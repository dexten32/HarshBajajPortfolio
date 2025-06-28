// components/RotatingSplitText.tsx
"use client";

import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface RotatingSplitTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const splitVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut", // use a supported string value
      duration: 0.4,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.4,
    },
  },
};

export default function RotatingSplitText({
  texts,
  interval = 3000,
  className = "",
}: RotatingSplitTextProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const current = texts[index];

  return (
    <div
      ref={containerRef}
      className={`inline-flex overflow-hidden h-[1.5em] leading-tight ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="block whitespace-nowrap"
        >
          {current.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
