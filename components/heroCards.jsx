"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const cards = [
  {
    image: "/images/branding.webp",
    label: "Branding",
    left: "220px",
    top: "120px",
    rotate: "40deg",
    finalLeft: 286,
    finalTop: 42,
    delay: "0.08s",
    floatDelay: "0.35s",
    floatDuration: "6.8s",
    floatRise: "-7px",
    floatDip: "4px",
  },
  {
    image: "/images/webDesign.webp",
    label: "Web Design",
    left: "120px",
    top: "58px",
    rotate: "0deg",
    finalLeft: 146,
    finalTop: 42,
    delay: "0.22s",
    floatDelay: "1.1s",
    floatDuration: "7.6s",
    floatRise: "-5px",
    floatDip: "6px",
  },
  {
    image: "/images/digital.webp",
    label: "Digital",
    left: "18px",
    top: "8px",
    rotate: "-8deg",
    finalLeft: 6,
    finalTop: 42,
    delay: "0.36s",
    floatDelay: "0.75s",
    floatDuration: "7.1s",
    floatRise: "-6px",
    floatDip: "5px",
  },
];

function StackingCard({ card, index, onImageReady }) {
  const startLeft = Number.parseFloat(card.left);
  const startTop = Number.parseFloat(card.top);

  return (
    <div
      className={styles.heroCardSlot}
      style={{
        "--card-delay": card.delay,
        "--card-rotate": card.rotate,
        "--card-settle-x": `${card.finalLeft - startLeft}px`,
        "--card-settle-y": `${card.finalTop - startTop}px`,
        "--card-float-delay": card.floatDelay,
        "--card-float-duration": card.floatDuration,
        "--card-float-rise": card.floatRise,
        "--card-float-dip": card.floatDip,
        left: card.left,
        top: card.top,
        zIndex: 40 + index,
      }}
    >
      <div className={styles.heroCardFloat}>
        <div className={styles.heroCard}>
          <Image
            src={card.image}
            alt=""
            fill
            sizes="280px"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            placeholder="empty"
            className={styles.heroCardImage}
            onLoad={() => onImageReady(index)}
            onError={() => onImageReady(index)}
          />
          <div className={styles.heroCardShade} />
          <div className={styles.heroCardSheen} />
          <div className="relative flex h-full items-end p-6">
            <span className="text-lg font-bold lg:ml-18 text-white/90">{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroCards() {
  const readyImages = useRef(new Set());
  const [readyCount, setReadyCount] = useState(0);
  const isReady = readyCount >= cards.length;

  function handleImageReady(index) {
    if (readyImages.current.has(index)) return;

    readyImages.current.add(index);
    setReadyCount(readyImages.current.size);
  }

  return (
    <div className={styles.heroCardsStage} data-ready={isReady ? "true" : "false"}>
      {cards.map((card, index) => (
        <StackingCard
          key={card.label}
          card={card}
          index={index}
          onImageReady={handleImageReady}
        />
      ))}
    </div>
  );
}
