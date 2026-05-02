"use client";
import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {X, Send, Bot, User, Minimize2, Maximize2, Sparkles} from "lucide-react";
import ReactMarkdown from "react-markdown";
import ThinkingDots from "@/components/UI/ThinkingDots";

/* Types */
interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function RAGPage() {
    const placeholders = [
        "Ask about my projects...",
        "What is my tech stack?",
        "Tell me about SigmaMart.",
        "Ask about my skills...",
        "Where do I study?",
        "How to contact me?",
        "Ask about CodeMates...",
        "Need a Fullstack dev?",
        "What can I build?",
    ];
    const suggestedQuestions = ["What projects have you built?", "What's your tech stack?", "Are you open to work?"];
    const [isOpen, setIsOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([{role: "assistant", content: "Hi! I'm Shriharsh's AI assistant. Ask me anything about his skills, projects, or experience!"}]);
    const [loading, setLoading] = useState(false);
    const [phIndex, setPhIndex] = useState(0);
    const [focused, setFocused] = useState(false);
    const [pulse, setPulse] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Animated bot avatar */
    const BotAvatar = ({size = 14}: {size?: number}) => (
        <motion.div className="w-7 h-7 rounded-xl bg-brand/15 border border-brand/50 flex items-center justify-center shrink-0">
            <Bot size={size} className="text-brand" />
        </motion.div>
    );

    /* User avatar */
    const UserAvatar = ({size = 14}: {size?: number}) => (
        <div
            className="w-7 h-7 rounded-xl bg-white/8 border border-white/15
                  flex items-center justify-center shrink-0"
        >
            <User size={size} className="text-white/60" />
        </div>
    );

    /* Chat bubble */
    const ChatBubble = ({msg, index}: {msg: Message; index: number}) => {
        const isUser = msg.role === "user";
        return (
            <motion.div
                initial={{opacity: 0, y: 12, scale: 0.97}}
                animate={{opacity: 1, y: 0, scale: 1}}
                transition={{duration: 0.3, delay: index === 0 ? 0 : 0}}
                className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
                {isUser ? <UserAvatar /> : <BotAvatar />}

                <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed
          ${isUser ? "bg-brand/20 border border-brand/30 text-white/85 rounded-tr-sm" : "bg-white/[0.05] border border-white/10 text-white/75 rounded-tl-sm"}`}
                >
                    {isUser ? (
                        msg.content
                    ) : (
                        <article
                            className="prose prose-invert prose-xs max-w-none
                              prose-p:leading-relaxed prose-p:my-1
                              prose-strong:text-brand
                              prose-li:my-0 prose-ul:my-1"
                        >
                            <ReactMarkdown
                                components={{
                                    strong: ({...props}) => <span className="font-bold text-brand" {...props} />,
                                    ul: ({...props}) => <ul className="list-disc pl-4 space-y-1 my-1.5" {...props} />,
                                    li: ({...props}) => <li className="marker:text-brand/60" {...props} />,
                                }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </article>
                    )}
                </div>
            </motion.div>
        );
    };

    /* Thinking bubble */
    const ThinkingBubble = () => (
        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -5}} className="flex gap-2.5">
            <BotAvatar />
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/10">
                <ThinkingDots />
            </div>
        </motion.div>
    );

    /* Auto-scroll */
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, loading]);

    /* Cycle placeholder */
    useEffect(() => {
        const id = setInterval(() => setPhIndex((p) => (p + 1) % placeholders.length), 5000);
        return () => clearInterval(id);
    }, []);

    /* Pulse the RAG when chat is closed and user hasn't opened yet */
    useEffect(() => {
        if (isOpen) {
            setPulse(false);
            return;
        }
        const id = setTimeout(() => setPulse(true), 3000);
        return () => clearTimeout(id);
    }, [isOpen]);

    /* Send message */
    const handleSend = async (text?: string) => {
        const msg = (text ?? input).trim();
        if (!msg || loading) return;
        setMessages((p) => [...p, {role: "user", content: msg}]);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: msg}),
            });
            const data = await res.json();
            setMessages((p) => [...p, {role: "assistant", content: data.answer || data.response || "I'm having a bit of trouble thinking right now. ☹️"}]);
        } catch {
            setMessages((p) => [...p, {role: "assistant", content: "Network error. Please try again."}]);
        } finally {
            setLoading(false);
        }
    };

    const showPlaceholder = !focused && input === "";
    const isFirstMessage = messages.length === 1;

    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    // Online Offline status
    useEffect(() => {
        // Handler functions to update state
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        // Listen for network changes
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Clean up listeners on component unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <>
            {/* RAG toggle */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="fab"
                        initial={{opacity: 0, scale: 0.5, y: 20}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.5, y: 20}}
                        transition={{type: "spring", stiffness: 260, damping: 20}}
                        whileTap={{scale: 0.93}}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[9999] w-14 h-14
                       rounded-full border border-brand/40 bg-black/80 backdrop-blur-xl
                       flex items-center justify-center text-brand
                       shadow-[0_0_24px_rgba(34,197,94,0.2)]
                       hover:bg-brand/40
                       hover:text-black
                       hover:border-brand/70 transition-all duration-300 group cursor-pointer"
                    >
                        {/* Pulse ring */}
                        {pulse && (
                            <motion.div
                                animate={{scale: [1, 1.8], opacity: [0.5, 0]}}
                                transition={{duration: 1.5, repeat: Infinity}}
                                className="absolute inset-0 rounded-full border border-brand/50 pointer-events-none"
                            />
                        )}
                        <div>
                            <Bot size={24} />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat"
                        initial={{opacity: 0, scale: 0.92, y: 24}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.92, y: 24}}
                        transition={{duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94]}}
                        className={`fixed z-[9998] flex flex-col overflow-hidden bg-black/90 backdrop-blur-2xl border border-white/10
              shadow-[0_24px_80px_rgba(0,0,0,0.7)] ${fullscreen ? "inset-0 rounded-none" : "bottom-6 right-6 w-[360px] h-[540px] rounded-2xl"}`}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3.5
                            border-b border-white/[0.07] bg-white/[0.02] shrink-0"
                        >
                            <div className="flex items-center gap-3">
                                {/* avatar */}
                                <motion.div
                                    className="w-9 h-9 rounded-xl bg-brand/12 border border-brand/40
                             flex items-center justify-center"
                                >
                                    <Bot size={18} className="text-brand" />
                                </motion.div>

                                <div>
                                    {/* Name */}
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-bold text-white/90 text-sm">Shriharsh AI</h3>
                                        <Sparkles size={11} className="text-brand/60" />
                                    </div>
                                    <div className="flex items-center mt-0.5">
                                        <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{isOnline ? "Online" : "Offline"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Fullscreen toggle */}
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => setFullscreen((v) => !v)}
                                    title={fullscreen ? "Minimise" : "Fullscreen"}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center
                             text-white/35 hover:text-brand hover:bg-brand/10
                             border border-transparent hover:border-brand/20
                             transition-all duration-200 cursor-pointer"
                                >
                                    {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </motion.button>

                                {/* Close */}
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => setIsOpen(false)}
                                    title="Close"
                                    className="w-8 h-8 rounded-lg flex items-center justify-center
                             text-white/35 hover:text-red-400 hover:bg-red-500/10
                             border border-transparent hover:border-red-400/20
                             transition-all duration-200 cursor-pointer"
                                >
                                    <X size={16} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            onWheel={(e) => e.stopPropagation()}
                            className={`flex-1 overflow-y-auto py-4 space-y-4
                          scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
                          ${fullscreen ? "px-6 xl:px-48" : "px-4"}`}
                        >
                            {messages.map((msg, i) => (
                                <ChatBubble key={i} msg={msg} index={i} />
                            ))}

                            <AnimatePresence>{loading && <ThinkingBubble key="thinking" />}</AnimatePresence>

                            {/* Suggested questions (only on first load) */}
                            <AnimatePresence>
                                {isFirstMessage && !loading && (
                                    <motion.div initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{delay: 0.4}} className="flex flex-wrap gap-2 pt-1">
                                        {suggestedQuestions.map((q, i) => (
                                            <motion.button
                                                key={q}
                                                initial={{opacity: 0, scale: 0.9}}
                                                animate={{opacity: 1, scale: 1}}
                                                transition={{delay: 0.5 + i * 0.07}}
                                                whileHover={{scale: 1.04, borderColor: "rgba(34,197,94,0.5)"}}
                                                whileTap={{scale: 0.97}}
                                                onClick={() => handleSend(q)}
                                                className="text-[11px] font-mono text-white/45 px-3 py-1.5 rounded-full
                                   border border-white/10 bg-white/[0.03]
                                   hover:text-brand hover:bg-brand/8
                                   transition-colors duration-200 cursor-pointer text-left"
                                            >
                                                {q}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input */}
                        <div
                            className={`shrink-0 px-4 py-3.5 border-t border-white/[0.07] bg-white/[0.02]
                             ${fullscreen ? "xl:px-48" : ""}`}
                        >
                            <div className="relative flex items-center gap-2">
                                {/* Animated placeholder */}
                                <div className="relative flex-1">
                                    <AnimatePresence mode="wait">
                                        {showPlaceholder && (
                                            <motion.span
                                                key={placeholders[phIndex]}
                                                initial={{opacity: 0, y: 6}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -6}}
                                                transition={{duration: 0.3}}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none
                                   font-mono text-xs text-white/20 select-none"
                                            >
                                                {placeholders[phIndex]}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    <input
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        className="w-full bg-white/[0.05] border border-white/10 rounded-xl
                               pl-4 pr-4 py-2.5 text-sm text-white/80 font-mono
                               focus:outline-none focus:border-brand/40 focus:bg-brand/5
                               transition-all duration-300"
                                    />
                                </div>

                                {/* Send button */}
                                <motion.button
                                    whileHover={!loading && input.trim() ? {scale: 1.08} : {}}
                                    whileTap={!loading && input.trim() ? {scale: 0.93} : {}}
                                    onClick={() => handleSend()}
                                    disabled={loading || !input.trim()}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                             bg-brand/15 border border-brand/30 text-brand
                             hover:bg-brand/25 hover:border-brand/60
                             disabled:opacity-30 disabled:cursor-not-allowed
                             transition-all duration-200 cursor-pointer"
                                >
                                    <div>
                                        <Send size={14} />
                                    </div>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
