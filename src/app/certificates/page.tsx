"use client";
import {motion, useScroll, useTransform, useInView} from "framer-motion";
import {Award, Calendar, CheckCircle2, Rocket, Globe} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useRef, useState} from "react";
import ShieldCheck from "@/components/icons/shieldIcon";
import ExternalLinkIcon from "@/components/icons/linkIcon";

/* Data */
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

const techStack = ["HTML", "CSS", "Tailwind", "JavaScript", "TypeScript", "Git", "Github", "React.js", "Redux", "Node.js", "Express", "MongoDB", "Mongoose", "Next.js", "Deployment (Vercel)"];

const highlights = [
    {
        icon: CheckCircle2,
        name: "Industry Standards",
        description: "Learned from experts with 15+ years of experience.",
    },
    {
        icon: Globe,
        name: "Real-world Deploy",
        description: "End-to-end deployment on Vercel.",
    },
];

/* Category colour map */
const categoryColor: Record<string, string> = {
    Development: "text-brand border-brand/40 bg-brand/10",
    "Software Engineering": "text-sky-400 border-sky-400/30 bg-sky-400/10",
    "Cloud Computing": "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Hackathon: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

/* Helpers */

/* Tech pill */
const TechPill = ({name, index}: {name: string; index: number}) => (
    <motion.span
        initial={{opacity: 0, scale: 0.75}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        transition={{delay: 0.03 * index, type: "spring", stiffness: 250}}
        whileHover={{scale: 1.08, backgroundColor: "rgba(34,197,94,0.15)"}}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
               border border-white/10 bg-white/[0.04] text-white/55
               font-mono text-xs tracking-wide transition-colors duration-200"
    >
        <span className="w-1 h-1 rounded-full bg-brand/70" />
        {name}
    </motion.span>
);

/* Highlight card */
const HighlightCard = ({data, index}: {data: (typeof highlights)[0]; index: number}) => {
    const Icon = data.icon;
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.1 + index * 0.12, duration: 0.5}}
            whileHover={{y: -4}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative p-5 rounded-2xl border border-white/10 bg-white/[0.03]
                 backdrop-blur-sm overflow-hidden group"
        >
            <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.3}} className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent -z-10" />
            <motion.div animate={{scaleX: hovered ? 1 : 0}} transition={{duration: 0.3}} className="absolute top-0 left-0 right-0 h-px bg-brand origin-left" />
            <div>
                <Icon className="text-brand mb-3 w-5 h-5" />
            </div>
            <h4 className="font-semibold text-white/85 text-sm mb-1">{data.name}</h4>
            <p className="text-white/40 text-xs leading-relaxed">{data.description}</p>
        </motion.div>
    );
};

/* Small certification card */
const CertCard = ({cert, index}: {cert: (typeof certifications)[0]; index: number}) => {
    const [hovered, setHovered] = useState(false);
    const col = categoryColor[cert.category] ?? "text-brand border-brand/40 bg-brand/10";

    return (
        <motion.div
            initial={{opacity: 0, y: 32}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.08 * index, duration: 0.55}}
            whileHover={{y: -6}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03]
                 backdrop-blur-sm overflow-hidden group flex flex-col md:flex-row"
        >
            {/* Glow */}
            <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.35}} className="absolute inset-0 bg-gradient-to-br from-brand/8 via-transparent to-transparent -z-10" />
            {/* Top accent */}
            <motion.div animate={{scaleX: hovered ? 1 : 0}} transition={{duration: 0.35}} className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/70 to-transparent origin-left" />

            {/* Image */}
            <div className="relative w-full md:w-2/5 h-44 md:h-auto overflow-hidden bg-black/30 shrink-0">
                <Image src={cert.image} alt={cert.name} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-600" />
                {/* Hover overlay */}
                <a
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <ExternalLinkIcon className="text-brand" size={20} />
                    <span className="font-mono text-[10px] text-white/60 tracking-wider">View</span>
                </a>
                {/* Gradient fade right edge on desktop */}
                <div
                    className="hidden md:block absolute inset-y-0 right-0 w-8
                        bg-gradient-to-r from-transparent to-black/40"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-5 md:p-6 gap-3">
                <div className="flex justify-between items-start gap-2">
                    <span
                        className={`inline-flex text-[10px] uppercase tracking-[0.18em] font-bold
                           px-2.5 py-1 rounded-full border font-mono ${col}`}
                    >
                        {cert.category}
                    </span>
                    <span className="flex items-center gap-1 text-white/30 text-xs font-mono shrink-0">
                        <Calendar size={10} /> {cert.date}
                    </span>
                </div>

                <h3
                    className="text-base md:text-lg font-bold text-white/90
                       group-hover:text-brand transition-colors duration-300 leading-snug"
                >
                    {cert.name}
                </h3>
                <p className="text-white/45 text-xs md:text-sm leading-relaxed flex-1">{cert.description}</p>

                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                    <Award size={13} className="text-brand shrink-0" />
                    <span className="text-xs text-white/40 font-mono">{cert.issuer}</span>
                </div>
            </div>
        </motion.div>
    );
};

