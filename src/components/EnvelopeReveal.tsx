import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { COUPLE_DATA, COPY } from '../constants/weddingData';
import { WaxSeal } from './WaxSeal';
import { playWaxSealOpeningSequence, startBackgroundMusic } from '../utils/audio';

interface EnvelopeRevealProps {
  onOpenInvite: () => void;
}

export const EnvelopeReveal: React.FC<EnvelopeRevealProps> = ({ onOpenInvite }) => {
  const [phase, setPhase] = useState<'sealed' | 'cracking' | 'openingFlap' | 'cardRising' | 'done'>('sealed');

  const handleBreakSeal = () => {
    if (phase !== 'sealed') return;

    // Step 1: Crack the seal with tactile fracture sound and start music
    setPhase('cracking');
    playWaxSealOpeningSequence();
    startBackgroundMusic();

    // Subtle golden & rose petal confetti
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C4A265', '#D4A5A5', '#E8D5A8', '#9CAF88', '#F5EDE0'],
      shapes: ['circle'],
      scalar: 0.85,
      gravity: 0.7,
    });

    // Step 2: Flap unfolds upward
    setTimeout(() => {
      setPhase('openingFlap');
    }, 450);

    // Step 3: Invitation card glides out of envelope
    setTimeout(() => {
      setPhase('cardRising');
    }, 900);

    // Step 4: Finish transition to website
    setTimeout(() => {
      setPhase('done');
      setTimeout(onOpenInvite, 700);
    }, 1900);
  };

  const isSealBreaking = phase !== 'sealed';
  const isFlapOpen = phase === 'openingFlap' || phase === 'cardRising' || phase === 'done';
  const isCardRising = phase === 'cardRising' || phase === 'done';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FDF8F0 0%, #F5EDE0 50%, #EDE0CC 100%)',
        perspective: '1200px',
      }}
    >
      {/* Background subtle watermark mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
        <svg viewBox="0 0 500 500" className="w-[650px] h-[650px]" fill="none">
          <circle cx="250" cy="250" r="230" stroke="#C4A265" strokeWidth="1" />
          <circle cx="250" cy="250" r="190" stroke="#C4A265" strokeWidth="0.75" />
          <circle cx="250" cy="250" r="150" stroke="#C4A265" strokeWidth="1" />
          <circle cx="250" cy="250" r="10" stroke="#C4A265" strokeWidth="1" fill="#C4A265" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
            <line
              key={a}
              x1={250 + 150 * Math.cos((a * Math.PI) / 180)}
              y1={250 + 150 * Math.sin((a * Math.PI) / 180)}
              x2={250 + 230 * Math.cos((a * Math.PI) / 180)}
              y2={250 + 230 * Math.sin((a * Math.PI) / 180)}
              stroke="#C4A265"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {phase !== 'done' && (
          <motion.div
            key="envelope-assembly"
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -70, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[360px] sm:max-w-[420px]"
            style={{ height: '500px' }}
          >
            {/* ================= INVITATION CARD (Sliding Up) ================= */}
            <motion.div
              animate={{
                y: isCardRising ? -140 : 0,
                scale: isCardRising ? 1.03 : 1,
                zIndex: isCardRising ? 25 : 5,
              }}
              transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-x-3 sm:inset-x-4 top-3 rounded-2xl p-6 text-center overflow-hidden"
              style={{
                height: '445px',
                background: 'linear-gradient(155deg, #FFFFFF 0%, #FAF4EB 60%, #F5ECDD 100%)',
                border: '1.5px solid rgba(196, 162, 101, 0.45)',
                boxShadow: isCardRising
                  ? '0 24px 60px rgba(80, 50, 30, 0.25), 0 0 0 1px rgba(196, 162, 101, 0.3)'
                  : '0 4px 15px rgba(80, 50, 30, 0.08)',
              }}
            >
              {/* Inner gold frame border */}
              <div
                className="absolute inset-2 rounded-xl pointer-events-none"
                style={{ border: '1px solid rgba(196, 162, 101, 0.28)' }}
              />

              {/* Corner gold ornaments */}
              {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none opacity-40`}>
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    {i === 0 && <path d="M2,2 L10,2 M2,2 L2,10" stroke="#C4A265" strokeWidth="1.2" fill="none" />}
                    {i === 1 && <path d="M22,2 L14,2 M22,2 L22,10" stroke="#C4A265" strokeWidth="1.2" fill="none" />}
                    {i === 2 && <path d="M2,22 L10,22 M2,22 L2,14" stroke="#C4A265" strokeWidth="1.2" fill="none" />}
                    {i === 3 && <path d="M22,22 L14,22 M22,22 L22,14" stroke="#C4A265" strokeWidth="1.2" fill="none" />}
                  </svg>
                </div>
              ))}

              <p className="text-[11px] tracking-[0.25em] uppercase mb-2" style={{ color: '#C4A265', fontFamily: 'Inter, sans-serif' }}>
                {COPY.ganesh}
              </p>

              <p className="text-xs leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#8B7D6B' }}>
                {COPY.families}
              </p>
              <p className="text-[11px] italic mb-3" style={{ fontFamily: 'Lora, serif', color: '#8B7D6B' }}>
                {COPY.formalLine}
              </p>

              <div className="my-2">
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.85rem',
                    fontWeight: 600,
                    color: '#2C2421',
                    lineHeight: 1,
                  }}
                >
                  {COUPLE_DATA.brideName}
                </h2>
                <p className="text-[10.5px] text-[#8B7D6B] mt-1 leading-snug" style={{ fontFamily: 'Lora, serif' }}>
                  <span className="italic">Daughter of </span>
                  {COUPLE_DATA.brideParents}
                </p>

                <div className="flex items-center justify-center gap-3 my-1.5">
                  <span className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
                  <span style={{ fontFamily: 'Pinyon Script, cursive', fontSize: '1.4rem', color: '#C4A265', lineHeight: 1 }}>&amp;</span>
                  <span className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
                </div>

                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.85rem',
                    fontWeight: 600,
                    color: '#2C2421',
                    lineHeight: 1,
                  }}
                >
                  {COUPLE_DATA.groomName}
                </h2>
                <p className="text-[10.5px] text-[#8B7D6B] mt-1 leading-snug" style={{ fontFamily: 'Lora, serif' }}>
                  <span className="italic">Son of </span>
                  {COUPLE_DATA.groomParents}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#C4A265]/20 space-y-1">
                <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                  24 to 26 November 2026
                </p>
                <p className="text-xs italic" style={{ fontFamily: 'Lora, serif', color: '#6E4B3A' }}>
                  {COUPLE_DATA.venueName}
                </p>
              </div>
            </motion.div>

            {/* ================= ENVELOPE BACK POCKET (Contains the card) ================= */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              style={{
                zIndex: 10,
                background: 'linear-gradient(165deg, #F9F3EA 0%, #F1E5D4 100%)',
                boxShadow: '0 20px 60px rgba(90, 60, 35, 0.20), 0 4px 16px rgba(90, 60, 35, 0.10)',
                border: '1px solid rgba(196, 162, 101, 0.35)',
              }}
            >
              {/* Pocket front diagonal folds (classic luxury envelope look) */}
              <svg viewBox="0 0 400 480" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Left side triangle */}
                <polygon points="0,0 170,260 0,480" fill="#EDE1CD" opacity="0.65" />
                {/* Right side triangle */}
                <polygon points="400,0 230,260 400,480" fill="#E8DBC5" opacity="0.7" />
                {/* Bottom flap triangle pointing up */}
                <polygon points="0,480 200,285 400,480" fill="#F4ECE0" />
                {/* Subtle gold seam borders */}
                <line x1="0" y1="480" x2="200" y2="285" stroke="#C4A265" strokeWidth="0.8" opacity="0.4" />
                <line x1="400" y1="480" x2="200" y2="285" stroke="#C4A265" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>

            {/* ================= TOP ENVELOPE FLAP (Folds up on opening) ================= */}
            <motion.div
              className="absolute inset-x-0 top-0 overflow-hidden"
              style={{
                height: '240px',
                transformOrigin: 'top center',
                zIndex: isFlapOpen ? 8 : 20,
              }}
              animate={{
                rotateX: isFlapOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.85,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <svg viewBox="0 0 400 240" className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(90,60,35,0.18)]">
                {/* Flap shape: triangle pointing down */}
                <polygon
                  points="0,0 400,0 200,230"
                  fill="url(#flapGrad)"
                  stroke="#C4A265"
                  strokeWidth="0.75"
                  strokeOpacity="0.4"
                />
                <defs>
                  <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F9F2E7" />
                    <stop offset="85%" stopColor="#EFE3D0" />
                    <stop offset="100%" stopColor="#E6D6C0" />
                  </linearGradient>
                </defs>
                {/* Decorative border line on flap */}
                <path
                  d="M10,8 L200,215 L390,8"
                  fill="none"
                  stroke="#C4A265"
                  strokeWidth="0.8"
                  strokeOpacity="0.35"
                />
              </svg>
            </motion.div>

            {/* ================= WAX SEAL (Centered right at the flap tip) ================= */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{
                top: '172px',
                zIndex: isFlapOpen ? 9 : 30,
              }}
            >
              <motion.div
                animate={
                  phase === 'sealed'
                    ? { y: [0, -3, 0] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              >
                <WaxSeal
                  isOpening={isSealBreaking}
                  onClick={handleBreakSeal}
                  size={120}
                />
              </motion.div>

              {/* Tap hint below wax seal */}
              {phase === 'sealed' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="mt-3 text-[11px] tracking-[0.25em] uppercase font-medium pointer-events-none"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}
                >
                  Tap seal to open
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
