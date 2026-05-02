import {motion} from "framer-motion";
import ThinkingDots from "../ThinkingDots";
import BotAvatar from "./BotAvatar";

const ThinkingBubble = () => (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -5}} className="flex gap-2.5">
        <BotAvatar />
        <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/10">
            <ThinkingDots />
        </div>
    </motion.div>
);

export default ThinkingBubble;
