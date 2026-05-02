import {motion} from "framer-motion";

const SkillPill = ({name, index}: {name: string; index: number}) => (
    <motion.span
        initial={{opacity: 0, scale: 0.8}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        transition={{delay: 0.05 * index, type: "spring", stiffness: 260}}
        whileHover={{scale: 1.08, backgroundColor: "rgba(34,197,94,0.15)"}}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
               border border-white/10 bg-white/[0.04] text-white/60
               font-mono text-xs tracking-wide transition-colors duration-200"
    >
        <span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
        {name}
    </motion.span>
);

export default SkillPill;
