import styles from "./Hero.module.css";

const cards = [
  {
    background: "linear-gradient(135deg, #2539a8 0%, #111a66 100%)",
    label: "Branding",
    left: "220px",
    top: "120px",
    rotate: "8deg",
    delay: "0.08s",
    floatDelay: "1.2s",
    duration: "5.7s",
  },
  {
    background: "linear-gradient(135deg, #ff1f2d 0%, #8e0011 100%)",
    label: "Web Design",
    left: "120px",
    top: "58px",
    rotate: "0deg",
    delay: "0.22s",
    floatDelay: "1.44s",
    duration: "6.1s",
  },
  {
    background: "linear-gradient(135deg, #f2eee5 0%, #8a909a 100%)",
    label: "Digital",
    left: "18px",
    top: "8px",
    rotate: "-8deg",
    delay: "0.36s",
    floatDelay: "1.68s",
    duration: "6.5s",
  },
];

export default function HeroCards() {
  return (
    <div className="relative h-full w-full">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={styles.heroCardSlot}
          style={{
            "--card-left": card.left,
            "--card-top": card.top,
            "--card-rotate": card.rotate,
            "--card-delay": card.delay,
            "--card-float-delay": card.floatDelay,
            "--card-float-duration": card.duration,
            zIndex: 40 + index,
          }}
        >
          <div className={styles.heroCard} style={{ background: card.background }}>
            <div className={styles.heroCardGlow} />
            <div className={styles.heroCardSheen} />
            <div className="relative flex h-full items-end p-6">
              <span className="text-lg font-bold text-white/90">{card.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
