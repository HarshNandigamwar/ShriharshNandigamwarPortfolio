// "use client";
// import {useState, useEffect} from "react";
// import {motion, AnimatePresence} from "framer-motion";
// import {Send, Mail, MapPin} from "lucide-react";
// import {toast} from "sonner";
// import GithubIcon from "@/components/icons/githubIcon";
// import LinkedinIcon from "@/components/icons/linkedinIcon";
// import TwitterXIcon from "@/components/icons/twitterIcon";
// import ThinkingDots from "@/components/ThinkingDots";

// export default function ContactPage() {
//     const social = [
//         {
//             id: 1,
//             link: "https://github.com/HarshNandigamwar",
//             logo: <GithubIcon />,
//         },
//         {
//             id: 2,
//             link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
//             logo: <LinkedinIcon />,
//         },
//         {
//             id: 3,
//             link: "https://x.com/Harsh477011?s=09",
//             logo: <TwitterXIcon />,
//         },
//     ];

//     // Placeholder Messages
//     const [index, setIndex] = useState(0);
//     const [isFocused, setIsFocused] = useState(false);
//     const [val, setVal] = useState("");
//     const PlaceholderMessages = [
//         "Tell me about your project...",
//         "What are we building together?",
//         "Need help with a new design?",
//         "Got a big idea to share?",
//         "Let's start a conversation...",
//         "What's on your mind?",
//     ];
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndex((prev) => (prev + 1) % PlaceholderMessages.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, []);
//     const showPlaceholder = !isFocused && val === "";

//     // Submit form
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         setIsSubmitting(true);

//         const formData = new FormData(e.currentTarget);
//         formData.append("access_key", process.env.NEXT_PUBLIC_WEB3KEY!);

//         try {
//             const response = await fetch("https://api.web3forms.com/submit", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (response.ok) {
//                 toast.success("Message sent! I'll get back to you soon.");
//                 (e.target as HTMLFormElement).reset();
//             } else {
//                 toast.warning("Something went wrong. Please try again.");
//             }
//         } catch (error) {
//             toast.error("Network error. Please check your connection.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     }

//     return (
//         <section id="contact" className="py-24 relative overflow-hidden">
//             <div className=" mx-auto">
//                 <div className="flex items-center gap-4 mb-16">
//                     <h2 className="text-4xl font-bold text-brand">Get In Touch</h2>
//                     <div className="h-[1px] bg-brand/20 flex-grow" />
//                 </div>

//                 <div className="grid lg:grid-cols-2 gap-16">
//                     {/* Left Side: Contact Info */}
//                     <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} className="space-y-8">
//                         <div>
//                             <h3 className="text-2xl font-bold mb-4 text-brand">Let's Chat!</h3>
//                             <p className="leading-relaxed max-w-md">Whether you have a question about a project or just want to say hi, my inbox is always open. I'll do my best to get back to you!</p>
//                         </div>
//                         <div className="space-y-6">
//                             <ContactInfo icon={<Mail />} label="Email" value="nandigamwarharsh@gmail.com" />
//                             <ContactInfo icon={<MapPin />} label="Location" value="India" />
//                         </div>

//                         {/* Social Button */}
//                         <div className="hidden md:flex ml-1 gap-4 flex-wrap justify-center md:justify-start mb-8 md:mb-0 ">
//                             {social.map((item) => {
//                                 return (
//                                     <motion.a
//                                         initial={{opacity: 0, y: 20}}
//                                         whileInView={{opacity: 1, y: 0}}
//                                         transition={{duration: 0.3, delay: item.id * 0.1}}
//                                         whileHover={{scale: 1.05}}
//                                         whileTap={{scale: 0.95}}
//                                         key={item.id}
//                                         href={item.link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="h-15 w-15 p-3 rounded-full flex items-center justify-center border border-brand/30 hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm font-bold transition-transform duration-300 cursor-pointer hover:text-brand "
//                                     >
//                                         {item.logo}
//                                     </motion.a>
//                                 );
//                             })}
//                         </div>

//                         <div className="md:hidden flex ml-1 gap-4 flex-wrap justify-center md:justify-start mb-8 md:mb-0 ">
//                             {social.map((item) => {
//                                 return (
//                                     <a
//                                         key={item.id}
//                                         href={item.link}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="h-15 w-15 p-3 rounded-full flex items-center justify-center border border-brand/30 hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm font-bold transition-transform duration-300 cursor-pointer hover:text-brand "
//                                     >
//                                         {item.logo}
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </motion.div>

