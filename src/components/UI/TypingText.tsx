import {motion} from "framer-motion";
import {useEffect, useState} from "react";
const TypingText = () => {
    /* Typewriter hook */
    function useTypewriter(words: string[], speed = 80, pause = 1800) {
        const [wordIndex, setWordIndex] = useState(0);
        const [displayed, setDisplayed] = useState("");
        const [deleting, setDeleting] = useState(false);

        useEffect(() => {
            const word = words[wordIndex % words.length];
            let timeout: ReturnType<typeof setTimeout>;

            if (!deleting && displayed === word) {
                timeout = setTimeout(() => setDeleting(true), pause);
            } else if (deleting && displayed === "") {
                setDeleting(false);
                setWordIndex((i) => i + 1);
            } else {
                timeout = setTimeout(
                    () => {
                        setDisplayed(deleting ? word.slice(0, displayed.length - 1) : word.slice(0, displayed.length + 1));
                    },
                    deleting ? speed / 2 : speed,
                );
            }
            return () => clearTimeout(timeout);
        }, [displayed, deleting, wordIndex, words, speed, pause]);

        return displayed;
    }

    // Typing Roles
    const role = useTypewriter(["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver"]);

    /* Animated text cursor */
    const TextCursor = () => (
        <motion.span className="inline-block w-0.5 h-[1em] bg-brand ml-1 align-middle" animate={{opacity: [1, 0]}} transition={{duration: 0.8, repeat: Infinity, repeatType: "reverse"}} />
    );

    return (
        <span>
            <span className="mr-1 text-white/30">{"//"}</span>
            {role}
            <TextCursor />
        </span>
    );
};

export default TypingText;
