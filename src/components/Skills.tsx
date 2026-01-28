"use client";
import { motion } from "framer-motion";
import { Code2, Database, Laptop, Wrench } from "lucide-react";

const skillData = {
  Frontend: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux", "HTML5", "CSS3", "JavaScript"],
  Backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Firebase", "REST API"],
  Tools: ["Git", "GitHub", "Postman", "Vercel", "VS Code", "Netlify"]
};

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

export default function Skills() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
          <span className="text-brand font-mono text-xl">02.</span> Technical Skills
        </h2>

        {/* Category Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <SkillCategory title="Frontend" icon={<Laptop className="text-brand" />} skills={skillData.Frontend} />
          <SkillCategory title="Backend" icon={<Database className="text-brand" />} skills={skillData.Backend} />
          <SkillCategory title="Tools" icon={<Wrench className="text-brand" />} skills={skillData.Tools} />
        </div>

        {/* Infinite Moving Tape */}
        <div className="relative flex overflow-x-hidden border-y border-brand/20 py-10 bg-brand/5">
          <motion.div className="flex whitespace-nowrap gap-12"  animate={marqueeVariants} >
            {[...skillData.Frontend, ...skillData.Backend, ...skillData.Tools].map((skill, i) => (
              <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/10 hover:text-brand transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ title, icon, skills }: { title: string, icon: React.ReactNode, skills: string[] }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand/50 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
