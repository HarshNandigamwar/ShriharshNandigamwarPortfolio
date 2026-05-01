// "use client";
// import {motion} from "framer-motion";
// import {GraduationCap} from "lucide-react";
// import CodeIcon from "@/components/icons/codeIcon";
// import RosetteDiscountCheckIcon from "@/components/icons/discountIcon";
// import Image from "next/image";

// const stats = [
//     {
//         label: "Experience",
//         value: "Internship",
//         icon: GraduationCap,
//         link: "#experience",
//     },
//     {label: "Projects", value: "3+", icon: CodeIcon, link: "#projects"},
//     {
//         label: "Certificates",
//         value: "won",
//         icon: RosetteDiscountCheckIcon,
//         link: "#certificates",
//     },
// ];

// export default function AboutPage() {
//     return (
//         <section id="about" className="py-24 overflow-hidden">
//             <div className="mx-auto px-6">
//                 {/* Section Header */}
//                 <div className="flex items-center gap-4 mb-16">
//                     <h2 className="text-4xl font-bold text-brand">About Me</h2>
//                     <div className="h-[1px] bg-brand/20 flex-grow" />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-16 items-center">
//                     {/* Image */}
//                     <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.6}} className="relative hidden md:flex justify-center">
//                         <div className="absolute w-64 md:w-94 h-64 md:h-94 bg-[#22c55e] rounded-full blur-[80px] opacity-20 -z-10 " />
//                         {/* Image Container */}
//                         <div className="relative z-10 w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
//                             <Image src="/images/harsh.avif" alt="Shriharsh Nandigamwar" loading="lazy" width={500} height={500} className="w-full h-full object-cover" />
//                         </div>
//                     </motion.div>

//                     {/* Right Side: Content */}
//                     <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.6, delay: 0.2}}>
//                         <p className="text-lg opacity-80 leading-relaxed mb-6">
//                             Hello! I'm <span className="text-brand font-bold">Shriharsh Nandigamwar</span>, a dedicated Full Stack Developer with a strong passion for building fast, functional, and
//                             visually engaging web applications.
//                         </p>
//                         <p className="text-lg opacity-80 leading-relaxed mb-8">
//                             My journey in tech is fueled by a curiosity for real-world problem solving. I specialize in the
//                             <span className=" font-semibold text-brand "> MERN Stack</span> and <span className=" font-semibold text-brand ">Next.js</span>, focusing on clean code and intuitive user
//                             experiences.
//                         </p>

//                         {/* Quick Stats Grid */}
//                         <div className="grid grid-cols-3 gap-4">
//                             {stats.map((stat, idx) => {
//                                 const Icon = stat.icon;
//                                 return (
//                                     <motion.a
//                                         href={stat.link}
//                                         initial={{opacity: 0, y: 20}}
//                                         whileInView={{opacity: 1, y: 0}}
//                                         transition={{duration: 0.3, delay: idx * 0.1}}
//                                         whileHover={{scale: 1.05}}
//                                         whileTap={{scale: 0.95}}
//                                         key={idx}
//                                         title={`Click to explore ${stat.label}`}
//                                         className="p-2 md:p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-white/10 text-center hover:border-brand/50 transition-colors cursor-pointer "
//                                     >
//                                         <Icon className="text-brand mx-auto mb-2" size={20} />
//                                         <div className="md:text-xl text-center font-bold">{stat.value}</div>
//                                         <div className="text-[10px] uppercase tracking-widest opacity-50">{stat.label}</div>
//                                     </motion.a>
//                                 );
//                             })}
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";
import {motion, useInView, useScroll, useTransform} from "framer-motion";
import {GraduationCap} from "lucide-react";
import Image from "next/image";
import {useRef, useState} from "react";
import CodeIcon from "@/components/icons/codeIcon";
import RosetteDiscountCheckIcon from "@/components/icons/discountIcon";

/* Data */
const stats = [
    {
        label: "Experience",
        value: "Internship",
        icon: GraduationCap,
        link: "#experience",
    },
    {
        label: "Projects",
        value: "4+",
        icon: CodeIcon,
        link: "#projects",
    },
    {
        label: "Certificates",
        value: "Won",
        icon: RosetteDiscountCheckIcon,
        link: "#certificates",
    },
];

const skills = ["React", "Next.js", "Node.js", "JavaScript", "TypeScript", "MongoDB", "Express", "Tailwind", "Git", "Github"];

