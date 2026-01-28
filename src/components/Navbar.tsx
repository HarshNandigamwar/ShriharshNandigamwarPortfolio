"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

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
        <motion.a
          href="#"
          className="text-brand font-bold text-2xl flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Terminal size={28} />
          <span>Shriharsh.dev</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ThemeToggle />
          {/* Resume Button */}
          <a
            href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
            download="ShriharshNandigamwar_FullstackDeveloper.pdf"
            className="px-5 py-2 border border-brand text-brand rounded-md text-sm hover:bg-brand/10 transition-all"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
