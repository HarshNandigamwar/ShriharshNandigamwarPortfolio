"use client";
import {motion, useInView, useScroll, useTransform} from "framer-motion";
import {Calendar} from "lucide-react";
import Image from "next/image";
import {useRef, useState} from "react";
import ShieldCheck from "@/components/icons/shieldIcon";
import DownloadIcon from "@/components/icons/downloadIcon";
import ExternalLinkIcon from "@/components/icons/linkIcon";

/* Data */
const responsibilities = [
    "Developed and optimized responsive front-end components using HTML and CSS.",
    "Collaborated on version control and deployment workflows using Git and Vercel.",
    "Ensured high performance and accessibility standards across multiple devices.",
    "The project is successfully deployed and accessible online.",
];

const techUsed = ["HTML", "CSS", "Git", "Github", "Vercel", "JavaScript"];

/* Helpers */

/* Animated counter for the timeline year */
const PulsingDot = () => (
    <div className="relative flex items-center justify-center">
        <motion.div animate={{scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5]}} transition={{duration: 2.5, repeat: Infinity}} className="absolute w-8 h-8 rounded-full bg-brand/30" />
        <motion.div animate={{scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7]}} transition={{duration: 2, repeat: Infinity}} className="absolute w-5 h-5 rounded-full bg-brand/20" />
        <div className="relative w-3.5 h-3.5 rounded-full bg-brand shadow-[0_0_14px_4px_rgba(34,197,94,0.6)]" />
    </div>
);

/* Responsibility list item */
const ResponsibilityItem = ({text, index}: {text: string; index: number}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.li
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: 0.15 + index * 0.1, duration: 0.5}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group flex items-start gap-3 cursor-default"
        >
            <motion.span animate={{x: hovered ? 4 : 0, color: hovered ? "#22c55e" : "rgba(34,197,94,0.6)"}} transition={{duration: 0.2}} className="text-brand/60 mt-1 text-xs select-none shrink-0">
                ▹
            </motion.span>
            <motion.span animate={{color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)"}} transition={{duration: 0.2}} className="text-sm md:text-base leading-relaxed">
                {text}
            </motion.span>
        </motion.li>
    );
};