/* Helpers */

/* Animated section number / label */
const SectionLabel = ({number, label}: {number: string; label: string}) => (
    <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-brand/60 tracking-[0.3em] uppercase">{number}</span>
        <span className="w-6 h-px bg-brand/30" />
        <span className="font-mono text-xs text-white/30 tracking-[0.25em] uppercase">{label}</span>
    </div>
);

/* Scanline overlay — purely decorative */
const Scanlines = () => (
    <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
        }}
    />
);

/* Skill pill */
const SkillPill = ({name, index}: {name: string; index: number}) => (
    <motion.span
        initial={{opacity: 0, scale: 0.8}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        transition={{delay: 0.05 * index, type: "spring", stiffness: 260}}
        whileHover={{scale: 1.08, backgroundColor: "rgba(34,197,94,0.15)"}}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
               border border-white/10 bg-white/[0.04] text-white/60
               font-mono text-xs tracking-wide cursor-default transition-colors duration-200"
    >
        <span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
        {name}
    </motion.span>
);

/* Stat card with hover glow */
const StatCard = ({stat, index}: {stat: (typeof stats)[0]; index: number}) => {
    const Icon = stat.icon;
    const [hovered, setHovered] = useState(false);

    return (
        <motion.a
            href={stat.link}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.1 + index * 0.12, duration: 0.5, ease: "easeOut"}}
            whileHover={{y: -4}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative group flex flex-col items-center gap-2 p-5 rounded-2xl
                 border border-white/10 bg-white/[0.03] backdrop-blur-sm
                 hover:border-brand/40 transition-colors duration-300 overflow-hidden cursor-pointer"
        >
            {/* Glow */}
            <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.3}} className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent -z-10" />
            {/* Top accent line */}
            <motion.div animate={{scaleX: hovered ? 1 : 0}} transition={{duration: 0.3}} className="absolute top-0 left-0 right-0 h-px bg-brand origin-left" />

            {/* Icon */}
            <div>
                <Icon className="text-brand" size={22} />
            </div>

            <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">{stat.label}</div>
        </motion.a>
    );
};

