import {motion} from "framer-motion";
const GridBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Vertical lines */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-px bg-white/[0.03]"
                    style={{left: `${(i + 1) * (100 / 13)}%`}}
                    initial={{scaleY: 0}}
                    animate={{scaleY: 1}}
                    transition={{duration: 1.2, delay: i * 0.05, ease: "easeOut"}}
                />
            ))}
            {/* Horizontal lines */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-px bg-white/[0.03]"
                    style={{top: `${(i + 1) * (100 / 9)}%`}}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{duration: 1.2, delay: i * 0.06, ease: "easeOut"}}
                />
            ))}
        </div>
    );
};

export default GridBackground;
