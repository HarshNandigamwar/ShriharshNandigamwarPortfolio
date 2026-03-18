"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import GithubIcon from "@/components/github-icon";
import LinkedinIcon from "@/components/linkedin-icon";
import TwitterXIcon from "@/components/twitter-x-icon";

const socialLinks = [
  { id: 1, icon: GithubIcon, link: "https://github.com/HarshNandigamwar" },
  {
    id: 2,
    icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  { id: 3, icon: TwitterXIcon, link: "https://x.com/Harsh477011?s=09" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [clickCount, setClickCount] = useState(0);
  const [socialLinksIcon, setSocialLinksIcon] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleTextClick = () => {
    const newCount = clickCount + 1;
    if (newCount === 5) {
      setSocialLinksIcon(true);
      setClickCount(0);
    } else {
      setClickCount(newCount);
      setTimeout(() => setClickCount(0), 2000);
    }
  };
  const checkPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const resetInterface = () => {
      setSocialLinksIcon(false);
      setPassword("");
      setClickCount(0);
    };
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.warning(data.message || "Access Denied");

        const formData = new FormData();
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3KEY!);
        formData.append("subject", "🚨 Portfolio Intruder Alert!");
        formData.append("from_name", "Portfolio Security System");

        // Collected Information
        formData.append("Attempted_Password", password);
        formData.append("Browser_Info", navigator.userAgent);
        formData.append("Platform", navigator.platform);
        formData.append("Language", navigator.language);
        formData.append(
          "Screen_Resolution",
          `${window.screen.width}x${window.screen.height}`,
        );
        formData.append("Timestamp", new Date().toLocaleString());
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        resetInterface();
        return;
      }

      toast.success("Identity verified. Redirecting...");
      resetInterface();
      setTimeout(() => {
        router.push("/system");
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Auth Error:", error);
    }
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
          <p
            className=" text-sm font-mono select-none"
            onClick={handleTextClick}
          >
            © {new Date().getFullYear()} Designed & Built by Shriharsh
            Nandigamwar
          </p>
        </div>
        {/* Social Links */}
        {socialLinksIcon ? (
          <form onSubmit={checkPassword}>
            <input
              type="password"
              placeholder="Enter Secret Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border border-brand p-2 rounded text-white outline-none "
              autoFocus
            />
          </form>
        ) : (
          <div className="flex gap-6">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: item.id * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="border-b border-b-2 cursor-pointer p-2 hover:border-brand"
                >
                  <Icon size={22} className="text-brand " />
                </motion.a>
              );
            })}
          </div>
        )}
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 hover:text-brand transition-colors text-sm font-mono cursor-pointer"
        >
          Back to top
          <div className="p-2 rounded-full hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 group-hover:border-brand/50 transition-all">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowUp size={16} />
            </motion.div>
          </div>
        </button>
      </div>
    </footer>
  );
}
