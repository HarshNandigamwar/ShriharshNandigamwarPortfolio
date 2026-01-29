"use client";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import ResumeButton from "@/components/ResumeButton";

const HomePage = () => {
  const social = [
    {
      id: 1,
      link: "https://github.com/HarshNandigamwar",
      logo: <Github />,
    },
    {
      id: 2,
      link: "https://www.linkedin.com/in/shriharsh-nandigamwar-b106702b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      logo: <Linkedin />,
    },
    {
      id: 3,
      link: "https://x.com/Harsh477011?s=09",
      logo: <Twitter />,
    },
  ];
  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row md:items-center justify-between "
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-2 md:mt-0"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand font-mono mb-4 text-center md:text-start "
        >
          Hi, my name is
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6 text-center md:text-start"
        >
          Shriharsh
        </motion.h1>
        <motion.p
          className="max-w-xl text-lg opacity-70 mb-8 text-center md:text-start "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A Full Stack Developer passionate about crafting seamless digital
          experiences. Always excited to tackle new challenges where I can
          create value and grow as a coder. Let's connect if you've got a
          project that could use my skills.
        </motion.p>
        {/* Project & Connect button */}
        <div className="flex gap-4 flex-wrap mb-8 justify-center md:justify-start ">
          <a
            href="#projects"
            className="bg-brand text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer"
          >
            My Projects
          </a>
          <a
            href="#contact"
            className="border border-brand/30 hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer"
          >
            Let's Connect
          </a>
        </div>
        <div className="md:flex gap-4 flex-wrap">
          {/* Social Button */}
          <div className="flex gap-4 flex-wrap justify-center md:justify-start mb-8 md:mb-0 ">
            {social.map((item, idx) => {
              return (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-15 w-15 p-3 rounded-full flex items-center justify-center border border-brand/30 hover:bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm font-bold transition-transform duration-300 cursor-pointer hover:text-brand "
                >
                  {item.logo}
                </motion.a>
              );
            })}
          </div>
          {/* Resume Button */}
          <div className="flex md:hidden justify-center ">
            <motion.a
              href="/documents/Shriharsh_Nandigamwar_Fullstack_resume.pdf"
              download="ShriharshNandigamwar_FullstackDeveloper.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-3 px-8 py-4 border border-brand/30 rounded-full font-medium transition-colors bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm hover:bg-black hover:border-brand"
            >
              <span>Download Resume</span>
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Download size={18} className="text-brand" />
              </motion.div>
            </motion.a>
          </div>
          <ResumeButton />
        </div>
      </motion.div>
      {/* Images */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex "
      >
        {/* Desktop Image */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -z-12 w-85 h-98 bg-[#22c55e] rounded-full mix-blend-screen filter blur-[80px] opacity-30"></div>
          <Image
            src="/images/ShriharshImageWBG.png"
            alt="N/A"
            width={500}
            height={0}
          />
        </div>
      </motion.div>
      <div className="flex items-center justify-center p-3 md:hidden">
        <Image
          src="/images/Shriharsh.jpg"
          alt="N/A"
          width={300}
          height={0}
          className="rounded-2xl"
        />
      </div>
    </section>
  );
};

export default HomePage;
