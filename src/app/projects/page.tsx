"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "Sigma AI",
    description:
      "Sigma-AI is an advanced AI-powered chatbot web application built using NextJS, TypeScript and Gemini API . Designed with a modern UI Sigma-AI delivers smart, responsive, and context-aware conversations all in a fast, beautifully styled web app.",
    tech: [
      "NextJS",
      "Tailwind CSS",
      "TypeScript",
      "Gemini-API",
      "Axios",
      "Motion",
    ],

    github: "https://github.com/HarshNandigamwar/SigmaAi",
    live: "https://sigma-ai-shriharsh.vercel.app/",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/SigmaAI1_rv1xux.png",
  },
  {
    title: "E-Commerce App",
    description:
      "This is a FullStack E-Commerce web application built with React.js & Firebase designed to deliver a smooth and engaging shopping experience.",
    tech: [
      "React.js",
      "Firebase",
      "Tailwind CSS",
      "DummyJSON API",
      "Axios",
      "Motion",
    ],
    github: "https://github.com/HarshNandigamwar/SigmaMart",
    live: "https://sigma-mart.vercel.app",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761028463/Ecom1_tdmejk.png",
  },
  {
    title: "Weather app",
    description:
      "Check the weather forecast anytime anywhere. Get accurate and up-to-date weather updates for your location.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Weather API"],
    github: "https://github.com/HarshNandigamwar/Weather-App",
    live: "https://weather-app-shriharsh.netlify.app",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761028344/weather3_jqtyt7.jpg",
  },
  {
    title: "Currency Converter app",
    description:
      "Quickly convert currencies on-the-go Get up-to-date exchange rates for countries worldwide.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Currency API"],
    github: "https://github.com/HarshNandigamwar/Currency-Converter",
    live: "https://shriharsh-currency-converter.netlify.app",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761028243/Currency_Converter2_xi1lkh.png",
  },
];

export default function ProjectsPage() {
  return (
    <section id="projects" className="py-24">
      <div className=" mx-auto">
        {/* Simple Heading */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold text-brand">Projects</h2>
          <div className="h-[1px] bg-brand/20 flex-grow" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-brand/10 border border-brand/30 rounded-2xl overflow-hidden "
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
              {/* Content */}
              <div className="p-4 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      className="hover:text-brand transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      className=" hover:text-brand transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider font-mono px-3 py-1 rounded-full bg-brand/5 border border-brand/20 text-brand"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Call to Action */}
        <div className="mt-20 text-center">
          <p className="mb-4">Want to see more?</p>
          <a
            href="https://github.com/HarshNandigamwar"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand/30 hover:border-brand/50 hover:bg-brand/10 transition-all"
          >
            <Code2 size={18} className="text-brand" />
            <span>Archive on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
