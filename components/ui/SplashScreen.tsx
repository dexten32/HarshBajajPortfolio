"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 30);
      return () => clearInterval(interval);
    } else {
      setIsLoaded(true);
    }
  }, [progress]);

  return (
    <motion.div
      key="splash"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }} // Curtain slide up
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center z-[9999]"
    >
      <motion.div
        className="text-white text-5xl font-bold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {progress}%
      </motion.div>

      {isLoaded && (
        <motion.button
          onClick={onFinish}
          className="mt-8 px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Enter
        </motion.button>
      )}
    </motion.div>
  );
}
