"use client";
import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import DownloadIcon from "./icons/downloadIcon";
import TerminalIcon from "./icons/terminalIcon";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    // Handle background change on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-[5px] bg-black md:bg-transparent py-3`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.4}}
                    onClick={scrollToTop}
                    className="hidden md:flex text-brand font-bold text-xl md:text-2xl items-center gap-2 cursor-pointer"
                >
                    <TerminalIcon size={26} />
                    <span>Shriharsh.dev</span>
                </motion.div>
                <div onClick={scrollToTop} className="flex md:hidden text-brand font-bold text-xl md:text-2xl items-center gap-2 cursor-pointer">
                    <TerminalIcon size={26} />
                    <span>Shriharsh.dev</span>
                </div>

                {/* Resume Button */}
                <motion.a
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.4}}
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    title="Download Resume"
                    href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
                    download="ShriharshNandigamwar_FullstackDeveloper.pdf"
                    className="flex gap-3 px-2 md:px-5 py-2 border border-brand/30 text-brand rounded-md text-sm bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm transition-all"
                >
                    <span className="hidden md:block ">Download Resume</span>
                    <DownloadIcon size={18} />
                </motion.a>
            </div>
        </nav>
    );
}