/* Tech pill */
const TechPill = ({name, index}: {name: string; index: number}) => (
    <motion.span
        initial={{opacity: 0, scale: 0.7}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        transition={{delay: 0.4 + index * 0.06, type: "spring", stiffness: 260}}
        whileHover={{scale: 1.1, backgroundColor: "rgba(34,197,94,0.15)"}}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg
               border border-white/10 bg-white/[0.04] text-white/50
               font-mono text-xs tracking-wide transition-colors duration-200"
    >
        <span className="w-1 h-1 rounded-full bg-brand/70" />
        {name}
    </motion.span>
);

/* MAIN COMPONENT */

export default function ExperiencePage() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, {once: true, margin: "-60px"});
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    /* Timeline line draw */
    const lineH = useTransform(scrollYProgress, [0.05, 0.6], ["0%", "100%"]);

    return (
        <section ref={sectionRef} id="experience" className="relative py-10 md:py-16 overflow-hidden">
            {/* Background atmosphere */}
            <motion.div
                style={{y: bgY}}
                className="absolute right-0 top-1/4 w-[450px] h-[450px]
                   rounded-full bg-brand/6 blur-[140px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY}}
                className="absolute -left-32 bottom-0 w-[300px] h-[300px]
                   rounded-full bg-emerald-300/4 blur-[100px] pointer-events-none -z-10"
            />

            <div className="mx-auto px-6 ">
                {/* Section Header */}
                <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="mb-20">
                    <div className="flex items-end gap-6">
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight
                           bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-none"
                        >
                            Experience
                        </h2>
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent origin-left mb-2"
                        />
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative flex gap-8 md:gap-14">
                    {/* Left: animated timeline line */}
                    <div className="relative flex flex-col items-center pt-1 shrink-0">
                        <PulsingDot />
                        {/* Growing line */}
                        <div className="relative w-px flex-1 mt-4 bg-white/[0.06] overflow-hidden rounded-full">
                            <motion.div style={{height: lineH}} className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand/60 to-brand/10 rounded-full" />
                        </div>
                        {/* End dot */}
                        <motion.div initial={{scale: 0}} whileInView={{scale: 1}} viewport={{once: true}} transition={{delay: 0.8}} className="w-2 h-2 rounded-full bg-brand/40 mt-2" />
                    </div>

                    {/* Right: card */}
                    <div ref={cardRef} className="flex-1 pb-12">
                        {/* Role header */}
                        <motion.div initial={{opacity: 0, y: 20}} animate={isInView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="mb-8">
                            {/* Date badge */}
                            <motion.div
                                initial={{opacity: 0, x: 20}}
                                animate={isInView ? {opacity: 1, x: 0} : {}}
                                transition={{delay: 0.1}}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-brand/25 bg-brand/8 backdrop-blur-sm mb-4"
                            >
                                <Calendar size={12} className="text-brand" />
                                <span className="font-mono text-xs text-brand tracking-wide">Feb 2025 – Mar 2025</span>
                            </motion.div>

                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">Web Development Intern</h3>
                            <div className="flex items-center gap-2">
                                <motion.span animate={{scale: [1, 1.3, 1]}} transition={{duration: 2, repeat: Infinity}} className="w-1.5 h-1.5 rounded-full bg-brand" />
                                <p className="text-brand/80 font-mono text-sm tracking-wider">SkillCraft Technology</p>
                            </div>
                        </motion.div>

                        {/* Main card */}
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={isInView ? {opacity: 1, y: 0} : {}}
                            transition={{delay: 0.2, duration: 0.6}}
                            className="relative rounded-2xl border border-white/10 bg-white/[0.03]
                         backdrop-blur-sm overflow-hidden p-6 md:p-8 mb-6 group max-w-5xl"
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                            />

                            {/* Top accent */}
                            <motion.div
                                initial={{scaleX: 0}}
                                animate={isInView ? {scaleX: 1} : {}}
                                transition={{delay: 0.4, duration: 0.8}}
                                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/60 via-brand/30 to-transparent origin-left"
                            />

                            {/* Description */}
                            <motion.p
                                initial={{opacity: 0}}
                                animate={isInView ? {opacity: 1} : {}}
                                transition={{delay: 0.3}}
                                className="text-white/50 text-sm md:text-base leading-relaxed mb-6 border-l-2 border-brand/30 pl-4 italic"
                            >
                                Developed multiple interactive and user-friendly web applications that enhance user experience and functionality focusing on responsiveness, usability, and efficiency.
                            </motion.p>

                            {/* Responsibilities */}
                            <ul className="space-y-3 mb-6">
                                {responsibilities.map((task, idx) => (
                                    <ResponsibilityItem key={idx} text={task} index={idx} />
                                ))}
                            </ul>

                            {/* Tech pills */}
                            <div>
                                <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.2em] mb-3">Technologies</p>
                                <div className="flex flex-wrap gap-2">
                                    {techUsed.map((t, i) => (
                                        <TechPill key={t} name={t} index={i} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Certificate card */}
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={isInView ? {opacity: 1, y: 0} : {}}
                            transition={{delay: 0.45, duration: 0.6}}
                            className="relative rounded-2xl border border-brand/20 bg-white/[0.02]
                         backdrop-blur-sm overflow-hidden p-6 group max-w-2xl"
                        >
                            {/* Corner glow */}
                            <div
                                className="absolute top-0 left-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl -z-10
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <motion.div
                                initial={{scaleX: 0}}
                                animate={isInView ? {scaleX: 1} : {}}
                                transition={{delay: 0.6, duration: 0.8}}
                                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/50 to-transparent origin-left"
                            />

                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                {/* Certificate image */}
                                <motion.div
                                    whileHover={{scale: 1.03}}
                                    className="relative w-full md:w-44 shrink-0 rounded-xl overflow-hidden
                             border border-white/10 aspect-video md:aspect-auto md:h-28 group/img"
                                >
                                    <Image
                                        src="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029277/certificate_u1uqqd.png"
                                        alt="SkillCraft Certificate"
                                        fill
                                        loading="lazy"
                                        className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay link */}
                                    <a
                                        href="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029277/certificate_u1uqqd.png"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1
                               opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                                    >
                                        <ExternalLinkIcon className="text-brand" size={20} />
                                        <span className="font-mono text-[10px] text-white/70 tracking-wider">View</span>
                                    </a>
                                </motion.div>

                                {/* Certificate info */}
                                <div className="flex-1 space-y-3 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <ShieldCheck size={14} className="text-brand" />
                                        <span className="font-mono text-xs text-brand uppercase tracking-[0.2em] font-bold">Verified Credential</span>
                                    </div>

                                    <div>
                                        <p className="text-white font-semibold text-sm">Web Development Internship</p>
                                        <p className="font-mono text-xs text-white/35 mt-0.5">ID: SCT/FEB25/5707</p>
                                    </div>

                                    <motion.a
                                        href="/documents/SkillCraft Tecnology Certificate & Letter of Recommendation.pdf"
                                        download="SkillCraft Tecnology Certificate & Letter of Recommendation.pdf"
                                        whileHover={{scale: 1.04, y: -2}}
                                        whileTap={{scale: 0.96}}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                               border border-brand/35 bg-brand/8 text-brand
                               font-medium text-xs tracking-wide
                               hover:border-brand/60 hover:bg-brand/15
                               transition-colors duration-300 cursor-pointer"
                                    >
                                        <span>Download Certificate</span>
                                        <motion.span animate={{y: [0, 3, 0]}} transition={{duration: 1.5, repeat: Infinity}}>
                                            <DownloadIcon size={14} className="text-brand" />
                                        </motion.span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
