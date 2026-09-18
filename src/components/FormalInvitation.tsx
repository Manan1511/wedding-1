import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE_DATA, COPY } from '../constants/weddingData';

interface FormalInvitationProps {
  onScrollToTimeline: () => void;
}

export const FormalInvitation: React.FC<FormalInvitationProps> = ({ onScrollToTimeline }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
      style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F5EDE0 100%)' }}>

      {/* Subtle watermark mandala behind everything */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="w-[500px] h-[500px] opacity-[0.04]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="180" stroke="#C4A265" strokeWidth="1" />
          <circle cx="200" cy="200" r="150" stroke="#C4A265" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="120" stroke="#C4A265" strokeWidth="1" />
          <circle cx="200" cy="200" r="8" stroke="#C4A265" strokeWidth="1" fill="#C4A265" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
            <line
              key={a}
              x1={200 + 120 * Math.cos((a * Math.PI) / 180)}
              y1={200 + 120 * Math.sin((a * Math.PI) / 180)}
              x2={200 + 180 * Math.cos((a * Math.PI) / 180)}
              y2={200 + 180 * Math.sin((a * Math.PI) / 180)}
              stroke="#C4A265"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-xl mx-auto"
      >
        {/* Ganesh line */}
        <p
          className="mb-8 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}
        >
          {COPY.ganesh}
        </p>

        {/* Gold ornamental divider */}
        <div className="flex items-center gap-4 mb-8">
          <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
          <svg width="12" height="12" viewBox="0 0 12 12">
            <polygon points="6,0 12,6 6,12 0,6" fill="#C4A265" />
          </svg>
          <span className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
        </div>

        {/* Families text */}
        <p className="mb-1" style={{ fontFamily: 'Lora, serif', fontSize: '1rem', color: '#8B7D6B', lineHeight: 1.7 }}>
          {COPY.families}
        </p>
        <p className="mb-10" style={{ fontFamily: 'Lora, serif', fontSize: '0.95rem', color: '#8B7D6B', fontStyle: 'italic', lineHeight: 1.7 }}>
          {COPY.formalLine}
        </p>

        {/* Bride name */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 10vw, 5.5rem)',
          fontWeight: 600,
          color: '#2C2421',
          lineHeight: 1,
          letterSpacing: '0.01em',
        }}>
          {COUPLE_DATA.brideName}
        </h1>

        {/* Script & */}
        <div className="my-6 flex items-center justify-center gap-4">
          <span className="flex-1 max-w-[80px] h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
          <span style={{ fontFamily: 'Pinyon Script, cursive', fontSize: '3.5rem', color: '#C4A265', lineHeight: 1 }}>
            &
          </span>
          <span className="flex-1 max-w-[80px] h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
        </div>

        {/* Groom name */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 10vw, 5.5rem)',
          fontWeight: 600,
          color: '#2C2421',
          lineHeight: 1,
          letterSpacing: '0.01em',
        }}>
          {COUPLE_DATA.groomName}
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
          <svg width="12" height="12" viewBox="0 0 12 12">
            <polygon points="6,0 12,6 6,12 0,6" fill="#C4A265" />
          </svg>
          <span className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
        </div>

        {/* Date & Venue */}
        <p className="mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#6E4B3A', fontStyle: 'italic' }}>
          24th to 26th November 2026
        </p>
        <p className="mb-10" style={{ fontFamily: 'Lora, serif', fontSize: '0.9rem', color: '#8B7D6B', letterSpacing: '0.04em' }}>
          {COUPLE_DATA.venueName}
        </p>

        {/* Scroll CTA */}
        <button
          onClick={onScrollToTimeline}
          className="group inline-flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          aria-label="Scroll to view the celebrations"
        >
          <span className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 7l6 6 6-6" stroke="#C4A265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
