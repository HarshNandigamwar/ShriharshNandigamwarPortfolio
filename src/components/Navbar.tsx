"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Download } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-brand font-bold text-2xl flex items-center gap-2"
        >
          <Terminal size={28} />
          <span>Shriharsh.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {/* Resume Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
            download="ShriharshNandigamwar_FullstackDeveloper.pdf"
            className="flex gap-3 px-5 py-2 border border-brand/30 text-brand rounded-md text-sm bg-brand/10 transition-all"
          >
            <span>Download Resume</span>
            <motion.div
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Download size={18} className="text-brand" />
            </motion.div>
          </motion.a>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
