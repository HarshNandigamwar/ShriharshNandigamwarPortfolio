"use client";
import { motion } from "framer-motion";
import {
  Terminal,
  Database,
  Wrench,
  Cpu,
  Layers,
  Globe,
  Zap,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layers className="text-brand" />,
    description: "Crafting responsive, high-performance user interfaces.",
    skills: [
      "Next.js",
      "React.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "HTML5/CSS3",
    ],
    color: "from-green-500/20 to-transparent",
  },
  {
    title: "Backend & Database",
    icon: <Database className="text-brand" />,
    description: "Building scalable server-side logic and managing data.",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Firebase",
      "REST APIs",
    ],
    color: "from-emerald-500/20 to-transparent",
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="text-brand" />,
    description: "Streamlining development and deployment workflows.",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Netlify",
      "Docker (Learning)",
    ],
    color: "from-green-600/20 to-transparent",
  },
];

export default function SkillsPage() {
  return (
    <section className="py-24 bg-transparent relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px]" />

      <div className="mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold flex items-center gap-4 mb-14"
          >
            <span className="text-4xl font-bold text-brand">Toolkit</span>
            <div className="h-[1px] bg-brand/20 flex-grow" />
          </motion.h2>
          <p className="text-center text-lg">
            A comprehensive overview of my technical stack and the tools I use
            to bring digital ideas to life.
          </p>
        </div>

        {/* skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative overflow-hidden p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${cat.color} backdrop-blur-sm group hover:border-brand/50 transition-all duration-500`}
            >
              <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
              <p className="text-sm mb-6 leading-relaxed">{cat.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono bg-brand/30 border border-white/5 rounded-full group-hover:text-brand group-hover:border-brand/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Tech Highlight */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TechFeature icon={<Terminal />} label="Clean Code" />
          <TechFeature icon={<Zap />} label="Performance" />
          <TechFeature icon={<Globe />} label="SEO Ready" />
          <TechFeature icon={<Cpu />} label="Scalability" />
        </div>
      </div>
    </section>
  );
}

function TechFeature({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand/10 border border-brand/30 transition-colors group">
      <div className="text-brand ">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}
