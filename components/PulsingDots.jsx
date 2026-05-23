const dots = [
  "left-[55%] top-[28%] delay-0",
  "left-[68%] top-[20%] delay-300",
  "left-[82%] top-[34%] delay-700",
  "left-[60%] top-[62%] delay-500",
  "left-[74%] top-[72%] delay-1000",
  "left-[90%] top-[58%] delay-200",
];

export default function PulsingDots() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      {dots.map((position, index) => (
        <span
          key={index}
          className={`absolute h-2 w-2 rounded-full bg-[#ff1f2d]/70 shadow-[0_0_18px_rgba(255,31,45,0.8)] animate-ping ${position}`}
        />
      ))}

      {dots.map((position, index) => (
        <span
          key={`core-${index}`}
          className={`absolute h-2 w-2 rounded-full bg-[#2539a8] ${position}`}
        />
      ))}
    </div>
  );
}