//                     {/* Right Side: Form */}
//                     <motion.div
//                         initial={{opacity: 0, x: 20}}
//                         whileInView={{opacity: 1, x: 0}}
//                         className="bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 p-4 md:p-8 rounded-2xl "
//                     >
//                         <form onSubmit={handleSubmit} className="space-y-5">
//                             <div className="grid md:grid-cols-2 gap-5">
//                                 <InputGroup label="Name" name="name" type="text" placeholder="Enter name" title="Enter name" v={isSubmitting} />
//                                 <InputGroup label="Email" name="email" type="email" placeholder="Enter email" title="Enter email 📧 " v={isSubmitting} />
//                             </div>
//                             <InputGroup label="Subject" name="subject" type="text" placeholder="Enter subject" title="Enter subject " v={isSubmitting} />

//                             <div className="flex flex-col gap-2">
//                                 <label className="text-xs font-mono uppercase text-brand tracking-widest ml-1">Message</label>
//                                 <div className="relative w-full">
//                                     <AnimatePresence mode="wait">
//                                         {showPlaceholder && (
//                                             <motion.div
//                                                 key={PlaceholderMessages[index]}
//                                                 initial={{opacity: 0, y: 10}}
//                                                 animate={{opacity: 1, y: 0}}
//                                                 exit={{opacity: 0, y: -10}}
//                                                 transition={{duration: 0.4, ease: "easeInOut"}}
//                                                 className="absolute top-4 left-4 pointer-events-none text-gray-500"
//                                             >
//                                                 {PlaceholderMessages[index]}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>

//                                     <textarea
//                                         name="message"
//                                         required
//                                         disabled={isSubmitting}
//                                         rows={5}
//                                         value={val}
//                                         onChange={(e) => setVal(e.target.value)}
//                                         onFocus={() => setIsFocused(true)}
//                                         onBlur={() => setIsFocused(false)}
//                                         title="Enter Message"
//                                         className="w-full bg-brand/10 border border-brand/30 rounded-xl p-4 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all resize-none block"
//                                     />
//                                 </div>
//                             </div>
//                             {/* Submit button */}
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`w-full py-4 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${isSubmitting ? "" : "bg-brand"} `}
//                             >
//                                 {isSubmitting ? (
//                                     <ThinkingDots />
//                                 ) : (
//                                     <>
//                                         Send Message <Send size={18} />
//                                     </>
//                                 )}
//                             </button>
//                         </form>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// /* Helper Components */
// // Input : Name, Email, Subject.
// function InputGroup({label, name, type, placeholder, title, v}: any) {
//     return (
//         <div className="flex flex-col gap-2">
//             <label className="text-xs font-mono uppercase text-brand tracking-widest ml-1">{label}</label>
//             <input
//                 required
//                 disabled={v}
//                 type={type}
//                 name={name}
//                 placeholder={placeholder}
//                 title={title}
//                 className="bg-brand/10 border border-brand/30 rounded-xl p-4 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all"
//             />
//         </div>
//     );
// }
// // Contact info
// function ContactInfo({icon, label, value}: any) {
//     return (
//         <div className="flex items-center gap-4">
//             <div className="p-3 bg-brand/10 text-brand rounded-lg">{icon}</div>
//             <div>
//                 <p className="text-xs text-brand font-mono uppercase tracking-widest">{label}</p>
//                 <a href={`mailto:${value}`} className="font-medium">
//                     {value}
//                 </a>
//             </div>
//         </div>
//     );
// }

"use client";
import {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence, useScroll, useTransform} from "framer-motion";
import {Send, Mail, MapPin} from "lucide-react";
import {toast} from "sonner";
import GithubIcon from "@/components/icons/githubIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import TwitterXIcon from "@/components/icons/twitterIcon";
import ThinkingDots from "@/components/ThinkingDots";

/* Data */
const social = [
    {
        id: 1,
        link: "https://github.com/HarshNandigamwar",
        logo: <GithubIcon />,
        label: "GitHub",
    },
    {
        id: 2,
        link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        logo: <LinkedinIcon />,
        label: "LinkedIn",
    },
    {
        id: 3,
        link: "https://x.com/Harsh477011?s=09",
        logo: <TwitterXIcon />,
        label: "Twitter",
    },
];

