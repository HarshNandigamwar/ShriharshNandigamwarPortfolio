import {motion} from "framer-motion";
const StatChip = ({value, label, delay}: {value: string; label: string; delay: number}) => (
    <motion.div
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay, type: "spring", stiffness: 200}}
        className="flex flex-col items-center px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
    >
        <span className="text-2xl font-bold text-brand font-mono leading-none">{value}</span>
        <span className="md:text-xs text-white/50 mt-0.5 tracking-wider uppercase">{label}</span>
    </motion.div>
);
export default StatChip;
