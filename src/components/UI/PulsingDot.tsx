import {motion} from "framer-motion";
const PulsingDot = () => (
    <div className="relative flex items-center justify-center">
        <motion.div animate={{scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5]}} transition={{duration: 2.5, repeat: Infinity}} className="absolute w-8 h-8 rounded-full bg-brand/30" />
        <motion.div animate={{scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7]}} transition={{duration: 2, repeat: Infinity}} className="absolute w-5 h-5 rounded-full bg-brand/20" />
        <div className="relative w-3.5 h-3.5 rounded-full bg-brand shadow-[0_0_14px_4px_rgba(34,197,94,0.6)]" />
    </div>
);

export default PulsingDot;
