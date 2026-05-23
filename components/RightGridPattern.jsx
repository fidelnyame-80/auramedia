export default function RightGridPattern() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 z-[1] hidden h-full w-[58%] opacity-90  md:block lg:w-[54%]">
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox="0 0 600 900"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="aura-right-grid-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.3" stopColor="white" stopOpacity="0.08" />
            <stop offset="0.58" stopColor="white" stopOpacity="0.32" />
            <stop offset="0.82" stopColor="white" stopOpacity="0.56" />
            <stop offset="1" stopColor="white" stopOpacity="0.8" />
          </linearGradient>

          <mask id="aura-right-grid-mask">
            <rect width="600" height="900" fill="url(#aura-right-grid-fade)" />
          </mask>

          <pattern
            id="aura-right-grid-lines"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.58)"
              strokeWidth="0.5"
            />
          </pattern>

          <pattern
            id="aura-right-grid-dots"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0" cy="0" r="1.2" fill="rgba(255,255,255,0.2)" />
          </pattern>
        </defs>

        <g mask="url(#aura-right-grid-mask)">
          <rect width="600" height="900" fill="url(#aura-right-grid-lines)" />
          <rect width="600" height="900" fill="url(#aura-right-grid-dots)" />

          {/* Vertical accent lines */}
          <line
            x1="120"
            y1="0"
            x2="120"
            y2="900"
            stroke="#2539a8"
            strokeWidth="0.5"
            opacity="0.25"
          />
          <line
            x1="280"
            y1="0"
            x2="280"
            y2="900"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />
          <line
            x1="440"
            y1="0"
            x2="440"
            y2="900"
            stroke="#ff1f2d"
            strokeWidth="0.5"
            opacity="0.2"
          />

          {/* Diagonal accent */}
          <line
            x1="0"
            y1="0"
            x2="600"
            y2="300"
            stroke="rgba(37,57,168,0.1)"
            strokeWidth="0.5"
          />

          {/* Horizontal accent lines */}
          <line
            x1="0"
            y1="300"
            x2="600"
            y2="300"
            stroke="rgba(37,57,168,0.1)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="600"
            x2="600"
            y2="600"
            stroke="rgba(255,31,45,0.08)"
            strokeWidth="0.5"
          />

          {/* Glowing blue accent */}
          <g>
            <circle cx="200" cy="180" r="3" fill="#2539a8" opacity="0.9">
              <animate
                attributeName="r"
                values="3;6;3"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="200" cy="180" r="20" fill="#2539a8" opacity="0.15">
              <animate
                attributeName="r"
                values="20;30;20"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="200" cy="180" r="40" fill="#2539a8" opacity="0.05" />
          </g>

          {/* Glowing red accent */}
          <g>
            <circle cx="420" cy="450" r="2.5" fill="#ff1f2d" opacity="0.85">
              <animate
                attributeName="r"
                values="2.5;5.5;2.5"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.85;1;0.85"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="420" cy="450" r="16" fill="#ff1f2d" opacity="0.12">
              <animate
                attributeName="r"
                values="16;26;16"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="420" cy="450" r="36" fill="#ff1f2d" opacity="0.04" />
          </g>

          {/* Second blue accent */}
          <g>
            <circle cx="340" cy="720" r="2" fill="#2539a8" opacity="0.7">
              <animate
                attributeName="r"
                values="2;4.5;2"
                dur="5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0.95;0.7"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="340" cy="720" r="14" fill="#2539a8" opacity="0.1">
              <animate
                attributeName="r"
                values="14;22;14"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}
