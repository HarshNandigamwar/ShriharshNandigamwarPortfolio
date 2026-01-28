"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-brand mb-2">{project.Title}</h3>
      <p className="text-sm opacity-80 mb-4">{project.Description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.TechStack.map((tech: string) => (
          <span
            key={tech}
            className="text-[10px] px-2 py-1 bg-brand/10 text-brand rounded-full border border-brand/20"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <a href={project.GitHub} className="hover:text-brand transition-colors">
          <Github size={20} />
        </a>
        <a href={project.Live} className="hover:text-brand transition-colors">
          <ExternalLink size={20} />
        </a>
      </div>
    </motion.div>
  );
}