const placeholders = [
    "Tell me about your project...",
    "What are we building together?",
    "Need help with a new design?",
    "Got a big idea to share?",
    "Let's start a conversation...",
    "What's on your mind?",
];

/* Helpers */

/* Animated input field */
function InputGroup({label, name, type, placeholder, disabled, index}: {label: string; name: string; type: string; placeholder: string; disabled: boolean; index: number}) {
    const [focused, setFocused] = useState(false);

    return (
        <motion.div initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.1 + index * 0.08}} className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 ml-0.5">{label}</label>
            <div className="relative">
                <input
                    required
                    disabled={disabled}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5
                     text-white/80 placeholder:text-white/20 font-mono text-sm
                     focus:outline-none focus:border-brand/50 focus:bg-brand/5
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300"
                />
            </div>
        </motion.div>
    );
}

/* Contact info row */
function ContactInfo({icon, label, value, href, index}: {icon: React.ReactNode; label: string; value: string; href: string; index: number}) {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: 0.2 + index * 0.1}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="flex items-center gap-4 group"
        >
            <motion.div
                animate={{
                    backgroundColor: hovered ? "rgba(34,197,94,0.2)" : "rgba(34,197,94,0.08)",
                    borderColor: hovered ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.2)",
                }}
                transition={{duration: 0.3}}
                className="p-3 rounded-xl border text-brand shrink-0"
            >
                {icon}
            </motion.div>
            <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-0.5">{label}</p>
                <a href={href} className="text-sm font-medium text-white/70 group-hover:text-brand transition-colors duration-300">
                    {value}
                </a>
            </div>
        </motion.div>
    );
}

/* Social pill */
function SocialPill({item, index}: {item: (typeof social)[0]; index: number}) {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.3 + index * 0.08, type: "spring", stiffness: 200}}
            whileHover={{scale: 1.1, y: -3}}
            whileTap={{scale: 0.95}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative h-12 w-12 flex items-center justify-center rounded-2xl
                 border border-white/10 bg-white/[0.04] backdrop-blur-md
                 hover:border-brand/50 transition-colors duration-300 overflow-hidden cursor-pointer"
        >
            <motion.div animate={{opacity: hovered ? 1 : 0}} className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent" />
            <motion.span animate={{color: hovered ? "#22c55e" : "rgba(255,255,255,0.45)"}} transition={{duration: 0.2}} className="relative z-10">
                {item.logo}
            </motion.span>
        </motion.a>
    );
}

