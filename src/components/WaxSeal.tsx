import React from 'react';
import { motion } from 'framer-motion';

interface WaxSealProps {
  isOpening: boolean;
  onClick?: () => void;
  size?: number;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ isOpening, onClick, size = 115 }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer select-none group focus:outline-none"
      style={{ width: size, height: size }}
      role="button"
      tabIndex={0}
      aria-label="Break wax seal to open invitation"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* Outer ambient glow / wax drop shadow */}
      <div
        className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-105"
        style={{
          background: 'radial-gradient(circle, rgba(107,39,55,0.45) 0%, rgba(77,27,39,0.2) 60%, transparent 80%)',
          filter: 'blur(8px)',
          transform: 'translateY(6px)',
        }}
      />

      {/* SVG Container */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(45,12,18,0.45)]"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Radial gradient for rich, glossy burgundy wax */}
          <radialGradient id="waxBase" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#A33B52" />
            <stop offset="25%" stopColor="#87293F" />
            <stop offset="60%" stopColor="#631B2C" />
            <stop offset="85%" stopColor="#48111E" />
            <stop offset="100%" stopColor="#300912" />
          </radialGradient>

          {/* Inner stamped impression bed */}
          <radialGradient id="innerBed" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#7A2235" />
            <stop offset="50%" stopColor="#5C1625" />
            <stop offset="85%" stopColor="#450E1B" />
            <stop offset="100%" stopColor="#350A14" />
          </radialGradient>

          {/* Gold embossing gradient for monogram & laurels */}
          <linearGradient id="goldEmboss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2C6" />
            <stop offset="30%" stopColor="#E5C178" />
            <stop offset="55%" stopColor="#C49B4D" />
            <stop offset="75%" stopColor="#E9CA86" />
            <stop offset="100%" stopColor="#9B7328" />
          </linearGradient>

          {/* Specular gloss highlight */}
          <linearGradient id="waxGloss" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>

          {/* Bevel rim highlight */}
          <linearGradient id="rimShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF8DA4" stopOpacity="0.6" />
            <stop offset="35%" stopColor="#C24360" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#25050C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#150206" stopOpacity="0.9" />
          </linearGradient>

          {/* Left half clip for crack split */}
          <clipPath id="leftCrackClip">
            <path d="M0,0 L102,0 L96,45 L108,82 L94,120 L105,160 L98,200 L0,200 Z" />
          </clipPath>

          {/* Right half clip for crack split */}
          <clipPath id="rightCrackClip">
            <path d="M102,0 L200,0 L200,200 L98,200 L105,160 L94,120 L108,82 L96,45 Z" />
          </clipPath>

          {/* Drop shadow filter for 3D stamped engraving */}
          <filter id="embossShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="0.75" floodColor="#1F040A" floodOpacity="0.9" />
            <feDropShadow dx="-0.8" dy="-0.8" stdDeviation="0.5" floodColor="#FFAEC0" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ================= LEFT HALF (animates left on opening) ================= */}
        <motion.g
          animate={
            isOpening
              ? {
                  x: -36,
                  y: 12,
                  rotate: -14,
                  opacity: 0,
                  transition: { duration: 1.2, ease: [0.3, 0, 0.2, 1] },
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          style={{ originX: '50px', originY: '100px' }}
          clipPath="url(#leftCrackClip)"
        >
          <SealArtworkContent />
        </motion.g>

        {/* ================= RIGHT HALF (animates right on opening) ================= */}
        <motion.g
          animate={
            isOpening
              ? {
                  x: 36,
                  y: 16,
                  rotate: 15,
                  opacity: 0,
                  transition: { duration: 1.2, ease: [0.3, 0, 0.2, 1] },
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          style={{ originX: '150px', originY: '100px' }}
          clipPath="url(#rightCrackClip)"
        >
          <SealArtworkContent />
        </motion.g>

        {/* ================= GOLDEN FRACTURE LINE FLASH WHEN OPENING ================= */}
        {isOpening && (
          <motion.path
            d="M102,0 L96,45 L108,82 L94,120 L105,160 L98,200"
            fill="none"
            stroke="url(#goldEmboss)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.9, 0] }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            filter="drop-shadow(0 0 8px #FFD700)"
          />
        )}
      </svg>
    </div>
  );
};

// Reusable pure SVG seal artwork renderer (renders identically on both halves)
const SealArtworkContent: React.FC = () => (
  <g>
    {/* 1. Organic, melted wax outer perimeter with natural undulating pooling and squished driplets */}
    <path
      d="M98,6
         C122,5 146,12 165,27
         C182,41 195,62 196,84
         C198,103 191,123 182,140
         C172,158 156,174 137,185
         C118,196 95,197 74,194
         C52,190 32,179 20,161
         C7,143 3,121 5,99
         C7,78 18,57 32,41
         C48,23 72,7 98,6 Z"
      fill="url(#waxBase)"
    />

    {/* 2. Beveled highlight layer on outer wax pool */}
    <path
      d="M98,6
         C122,5 146,12 165,27
         C182,41 195,62 196,84
         C198,103 191,123 182,140
         C172,158 156,174 137,185
         C118,196 95,197 74,194
         C52,190 32,179 20,161
         C7,143 3,121 5,99
         C7,78 18,57 32,41
         C48,23 72,7 98,6 Z"
      fill="url(#waxGloss)"
      opacity="0.6"
    />

    {/* 3. Secondary wax puddle rim crease */}
    <circle
      cx="100"
      cy="100"
      r="78"
      fill="none"
      stroke="url(#rimShine)"
      strokeWidth="4.5"
    />

    {/* 4. Raised rim bead ring (outer stamp impression border) */}
    <circle
      cx="100"
      cy="100"
      r="72"
      fill="url(#innerBed)"
      stroke="#20040A"
      strokeWidth="2"
    />

    {/* 5. Delicate beaded inner ring */}
    <circle
      cx="100"
      cy="100"
      r="66"
      fill="none"
      stroke="url(#goldEmboss)"
      strokeWidth="1.2"
      strokeDasharray="2 3.5"
      opacity="0.85"
    />

    {/* 6. Intricate Laurel Wreath Garland */}
    <g filter="url(#embossShadow)" opacity="0.92">
      {/* Left wreath branch */}
      <path
        d="M62,100 C62,76 76,58 96,52"
        fill="none"
        stroke="url(#goldEmboss)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Right wreath branch */}
      <path
        d="M138,100 C138,76 124,58 104,52"
        fill="none"
        stroke="url(#goldEmboss)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Left leaves */}
      {[
        { cx: 62, cy: 96, r: -25 },
        { cx: 64, cy: 84, r: -35 },
        { cx: 70, cy: 72, r: -45 },
        { cx: 79, cy: 62, r: -55 },
        { cx: 90, cy: 55, r: -65 },
      ].map((leaf, i) => (
        <ellipse
          key={`l-leaf-${i}`}
          cx={leaf.cx}
          cy={leaf.cy}
          rx="4.5"
          ry="2.2"
          fill="url(#goldEmboss)"
          transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
      {/* Right leaves */}
      {[
        { cx: 138, cy: 96, r: 25 },
        { cx: 136, cy: 84, r: 35 },
        { cx: 130, cy: 72, r: 45 },
        { cx: 121, cy: 62, r: 55 },
        { cx: 110, cy: 55, r: 65 },
      ].map((leaf, i) => (
        <ellipse
          key={`r-leaf-${i}`}
          cx={leaf.cx}
          cy={leaf.cy}
          rx="4.5"
          ry="2.2"
          fill="url(#goldEmboss)"
          transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`}
        />
      ))}
      {/* Bottom ribbon bow */}
      <circle cx="100" cy="148" r="2.5" fill="url(#goldEmboss)" />
      <path
        d="M97,148 Q91,155 86,157 M103,148 Q109,155 114,157"
        fill="none"
        stroke="url(#goldEmboss)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>

    {/* 7. Auspicious Devanagari Inscription arc: ॥ शुभ विवाह ॥ */}
    <g filter="url(#embossShadow)">
      <text
        x="100"
        y="78"
        textAnchor="middle"
        fill="url(#goldEmboss)"
        fontSize="7.5"
        letterSpacing="2.2"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        opacity="0.9"
      >
        ॥ शुभ विवाह ॥
      </text>
    </g>

    {/* 8. Central Monogram: S & T */}
    <g filter="url(#embossShadow)">
      <text
        x="78"
        y="115"
        textAnchor="middle"
        fill="url(#goldEmboss)"
        fontSize="34"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="700"
        letterSpacing="-1"
      >
        S
      </text>
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="url(#goldEmboss)"
        fontSize="18"
        fontFamily="'Pinyon Script', cursive"
      >
        &amp;
      </text>
      <text
        x="122"
        y="115"
        textAnchor="middle"
        fill="url(#goldEmboss)"
        fontSize="34"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="700"
        letterSpacing="-1"
      >
        T
      </text>
    </g>

    {/* 9. Year Subscript: 2026 */}
    <g filter="url(#embossShadow)">
      <text
        x="100"
        y="134"
        textAnchor="middle"
        fill="url(#goldEmboss)"
        fontSize="8"
        letterSpacing="3.5"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="500"
        opacity="0.85"
      >
        2026
      </text>
    </g>

    {/* 10. Glossy specular crescent highlight along the top left rim */}
    <path
      d="M48,50 C62,35 80,26 100,26 C112,26 124,30 134,36"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.4"
      filter="blur(1px)"
    />
  </g>
);
