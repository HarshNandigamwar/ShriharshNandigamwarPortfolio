import {motion} from "framer-motion";
import Image from "next/image";
import {useState} from "react";
import GithubIcon from "@/components/icons/githubIcon";
import ExternalLinkIcon from "@/components/icons/linkIcon";
import SkillPill from "../SkillPill";

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
                    {project.tech.map((t, i) => (
                        <SkillPill key={t} name={t} index={i} />
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1">
                    {/* live link button */}
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

                    {/* Github button */}
                    <span className="flex items-center gap-1">
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
                                <GithubIcon size={20} />
                            </motion.a>
                        )}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedCard;