/* MAIN COMPONENT */
export default function AboutPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const isImageInView = useInView(imageRef, {once: true, margin: "-80px"});
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section ref={sectionRef} id="about" className="relative py-10 md:py-16 overflow-hidden">
            {/* Background atmosphere */}
            <Scanlines />

            {/* Moving gradient blob */}
            <motion.div
                style={{y: bgY}}
                className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px]
                   rounded-full bg-brand/6 blur-[140px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY}}
                className="absolute -right-20 bottom-0 w-[300px] h-[300px]
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
                            About Me
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

                {/* Main grid */}
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* LEFT — Image column */}
                    <div ref={imageRef} className="hidden md:block relative">
                        {/* Large name watermark */}
                        <motion.span
                            initial={{opacity: 0}}
                            animate={isImageInView ? {opacity: 1} : {}}
                            transition={{delay: 0.4}}
                            className="absolute -top-10 -left-4 font-mono font-black text-[10rem] leading-none
                         text-white/[0.03] select-none pointer-events-none z-0"
                        >
                            SN
                        </motion.span>

                        {/* Image wrapper */}
                        <motion.div
                            initial={{opacity: 0, x: -40, rotate: -2}}
                            animate={isImageInView ? {opacity: 1, x: 0, rotate: 0} : {}}
                            transition={{duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94]}}
                            className="relative z-10"
                        >
                            {/* Glow behind */}
                            <div className="absolute -inset-4 rounded-3xl bg-brand/10 blur-2xl -z-10" />

                            {/* Photo */}
                            <div
                                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden
                              border border-white/10 group"
                            >
                                <Image
                                    src="/images/harsh.avif"
                                    alt="Shriharsh Nandigamwar"
                                    fill
                                    loading="lazy"
                                    className="object-cover grayscale group-hover:grayscale-0
                             scale-105 group-hover:scale-100
                             transition-all duration-700 ease-out"
                                />

                                {/* Tint overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10
                                group-hover:opacity-60 transition-opacity duration-500"
                                />
                                {/* Brand colour wash on hover */}
                                <div
                                    className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100
                                mix-blend-color transition-opacity duration-500"
                                />

                                {/* Bottom label */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 p-5 translate-y-2
                                group-hover:translate-y-0 transition-transform duration-500"
                                >
                                    <p className="font-mono text-xs text-brand/80 tracking-widest uppercase">Full Stack Developer</p>
                                    <p className="text-white font-semibold text-lg mt-0.5">Shriharsh Nandigamwar</p>
                                </div>
                            </div>

                            {/* Decorative corner brackets */}
                            {[
                                "top-2 left-2 border-t-2 border-l-2 rounded-tl-lg",
                                "top-2 right-2 border-t-2 border-r-2 rounded-tr-lg",
                                "bottom-2 left-2 border-b-2 border-l-2 rounded-bl-lg",
                                "bottom-2 right-2 border-b-2 border-r-2 rounded-br-lg",
                            ].map((c, i) => (
                                <motion.span
                                    key={i}
                                    initial={{opacity: 0, scale: 0.5}}
                                    animate={isImageInView ? {opacity: 1, scale: 1} : {}}
                                    transition={{delay: 0.6 + i * 0.08}}
                                    className={`absolute w-5 h-5 border-brand/60 ${c} pointer-events-none`}
                                />
                            ))}
                        </motion.div>

                        {/* Floating tech badge */}
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={isImageInView ? {opacity: 1, x: 0} : {}}
                            transition={{delay: 0.9, type: "spring", stiffness: 180}}
                            className="absolute -right-6 top-1/3 flex flex-col gap-1.5 px-4 py-3
                         rounded-xl border border-brand/30 bg-black/80 backdrop-blur-md z-20"
                        >
                            <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">Specialises in</span>
                            {["MERN Stack", "Next.js", "REST APIs"].map((t) => (
                                <span key={t} className="flex items-center gap-1.5 text-xs text-white/70">
                                    <span className="w-1 h-1 rounded-full bg-brand" />
                                    {t}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT — Content column */}
                    <motion.div initial={{opacity: 0, x: 40}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.7, delay: 0.15}} className="flex flex-col gap-8">
                        {/* Bio paragraphs */}
                        <div className="space-y-5">
                            {[
                                <>
                                    Hello! I'm <span className="text-brand font-bold">Shriharsh Nandigamwar</span>, a dedicated Full Stack Developer with a strong passion for building fast,
                                    functional, and visually engaging web applications.
                                </>,
                                <>
                                    My journey in tech is fueled by a curiosity for real-world problem solving. I specialise in the <span className="text-brand font-semibold">MERN Stack</span> and{" "}
                                    <span className="text-brand font-semibold">Next.js</span>, focusing on clean code and intuitive user experiences.
                                </>,
                            ].map((para, i) => (
                                <motion.p
                                    key={i}
                                    initial={{opacity: 0, y: 16}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{delay: 0.2 + i * 0.12}}
                                    className="text-base md:text-lg text-white/55 leading-relaxed"
                                >
                                    {para}
                                </motion.p>
                            ))}
                        </div>

                        {/* Skill pills */}
                        <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{delay: 0.35}}>
                            <p className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] mb-3">Tech I work with</p>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s, i) => (
                                    <SkillPill key={s} name={s} index={i} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, delay: 0.4}}
                            className="h-px bg-gradient-to-r from-brand/20 via-white/10 to-transparent origin-left"
                        />

                        {/* Stat cards */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, idx) => (
                                <StatCard key={idx} stat={stat} index={idx} />
                            ))}
                        </div>

                        {/* Contact - Project Buttons */}
                        <motion.div initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.55}} className="flex flex-wrap gap-4 items-center">
                            {/* Contact Button */}
                            <motion.a
                                href="#contact"
                                whileHover={{scale: 1.04}}
                                whileTap={{scale: 0.97}}
                                className="relative overflow-hidden px-6 py-3 rounded-full font-bold text-black
                           bg-brand text-sm cursor-pointer"
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <motion.span className="absolute inset-0 bg-white/25" initial={{x: "-100%"}} whileHover={{x: "100%"}} transition={{duration: 0.35}} />
                            </motion.a>

                            {/* Projects Button */}
                            <motion.a
                                href="#projects"
                                whileHover={{scale: 1.04, borderColor: "rgba(34,197,94,0.5)"}}
                                whileTap={{scale: 0.97}}
                                className="px-6 py-3 rounded-full font-bold border border-white/15
                           text-white/70 hover:text-white text-sm backdrop-blur-sm
                           transition-colors duration-300 cursor-pointer"
                            >
                                See My Work
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