/* MAIN COMPONENT */
export default function ContactPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const [phIndex, setPhIndex] = useState(0);
    const [focused, setFocused] = useState(false);
    const [msgVal, setMsgVal] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const bgY2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

    /* Cycle placeholder */
    useEffect(() => {
        const id = setInterval(() => setPhIndex((p) => (p + 1) % placeholders.length), 4000);
        return () => clearInterval(id);
    }, []);

    const showPlaceholder = !focused && msgVal === "";

    /* Submit */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3KEY!);
        try {
            const res = await fetch("https://api.web3forms.com/submit", {method: "POST", body: formData});
            if (res.ok) {
                toast.success("Message sent! I'll get back to you soon.");
                (e.target as HTMLFormElement).reset();
                setMsgVal("");
            } else {
                toast.warning("Something went wrong. Please try again.");
            }
        } catch {
            toast.error("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section ref={sectionRef} id="contact" className="relative py-10 md:py-16 overflow-hidden">
            {/* Backgroun */}
            <motion.div
                style={{y: bgY}}
                className="absolute -left-40 top-1/3 w-[500px] h-[500px]
                   rounded-full bg-brand/6 blur-[160px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY2}}
                className="absolute -right-20 bottom-0 w-[350px] h-[350px]
                   rounded-full bg-emerald-300/4 blur-[120px] pointer-events-none -z-10"
            />

            <div className="mx-auto px-3 ">
                {/* Section Header */}
                <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="mb-20">
                    <div className="flex items-end gap-6 mb-4">
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight
                           bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-none"
                        >
                            Get In Touch
                        </h2>
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent origin-left mb-2"
                        />
                    </div>
                    <p className="max-w-lg text-white/40 text-sm md:text-base leading-relaxed">Whether you have a project idea or just want to say hi my inbox is always open.</p>
                </motion.div>

                {/* Two column grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* LEFT — Info ── */}
                    <motion.div initial={{opacity: 0, x: -30}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.65}} className="space-y-10">
                        {/* Tagline */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">Let's Chat!</h3>
                            <p className="text-white/45 text-sm md:text-base leading-relaxed max-w-sm border-l-2 border-brand/30 pl-4">
                                I'll do my best to get back to you within 24 hours. Don't hesitate to reach out every great project starts with a conversation.
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className="space-y-5">
                            <ContactInfo icon={<Mail size={18} />} label="Email" value="nandigamwarharsh@gmail.com" href="mailto:nandigamwarharsh@gmail.com" index={0} />
                            <ContactInfo icon={<MapPin size={18} />} label="Location" value="India 🇮🇳" href="#" index={1} />
                        </div>

                        {/* Divider */}
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, delay: 0.3}}
                            className="h-px bg-gradient-to-r from-brand/20 via-white/10 to-transparent origin-left"
                        />

                        {/* Socials */}
                        <div>
                            <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.2em] mb-4">Find me on</p>
                            <div className="flex gap-3">
                                {social.map((item, i) => (
                                    <SocialPill key={item.id} item={item} index={i} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT — Form ── */}
                    <motion.div initial={{opacity: 0, x: 30}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.65, delay: 0.1}} className="relative">
                        {/* Form card */}
                        <div
                            className="relative rounded-2xl border border-white/10 bg-white/[0.02]
                            backdrop-blur-sm overflow-hidden p-3 md:p-8"
                        >
                            {/* Corner glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-brand/6 rounded-full blur-3xl -z-10" />

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <InputGroup label="Name" name="name" type="text" placeholder="Your name" disabled={isSubmitting} index={0} />
                                    <InputGroup label="Email" name="email" type="email" placeholder="your@email.com" disabled={isSubmitting} index={1} />
                                </div>
                                <InputGroup label="Subject" name="subject" type="text" placeholder="What's it about?" disabled={isSubmitting} index={2} />

                                {/* Textarea with animated placeholder */}
                                <motion.div initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.34}} className="flex flex-col gap-2">
                                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 ml-0.5">Message</label>
                                    <div className="relative">
                                        {/* Animated placeholder */}
                                        <AnimatePresence mode="wait">
                                            {showPlaceholder && (
                                                <motion.div
                                                    key={placeholders[phIndex]}
                                                    initial={{opacity: 0, y: 8}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -8}}
                                                    transition={{duration: 0.35}}
                                                    className="absolute top-4 left-4 pointer-events-none
                                     font-mono text-sm text-white/20 select-none"
                                                >
                                                    {placeholders[phIndex]}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <textarea
                                            name="message"
                                            required
                                            disabled={isSubmitting}
                                            rows={5}
                                            value={msgVal}
                                            onChange={(e) => setMsgVal(e.target.value)}
                                            onFocus={() => setFocused(true)}
                                            onBlur={() => setFocused(false)}
                                            className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-4
                                 text-white/80 font-mono text-sm resize-none
                                 focus:outline-none focus:border-brand/50 focus:bg-brand/5
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-300 block"
                                        />
                                    </div>
                                </motion.div>

                                {/* Submit */}
                                <motion.div initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.42}}>
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={isSubmitting ? {} : {scale: 1.02}}
                                        whileTap={isSubmitting ? {} : {scale: 0.97}}
                                        className={`relative w-full py-4 rounded-xl font-bold text-black
                               ${isSubmitting ? "bg-transparent" : "bg-brand"} hover:bg-brand/90
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-colors duration-200 overflow-hidden cursor-pointer`}
                                    >
                                        {/* Shine sweep */}
                                        {!isSubmitting && <motion.span className="absolute inset-0 bg-white/20" initial={{x: "-100%"}} whileHover={{x: "100%"}} transition={{duration: 0.45}} />}
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <ThinkingDots />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <span>
                                                        <Send size={16} />
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    </motion.button>
                                </motion.div>
                            </form>
                        </div>

                        {/* Floating "response time" badge */}
                        <motion.div
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.7}}
                            className="hidden absolute -bottom-5 left-1/2 -translate-x-1/2
                         md:flex items-center gap-2 px-4 py-2 rounded-full
                         border border-white/10 bg-black/80 backdrop-blur-md z-10 whitespace-nowrap"
                        >
                            <span className="font-mono text-xs text-white/40">
                                Usually responds within <span className="text-brand">24 hours</span>
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
