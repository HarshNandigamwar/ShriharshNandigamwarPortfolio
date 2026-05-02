import {motion} from "framer-motion";
const SocialPill = ({href, children, index}: {href: string; children: React.ReactNode; index: number}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.7 + index * 0.1}}
        whileHover={{scale: 1.1, y: -3}}
        whileTap={{scale: 0.95}}
        className="relative group h-12 w-12 flex items-center justify-center rounded-2xl
               border border-white/10 bg-white/5 backdrop-blur-md
               hover:border-brand/50 hover:bg-brand/10
               transition-colors duration-300 overflow-hidden cursor-pointer"
    >
        <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     bg-gradient-to-br from-brand/20 via-transparent to-transparent"
        />
        <span className="relative z-10 text-white/60 group-hover:text-brand transition-colors duration-300">{children}</span>
    </motion.a>
);

export default SocialPill;
