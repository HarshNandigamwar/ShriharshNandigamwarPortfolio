"use client";
import {motion, useScroll, useTransform} from "framer-motion";
import Image from "next/image";
import ResumeButton from "@/components/ResumeButton";
import GithubIcon from "@/components/icons/githubIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import TwitterXIcon from "@/components/icons/twitterIcon";
import DownloadIcon from "@/components/icons/downloadIcon";
import {printConsoleSignature} from "@/Utils/printConsoleSignature";
import {useEffect, useRef} from "react";
import TypingText from "@/components/TypingText";

/* SUB COMPONENTS */

/* Grid line background */
const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Vertical lines */}
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-white/[0.03]"
                style={{left: `${(i + 1) * (100 / 13)}%`}}
                initial={{scaleY: 0}}
                animate={{scaleY: 1}}
                transition={{duration: 1.2, delay: i * 0.05, ease: "easeOut"}}
            />
        ))}
        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-white/[0.03]"
                style={{top: `${(i + 1) * (100 / 9)}%`}}
                initial={{scaleX: 0}}
                animate={{scaleX: 1}}
                transition={{duration: 1.2, delay: i * 0.06, ease: "easeOut"}}
            />
        ))}
    </div>
);

/* Glow orb */
const GlowOrb = ({className}: {className?: string}) => <div className={`absolute rounded-full blur-[120px] pointer-events-none -z-10 ${className}`} />;

/* Social pill */
const SocialPill = ({href, children, index}: {href: string; children: React.ReactNode; index: number}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.7 + index * 0.1}}
        whileHover={{scale: 1.1, y: -3}}
        whileTap={{scale: 0.95}}
        className="relative group h-12 w-12 flex items-center justify-center rounded-2xl
               border border-white/10 bg-white/5 backdrop-blur-md
               hover:border-brand/50 hover:bg-brand/10
               transition-colors duration-300 overflow-hidden cursor-pointer"
    >
        <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     bg-gradient-to-br from-brand/20 via-transparent to-transparent"
        />
        <span className="relative z-10 text-white/60 group-hover:text-brand transition-colors duration-300">{children}</span>
    </motion.a>
);

/* Stat chip */
const StatChip = ({value, label, delay}: {value: string; label: string; delay: number}) => (
    <motion.div
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay, type: "spring", stiffness: 200}}
        className="flex flex-col items-center px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
    >
        <span className="text-2xl font-bold text-brand font-mono leading-none">{value}</span>
        <span className="md:text-xs text-white/50 mt-0.5 tracking-wider uppercase">{label}</span>
    </motion.div>
);

