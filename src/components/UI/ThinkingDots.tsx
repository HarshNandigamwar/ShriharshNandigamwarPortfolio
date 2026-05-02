import {motion} from "framer-motion";

export default function ThinkingDots() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex gap-2">
                {[0, 1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className="h-2 w-2 bg-brand/50 rounded-sm"
                        animate={{
                            scale: [1, 1.5, 1.5, 1, 1],
                            rotate: [0, 0, 270, 270, 0],
                            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.5, 0.8, 1],
                            delay: index * 0.5,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
