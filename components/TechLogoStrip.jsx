"use client";

import LogoLoop from "./LogoLoop";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

export default function TechLogoStrip() {
  return (
    <section className="relative overflow-hidden bg-[#050914] px-6 py-8 text-white">
      <div className="mx-auto h-24 max-w-7xl">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={72}
          hoverSpeed={18}
          scaleOnHover
          fadeOut
          fadeOutColor="#050914"
          ariaLabel="Technology partners"
          className="text-white/70"
        />
      </div>
    </section>
  );
}
