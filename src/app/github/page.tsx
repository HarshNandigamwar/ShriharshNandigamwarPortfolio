"use client";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function GitHubStatsPage() {
  const greenTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section className="py-24 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand/10 border border-brand/30 rounded-2xl p-4 md:p-12 relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-brand/10 rounded-full blur-[100px]" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Github className="text-brand" size={32} />
              GitHub Activity
            </h2>
            <p className="text-center md:text-start mt-2">
              My daily contributions and coding consistency on GitHub.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end w-full">
            <a
              href="https://github.com/HarshNandigamwar"
              target="_blank"
              className="px-6 py-2 bg-brand/10 border border-brand/20 text-brand rounded-full text-sm font-bold hover:bg-brand hover:text-black transition-all"
            >
              Visit Profile
            </a>
          </div>
        </div>

        {/* The GitHub Chart */}
        <div className="flex justify-center overflow-x-auto p-4 bg-black/5 rounded-xl border border-brand/30">
          <GitHubCalendar
            username="HarshNandigamwar"
            blockSize={12}
            blockMargin={4}
            theme={greenTheme}
            fontSize={14}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-brand font-bold text-xl uppercase">
              Consistency
            </p>
            <p className="text-xs text-white/40">Daily Updates</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-brand font-bold text-xl uppercase">Commitment</p>
            <p className="text-xs text-white/40">Real-time Sync</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-brand font-bold text-xl uppercase">
              Transparency
            </p>
            <p className="text-xs text-white/40">Public Repos</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
