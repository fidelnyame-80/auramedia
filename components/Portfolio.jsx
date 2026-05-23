import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/constants/images";

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
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff1f2d]">
              Our Work
            </p>
            <h2 className="text-4xl leading-tight">
              Designs That <br />
              Speak for <span className="text-[#ff1f2d]">Themselves.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {["All Work", "Web Design", "Branding", "Graphic Design", "Latest"].map(
              (item) => (
                <button
                  key={item}
                  className="rounded-full border border-[#2539a8] px-5 py-3 text-sm"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {projects.map(([title, category, img]) => (
            <div
              key={title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
