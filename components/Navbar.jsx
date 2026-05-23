import Image from "next/image";
import { Menu, UserRound } from "lucide-react";
import { images } from "@/constants/images";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Image src={images.logo} alt="Aura Media Logo" width={90} height={10} />

        <div className="hidden items-center gap-10 text-sm text-white md:flex">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <UserRound
  className="h-7 w-7 rounded-full border border-blue-600 p-1 text-blue-500"
  strokeWidth={2.8}
/>
          <span className="text-sm font-bold text-white">LET&rsquo;S TALK</span>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <UserRound className="h-7 w-7 rounded-full border border-blue-600 p-1 text-blue-500" />
          <Menu className="h-7 w-7 text-white" />
        </div>
      </nav>
    </header>
  );
}
