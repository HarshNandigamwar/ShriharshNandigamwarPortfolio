import {useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import SkillPill from "../SkillPill";
import ExternalLinkIcon from "@/components/icons/linkIcon";
import GithubIcon from "@/components/icons/githubIcon";

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
                        {/* Github Buttons */}
                        <span className="flex items-center gap-1">
                            <motion.a
                                href={project.github}
                                target="_blank"
                                whileHover={{scale: 1.15, color: "#22c55e"}}
                                className="text-white/35 hover:text-brand transition-colors cursor-pointer"
                                title="Source code"
                            >
                                <GithubIcon size={17} />
                            </motion.a>
                            {project.githubbackend && (
                                <motion.a
                                    href={project.githubbackend}
                                    target="_blank"
                                    whileHover={{scale: 1.15, color: "#22c55e"}}
                                    className="text-white/35 hover:text-brand transition-colors cursor-pointer"
                                    title="Backend source"
                                >
                                    <GithubIcon size={17} />
                                </motion.a>
                            )}
                        </span>
                        {/* Live link button */}
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
                        <SkillPill key={t} name={t} index={i} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SmallCard;
