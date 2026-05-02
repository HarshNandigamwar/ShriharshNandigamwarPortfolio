"use client";
import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import ScanLines from "@/components/UI/ScanLines";
import FeaturedCard from "@/components/UI/project_cards/FeaturedCard";
import SmallCard from "@/components/UI/project_cards/SmallCard";

export default function ProjectsPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
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
    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    return (
        <section ref={sectionRef} id="projects" className="relative py-10 md:py-16 overflow-hidden">
            {/* Background */}
            <ScanLines />
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

            <div className="mx-auto px-3 ">
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
                <div className="hidden md:flex flex-col gap-6 mb-10 md:mb-20">
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

                <div className="hidden md:block">
                    <div className=" grid md:grid-cols-3 gap-6 mb-24">
                        {others.map((project, i) => (
                            <SmallCard key={project.title} project={project} index={i} />
                        ))}
                    </div>
                </div>

                <div className="block md:hidden grid md:grid-cols-3 gap-6 mb-24">
                    {projects.map((project, i) => (
                        <SmallCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
