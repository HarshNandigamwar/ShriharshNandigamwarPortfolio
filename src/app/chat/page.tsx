"use client";
import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {X, Send, Bot, User, Minimize, Scan} from "lucide-react";
import ReactMarkdown from "react-markdown";
import ThinkingDots from "@/components/ThinkingDots";

export default function RAGPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi! I'm Shriharsh's AI. How can I help you today?",
        },
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);
    // Send message to api
    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = {role: "user", content: input};
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: input}),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer || data.response || "I'm having a bit of trouble thinking right now. ☹️",
                },
            ]);
        } catch (error) {
            console.log(error);
            setMessages((prev) => [...prev, {role: "assistant", content: "Network error. Please try again."}]);
        } finally {
            setLoading(false);
        }
    };
    // Placeholder Messages
    const [index, setIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const PlaceholderMessages = [
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
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % PlaceholderMessages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const showPlaceholder = !isFocused && input === "";

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed bottom-6 right-6 z-[9999] w-14 h-14 border border-brand/30 bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-brand transition-all"
                >
                    <Bot size={24} />
                </button>
            )}

            {/* ChatBot Body */}
            {isOpen && (
                <div
                    className={`fixed z-50 bg-[#0f0f0f] border border-brand/30 rounded-2xl transition-all flex flex-col overflow-hidden ${fullscreen ? "w-full h-full right-0 bottom-0 rounded-none" : "bottom-6 right-6 w-[360px] h-[500px] rounded-2xl shadow-2xl"}`}
                >
                    {/* Header */}
                    <div className="bg-brand/10 p-4 border-b border-brand/30 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-brand">
                                <Bot size={18} className="text-green-500" />
                            </div>
                            {/* Heading */}
                            <h3 className="text-sm md:text-xl font-bold text-brand leading-none">Shriharsh AI</h3>
                        </div>
                        {/* FullScreen & Close Button */}
                        <div className="flex gap-5">
                            {/* FullScreen model */}
                            <button title={fullscreen ? "Small Screen" : "Full Screen"} onClick={() => setFullscreen(!fullscreen)} className="cursor-pointer">
                                {fullscreen ? <Minimize size={22} className="hover:text-brand" /> : <Scan size={22} className="hover:text-brand" />}
                            </button>
                            {/* Close model Button */}
                            <button
                                title="Close"
                                onClick={() => setIsOpen(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") setIsOpen(false);
                                }}
                                className="cursor-pointer"
                            >
                                <X size={22} className="hover:text-red-500" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Box */}
                    <div ref={scrollRef} className={`flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 ${fullscreen && "xl:px-50"}`} onWheel={(e) => e.stopPropagation()}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-1 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    {/* User / Bot logo */}
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-green-500/20 border border-brand text-brand`}>
                                        {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                                    </div>

                                    {/* Messages */}
                                    <div
                                        className={`mt-5 p-3 rounded-2xl text-[13px] leading-relaxed bg-brand/35 border border-brand/30 text-white ${
                                            msg.role === "user" ? "rounded-tr-none" : "rounded-tl-none "
                                        }`}
                                    >
                                        {msg.role === "user" ? (
                                            msg.content
                                        ) : (
                                            <article className="prose prose-invert prose-xs max-w-none prose-p:leading-relaxed rose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/5 prose-strong:text-brand rose-headings:text-white prose-li:my-0">
                                                <ReactMarkdown
                                                    components={{
                                                        // Heading
                                                        strong: ({node, ...props}) => <span className="font-bold text-brand uppercase tracking-tight" {...props} />,
                                                        // List styling
                                                        ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                                                        li: ({node, ...props}) => <li className="marker:text-brand" {...props} />,
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </article>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loader */}
                        {loading && (
                            <div className="flex gap-1 justify-start">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-green-500/20 border border-brand text-brand`}>
                                    <Bot size={12} />
                                </div>
                                <div className="mt-5 p-3 rounded-2xl bg-brand/35 border border-brand/30 text-white rounded-tl-none">
                                    <ThinkingDots />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-brand/10 border-t border-brand/50">
                        <div className={`relative flex items-center max-w-8xl ${fullscreen && "xl:px-50"}`}>
                            <AnimatePresence mode="wait">
                                {showPlaceholder && (
                                    <motion.div
                                        key={PlaceholderMessages[index]}
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}}
                                        transition={{duration: 0.4, ease: "easeInOut"}}
                                        className={`absolute top-2 left-4 pointer-events-none text-white/50 ${fullscreen && "xl:px-50"} `}
                                    >
                                        {PlaceholderMessages[index]}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="w-full bg-brand/20 border border-brand/30 text-sm rounded-xl pl-4 pr-12 py-3 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all resize-none block"
                            />
                            {/* Send button */}
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className={`absolute right-2 p-2 text-green-500 hover:text-green-400 disabled:text-zinc-600 transition-colors ${fullscreen && "xl:px-50"} `}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
