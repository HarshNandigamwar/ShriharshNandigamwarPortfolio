"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUp, Terminal } from "lucide-react";

const socialLinks = [
  { id: 1, icon: Github, link: "https://github.com/HarshNandigamwar" },
  {
    id: 2,
    icon: Linkedin,
    link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  { id: 3, icon: Twitter, link: "https://x.com/Harsh477011?s=09" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 border-t border-brand ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-brand font-bold text-xl">
            <Terminal size={20} />
            <span>Shriharsh.dev</span>
          </div>
          <p className=" text-sm font-mono">
            © {new Date().getFullYear()} Designed & Built by Shriharsh
            Nandigamwar
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                whileHover={{ y: -3, color: "#22c55e" }}
                className="border-b border-b-2 cursor-pointer p-2"
              >
                <Icon size={22} className="text-brand " />
              </motion.a>
            );
          })}
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 hover:text-brand transition-colors text-sm font-mono cursor-pointer"
        >
          Back to top
          <div className="p-2 rounded-full hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 group-hover:border-brand/50 transition-all">
            <ArrowUp size={16} />
          </div>
        </button>
      </div>
    </footer>
  );
}
