"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function PrankPage() {
  // Sparkle/Confetti Effect
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Sparkling particles from left and right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-purple-500/30">
      {/* Background Animated Orbs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"
        />
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="z-10 text-center space-y-8 max-w-2xl px-6 py-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl md:text-8xl mb-4"
        >
          😜
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          YOU GOT PRANKED!
        </h1>

        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white font-medium italic"
          >
            "Expect the unexpected... especially from the Admin."
          </motion.p>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Congratulations! You found the hidden trigger and cracked the code,
            but the secret page is currently just a galaxy of sparkles. ✨
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black font-bold rounded-full transition shadow-lg hover:shadow-white/20"
            >
              Go Back Home
            </motion.button>
          </Link>

          <motion.button
            onClick={() => confetti()}
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition"
          >
            More Sparkles!
          </motion.button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-gray-600 text-xs tracking-widest uppercase"
      >
        Admin's Portfolio • Secret Menu v1.0
      </motion.footer>
    </div>
  );
}
