import Image from "next/image";
import { images } from "@/constants/images";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#03060f] px-6 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Image src={images.logo} alt="Aura Media Logo" width={130} height={60} />
          <p className="mt-4 max-w-sm text-sm text-white/60">
            Designing digital experiences that inspire, connect and drive
            results.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-white/70">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
