"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {motion, AnimatePresence} from "framer-motion";
import Terminal from "@/components/icons/terminalIcon";
import GithubIcon from "@/components/icons/githubIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import TwitterXIcon from "@/components/icons/twitterIcon";
import SocialPill from "./UI/SocialPill";

export default function Footer() {
    const [year, setYear] = useState("");
    const [clickCount, setClickCount] = useState(0);
    const [showSecret, setShowSecret] = useState(false);
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);

    /* Secret click handler */
    const handleTextClick = () => {
        const next = clickCount + 1;
        if (next === 5) {
            setShowSecret(true);
            setClickCount(0);
            setTimeout(() => setShowSecret(false), 8000);
        } else {
            setClickCount(next);
            setTimeout(() => setClickCount(0), 2000);
        }
    };

    /* Password check */
    const checkPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const reset = () => {
            setShowSecret(false);
            setPassword("");
            setClickCount(0);
        };
        try {
            setLoader(true);
            const res = await fetch("/api/verify", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({password}),
            });
            const data = await res.json();

            if (!data.success) {
                setLoader(false);
                toast.warning(data.message || "Access Denied");
                // Intruder alert
                await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        access_key: process.env.NEXT_PUBLIC_WEB3KEY,
                        subject: "New Portfolio Notification",
                        from_name: "My Portfolio",
                        email: "shriharshportfolio@gmail.com",
                        botcheck: "",
                        message: `Intruder Alert! Password: ${password}. Device: ${navigator.platform}`,
                        Browser: navigator.userAgent,
                    }),
                });
                reset();
                return;
            }
            toast.success("Identity verified. Redirecting...");
            reset();
            setTimeout(() => router.push("/system"), 4000);
        } catch (err) {
            toast.error("Something went wrong.");
            console.error(err);
            reset();
        } finally {
            setLoader(false);
            reset();
        }
    };

    const social = [
        {
            id: 1,
            link: "https://github.com/HarshNandigamwar",
            logo: <GithubIcon />,
        },
        {
            id: 2,
            link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1",
            logo: <LinkedinIcon />,
        },
        {
            id: 3,
            link: "https://x.com/Harsh477011?s=09",
            logo: <TwitterXIcon />,
        },
    ];

    const navLinks = [
        {label: "About", href: "#about"},
        {label: "Experience", href: "#experience"},
        {label: "Certifications", href: "#certificates"},
        {label: "Toolkit", href: "#skills"},
        {label: "Projects", href: "#projects"},
        {label: "Github", href: "#github"},
        {label: "Contact", href: "#contact"},
    ];

    return (
        <footer className="relative overflow-hidden border-t border-white/[0.07]">
            {/* Top rule (brand gradient) */}
            <motion.div
                initial={{scaleX: 0}}
                whileInView={{scaleX: 1}}
                viewport={{once: true}}
                transition={{duration: 1.2}}
                className="absolute top-0 left-0 right-0 h-px
                   bg-gradient-to-r from-transparent via-brand/50 to-transparent origin-left"
            />

            {/* Ambient glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32
                      rounded-full bg-brand/8 blur-[80px] pointer-events-none"
            />

            <div className="max-w-6xl mx-auto px-6 py-14">
                {/* Top strip: logo + nav + socials */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
                    {/* Logo */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        className="flex items-center gap-2.5 group cursor-default"
                    >
                        <div className="p-1.5 rounded-lg border border-brand/25 bg-brand/8">
                            <Terminal size={18} className="text-brand" />
                        </div>
                        <span
                            className="font-mono font-bold text-lg text-white/80
                             group-hover:text-brand transition-colors duration-300"
                        >
                            Shriharsh.dev
                        </span>
                    </motion.div>

                    {/* Nav links */}
                    <motion.nav
                        initial={{opacity: 0, y: 12}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.1}}
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                viewport={{once: true}}
                                transition={{delay: 0.15 + i * 0.06}}
                                whileHover={{color: "#22c55e"}}
                                className="font-mono text-xs text-white/35 hover:text-brand
                           uppercase tracking-[0.15em] transition-colors duration-200"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.nav>

                    {/* Social icons OR secret input */}
                    <AnimatePresence mode="wait">
                        {showSecret ? (
                            <motion.form
                                key="secret"
                                onSubmit={checkPassword}
                                initial={{opacity: 0, scale: 0.9}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.9}}
                                transition={{duration: 0.25}}
                                className="relative"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        placeholder="Enter secret code..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoFocus
                                        disabled={loader}
                                        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5
                               font-mono text-xs text-white/70 placeholder:text-white/20
                               focus:outline-none focus:border-brand/50
                               disabled:opacity-50 transition-all duration-300 w-52"
                                    />
                                    {loader && (
                                        <motion.span
                                            animate={{rotate: 360}}
                                            transition={{duration: 0.8, repeat: Infinity, ease: "linear"}}
                                            className="absolute right-3 w-3.5 h-3.5 rounded-full border-2
                                 border-brand border-t-transparent"
                                        />
                                    )}
                                </div>
                                <p className="font-mono text-[9px] text-brand/40 mt-1.5 text-center tracking-widest uppercase">🔐 Identity check</p>
                            </motion.form>
                        ) : (
                            <motion.div key="socials" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex gap-2.5">
                                {social.map((item, i) => (
                                    <SocialPill key={item.id} href={item.link} index={i}>
                                        {item.logo}
                                    </SocialPill>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{scaleX: 0}}
                    whileInView={{scaleX: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.9}}
                    className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-8"
                />

                {/* Bottom strip: copyright + status */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright — clickable for secret */}
                    <motion.p
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{delay: 0.3}}
                        onClick={handleTextClick}
                        className="font-mono text-xs text-white/25 select-none 
                       hover:text-white/40 transition-colors duration-300 text-center"
                    >
                        © {year} Designed & Built by <span className="text-brand/60">Shriharsh Nandigamwar</span>
                    </motion.p>

                    {/* Right: status + stack */}
                    <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{delay: 0.4}} className="flex items-center gap-4">
                        {/* Live status */}
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                            <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider">All systems live</span>
                        </div>

                        <span className="w-px h-3 bg-white/10" />

                        {/* Built with */}
                        <span className="font-mono text-[10px] text-white/20 uppercase tracking-wider">Built with Next.js & ❤️</span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
