"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Bot, User } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
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

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            data.response ||
            "I'm having a bit of trouble thinking right now.",
        },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
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
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="mb-4 w-[350px] md:w-[390px] h-[600px] md:h-[500px] bg-zinc-800 md:bg-zinc-800/80 border border-brand/30 rounded-2xl transition-all flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-800/80 border-b border-brand/30 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Bot size={18} className="text-green-500" />
                </div>
                {/* Heading */}
                <div>
                  <h3 className="text-sm md:text-xl font-bold text-brand leading-none">
                    Shriharsh AI
                  </h3>
                </div>
              </div>
              {/* X button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* User / Bot logo */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-green-500/20 border border-brand text-brand`}
                    >
                      {msg.role === "user" ? (
                        <User size={12} />
                      ) : (
                        <Bot size={12} />
                      )}
                    </div>
                    {/* Messages */}
                    <div
                      className={` p-3 rounded-2xl text-[13px] leading-relaxed bg-brand/35 border border-brand/30 text-white ${
                        msg.role === "user"
                          ? "rounded-tr-none"
                          : "rounded-tl-none "
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-brand/20 border border-brand/30 text-white p-3 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-brand" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-800/80 border-t border-brand/50">
              <div className="relative flex items-center">
                <AnimatePresence mode="wait">
                  {showPlaceholder && (
                    <motion.div
                      key={PlaceholderMessages[index]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute top-2 left-4 pointer-events-none text-white/50"
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
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 p-2 text-green-500 hover:text-green-400 disabled:text-zinc-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" relative w-14 h-14 border border-brand/30 bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-brand transition-all"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}
