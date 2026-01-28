"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const certs = [
  { name: "Accenture", img: "https://res.cloudinary.com/darmatnf2/image/upload/v1761029046/Accenture_kcoo9d.png", desc: "Developer Job Simulation" },
  { name: "AWS", img: "https://res.cloudinary.com/darmatnf2/image/upload/v1761029051/AWS_yu4vat.png", desc: "Solutions Architecture" },
  { name: "IBM", img: "https://res.cloudinary.com/darmatnf2/image/upload/v1761029055/IBM_yyzqdd.png", desc: "Web Dev Fundamentals" }
];

export default function Certifications() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-12">Certifications</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl aspect-video bg-neutral-900"
          >
            <Image 
            //   src={cert.img} 
              alt={cert.name} 
              fill 
              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <h4 className="font-bold text-lg text-brand">{cert.name}</h4>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">{cert.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
