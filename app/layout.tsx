"use client";

import "./globals.css";
import SplashScreen from "../components/ui/SplashScreen";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <html lang="en">
      <body className="font-clash antialiased">
        <AnimatePresence>
          {showSplash && (
            <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
          )}
        </AnimatePresence>
        {children}
      </body>
    </html>
  );
}
