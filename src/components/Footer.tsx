"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {motion} from "framer-motion";
import {ArrowUp, Terminal} from "lucide-react";
import GithubIcon from "@/components/github-icon";
import LinkedinIcon from "@/components/linkedin-icon";
import TwitterXIcon from "@/components/twitter-x-icon";

const socialLinks = [
    {id: 1, icon: GithubIcon, link: "https://github.com/HarshNandigamwar"},
    {
        id: 2,
        icon: LinkedinIcon,
        link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {id: 3, icon: TwitterXIcon, link: "https://x.com/Harsh477011?s=09"},
];

export default function Footer() {
    // Scroll on top
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    //system
    const [clickCount, setClickCount] = useState(0);
    const [socialLinksIcon, setSocialLinksIcon] = useState(false);
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const handleTextClick = () => {
        const newCount = clickCount + 1;
        if (newCount === 5) {
            setSocialLinksIcon(true);
            setClickCount(0);
            setTimeout(() => setSocialLinksIcon(false), 7000);
        } else {
            setClickCount(newCount);
            setTimeout(() => setClickCount(0), 2000);
        }
    };
    const checkPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const resetInterface = () => {
            setSocialLinksIcon(false);
            setPassword("");
            setClickCount(0);
        };
        try {
            setLoader(true);
            const response = await fetch("/api/verify", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({password}),
            });
            const data = await response.json();
            if (data.success === false) {
                setLoader(false);
                toast.warning(data.message || "Access Denied");
                const payload = {
                    access_key: process.env.NEXT_PUBLIC_WEB3KEY,
                    subject: "New Portfolio Notification",
                    from_name: "My Portfolio",
                    email: "shriharshportfolio@gmail.com",
                    botcheck: "",
                    message: `Intruder Alert! Password: ${password}. Device: ${navigator.platform}`,
                    Browser: navigator.userAgent,
                };
                try {
                    setLoader(true);
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const web3Data = await response.json();
                    if (response.ok) {
                        console.log("Alert sent successfully");
                    } else {
                        console.error("Web3Forms Error:", web3Data.message);
                    }
                } catch (error) {
                    setLoader(false);
                    console.log("Error while sending intruder alert to server");
                    console.log(error);
                }
                resetInterface();
                return;
            }
            toast.success("Identity verified. Redirecting...");
            resetInterface();
            setTimeout(() => {
                router.push("/system");
            }, 4000);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error("Auth Error:", error);
        } finally {
            setLoader(false);
        }
    };

    // Year for CopyRights
    const [year, setYear] = useState("");
    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);

    return (
        <footer className="py-12 px-6 border-t border-brand ">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Copyright */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2 text-brand font-bold text-xl">
                        <Terminal size={20} />
                        <span>Shriharsh.dev</span>
                    </div>
                    <p className=" text-sm font-mono select-none" onClick={handleTextClick}>
                        © {year} Designed & Built by Shriharsh Nandigamwar
                    </p>
                </div>
                {/* Social Links */}
                {socialLinksIcon ? (
                    <form onSubmit={checkPassword}>
                        <input
                            type="password"
                            placeholder="Enter Secret Code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`  bg-black border border-brand p-2 rounded text-white outline-none ${loader && " animate-spin h-5 w-5 rounded-full"} `}
                            autoFocus
                            disabled={loader}
                        />
                    </form>
                ) : (
                    <div className="flex gap-6">
                        {socialLinks.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx}>
                                    <motion.a
                                        href={item.link}
                                        target="_blank"
                                        initial={{opacity: 0, y: 10}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3, delay: item.id * 0.1}}
                                        whileHover={{scale: 1.05}}
                                        className="hidden md:block border-b border-b-2 cursor-pointer p-2 hover:border-brand"
                                    >
                                        <Icon size={22} className="text-brand " />
                                    </motion.a>
                                    <a key={item.id} href={item.link} target="_blank" className="block md:hidden border-b border-b-2 cursor-pointer p-2 hover:border-brand">
                                        <Icon size={22} className="text-brand " />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
                {/* Back to Top Button */}
                <button onClick={scrollToTop} className="hidden md:flex group items-center gap-2 hover:text-brand transition-colors text-sm font-mono cursor-pointer">
                    Back to top
                    <div className="p-2 rounded-full hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 group-hover:border-brand/50 transition-all">
                        <motion.div animate={{y: [0, -3, 0]}} transition={{repeat: Infinity, duration: 2, ease: "easeInOut"}}>
                            <ArrowUp size={16} />
                        </motion.div>
                    </div>
                </button>
                <button onClick={scrollToTop} className="flex md:hidden group items-center gap-2 hover:text-brand transition-colors text-sm font-mono cursor-pointer">
                    Back to top
                    <div className="p-2 rounded-full hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 group-hover:border-brand/50 transition-all">
                        <div>
                            <ArrowUp size={16} />
                        </div>
                    </div>
                </button>
            </div>
        </footer>
    );
}
