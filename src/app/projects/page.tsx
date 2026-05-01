"use client";
import {motion, useScroll, useTransform} from "framer-motion";
import Image from "next/image";
import {useRef, useState} from "react";
import ExternalLinkIcon from "@/components/icons/linkIcon";
import GithubIcon from "@/components/icons/githubIcon";

/* Data */
const projects = [
    {
        title: "CodeMates",
        description: "A high-performance social networking platform for developers. Share technical insights, network with peers, and collaborate in real-time.",
        tech: ["NextJS", "TypeScript", "Redux Toolkit", "Socket.io", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
        github: "https://github.com/HarshNandigamwar/CodeMates-Frontend",
        githubbackend: "https://github.com/HarshNandigamwar/CodeMates-Backend",
        live: "https://codematesapp.vercel.app",
        image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1771158619/STR_Dating_apps_blog_post_2024_V.1.0_hhuvbq.webp",
        featured: true,
        category: "Full Stack",
    },
    {
        title: "Sigma AI",
        description: "An advanced AI-powered chatbot built with Next.js and the Gemini API. Smart, responsive, and context-aware conversations in a beautifully styled web app.",
        tech: ["NextJS", "TypeScript", "Gemini-API", "Tailwind CSS", "Motion"],
        github: "https://github.com/HarshNandigamwar/SigmaAi",
        live: "https://sigma-ai-shriharsh.vercel.app/",
        image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/SigmaAI1_rv1xux.png",
        featured: true,
        category: "AI / Frontend",
    },
    {
        title: "E-Commerce App",
        description: "A full-stack e-commerce web application built with React.js and Firebase, delivering a smooth and engaging shopping experience.",
        tech: ["React.js", "Firebase", "Tailwind CSS", "DummyJSON API", "Axios"],
        github: "https://github.com/HarshNandigamwar/SigmaMart",
        live: "https://sigma-mart.vercel.app",
        image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761028463/Ecom1_tdmejk.png",
        featured: false,
        category: "Full Stack",
    },
    {
        title: "Weather App",
        description: "Check the weather forecast anytime, anywhere. Accurate and up-to-date weather updates for any location worldwide.",
        tech: ["HTML", "Tailwind CSS", "JavaScript", "Weather API"],
        github: "https://github.com/HarshNandigamwar/Weather-App",
        live: "https://weather-app-shriharsh.netlify.app",
        image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761028344/weather3_jqtyt7.jpg",
        featured: false,
        category: "Frontend",
    },
    {
        title: "Currency Converter",
        description: "Quickly convert currencies on the go with up-to-date exchange rates for countries worldwide.",
        tech: ["HTML", "Tailwind CSS", "JavaScript", "Currency API"],
        github: "https://github.com/HarshNandigamwar/Currency-Converter",
        live: "https://shriharsh-currency-converter.netlify.app",
        image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761028243/Currency_Converter2_xi1lkh.png",
        featured: false,
        category: "Frontend",
    },
];

/* Helpers */

/* Tech pill */
const TechPill = ({name, index}: {name: string; index: number}) => (
    <motion.span
        initial={{opacity: 0, scale: 0.75}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        transition={{delay: 0.03 * index, type: "spring", stiffness: 250}}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md
               border border-white/8 bg-white/[0.04] text-white/45
               font-mono text-[10px] uppercase tracking-wider"
    >
        {name}
    </motion.span>
);

/* Featured project card (large) */
const FeaturedCard = ({project, index}: {project: (typeof projects)[0]; index: number}) => {
    const [hovered, setHovered] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: index * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94]}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative group rounded-2xl border border-white/10 bg-white/[0.02]
                 backdrop-blur-sm overflow-hidden grid md:grid-cols-2 min-h-[360px]"
        >
            {/* Ambient glow */}
            <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.4}} className="absolute inset-0 bg-gradient-to-br from-brand/6 via-transparent to-transparent -z-10" />

            {/* Top accent */}
            <motion.div
                animate={{scaleX: hovered ? 1 : 0}}
                transition={{duration: 0.5}}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/80 via-brand/30 to-transparent origin-left z-10"
            />

            {/* Image side */}
            <div className={`relative overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}>
                <Image src={project.image} alt={project.title} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r from-transparent to-black/60" : "bg-gradient-to-l from-transparent to-black/60"}`} />
            </div>

            {/* Content side */}
            <div
                className={`flex flex-col justify-center p-7 md:p-10 gap-5
                       ${isEven ? "md:order-2" : "md:order-1"}`}
            >
                {/* Title */}
                <h3
                    className="text-2xl md:text-3xl font-black text-white/90 tracking-tight leading-tight
                       group-hover:text-brand transition-colors duration-300"
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/45 leading-relaxed">{project.description}</p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map((t, i) => (
                        <TechPill key={t} name={t} index={i} />
                    ))}
                    {project.tech.length > 6 && (
                        <span
                            className="inline-flex items-center px-2.5 py-1 rounded-md
                             border border-white/8 text-white/25 font-mono text-[10px]"
                        >
                            +{project.tech.length - 6}
                        </span>
                    )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1">
                    <motion.a
                        href={project.live}
                        target="_blank"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.96}}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       bg-brand text-black font-bold text-xs tracking-wide
                       hover:bg-brand/90 transition-colors duration-200 cursor-pointer"
                    >
                        Live Demo
                        <ExternalLinkIcon size={12} />
                    </motion.a>
                    <motion.a
                        href={project.github}
                        target="_blank"
                        whileHover={{scale: 1.08, color: "#22c55e"}}
                        whileTap={{scale: 0.95}}
                        className="text-white/40 hover:text-brand transition-colors duration-200 cursor-pointer"
                        title="Frontend source"
                    >
                        <GithubIcon size={20} />
                    </motion.a>
                    {project.githubbackend && (
                        <motion.a
                            href={project.githubbackend}
                            target="_blank"
                            whileHover={{scale: 1.08, color: "#22c55e"}}
                            whileTap={{scale: 0.95}}
                            className="text-white/40 hover:text-brand transition-colors duration-200 cursor-pointer"
                            title="Backend source"
                        >
                            <span className="flex items-center gap-1">
                                <GithubIcon size={20} />
                            </span>
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* Small project card */
const SmallCard = ({project, index}: {project: (typeof projects)[0]; index: number}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: index * 0.1, duration: 0.55, ease: "easeOut"}}
            whileHover={{y: -8}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative group rounded-2xl border border-white/10 bg-white/[0.02]
                 backdrop-blur-sm overflow-hidden flex flex-col"
        >
            {/* Glow */}
            <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.35}} className="absolute inset-0 bg-gradient-to-br from-brand/6 via-transparent to-transparent -z-10" />
            {/* Top accent */}
            <motion.div
                animate={{scaleX: hovered ? 1 : 0}}
                transition={{duration: 0.4}}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/70 to-transparent origin-left z-10"
            />

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image src={project.image} alt={project.title} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Title + links row */}
                <div className="flex items-start justify-between gap-3">
                    <h3
                        className="text-lg font-bold text-white/90 tracking-tight
                         group-hover:text-brand transition-colors duration-300 leading-snug"
                    >
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2.5 shrink-0 mt-0.5">
                        <motion.a
                            href={project.github}
                            target="_blank"
                            whileHover={{scale: 1.15, color: "#22c55e"}}
                            className="text-white/35 hover:text-brand transition-colors cursor-pointer"
                            title="Source code"
                        >
                            <GithubIcon size={17} />
                        </motion.a>
                        <motion.a
                            href={project.live}
                            target="_blank"
                            whileHover={{scale: 1.15, color: "#22c55e"}}
                            className="text-white/35 hover:text-brand transition-colors cursor-pointer"
                            title="Live demo"
                        >
                            <ExternalLinkIcon size={17} />
                        </motion.a>
                    </div>
                </div>

                <p className="text-xs text-white/40 leading-relaxed flex-1">{project.description}</p>

                {/* Divider */}
                <motion.div
                    animate={{scaleX: hovered ? 1 : 0.3, opacity: hovered ? 0.6 : 0.2}}
                    transition={{duration: 0.4}}
                    className="h-px bg-gradient-to-r from-brand/40 to-transparent origin-left"
                />

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                        <TechPill key={t} name={t} index={i} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* MAIN COMPONENT */
export default function ProjectsPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    return (
        <section ref={sectionRef} id="projects" className="relative py-10 md:py-16 overflow-hidden">
            {/* Background */}
            <motion.div
                style={{y: bgY}}
                className="absolute -right-40 top-1/4 w-[500px] h-[500px]
                   rounded-full bg-brand/5 blur-[150px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY}}
                className="absolute -left-20 bottom-0 w-[350px] h-[350px]
                   rounded-full bg-emerald-300/4 blur-[120px] pointer-events-none -z-10"
            />

            <div className="mx-auto px-6 ">
                {/* Header */}
                <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="mb-20">
                    <div className="flex items-end gap-6 mb-4">
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight
                           bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-none"
                        >
                            Projects
                        </h2>
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent origin-left mb-2"
                        />
                    </div>
                    <p className="max-w-lg text-white/40 text-sm md:text-base leading-relaxed">A selection of things I've built from production apps to personal experiments.</p>
                </motion.div>

                {/* Featured Projects */}
                <div className="flex flex-col gap-6 mb-10 md:mb-20">
                    {featured.map((project, i) => (
                        <FeaturedCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                {/*  Other Projects  */}
                <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} className="hidden md:flex items-center gap-3 mb-8">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">Other Projects</span>
                    <div className="flex-1 h-px bg-white/[0.05]" />
                    <span className="font-mono text-[10px] text-white/20">{others.length} projects</span>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-24">
                    {others.map((project, i) => (
                        <SmallCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
