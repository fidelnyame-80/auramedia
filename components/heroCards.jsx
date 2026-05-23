"use client";

import { motion } from "framer-motion";

const cards = [
  { gradient: "from-[#2539a8] to-[#1a2680]", label: "Branding" },
  { gradient: "from-[#ff1f2d] to-[#cc0018]", label: "Web Design" },
  { gradient: "from-[#f2eee5] to-[#b0a99a]", label: "Digital" },
];

export default function HeroCards() {
  return (
    <div className="relative h-[460px] w-[420px]">
      {cards.map((card, index) => {
        const positions = [
          { right: 0, top: 90, rotate: 8 },
          { right: 70, top: 45, rotate: 0 },
          { right: 140, top: 0, rotate: -8 },
        ];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85, x: 80, y: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{
              delay: 1.5 + index * 0.3,
              duration: 0.75,
              ease: "easeInOut",
            }}
            className={`absolute overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-gradient-to-br ${card.gradient}`}
            style={{
              width: "250px",
              height: "340px",
              right: `${positions[index].right}px`,
              top: `${positions[index].top}px`,
              zIndex: index + 1,
              rotate: `${positions[index].rotate}deg`,
            }}
          >
            <div className="flex h-full items-end p-6">
              <span className="text-lg font-bold text-white/80">
                {card.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
