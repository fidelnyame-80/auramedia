"use client";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";
import RightGridPattern from "./RightGridPattern";
import HeroCards from "./heroCards";

export default function Hero() {
  return (
    <section className="relative min-h-[120vh] overflow-hidden bg-[#050914] px-6 pt-32 text-white">
      <svg
        aria-hidden="true"
        focusable="false"
        className={`pointer-events-none absolute -left-6 top-0 z-[3] h-full w-[145px] opacity-85 sm:w-[165px] ${styles.heroPattern}`}
        viewBox="0 0 220 980"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aura-left-pattern-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0.98" />
            <stop offset="0.58" stopColor="white" stopOpacity="0.68" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="aura-left-pattern-mask">
            <rect width="150" height="980" fill="url(#aura-left-pattern-fade)" />
          </mask>

          <pattern
            id="aura-left-ring-pattern"
            width="68"
            height="78"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-8)"
          >
            <circle
              cx="20"
              cy="24"
              r="23"
              stroke="#f2eee5"
              strokeWidth="4"
              opacity="0.2"
            />
            <circle
              cx="62"
              cy="55"
              r="24"
              stroke="#8a909a"
              strokeWidth="4"
              opacity="0.24"
            />
            <circle
              cx="-10"
              cy="65"
              r="23"
              stroke="#151b27"
              strokeWidth="6"
              opacity="0.86"
            />
            <path
              d="M4 58c14-11 34-11 48 0"
              stroke="#f7f2e8"
              strokeWidth="3"
              opacity="0.14"
            />
          </pattern>

          <pattern
            id="aura-left-shadow-pattern"
            width="82"
            height="96"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(5)"
          >
            <circle
              cx="28"
              cy="28"
              r="28"
              stroke="#2b313c"
              strokeWidth="6"
              opacity="0.48"
            />
            <circle
              cx="76"
              cy="72"
              r="28"
              stroke="#dad8d1"
              strokeWidth="3"
              opacity="0.1"
            />
          </pattern>
        </defs>

        <g mask="url(#aura-left-pattern-mask)">
          <rect
            className={styles.patternDrift}
            x="-36"
            y="-120"
            width="300"
            height="1280"
            fill="url(#aura-left-shadow-pattern)"
          />
          <rect
            className={styles.patternDriftReverse}
            x="-34"
            y="-110"
            width="292"
            height="1240"
            fill="url(#aura-left-ring-pattern)"
          />
        </g>
      </svg>

      <RightGridPattern />

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#050914] via-[#050914]/80 to-[#050914]/20" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(2rem,7vw,9rem)] top-[9.5rem] hidden h-[360px] w-[470px] opacity-100 lg:block"
        style={{ zIndex: 30 }}
      >
        <HeroCards />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl lg:mx-10">
        <div className="relative isolate max-w-xl">
          <svg
            aria-hidden="true"
            focusable="false"
            className={`pointer-events-none absolute -left-8 -top-12 z-0 h-[520px] w-[680px] max-w-[115vw] opacity-70 ${styles.heroTextMarks}`}
            viewBox="0 0 680 520"
          >
            <defs>
              <marker
                id="aura-hero-arrow"
                markerHeight="10"
                markerWidth="10"
                orient="auto"
                refX="8"
                refY="5"
              >
                <path d="M1 1 9 5 1 9" fill="none" stroke="#ff1f2d" strokeWidth="1.8" />
              </marker>
            </defs>

            <g className={styles.markFloatSlow}>
              <path
                className={styles.paintLineSoft}
                d="M24 116c78-66 159-78 243-36 58 29 113 28 166-3"
                pathLength="1"
              />
            </g>
            <g className={styles.markFloatWide}>
              <path
                className={styles.paintLine}
                d="M54 340c76 41 148 40 216-3 81-51 160-50 239 4"
                pathLength="1"
              />
            </g>
            <g className={styles.markFloatArrow}>
              <path
                className={styles.paintArrow}
                d="M391 202c70-43 127-37 173 18 32 39 63 46 94 20"
                markerEnd="url(#aura-hero-arrow)"
                pathLength="1"
              />
            </g>

            <g className={styles.markFloatShapeA}>
              <circle className={styles.paintDotBlue} cx="560" cy="102" r="5" />
            </g>
            <g className={styles.markFloatShapeB}>
              <circle className={styles.paintDotRed} cx="624" cy="286" r="4" />
            </g>
            <g className={styles.markFloatShapeC}>
              <circle className={styles.paintDotCream} cx="76" cy="246" r="4" />
            </g>
            <g className={styles.markFloatShapeB}>
              <rect
                className={styles.paintShapeBlue}
                x="472"
                y="392"
                width="42"
                height="10"
                rx="5"
                transform="rotate(-16 493 397)"
              />
            </g>
            <g className={styles.markFloatShapeA}>
              <path className={styles.paintShapeRed} d="M594 144 617 154 599 170 578 157Z" />
            </g>
            <g className={styles.markFloatShapeC}>
              <path
                className={styles.paintShapeCream}
                d="M122 60c20-10 42-5 54 13-24 2-40 13-47 31-16-10-19-28-7-44Z"
              />
            </g>
            <g className={styles.markFloatIconA}>
              <g transform="translate(493 127) scale(0.72) translate(-493 -127)">
                <path
                  className={styles.paintIconBlue}
                  d="M452 86h82v52h-82zM438 154h110l-12 14h-86zM481 164h24"
                  pathLength="1"
                />
              </g>
            </g>
            <g className={styles.markFloatIconB}>
              <path
                className={styles.paintIconRed}
                d="M154 384l24-18 20 18 18-12 23 31-20 16-9-12v58h-71v-58l-10 12-20-16 23-31zM167 376c10 12 23 12 36 0"
                pathLength="1"
              />
            </g>
            <g className={styles.markFloatIconC}>
              <g transform="translate(336 94) scale(0.72) translate(-336 -94)">
                <path
                  className={styles.paintIconCream}
                  d="M314 54c9-10 9-20 0-30M339 54c9-10 9-20 0-30M293 70h65v39c0 23-18 41-41 41s-41-18-41-41V70zM358 84h16c14 0 23 9 23 22s-9 22-23 22h-16M293 161h65"
                  pathLength="1"
                />
              </g>
            </g>
          </svg>

          <h1 className="relative z-10 text-5xl font-bold leading-tight md:text-7xl lg:text-[2.7rem]">
           <motion.span 
           className="block"
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
             We Design.
           </motion.span>
           <br />
           <motion.span> We Brand.</motion.span>
            <br />
            <motion.span>We Build{" "}</motion.span>
            <span className="text-[#ff1f2d]">Experiences.</span>
          </h1>

          <p className="relative z-10 mt-8 max-w-md text-sm leading-7 text-white/70 md:text-base">
            Aura Media is a creative web design & graphic design agency helping
            brands stand out with impactful design and digital experiences.
          </p>

          <div className="relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
            <a className="rounded-xl bg-[#2539a8] px-8 py-4 text-center text-sm font-bold">
              VIEW OUR WORK
            </a>

            <a className="flex items-center justify-center gap-3 rounded-xl border border-[#2539a8] px-8 py-4 text-sm font-bold text-[#ff1f2d]">
              OUR SERVICES <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
