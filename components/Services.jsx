"use client";

import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  PenTool,
  Smartphone,
  ArrowRight,
} from "lucide-react";

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

const cardGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

function PictureFrameIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 323.365 323.365"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M265.834,270.637H15V95.26c0-4.143-3.357-7.5-7.5-7.5S0,91.117,0,95.26v182.877 c0,4.143,3.357,7.5,7.5,7.5h258.334c4.143,0,7.5-3.357,7.5-7.5S269.977,270.637,265.834,270.637z" />
      <path d="M315.865,37.729H57.531c-4.143,0-7.5,3.357-7.5,7.5v182.877c0,4.143,3.357,7.5,7.5,7.5h258.334 c4.143,0,7.5-3.357,7.5-7.5V45.229C323.365,41.086,320.008,37.729,315.865,37.729z M308.365,220.605H65.031V52.729h243.334V220.605 z" />
      <path d="M118.573,209.707c4.143,0,7.5-3.357,7.5-7.5v-0.556c0-20.051,12.488-37.709,30.917-44.569 c6.999,8.469,17.579,13.875,29.398,13.875h0.619c11.819,0,22.399-5.406,29.398-13.875c18.431,6.859,30.917,24.515,30.917,44.569 v0.556c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-0.556c0-25.688-15.581-48.384-38.793-57.888 c1.04-3.466,1.606-7.135,1.606-10.935v-22.494c0-21.023-17.104-38.128-38.128-38.128h-0.619c-21.023,0-38.128,17.104-38.128,38.128 v22.494c0,3.8,0.566,7.468,1.605,10.934c-23.211,9.505-38.793,32.207-38.793,57.888v0.556 C111.073,206.35,114.431,209.707,118.573,209.707z M163.261,110.335c0-12.753,10.375-23.128,23.128-23.128h0.619 c12.753,0,23.128,10.375,23.128,23.128v22.494c0,4.033-1.04,7.828-2.863,11.132c-0.244,0.345-0.464,0.71-0.65,1.1 c-4.091,6.536-11.352,10.896-19.615,10.896h-0.619c-8.525,0-15.982-4.64-19.993-11.523c-0.019-0.031-0.035-0.063-0.053-0.093 c-1.956-3.393-3.082-7.322-3.082-11.512V110.335z" />
    </svg>
  );
}

function PrintIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="translate(4.8 0)"
        d="M5.656 6.938l-0.344 2.688h11.781l-0.344-2.688c0-0.813-0.656-1.438-1.469-1.438h-8.188c-0.813 0-1.438 0.625-1.438 1.438zM1.438 11.094h19.531c0.813 0 1.438 0.625 1.438 1.438v8.563c0 0.813-0.625 1.438-1.438 1.438h-2.656v3.969h-14.219v-3.969h-2.656c-0.813 0-1.438-0.625-1.438-1.438v-8.563c0-0.813 0.625-1.438 1.438-1.438zM16.875 25.063v-9.281h-11.344v9.281h11.344zM15.188 18.469h-8.125c-0.188 0-0.344-0.188-0.344-0.375v-0.438c0-0.188 0.156-0.344 0.344-0.344h8.125c0.188 0 0.375 0.156 0.375 0.344v0.438c0 0.188-0.188 0.375-0.375 0.375zM15.188 21.063h-8.125c-0.188 0-0.344-0.188-0.344-0.375v-0.438c0-0.188 0.156-0.344 0.344-0.344h8.125c0.188 0 0.375 0.156 0.375 0.344v0.438c0 0.188-0.188 0.375-0.375 0.375zM15.188 23.656h-8.125c-0.188 0-0.344-0.188-0.344-0.375v-0.438c0-0.188 0.156-0.344 0.344-0.344h8.125c0.188 0 0.375 0.156 0.375 0.344v0.438c0 0.188-0.188 0.375-0.375 0.375z"
      />
    </svg>
  );
}

function ShirtIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className}
      viewBox="0 0 512 512"
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256,42c-33.88,0-64-10-64-10l0,2A64,64,0,0,0,320,34l0-2S289.88,42,256,42Z" />
      <path d="M352,44c-5.49,47.76-46.79,85-96,85s-90.51-37.24-96-85L16,94,34,208l61.71,7.42c7.08.9,7.1.9,7.1,8.19L96,480H416l-6.81-256.39c-.21-7-.21-7,7.1-8.19L478,208,496,94Z" />
    </svg>
  );
}

const services = [
  {
    title: "Website Designing",
    text: "Modern, responsive websites designed to engage and convert.",
    icon: MonitorSmartphone,
    color: "text-blue-500",
  },
  {
    title: "Graphic Designing",
    text: "Eye-catching visuals that communicate your brand with impact.",
    icon: PenTool,
    color: "text-red-500",
  },
  {
    title: "UI/UX Designs",
    text: "Intuitive interfaces and seamless experiences users love.",
    icon: Smartphone,
    color: "text-blue-500",
  },
  {
    title: "Picture Frame",
    text: "Build a strong, memorable brand that stands out from the crowd.",
    icon: PictureFrameIcon,
    color: "text-red-500",
  },
  {
    title: "Printing Services",
    text: "Premium quality prints that leave a lasting impression.",
    icon: PrintIcon,
    color: "text-blue-500",
  },
  {
    title: "Shirt Printing",
    text: "Custom shirt printing that represents your style and brand.",
    icon: ShirtIcon,
    color: "text-[#331ed2]",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#050914] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.p
            className="mb-3 text-lg lg:text-xl font-bold uppercase tracking-widest text-[#ff1f2d]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            Our Services
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.65 }}
          >
            Creative Solutions That Drive Results
          </motion.h2>
        </div>

        <motion.div
          className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-6"
          variants={cardGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                className="flex min-h-[420px] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center shadow-lg"
                variants={fadeUp}
              >
                <Icon className={`mx-auto mb-6 h-10 w-10 ${service.color}`} />

                <h3 className="mb-4 flex min-h-14 items-center font-bold">
                  {service.title}
                </h3>

                <p className="text-sm leading-6 text-white/60">
                  {service.text}
                </p>

                <button className="mt-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#2539a8] text-[#2539a8]">
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
