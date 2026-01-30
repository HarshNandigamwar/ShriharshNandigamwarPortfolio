"use client";
import { motion } from "framer-motion";
import { Code, GraduationCap, BadgeCheck } from "lucide-react";

const stats = [
  {
    label: "Experience",
    value: "Internship",
    icon: GraduationCap,
    link: "#experience",
  },
  { label: "Projects", value: "3+", icon: Code, link: "#projects" },
  {
    label: "Certificates",
    value: "won",
    icon: BadgeCheck,
    link: "#certificates",
  },
];

export default function AboutPage() {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold text-brand">About Me</h2>
          <div className="h-[1px] bg-brand/20 flex-grow" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative hidden md:flex justify-center"
          >
            <div className="absolute w-64 md:w-94 h-64 md:h-94 bg-[#22c55e] rounded-full blur-[80px] opacity-20 -z-10 " />
            {/* Image Container */}
            <div className="relative z-10 w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img
                src="/images/harsh.png"
                alt="Shriharsh Nandigamwar"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg opacity-80 leading-relaxed mb-6">
              Hello! I'm{" "}
              <span className="text-brand font-bold">
                Shriharsh Nandigamwar
              </span>
              , a dedicated Full Stack Developer with a strong passion for
              building fast, functional, and visually engaging web applications.
            </p>
            <p className="text-lg opacity-80 leading-relaxed mb-8">
              My journey in tech is fueled by a curiosity for real-world problem
              solving. I specialize in the
              <span className=" font-semibold text-brand ">
                {" "}
                MERN Stack
              </span>{" "}
              and <span className=" font-semibold text-brand ">Next.js</span>,
              focusing on clean code and intuitive user experiences.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.a
                    href={stat.link}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    title={`Click to explore ${stat.label}`}
                    className="p-2 md:p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-white/10 text-center hover:border-brand/50 transition-colors cursor-pointer "
                  >
                    <Icon className="text-brand mx-auto mb-2" size={20} />
                    <div className="md:text-xl text-center font-bold">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest opacity-50">
                      {stat.label}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
