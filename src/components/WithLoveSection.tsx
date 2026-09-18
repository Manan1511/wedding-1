import React from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../constants/weddingData';

export const WithLoveSection: React.FC = () => {
  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: 'linear-gradient(180deg, #F5EDE0 0%, #FDF8F0 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl mx-auto"
      >
        {/* Decorative top ornament */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.5 8 2 10 2 14c0 3.3 4.5 6 10 6s10-2.7 10-6c0-4-4.5-6-10-12z" fill="#D4A5A5" opacity="0.7" />
          </svg>
          <span className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
        </div>

        {/* Heading */}
        <h2
          className="mb-6"
          style={{
            fontFamily: 'Pinyon Script, cursive',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            color: '#6E4B3A',
            lineHeight: 1.2,
          }}
        >
          {COPY.withLoveHeading}
        </h2>

        {/* Body */}
        <p
          className="leading-relaxed mb-10"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: '#6E4B3A',
            fontStyle: 'italic',
            maxWidth: '36rem',
            margin: '0 auto 2.5rem',
          }}
        >
          {COPY.withLoveBody}
        </p>

        {/* Heart — single tasteful SVG, no emoji */}
        <div className="flex items-center justify-center mb-10">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 24s-10-6.3-10-12C4 8.1 7.6 5 11 5c1.6 0 3 .8 3 .8S14.4 5 16 5c3.4 0 7 3.1 7 7 0 5.7-9 12-9 12z"
              fill="#D4A5A5"
            />
          </svg>
        </div>

        {/* Closing */}
        <p
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '0.9rem',
            color: '#8B7D6B',
            letterSpacing: '0.04em',
          }}
        >
          {COPY.blessingClosing},
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#4A3728',
            letterSpacing: '0.04em',
          }}
        >
          The Dharpal &amp; Hale Families
        </p>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
          <svg width="8" height="8" viewBox="0 0 8 8">
            <polygon points="4,0 8,4 4,8 0,4" fill="#C4A265" />
          </svg>
          <span className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
        </div>
      </motion.div>
    </section>
  );
};
