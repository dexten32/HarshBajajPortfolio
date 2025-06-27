"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.5 }} // 👈 triggers when 50% in view
    >
      {children}
    </motion.div>
  );
}
