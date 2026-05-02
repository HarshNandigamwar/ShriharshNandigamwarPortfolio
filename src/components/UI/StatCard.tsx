import {motion} from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import CodeIcon from "../icons/codeIcon";
import RosetteDiscountCheckIcon from "../icons/discountIcon";

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

export default StatCard;
