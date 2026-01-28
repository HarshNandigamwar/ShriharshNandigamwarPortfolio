"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Download } from "lucide-react";
import React, { useRef } from "react";

export default function ResumeButton() {
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Set pull strength (20px max)
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="hidden md:flex items-center justify-center">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
        style={{ x: springX, y: springY }}
        className="relative group"
      >
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 group-hover:bg-gradient-to-r from-brand to-brand rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

        <motion.a
          href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
          download="ShriharshNandigamwar_FullstackDeveloper.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-3 px-8 py-4 border border-brand/30 rounded-full font-medium transition-colors hover:bg-black hover:border-brand"
        >
          <span>Download Resume</span>
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Download size={18} className="text-brand" />
          </motion.div>

          {/* Shiny Shimmer Effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
