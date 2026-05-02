"use client";
import {motion, useScroll, useTransform} from "framer-motion";
import {Wrench, Cpu, Globe, Zap} from "lucide-react";
import {useRef, useState} from "react";
import TerminalIcon from "@/components/icons/terminalIcon";
import StackIcon from "@/components/icons/stackIcon";
import Cloud3Icon from "@/components/icons/cloudeIcon";
import GridBackground from "@/components/UI/GridBackground";
import SkillPill from "@/components/UI/SkillPill";

export default function SkillsPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const bgY2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

    const skillCategories = [
        {
            title: "Frontend Development",
            icon: StackIcon,
            description: "Crafting responsive, high-performance user interfaces.",
            skills: ["Next.js", "React.js", "JavaScript", "TypeScript", "Tailwind CSS", "Redux Toolkit", "HTML5", "CSS3"],
            accentColor: "#22c55e",
            index: 0,
        },
        {
            title: "Backend & Database",
            icon: Cloud3Icon,
            description: "Building scalable server-side logic and managing data.",
            skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Firebase", "REST APIs"],
            accentColor: "#34d399",
            index: 1,
        },
        {
            title: "DevOps & Tools",
            icon: Wrench,
            description: "Streamlining development and deployment workflows.",
            skills: ["Git", "GitHub", "Postman", "Vercel", "Netlify", "Render"],
            accentColor: "#6ee7b7",
            index: 2,
        },
    ];

    const techFeatures = [
        {icon: TerminalIcon, text: "Clean Code"},
        {icon: Zap, text: "Performance"},
        {icon: Globe, text: "SEO Ready"},
        {icon: Cpu, text: "Scalability"},
    ];

    const duplicated = [...techFeatures, ...techFeatures, ...techFeatures];

    /* Skill category card */
    const SkillCard = ({cat}: {cat: (typeof skillCategories)[0]}) => {
        const [hovered, setHovered] = useState(false);
        const Icon = cat.icon;

        return (
            <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: 0.1 + cat.index * 0.12, duration: 0.6, ease: "easeOut"}}
                whileHover={{y: -8}}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03]
                 backdrop-blur-sm overflow-hidden p-7 flex flex-col gap-5 group"
            >
                {/* Animated glow */}
                <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.4}} className="absolute inset-0 bg-gradient-to-br from-brand/8 via-transparent to-transparent -z-10" />

                {/* Top accent bar */}
                <motion.div
                    animate={{scaleX: hovered ? 1 : 0}}
                    transition={{duration: 0.4}}
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/80 via-brand/40 to-transparent origin-left"
                />

                {/* Corner number */}
                <span
                    className="absolute top-4 right-5 font-mono text-4xl font-black
                       text-white/[0.04] select-none pointer-events-none leading-none"
                >
                    {String(cat.index + 1).padStart(2, "0")}
                </span>

                {/* Icon box */}
                <div
                    className="w-12 h-12 rounded-xl border border-brand/25 bg-brand/8
                   flex items-center justify-center shrink-0"
                >
                    <Icon className="text-brand" size={22} />
                </div>

                {/* Title + description */}
                <div>
                    <h3 className="text-xl font-bold text-white/90 mb-1.5 tracking-tight">{cat.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{cat.description}</p>
                </div>

                {/* Divider */}
                <motion.div animate={{scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.3}} transition={{duration: 0.4}} className="h-px bg-gradient-to-r from-brand/30 to-transparent origin-left" />

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, i) => (
                        <SkillPill key={skill} name={skill} index={i} />
                    ))}
                </div>
            </motion.div>
        );
    };

    /* Marquee feature chip */
    const FeatureChip = ({item, index}: {item: (typeof techFeatures)[0]; index: number}) => {
        const Icon = item.icon;
        return (
            <div
                className="relative flex items-center gap-3 px-6 py-3.5 rounded-2xl shrink-0
                 border border-white/10 bg-white/[0.03] backdrop-blur-sm
                 hover:border-brand/40 transition-colors duration-300 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand/8 to-transparent -z-10" />
                <div className="text-brand shrink-0">
                    <Icon size={16} />
                </div>
                <span className="font-mono text-sm text-white/60 whitespace-nowrap group-hover:text-white">{item.text}</span>
            </div>
        );
    };

    return (
        <section ref={sectionRef} id="skills" className="relative py-10 md:py-16 overflow-hidden">
            {/* Background atmosphere */}
            <GridBackground />
            <motion.div
                style={{y: bgY}}
                className="absolute -left-40 top-1/3 w-[480px] h-[480px]
                   rounded-full bg-brand/6 blur-[150px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY2}}
                className="absolute -right-20 bottom-1/4 w-[320px] h-[320px]
                   rounded-full bg-emerald-300/4 blur-[120px] pointer-events-none -z-10"
            />

            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.018]"
                style={{
                    backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="mx-auto px-3">
                {/* Section Header */}
                <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="mb-20">
                    <div className="flex items-end gap-6 mb-4">
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight
                           bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-none"
                        >
                            Toolkit
                        </h2>
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent origin-left mb-2"
                        />
                    </div>
                    <p className="max-w-lg text-white/40 text-sm md:text-base leading-relaxed">A comprehensive overview of my technical stack and the tools I use to bring digital ideas to life.</p>
                </motion.div>

                {/* Skill Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {skillCategories.map((cat) => (
                        <SkillCard key={cat.title} cat={cat} />
                    ))}
                </div>

                {/* Stats strip */}
                <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.3}} className="grid grid-cols-3 gap-4 mb-10">
                    {[
                        {value: "14+", label: "Technologies"},
                        {value: "3", label: "Domains"},
                        {value: "∞", label: "Learning"},
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{delay: 0.1 + i * 0.1, type: "spring", stiffness: 200}}
                            className="flex flex-col items-center py-5 rounded-2xl border border-white/10
                         bg-white/[0.02] backdrop-blur-sm"
                        >
                            <span className="text-3xl font-black text-brand font-mono leading-none mb-1">{s.value}</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">{s.label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Marquee strip (desktop) */}
                <div className="hidden md:block">
                    <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.25em] mb-5 text-center">Engineering Principles</p>
                    <div className="relative overflow-hidden">
                        {/* Fade edges */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-24 z-10
                            bg-gradient-to-r from-black to-transparent pointer-events-none"
                        />
                        <div
                            className="absolute right-0 top-0 bottom-0 w-24 z-10
                            bg-gradient-to-l from-black to-transparent pointer-events-none"
                        />

                        <motion.div className="flex gap-4 w-max" animate={{x: ["0%", "-33.333%"]}} transition={{duration: 18, ease: "linear", repeat: Infinity}}>
                            {duplicated.map((item, idx) => (
                                <FeatureChip key={idx} item={item} index={idx} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Feature grid (mobile) */}
                <div className="md:hidden grid grid-cols-2 gap-3">
                    {techFeatures.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 16}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.05 * idx}}
                                className="flex items-center gap-3 p-4 rounded-2xl border border-white/10
                           bg-white/[0.03] backdrop-blur-sm"
                            >
                                <div className="text-brand shrink-0">
                                    <Icon size={16} />
                                </div>
                                <span className="font-mono text-sm text-white/55">{item.text}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
