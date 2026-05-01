"use client";
import {GitHubCalendar} from "react-github-calendar";
import {motion} from "framer-motion";
import {Github} from "lucide-react";
import {useState, useEffect} from "react";
import ThinkingDots from "@/components/ThinkingDots";
 
interface GitHubData {
    public_repos: number;
    followers: number;
    following: number;
}
export default function GitHubStatsPage() {
    const [loading, setLoading] = useState(true);
    const [githubData, setGitHubData] = useState<GitHubData | null>(null);
    const greenTheme = {
        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const [response] = await Promise.all([fetch(`https://api.github.com/users/HarshNandigamwar`)]);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                setGitHubData(await response.json());
            } catch (error) {
                setLoading(false);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <section className="py-24 mx-auto">
            <motion.h2 initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} className="text-5xl font-bold flex items-center gap-4 mb-14">
                <span className="text-4xl font-bold text-brand">GitHub</span>
                <div className="h-[1px] bg-brand/20 flex-grow" />
            </motion.h2>
            <div className="bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 rounded-2xl p-4 md:p-12 relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3 justify-center md:justify-start ">
                            <Github className="hidden md:block text-brand" size={32} />
                            GitHub Activity
                        </h2>
                        <p className="text-center md:text-start mt-2">My daily contributions and coding consistency on GitHub.</p>
                    </div>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.1}}
                        className="flex items-center justify-center md:justify-end w-full"
                    >
                        <a
                            href="https://github.com/HarshNandigamwar"
                            target="_blank"
                            className="px-6 py-2 bg-brand/10 border border-brand/20 text-brand rounded-full text-sm font-bold hover:bg-brand hover:text-black transition-all"
                        >
                            Visit Profile
                        </a>
                    </motion.div>
                </div>

                {/* GitHub Chart */}
                <div className="flex justify-center overflow-x-auto p-4 bg-black/5 rounded-xl border border-brand/30">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex gap-1 w-full justify-center animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                        <ThinkingDots />
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs text-brand/50">Fetching contribution data...</p>
                        </div>
                    ) : (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="w-full flex justify-center">
                            <GitHubCalendar username="HarshNandigamwar" blockSize={12} blockMargin={4} theme={greenTheme} fontSize={14} />
                        </motion.div>
                    )}
                </div>

                {/* Git Cards */}
                <div className={` mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8`}>
                    {[
                        {
                            label: "Repositories",
                            value: githubData?.public_repos || "N/A",
                            sub: "public projects",
                        },
                        {
                            label: "Followers",
                            value: githubData?.followers || "N/A",
                            sub: "web-heads",
                        },
                        {
                            label: "Following",
                            value: githubData?.following || "N/A",
                            sub: "in the network",
                        },
                    ].map((s, idx) => (
                        <motion.div
                            key={s.label}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: idx * 0.1}}
                            whileHover={{scale: 1.05}}
                            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 text-center"
                        >
                            <div>
                                <p className="text-brand font-bold text-xl uppercase">{s.label}</p>
                                <div className="m-1">{loading ? <ThinkingDots /> : <p>{s.value}</p>}</div>
                                <p className="text-xs text-white/40">{s.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
