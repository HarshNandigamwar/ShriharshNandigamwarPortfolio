import {useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import ExternalLinkIcon from "../icons/linkIcon";
import { Award, Calendar } from "lucide-react";

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

const categoryColor: Record<string, string> = {
    Development: "text-brand border-brand/40 bg-brand/10",
    "Software Engineering": "text-sky-400 border-sky-400/30 bg-sky-400/10",
    "Cloud Computing": "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Hackathon: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

const CertificateCard = ({cert, index}: {cert: (typeof certifications)[0]; index: number}) => {
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

export default CertificateCard;
