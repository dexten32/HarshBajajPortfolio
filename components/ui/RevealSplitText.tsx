"use client";
import { motion } from "framer-motion";

type RevealSplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

const RevealSplitText = ({
  text,
  className = "",
  delay = 0,
}: RevealSplitTextProps) => {
  const characters = text.split("");

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay,
          },
        },
      }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default RevealSplitText;
