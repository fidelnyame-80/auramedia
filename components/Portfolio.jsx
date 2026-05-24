"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/constants/images";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const projects = [
  ["Cyber Apparel", "E-Commerce Website", images.projects.cyber],
  ["Liquid Visions", "Web Design", images.projects.liquid],
  ["Dark Streetwear", "Brand Identity", images.projects.dark],
  ["Vertex Studio", "Branding", images.projects.vertex],
  ["Neon Babies", "Graphic Design", images.projects.neon],
  ["Spiked Society", "Web Design", images.projects.spiked],
];

export default function Portfolio() {
  return (
    <section id="work" className="bg-[#050914] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              className="mb-3 text-lg font-bold uppercase tracking-widest text-[#ff1f2d]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              Our Work
            </motion.p>
            <motion.h2
              className="text-4xl leading-tight"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.65 }}
            >
              Designs That <br />
              Speak for <span className="text-[#ff1f2d]">Themselves.</span>
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
          >
            {["All Work", "Web Design", "Branding", "Graphic Design", "Latest"].map(
              (item) => (
                <motion.button
                  key={item}
                  className="rounded-full border border-[#2539a8] px-5 py-3 text-sm"
                  variants={fadeUp}
                >
                  {item}
                </motion.button>
              )
            )}
          </motion.div>
        </div>

        <motion.div
          className="grid gap-7 md:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {projects.map(([title, category, img]) => (
            <motion.div
              key={title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              variants={fadeUp}
            >
              <div className="relative h-64">
                <Image src={img} alt={title} fill className="object-cover" />
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm text-white/60">{category}</p>
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2539a8] text-[#2539a8]">
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