/* MAIN COMPONENT */
export default function CertificationsPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, {once: true, margin: "-60px"});
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    return (
        <section ref={sectionRef} id="certificates" className="relative py-10 md:py-16 px-3 md:px-6 overflow-hidden">
            {/* Background atmosphere */}
            <motion.div
                style={{y: bgY}}
                className="absolute -right-32 top-0 w-[500px] h-[500px]
                   rounded-full bg-brand/6 blur-[150px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY}}
                className="absolute -left-20 bottom-1/4 w-[350px] h-[350px]
                   rounded-full bg-emerald-300/4 blur-[120px] pointer-events-none -z-10"
            />

            <div className="mx-auto">
                {/* Section Header */}
                <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="mb-20">
                    <div className="flex items-end gap-6 mb-4">
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight
                           bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-none"
                        >
                            Certifications
                        </h2>
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent origin-left mb-2"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-brand font-mono text-sm mb-3">
                        <ShieldCheck size={16} />
                        <span className="tracking-widest uppercase text-xs">Verified Achievements</span>
                    </div>
                    <p className="max-w-lg text-white/45 text-sm md:text-base leading-relaxed">
                        A curated collection of professional certifications and simulation programs that have sharpened my technical expertise.
                    </p>
                </motion.div>

                {/* Featured: Udemy */}
                <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Left — Certificate image */}
                    <motion.div initial={{opacity: 0, x: -40}} animate={heroInView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94]}} className="relative">
                        {/* Glow behind image */}
                        <div className="absolute -inset-3 rounded-3xl bg-brand/8 blur-2xl -z-10" />

                        {/* Photo */}
                        <div className="relative rounded-2xl overflow-hidden border border-brand/25 group shadow-2xl">
                            <Image
                                src="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1775371008/Udemy_web_dev_Certificate_c63gvt.avif"
                                alt="Udemy Certificate"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-600"
                                loading="lazy"
                            />
                            {/* Top shimmer line */}
                            <motion.div
                                initial={{scaleX: 0}}
                                animate={heroInView ? {scaleX: 1} : {}}
                                transition={{delay: 0.5, duration: 1}}
                                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/80 via-brand/40 to-transparent origin-left"
                            />
                            {/* Hover overlay */}
                            <a
                                href="https://res.cloudinary.com/darmatnf2/image/upload/f_auto,q_auto/v1775371008/Udemy_web_dev_Certificate_c63gvt.avif"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <ExternalLinkIcon className="text-brand" size={24} />
                                <span className="font-mono text-xs text-white/60 tracking-wider">View Full Size</span>
                            </a>
                        </div>

                        {/* Verify button */}
                        <motion.div initial={{opacity: 0, y: 16}} animate={heroInView ? {opacity: 1, y: 0} : {}} transition={{delay: 0.7}} className="mt-6 flex justify-center">
                            <Link
                                href="https://www.udemy.com/certificate/UC-7ef0dcfe-8be7-45b8-8356-43ff867ad7e8/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com"
                                target="_blank"
                                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full
                           border border-brand/30 bg-brand/8 text-brand font-semibold text-sm
                           hover:border-brand/60 hover:bg-brand/15
                           transition-colors duration-300 backdrop-blur-sm"
                            >
                                <ShieldCheck size={15} />
                                Verify Credential
                                <ExternalLinkIcon size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right — Course info */}
                    <motion.div initial={{opacity: 0, x: 40}} animate={heroInView ? {opacity: 1, x: 0} : {}} transition={{delay: 0.2, duration: 0.7}} className="space-y-8">
                        {/* Course meta */}
                        <div>
                            <div className="flex items-center gap-2 text-brand mb-3">
                                <Award className="w-4 h-4" />
                                <span className="uppercase tracking-[0.2em] text-xs font-mono font-semibold">Course Overview</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4 leading-snug">The Complete Fullstack Web Development Bootcamp</h2>
                            <p className="text-white/45 text-sm md:text-base leading-relaxed border-l-2 border-brand/30 pl-4">
                                A comprehensive journey from foundations to advanced software engineering covering modern, scalable web applications and professional deployment workflows.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-brand/20 via-white/10 to-transparent" />

                        {/* Skills mastered */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Rocket className="w-4 h-4 text-brand" />
                                <h3 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">Key Skills Mastered</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map((tech, i) => (
                                    <TechPill key={tech} name={tech} index={i} />
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-brand/20 via-white/10 to-transparent" />

                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {highlights.map((d, i) => (
                                <HighlightCard key={d.name} data={d} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider between sections */}
                <motion.div
                    initial={{scaleX: 0}}
                    whileInView={{scaleX: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent origin-left mb-16"
                />

                {/* Other Certificates */}
                <motion.div initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5}} className="flex items-center gap-3 mb-8">
                    <ShieldCheck size={16} className="text-brand" />
                    <h3 className="font-mono text-xs text-white/35 uppercase tracking-[0.2em]">Additional Credentials</h3>
                    <div className="flex-1 h-px bg-white/[0.05]" />
                    <span className="font-mono text-xs text-white/20">{certifications.length} certs</span>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, idx) => (
                        <CertCard key={idx} cert={cert} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
