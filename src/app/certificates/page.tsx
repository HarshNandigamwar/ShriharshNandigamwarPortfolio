"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, Calendar } from "lucide-react";

const certifications = [
  {
    name: "Accenture Developer Program",
    issuer: "Accenture",
    date: "2024",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761029046/Accenture_kcoo9d.png",
    description:
      "SDLC, Testing Lifecycle, Agile, and Algorithmic Thinking simulation.",
    category: "Software Engineering",
  },
  {
    name: "AWS Solutions Architecture",
    issuer: "Amazon Web Services",
    date: "2024",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761029051/AWS_yu4vat.png",
    description:
      "Focusing on scalable hosting architectures and cloud infrastructure.",
    category: "Cloud Computing",
  },
  {
    name: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "2023",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761029055/IBM_yyzqdd.png",
    description:
      "Core web technologies and fundamental development principles.",
    category: "Development",
  },
  {
    name: "Hackhazards '25",
    issuer: "The NAMESPACE Community",
    date: "2025",
    image:
      "https://res.cloudinary.com/darmatnf2/image/upload/v1761029069/Hackathon_zfgblj.png",
    description:
      "Participation in a global hackathon solving real-world challenges.",
    category: "Hackathon",
  },
];

export default function CertificationsPage() {
  return (
    <section id="certificates" className="py-24 px-3 md:px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold mb-4 text-brand">Certifications</h1>
          <div className="h-[1px] bg-brand/20 flex-grow" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-brand font-mono mb-2"
        >
          <ShieldCheck size={20} />
          <span>Verified Achievements</span>
        </motion.div>
        <p className="max-w-xl mb-16">
          A collection of professional certifications and simulation programs
          that have helped me sharpen my technical expertise.
        </p>
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group relative bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 rounded-2xl overflow-hidden hover:border-brand/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden bg-black/40">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden" />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand font-bold bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm px-2 py-1 rounded">
                      {cert.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs font-mono">
                      <Calendar size={12} /> {cert.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">
                    {cert.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand/10">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Award size={16} className="text-brand" />
                      <span className="text-xs font-medium">{cert.issuer}</span>
                    </div>
                    <a
                      href={cert.image}
                      className="p-2 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm text-brand transition-all cursor-pointer"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
