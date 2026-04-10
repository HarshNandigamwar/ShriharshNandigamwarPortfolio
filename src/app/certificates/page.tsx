"use client";
import {motion} from "framer-motion";
import {Award, Calendar, CheckCircle2, Rocket, Globe} from "lucide-react";
import ShieldCheck from "@/components/shield-check";
import ExternalLinkIcon from "@/components/external-link-icon";
import Image from "next/image";
import Link from "next/link";

export default function CertificationsPage() {
    const certifications = [
        {
            name: "Web Development Fundamentals",
            issuer: "IBM SkillsBuild",
            date: "2023",
            image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029055/IBM_yyzqdd.png",
            description: "Core web technologies and fundamental development principles.",
            category: "Development",
        },
        {
            name: "Accenture Developer Program",
            issuer: "Accenture",
            date: "2024",
            image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029046/Accenture_kcoo9d.png",
            description: "SDLC, Testing Lifecycle, Agile, and Algorithmic Thinking simulation.",
            category: "Software Engineering",
        },
        {
            name: "AWS Solutions Architecture",
            issuer: "Amazon Web Services",
            date: "2024",
            image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029051/AWS_yu4vat.png",
            description: "Focusing on scalable hosting architectures and cloud infrastructure.",
            category: "Cloud Computing",
        },
        {
            name: "Hackhazards '25",
            issuer: "The NAMESPACE Community",
            date: "2025",
            image: "https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1761029069/Hackathon_zfgblj.png",
            description: "Participation in a global hackathon solving real-world challenges.",
            category: "Hackathon",
        },
    ];

    const techStack = ["HTML", "CSS", "Tailwind", "JavaScript", "Git", "Github", "React.js", "Redux", "Node.js", "Express", "MongoDB", "Mongoose", "Next.js", "Deployment (Vercel)"];

    const highlights = [
        {
            icon: CheckCircle2,
            name: "Industry Standards",
            description: "Learned from experts with 15+ years of experience.",
        },
        {
            icon: Globe,
            name: "Real-world Deploy",
            description: "End-to-end deploy on Vercel.",
        },
    ];

    return (
        <section id="certificates" className="py-24 px-3 md:px-6 bg-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold mb-4 text-brand">Certifications</h1>
                    <div className="h-[1px] bg-brand/20 flex-grow" />
                </div>
                <div className="flex items-center gap-2 text-brand font-mono mb-2">
                    <ShieldCheck size={20} />
                    <span>Verified Achievements</span>
                </div>
                <p className="max-w-xl mb-16">A collection of professional certifications and simulation programs that have helped me sharpen my technical expertise.</p>

                {/* Udemy certificate */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-10">
                    <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.6}}>
                        {/* Certificate Image */}
                        <div className="relative group">
                            <div className="relative border border-brand/30 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1775371008/Udemy_web_dev_Certificate_c63gvt.avif"
                                    alt="Web Development Certificate"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <a
                                    href="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1775371008/Udemy_web_dev_Certificate_c63gvt.avif"
                                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ExternalLinkIcon className="text-blue-500" size={24} />
                                </a>
                            </div>
                        </div>
                        {/* Verify Button */}
                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            <Link
                                href="https://www.udemy.com/certificate/UC-7ef0dcfe-8be7-45b8-8356-43ff867ad7e8/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com"
                                target="_blank"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm text-brand font-semibold rounded-full border border-brand/10 text-center hover:border-brand/50 transition-colors cursor-pointer transition-colors"
                            >
                                Verify Credential <ExternalLinkIcon size={16} className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{opacity: 0, x: 30}} animate={{opacity: 1, x: 0}} transition={{delay: 0.4}} className="space-y-8">
                        {/* Info */}
                        <div>
                            <div className="flex items-center gap-2 text-brand mb-3">
                                <Award className="w-5 h-5" />
                                <span className="uppercase tracking-widest text-sm font-semibold">Course Overview</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">The Complete Fullstack Web Development Bootcamp</h2>
                            <p className="text-gray-400 leading-relaxed">
                                This comprehensive journey took me from foundations to advanced software engineering. The course focused on building modern, scalable web applications and professional
                                deployment.
                            </p>
                        </div>

                        {/* Tech Tags */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-brand" /> Key Skills Mastered
                            </h3>
                            <div className="hidden md:flex flex-wrap gap-2">
                                {techStack.map((tech, idx) => (
                                    <motion.span
                                        key={tech}
                                        title={tech}
                                        initial={{opacity: 0, y: 15}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3, delay: idx * 0.1}}
                                        whileHover={{scale: 1.05}}
                                        className="px-3 py-1 bg-brand/30 border border-white/5 rounded-md text-sm text-gray-300 hover:text-brand hover:border-brand/30 transition-colors"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                            {/* Mobile */}
                            <div className="flex md:hidden flex-wrap gap-2">
                                {techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        title={tech}
                                        className="px-3 py-1 bg-brand/30 border border-white/5 rounded-md text-sm text-gray-300 hover:text-brand hover:border-brand/30 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {highlights.map((data, idx) => {
                                const Icon = data.icon;
                                return (
                                    <motion.div
                                        key={data.name}
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3, delay: idx * 0.1}}
                                        whileHover={{scale: 1.05}}
                                        className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 transition-colors"
                                    >
                                        <Icon className="text-brand mb-2 w-5 h-5" size={20} />
                                        <h4 className="font-medium">{data.name}</h4>
                                        <p className="text-sm text-gray-500">{data.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Normal Certificates */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: idx * 0.1}}
                            className="bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 rounded-2xl overflow-hidden hover:border-brand/40 transition-all duration-500"
                        >
                            <div className="group relative flex flex-col md:flex-row h-full">
                                {/* Image Section */}
                                <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden bg-black/40">
                                    <Image src={cert.image} alt={cert.name} loading="lazy" width={200} height={300} className="relative w-full h-full object-cover" />
                                    <a href={cert.image} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLinkIcon className="text-blue-500" size={24} />
                                    </a>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] uppercase tracking-widest text-brand font-bold bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm px-2 py-1 rounded">
                                            {cert.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-500 text-xs font-mono">
                                            <Calendar size={12} /> {cert.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">{cert.name}</h3>
                                    <p className="text-gray-400 text-sm mb-6 flex-grow">{cert.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand/10">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Award size={16} className="text-brand" />
                                            <span className="text-xs font-medium">{cert.issuer}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
