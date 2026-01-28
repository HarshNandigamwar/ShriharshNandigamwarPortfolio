"use client";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-start">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand font-mono mb-4"
        >
          Hi, my name is
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          Shriharsh
        </motion.h1>
        <motion.p 
          className="max-w-xl text-lg opacity-70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Full Stack Developer passionate about crafting seamless digital experiences.
        </motion.p>
        
        <div className="flex gap-4 flex-wrap">
          <button className="bg-brand text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            My Projects
          </button>
          <button className="border border-brand/30 hover:bg-brand/10 px-8 py-3 rounded-full font-bold transition-all">
            Let's Connect
          </button>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="text-brand font-mono text-xl">01.</span> Experience
        </h2>
        <div className="border-l-2 border-brand/30 pl-8 ml-4">
          <h3 className="text-xl font-bold">Web Development Intern</h3>
          <p className="text-brand">SkillCraft Technology</p>
          <p className="text-sm opacity-50 mb-4">Feb 2025 - Mar 2025</p>
          <ul className="list-disc list-inside space-y-2 opacity-80">
            <li>Worked on modern web stack integrations.</li>
            <li>Certificate ID: SCT/FEB25/5707</li>
          </ul>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <h2 className="text-3xl font-bold mb-10">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Map your projects here */}
          <ProjectCard project={{
            Title: "Sigma AI",
            Description: "AI-powered chatbot built using NextJS, TypeScript, and Gemini API.",
            TechStack: ["NextJS", "Tailwind CSS", "Gemini API"],
            GitHub: "https://github.com/HarshNandigamwar/SigmaAi",
            Live: "https://sigma-ai-shriharsh.vercel.app/"
          }} />
        </div>
      </section>

{/* skills */}
<Skills/>
{/* Certification */}
<Certifications/>

    </main>
  );
}
