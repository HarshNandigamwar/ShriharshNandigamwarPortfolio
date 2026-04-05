"use client";
import {motion} from "framer-motion";
import {Calendar} from "lucide-react";
import ShieldCheck from "@/components/shield-check";
import DownloadIcon from "@/components/download-icon";
import ExternalLinkIcon from "@/components/external-link-icon";
import Image from "next/image";
export default function ExperiencePage() {
    const Experience = [
        {
            work: "Developed and optimized responsive front-end components using HTML and CSS.",
        },
        {
            work: "Collaborated on version control and deployment workflows using Git and Vercel.",
        },
        {
            work: "Ensured high performance and accessibility standards across multiple devices.",
        },
        {
            work: "The project is successfully deployed and accessible online.",
        },
    ];
    return (
        <section id="experience" className="py-24 bg-transparent">
            <div className=" mx-auto px-6">
                {/*Heading */}
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-4xl font-bold text-brand">Experience</h2>
                    <div className="h-[1px] bg-brand/20 flex-grow" />
                </div>

                <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.6}} className="relative border-l-2 border-brand/20 ml-4 md:ml-8 pl-8 pb-12">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand shadow-[0_0_10px_#22c55e]" />
                    <div className="flex flex-col gap-6">
                        {/* Header Info */}
                        <div>
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                                <h3 className="text-2xl font-bold text-white">Web Development Intern</h3>
                                <span className="flex items-center gap-2 text-brand font-mono text-sm bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm px-3 py-1 rounded-full">
                                    <Calendar size={14} />
                                    Feb 2025 – Mar 2025
                                </span>
                            </div>
                            <p className="text-xl text-brand/90 font-medium">SkillCraft Technology</p>
                        </div>

                        {/* Detailed Responsibilities */}
                        <div className="space-y-4 leading-relaxed">
                            <p>
                                This project involves the development of multiple interactive and user-friendly web applications that enhance user experience and functionality. The goal is to create a
                                set of essential web-based tools that can be used in everyday tasks, focusing on responsiveness, usability, and efficiency.
                            </p>
                            <ul className="hidden md:block grid gap-3">
                                {Experience.map((task, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3, delay: idx * 0.1}}
                                        className="flex gap-3 cursor-default"
                                    >
                                        <span className="text-brand mt-1.5">▹</span>
                                        {task.work}
                                    </motion.li>
                                ))}
                            </ul>
                            <ul className="md:hidden block grid gap-3">
                                {Experience.map((task, idx) => (
                                    <li key={idx} className="flex gap-3 cursor-default">
                                        <span className="text-brand mt-1.5">▹</span>
                                        {task.work}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Certificate Box */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: 0.1}}
                            className="max-w-xl mt-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 flex flex-col md:flex-row items-center gap-8"
                        >
                            {/* Certificate Image Preview */}
                            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden border border-white/10">
                                <div className="relative group">
                                    <Image
                                        src="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029277/certificate_u1uqqd.png"
                                        alt="Shriharsh Nandigamwar"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <a
                                        href="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029277/certificate_u1uqqd.png"
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ExternalLinkIcon className="text-blue-500" size={24} />
                                    </a>
                                </div>
                            </div>

                            {/* Certificate Details */}
                            <div className="flex-1 space-y-3 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 text-brand font-bold uppercase tracking-widest text-xs">
                                    <ShieldCheck size={16} />
                                    Verified Credential
                                </div>
                                <p className="text-sm opacity-60 font-mono">ID: SCT/FEB25/5707</p>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <motion.a
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        href="/documents/SkillCraft Tecnology Certificate & Letter of Recommendation.pdf"
                                        download="SkillCraft Tecnology Certificate & Letter of Recommendation.pdf"
                                        className="flex gap-3 px-5 py-2 border border-brand/30 text-brand rounded-md text-sm bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm transition-all"
                                    >
                                        <span>Download Letter</span>
                                        <DownloadIcon size={18} className="text-brand" />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
