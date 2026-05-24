"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { Award, Rocket, Smile } from "lucide-react";
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

const stats = [
  {
    icon: Smile,
    value: 150,
    suffix: "+",
    label: "Happy Clients",
    color: "text-[#2539a8]",
  },
  {
    icon: Rocket,
    value: 250,
    suffix: "+",
    label: "Projects Completed",
    color: "text-[#ff1f2d]",
  },
  {
    icon: Award,
    value: 8,
    suffix: "+",
    label: "Years Experience",
    color: "text-[#ff1f2d]",
  },
];

function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 0.85,
      ease: "easeOut",
      onUpdate: latest => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-[#050914] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          className="relative hidden h-[450px] overflow-hidden rounded-3xl md:block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <Image
            src={images.hero}
            alt="About Aura Media"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </motion.div>

        <div className="space-y-10 md:space-y-0">
          <motion.div
            className="relative flex min-h-[560px] flex-col justify-end overflow-hidden rounded-3xl px-5 py-8 md:block md:min-h-0 md:overflow-visible md:rounded-none md:px-0 md:py-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <Image
              src={images.hero}
              alt=""
              fill
              className="object-cover md:hidden"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/76 to-[#050914]/18 md:hidden" />

            <div className="relative z-10">
              <motion.p
                className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff1f2d]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                Who We Are
              </motion.p>

              <motion.h2
                className="mb-6 text-4xl leading-tight md:text-5xl"
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.65 }}
              >
                Creative Design. <br />
                Powerful <span className="text-[#ff1f2d]">Results.</span>
              </motion.h2>

              <motion.p
                className="max-w-lg leading-7 text-white/70 md:mb-10 md:text-white/60"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.45 }}
              >
                Aura Media is a digital design agency focused on building modern
                websites, brand systems, and immersive user experiences for
                ambitious businesses.
                <br />
                <br />
                We combine strategy, motion, UI/UX, and development to create
                products that don&rsquo;t just look good &mdash; they perform.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="mb-10 grid gap-6 sm:grid-cols-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {stats.map(({ icon: Icon, value, suffix, label, color }) => (
              <motion.div key={label} variants={fadeUp}>
                <Icon className={`mb-3 ${color}`} />
                <h3 className="text-2xl font-bold">
                  <CountUp value={value} suffix={suffix} />
                </h3>
                <p className="text-sm text-white/60">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="rounded-xl bg-[#2539a8] px-8 py-4 text-sm font-bold"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            ABOUT OUR AGENCY
          </motion.button>
        </div>
      </div>
    </section>
  );
}
