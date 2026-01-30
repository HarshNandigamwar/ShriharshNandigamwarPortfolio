"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3KEY!);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.warning("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className=" mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold text-brand">Get In Touch</h2>
          <div className="h-[1px] bg-brand/20 flex-grow" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                Let's Chat!
              </h3>
              <p className="leading-relaxed max-w-md">
                Whether you have a question about a project or just want to say
                hi, my inbox is always open. I'll do my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfo
                icon={<Mail />}
                label="Email"
                value="nandigamwarharsh@gmail.com"
              />
              <ContactInfo icon={<MapPin />} label="Location" value="India" />
            </div>

            {/* Social Button */}
            <div className="ml-1 flex gap-4 flex-wrap justify-center md:justify-start mb-8 md:mb-0 ">
              {social.map((item) => {
                return (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: item.id * 0.1 }}
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
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-emerald-500/20 to-transparent backdrop-blur-sm border border-brand/30 p-4 md:p-8 rounded-2xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <InputGroup
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  title="Enter name"
                />
                <InputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  title="Enter email 📧 "
                />
              </div>
              <InputGroup
                label="Subject"
                name="subject"
                type="text"
                placeholder="Enter subject"
                title="Enter subject "
              />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-brand tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  title="Enter Message 💬"
                  className="w-full bg-brand/10 border border-brand/30 rounded-xl p-4 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all resize-none"
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Helper Components */
// Input : Name, Email, Subject.
function InputGroup({ label, name, type, placeholder, title }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-mono uppercase text-brand tracking-widest ml-1">
        {label}
      </label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        title={title}
        className="bg-brand/10 border border-brand/30 rounded-xl p-4 focus:border-brand/50 focus:ring-1 focus:ring-brand/50 outline-none transition-all"
      />
    </div>
  );
}
// Contact info
function ContactInfo({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand/10 text-brand rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-brand font-mono uppercase tracking-widest">
          {label}
        </p>
        <a href={`mailto:${value}`} className="font-medium">
          {value}
        </a>
      </div>
    </div>
  );
}
