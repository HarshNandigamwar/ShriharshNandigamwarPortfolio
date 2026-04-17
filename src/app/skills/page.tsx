"use client";
import {motion} from "framer-motion";
import {Wrench, Cpu, Globe, Zap} from "lucide-react";
import TerminalIcon from "@/components/icons/terminalIcon";
import StackIcon from "@/components/icons/stackIcon";
import Cloud3Icon from "@/components/icons/cloudeIcon";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: <StackIcon className="text-brand" />,
        description: "Crafting responsive, high-performance user interfaces.",
        skills: ["Next.js", "React.js", "JavaScript", "TypeScript", "Tailwind CSS", "Redux Toolkit", "HTML5", "CSS3"],
        color: "from-green-500/20 to-transparent",
    },
    {
        title: "Backend & Database",
        icon: <Cloud3Icon className="text-brand" />,
        description: "Building scalable server-side logic and managing data.",
        skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Firebase", "REST APIs"],
        color: "from-emerald-500/20 to-transparent",
    },
    {
        title: "DevOps & Tools",
        icon: <Wrench className="text-brand" />,
        description: "Streamlining development and deployment workflows.",
        skills: ["Git", "GitHub", "Postman", "Vercel", "Netlify", "Render"],
        color: "from-green-600/20 to-transparent",
    },
];

const TechFeature = [
    {
        icon: <TerminalIcon />,
        text: "Clean Code",
    },
    {
        icon: <Zap />,
        text: "Performance",
    },
    {
        icon: <Globe />,
        text: "SEO Ready",
    },
    {
        icon: <Cpu />,
        text: "Scalability",
    },
];

const duplicatedFeatures = [...TechFeature, ...TechFeature];

export default function SkillsPage() {
    return (
        <section className="py-24 bg-transparent relative">
            <div className="mx-auto px-6">
                {/* Header */}
                <div className="mb-16">
                    <motion.h2 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} className="text-5xl font-bold flex items-center gap-4 mb-14">
                        <span className="text-4xl font-bold text-brand">Toolkit</span>
                        <div className="h-[1px] bg-brand/20 flex-grow" />
                    </motion.h2>
                    <p className="text-center text-lg">A comprehensive overview of my technical stack and the tools I use to bring digital ideas to life.</p>
                </div>

                {/* skill grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {skillCategories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{opacity: 0, x: 20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.3, delay: idx * 0.1}}
                            className={`relative overflow-hidden p-8 rounded-2xl border border-brand/30 bg-gradient-to-br ${cat.color} backdrop-blur-sm `}
                        >
                            <div className="mb-6 p-3 w-fit rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30">{cat.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                            <p className="text-sm mb-6 leading-relaxed">{cat.description}</p>

                            <div className="hidden md:flex flex-wrap gap-2 mt-auto">
                                {cat.skills.map((skill, idx) => (
                                    <motion.span
                                        key={skill}
                                        initial={{opacity: 0, y: 15}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3, delay: idx * 0.1}}
                                        whileHover={{scale: 1.05}}
                                        title={skill}
                                        className="px-3 py-1 text-xs font-mono bg-brand/30 border border-white/5 rounded-full hover:text-brand group-hover:border-brand/30 transition-colors"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="md:hidden flex flex-wrap gap-2 mt-auto">
                                {cat.skills.map((skill, idx) => (
                                    <span
                                        key={skill}
                                        title={skill}
                                        className="px-3 py-1 text-xs font-mono bg-brand/30 border border-white/5 rounded-full group-hover:text-brand group-hover:border-brand/30 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Tech Highlight */}
                <div className="md:hidden grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TechFeature.map((data, idx) => (
                        <div
                            key={idx}
                            title={data.text}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 transition-colors group"
                        >
                            <div className="text-brand ">{data.icon}</div>
                            <span className="font-medium text-sm">{data.text}</span>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block relative w-full overflow-hidden">
                    {/*The Animated Container */}
                    <motion.div
                        className="flex gap-4 w-max"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {duplicatedFeatures.map((data, idx) => (
                            <motion.div
                                key={idx}
                                title={data.text}
                                className="flex items-center gap-3 p-4 min-w-[200px] rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 transition-colors group shrink-0"
                            >
                                <div className="text-brand">{data.icon}</div>
                                <span className="font-medium text-sm whitespace-nowrap">{data.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
