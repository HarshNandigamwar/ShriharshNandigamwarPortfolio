"use client";
import {GitHubCalendar} from "react-github-calendar";
import {motion, useScroll, useTransform} from "framer-motion";
import {Github} from "lucide-react";
import {useState, useEffect, useRef} from "react";
import ThinkingDots from "@/components/ThinkingDots";

/* Types */
interface GitHubData {
    public_repos: number;
    followers: number;
    following: number;
}

/* Constants */
const greenTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const USERNAME = "HarshNandigamwar";

/* Helpers */

/* Animated count-up number */
const AnimatedNumber = ({value, loading}: {value: number | string; loading: boolean}) => {
    if (loading) return <ThinkingDots />;
    return (
        <motion.span initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}} className="text-3xl font-black text-brand font-mono">
            {value}
        </motion.span>
    );
};

/* Stat card */
const StatCard = ({label, value, sub, index, loading}: {label: string; value: number | string; sub: string; index: number; loading: boolean}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.1 + index * 0.12, duration: 0.5}}
            whileHover={{y: -6}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative flex flex-col items-center gap-1 p-6 rounded-2xl
                 border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden group"
        >
            {/* Glow */}
            <motion.div animate={{opacity: hovered ? 1 : 0}} transition={{duration: 0.3}} className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent -z-10" />
            {/* Top accent */}
            <motion.div animate={{scaleX: hovered ? 1 : 0}} transition={{duration: 0.35}} className="absolute top-0 left-0 right-0 h-px bg-brand origin-left" />

            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">{label}</p>
            <AnimatedNumber value={value} loading={loading} />
            <p className="text-xs text-white/25 font-mono mt-0.5">{sub}</p>
        </motion.div>
    );
};

/* MAIN COMPONENT */
export default function GitHubStatsPage() {
    const [loading, setLoading] = useState(true);
    const [githubData, setGitHubData] = useState<GitHubData | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const res = await fetch(`https://api.github.com/users/${USERNAME}`);
                if (!res.ok) throw new Error(`${res.status}`);
                setGitHubData(await res.json());
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const stats = [
        {label: "Repositories", value: githubData?.public_repos ?? "—", sub: "public projects"},
        {label: "Followers", value: githubData?.followers ?? "—", sub: "devs following"},
        {label: "Following", value: githubData?.following ?? "—", sub: "in the network"},
    ];

    return (
        <section ref={sectionRef} id="github" className="relative py-10 md:py-16 overflow-hidden">
            {/* Background */}
            <motion.div
                style={{y: bgY}}
                className="absolute -left-40 top-1/3 w-[500px] h-[500px]
                   rounded-full bg-brand/6 blur-[160px] pointer-events-none -z-10"
            />
            <motion.div
                style={{y: bgY}}
                className="absolute -right-20 bottom-0 w-[320px] h-[320px]
                   rounded-full bg-emerald-300/4 blur-[120px] pointer-events-none -z-10"
            />

            {/* Dot grid */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.018]"
                style={{
                    backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="mx-auto px-6">
                {/* Section Header */}
                <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className="mb-20">
                    <div className="flex items-end gap-6 mb-4">
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight
                           bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent leading-none"
                        >
                            GitHub
                        </h2>
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent origin-left mb-2"
                        />
                    </div>
                    <p className="max-w-lg text-white/40 text-sm md:text-base leading-relaxed">My daily contributions and coding consistency one commit at a time.</p>
                </motion.div>

                {/* Main card */}
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.65}}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.02]
                     backdrop-blur-sm overflow-hidden p-6 md:p-10"
                >
                    {/* Card top accent */}
                    <motion.div
                        initial={{scaleX: 0}}
                        whileInView={{scaleX: 1}}
                        viewport={{once: true}}
                        transition={{duration: 1, delay: 0.2}}
                        className="absolute top-0 left-0 right-0 h-px
                       bg-gradient-to-r from-brand/80 via-brand/30 to-transparent origin-left"
                    />
                    {/* Corner glow */}
                    <div className="absolute top-0 left-0 w-48 h-48 bg-brand/8 rounded-full blur-3xl -z-10" />

                    {/* Card header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl border border-brand/25 bg-brand/8">
                                    <Github className="text-brand" size={22} />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight">GitHub Activity</h3>
                            </div>
                            <p className="text-white/35 text-sm font-mono">@{USERNAME}</p>
                        </div>

                        {/* Visit profile button */}
                        <motion.a
                            href={`https://github.com/${USERNAME}`}
                            target="_blank"
                            whileHover={{scale: 1.05, y: -2}}
                            whileTap={{scale: 0.96}}
                            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full
                         border border-brand/30 bg-brand/8 text-brand font-semibold text-sm
                         hover:border-brand/60 hover:bg-brand/15
                         transition-colors duration-300 cursor-pointer overflow-hidden"
                        >
                            <Github size={15} />
                            Visit Profile
                        </motion.a>
                    </div>

                    {/* Contribution calendar */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.25}}
                        className="relative rounded-xl border border-white/8 bg-black/30 p-4 md:p-6 mb-8 overflow-hidden"
                    >
                        {/* Calendar inner accent */}
                        <motion.div
                            initial={{scaleX: 0}}
                            whileInView={{scaleX: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.8, delay: 0.4}}
                            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand/50 to-transparent origin-left"
                        />

                        <div className="flex items-center gap-2 mb-5">
                            <span className="font-mono text-xs text-white/30 uppercase tracking-[0.2em]">Contribution Graph · Last 12 months</span>
                        </div>

                        <div className="flex justify-center overflow-x-auto">
                            {loading ? (
                                <div className="flex flex-col items-center gap-4 py-8 w-full">
                                    <div className="flex gap-2 justify-center">
                                        <ThinkingDots />
                                    </div>
                                    <p className="font-mono text-xs text-brand/40 tracking-wider animate-pulse">Fetching contribution data...</p>
                                </div>
                            ) : (
                                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.6}} className="w-full flex justify-center">
                                    <GitHubCalendar username={USERNAME} blockSize={13} blockMargin={4} theme={greenTheme} fontSize={13} />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {stats.map((s, i) => (
                            <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} index={i} loading={loading} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