/* MAIN COMPONENT*/
const HomePage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({target: sectionRef, offset: ["start start", "end start"]});
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Social media links
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

    // Console Signature
    useEffect(() => {
        printConsoleSignature();
    }, []);

    return (
        <section ref={sectionRef} id="home" className="relative flex flex-col md:flex-row md:items-center justify-between gap-12 overflow-hidden py-5 md:py-0 md:p-3">
            {/*Background layers*/}
            <GridBackground />
            <GlowOrb className="w-[600px] h-[600px] bg-brand/8 -left-48 top-1/2 -translate-y-1/2" />
            <GlowOrb className="w-[400px] h-[400px] bg-emerald-300/5 right-0 top-0" />

            {/* Mobile image */}
            <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7}} className="flex md:hidden items-center justify-center relative z-10">
                <div className="absolute w-48 h-48 rounded-full bg-brand/20 blur-[60px]" />
                <div className="relative">
                    <Image
                        src="/images/Shriharsh.avif"
                        priority
                        alt="Shriharsh Nandigamwar"
                        width={220}
                        height={220}
                        className="rounded-2xl object-cover border border-white/10"
                        style={{height: "auto", width: "auto"}}
                    />
                </div>
            </motion.div>

            {/* LEFT — Text content*/}
            <motion.div
                initial={{opacity: 0, x: -40}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94]}}
                className="flex-1 flex flex-col items-center md:items-start z-10"
            >
                {/* Tag line */}
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="flex items-center mb-4 md:mb-0">
                    <span className="text-brand font-mono text-sm tracking-[0.2em] uppercase">Hi, my name is</span>
                </motion.div>

                {/* Name */}
                <div className="overflow-hidden mb-2">
                    <motion.h1
                        initial={{y: "100%"}}
                        animate={{y: 0}}
                        transition={{duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}}
                        className="text-7xl md:text-9xl font-black tracking-tight text-center md:text-start
                       bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent
                       leading-none"
                    >
                        Shriharsh
                    </motion.h1>
                </div>

                {/* Typewriter role */}
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.4}} className="font-mono text-brand/80 text-lg md:text-xl mb-8 h-8 flex items-center">
                    <TypingText />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.45}}
                    className="max-w-lg text-base md:text-lg text-white/50 leading-relaxed mb-10 md:mb-5 p-2 md:p-0 text-center md:text-start"
                >
                    A Full Stack Developer passionate about crafting seamless digital experiences. Always excited to tackle new challenges where I can create value and grow as a coder.{" "}
                    <span className="text-white/70">Let's connect</span> if you've got a project that could use my skills.
                </motion.p>

                {/* Stats */}
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}} className="hidden md:flex gap-4 mb-10 flex-wrap justify-center md:justify-start">
                    ​<StatChip value="∞" label="Scalability" delay={0.55} />
                    ​<StatChip value="∞" label="Optimization" delay={0.6} />
                    <StatChip value="∞" label="Curiosity" delay={0.65} />
                </motion.div>

                {/* CTA buttons */}
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.6}} className="flex gap-4 flex-wrap justify-center md:justify-start mb-10">
                    {/* Primary */}
                    <motion.a
                        href="#projects"
                        whileHover={{scale: 1.04}}
                        whileTap={{scale: 0.97}}
                        className="relative group overflow-hidden px-8 py-3.5 rounded-full font-bold text-black bg-brand hover:scale-105 transition-transform cursor-pointer"
                    >
                        <span className="relative z-10">My Projects</span>
                        <motion.span className="absolute inset-0 bg-white/20" initial={{x: "-100%"}} whileHover={{x: "100%"}} transition={{duration: 0.4}} />
                    </motion.a>

                    {/* Secondary */}
                    <motion.a
                        href="#contact"
                        whileTap={{scale: 0.97}}
                        className="px-8 py-3.5 rounded-full font-bold border border-white/15 text-white/80
                       backdrop-blur-sm hover:text-white hover:bg-white/5 duration-300 hover:scale-105 transition-transform cursor-pointer"
                    >
                        Let's Connect
                    </motion.a>
                </motion.div>

                {/* Socials + resume */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Social Buttons */}
                    <div className="flex gap-3">
                        {social.map((item, i) => (
                            <SocialPill key={item.id} href={item.link} index={i}>
                                {item.logo}
                            </SocialPill>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-12 bg-white/10 self-center" />

                    {/* Resume */}
                    <motion.a
                        href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
                        download="ShriharshNandigamwar_FullstackDeveloper.pdf"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 1}}
                        whileTap={{scale: 0.96}}
                        className="relative group flex items-center gap-2.5 px-6 py-3 rounded-full
                       border border-brand/30 bg-brand/5 backdrop-blur-sm
                       text-white/70 hover:text-brand hover:border-brand/60 hover:scale-105 transition-transform duration-300 text-sm font-medium cursor-pointer"
                    >
                        <span>Download Resume</span>
                        <motion.span animate={{y: [0, 3, 0]}} transition={{duration: 1.5, repeat: Infinity}}>
                            <DownloadIcon size={16} className="text-brand" />
                        </motion.span>
                        {/* Glow on hover */}
                        <span
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                             transition-opacity duration-500 blur-sm bg-brand/10 -z-10"
                        />
                    </motion.a>

                    {/* Hidden desktop resume button*/}
                    <div className="hidden">
                        <ResumeButton />
                    </div>
                </div>
            </motion.div>

            {/* RIGHT — Image */}

            {/* Desktop */}
            <motion.div
                style={{y: imageY, opacity: imageOpacity}}
                initial={{opacity: 0, x: 40}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.8, delay: 0.3}}
                className="hidden md:flex flex-1 items-center justify-center relative z-10"
            >
                {/* Decorative ring */}
                <motion.div
                    animate={{rotate: 360}}
                    transition={{duration: 30, repeat: Infinity, ease: "linear"}}
                    className="absolute w-[420px] h-[420px] rounded-full border border-brand/10"
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0%, rgba(34,197,94,0.15) 50%, transparent 100%)",
                    }}
                />
                <motion.div
                    animate={{rotate: -360}}
                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                    className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-brand/10"
                />

                {/* Glow blob behind image */}
                <div className="absolute w-72 h-72 rounded-full bg-brand/25 blur-[80px] -z-10" />

                {/* Image frame */}
                <motion.div whileHover={{scale: 1.03}} transition={{type: "spring", stiffness: 200}} className="relative">
                    {/* Corner accents */}
                    {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c, i) => (
                        <span key={i} className={`absolute w-6 h-6 border-brand/50 ${c} ${i === 0 ? "rounded-tl-lg" : i === 1 ? "rounded-tr-lg" : i === 2 ? "rounded-bl-lg" : "rounded-br-lg"}`} />
                    ))}

                    <Image
                        src="/images/ShriharshImageWBG.avif"
                        priority
                        alt="Shriharsh Nandigamwar"
                        width={420}
                        height={420}
                        loading="eager"
                        className="w-[380px] h-auto object-cover rounded-3xl"
                        style={{height: "auto"}}
                    />

                    {/* Gradient overlay at bottom*/}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-20 rounded-b-3xl
                          bg-gradient-to-t from-black/40 to-transparent"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HomePage;
