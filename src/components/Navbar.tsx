"use client";
import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import DownloadIcon from "./icons/downloadIcon";
import TerminalIcon from "./icons/terminalIcon";

/* Nav links */
const navLinks = [
    {label: "About", href: "#about"},
    {label: "Experience", href: "#experience"},
    {label: "Certifications", href: "#certificates"},
    {label: "Toolkit", href: "#skills"},
    {label: "Projects", href: "#projects"},
    {label: "Github", href: "#github"},
    {label: "Contact", href: "#contact"},
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    /* Track scroll for glass effect */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Scroll on top
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        setMobileOpen(false);
    };

    return (
        <>
            {/* Main navbar */}
            <motion.nav
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]}}
                className={`fixed top-0 w-full z-50 transition-all duration-500
          ${scrolled ? "py-3 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "py-5 bg-transparent"}`}
            >
                <div className="mx-auto px-6 flex justify-between items-center gap-8">
                    {/* Logo */}
                    <motion.button onClick={scrollToTop} whileHover={{scale: 1.03}} whileTap={{scale: 0.97}} className="flex items-center gap-2.5 group cursor-pointer">
                        <div
                            className="p-1.5 rounded-lg border border-brand/25 bg-brand/8
                         group-hover:border-brand/50 group-hover:bg-brand/15
                         transition-colors duration-300"
                        >
                            <TerminalIcon size={16} className="text-brand" />
                        </div>
                        <span
                            className="font-mono font-bold text-base text-white/80
                             group-hover:text-brand transition-colors duration-300"
                        >
                            Shriharsh.dev
                        </span>
                    </motion.button>

                    {/* Right side: Resume + hamburger */}
                    <div className="flex items-center gap-3">
                        {/* Resume button */}
                        <motion.a
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4}}
                            whileHover={{scale: 1.04, y: -1}}
                            whileTap={{scale: 0.96}}
                            href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
                            download="ShriharshNandigamwar_FullstackDeveloper.pdf"
                            title="Download Resume"
                            className="relative group hidden md:flex items-center gap-2 px-4 py-2 rounded-full
                         border border-brand/30 bg-brand/8 backdrop-blur-sm
                         text-brand font-mono text-xs tracking-wide
                         hover:border-brand/60 hover:bg-brand/15
                         transition-colors duration-300 overflow-hidden cursor-pointer"
                        >
                            {/* Shine sweep */}
                            <motion.span className="absolute inset-0 bg-white/15" initial={{x: "-100%"}} whileHover={{x: "100%"}} transition={{duration: 0.4}} />
                            <span className="block relative z-10">Download Resume</span>
                            <motion.span animate={{y: [0, 2, 0]}} transition={{duration: 1.5, repeat: Infinity}} className="relative z-10">
                                <DownloadIcon size={15} />
                            </motion.span>
                        </motion.a>

                        {/* Hamburger (mobile) */}
                        <motion.button
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.4}}
                            onClick={() => setMobileOpen((v) => !v)}
                            className="md:hidden flex flex-col justify-center items-center
                         w-10 h-10 rounded-md border border-white/10 bg-white/[0.04]
                         hover:border-brand/40 transition-colors duration-300 gap-1.5 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <motion.span animate={mobileOpen ? {rotate: 45, y: 6} : {rotate: 0, y: 0}} transition={{duration: 0.25}} className="w-4 h-px bg-white/60 rounded-full block" />
                            <motion.span animate={mobileOpen ? {opacity: 0, scaleX: 0} : {opacity: 1, scaleX: 1}} transition={{duration: 0.2}} className="w-4 h-px bg-white/60 rounded-full block" />
                            <motion.span animate={mobileOpen ? {rotate: -45, y: -6} : {rotate: 0, y: 0}} transition={{duration: 0.25}} className="w-4 h-px bg-white/60 rounded-full block" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{opacity: 0, y: -20, scale: 0.97}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: -20, scale: 0.97}}
                            transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}}
                            className="fixed top-[72px] left-4 right-4 z-50 md:hidden
                         rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl
                         shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                        >
                            <div className="p-5 flex flex-col gap-1">
                                {navLinks.map((link, i) => {
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            initial={{opacity: 0, x: -16}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: i * 0.07}}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl
                                  font-mono text-sm uppercase tracking-[0.12em]
                                  transition-colors duration-200 cursor-pointer text-white/50 hover:text-brand hover:bg-white/[0.04]
                                  `}
                                        >
                                            <span className={`w-1 h-1 rounded-full bg-white/20`} />
                                            {link.label}
                                        </motion.a>
                                    );
                                })}

                                {/* Divider */}
                                <div className="my-2 h-px bg-white/[0.06]" />

                                {/* Mobile resume */}
                                <motion.a
                                    initial={{opacity: 0, y: 8}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: navLinks.length * 0.07 + 0.05}}
                                    href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
                                    download="ShriharshNandigamwar_FullstackDeveloper.pdf"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl
                             border border-brand/30 bg-brand/8 text-brand
                             font-mono text-sm tracking-wide
                             hover:border-brand/60 hover:bg-brand/15
                             transition-colors duration-300 cursor-pointer"
                                >
                                    Download Resume
                                    <DownloadIcon size={15} />
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
