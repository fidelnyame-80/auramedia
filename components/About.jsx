import Image from "next/image";
import { Award, Rocket, Smile } from "lucide-react";
import { images } from "@/constants/images";

export default function About() {
  return (
    <section id="about" className="bg-[#050914] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="relative h-[450px] overflow-hidden rounded-3xl">
          <Image
            src={images.hero}
            alt="About Aura Media"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff1f2d]">
            Who We Are
          </p>

          <h2 className="mb-6 text-4xl leading-tight md:text-5xl">
            Creative Design. <br />
            Powerful <span className="text-[#ff1f2d]">Results.</span>
          </h2>

          <p className="mb-10 max-w-lg leading-7 text-white/60">
            Aura Media is a digital design agency focused on building modern
            websites, brand systems, and immersive user experiences for
            ambitious businesses.
            <br />
            <br />
            We combine strategy, motion, UI/UX, and development to create
            products that don&rsquo;t just look good &mdash; they perform.
          </p>

          <div className="mb-10 grid gap-6 sm:grid-cols-3">
            <div>
              <Smile className="mb-3 text-[#2539a8]" />
              <h3 className="text-2xl font-bold">150+</h3>
              <p className="text-sm text-white/60">Happy Clients</p>
            </div>

            <div>
              <Rocket className="mb-3 text-[#ff1f2d]" />
              <h3 className="text-2xl font-bold">250+</h3>
              <p className="text-sm text-white/60">Projects Completed</p>
            </div>

            <div>
              <Award className="mb-3 text-[#ff1f2d]" />
              <h3 className="text-2xl font-bold">8+</h3>
              <p className="text-sm text-white/60">Years Experience</p>
            </div>
          </div>

          <button className="rounded-xl bg-[#2539a8] px-8 py-4 text-sm font-bold">
            ABOUT OUR AGENCY
          </button>
        </div>
      </div>
    </section>
  );
}
