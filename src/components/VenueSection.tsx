import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { VENUE_NAME, VENUE_ADDRESS, VENUE_MAPS_URL } from '../constants/weddingData';

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F5EDE0 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Section label */}
        <p
          className="mb-3 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}
        >
          The venue
        </p>

        {/* Venue name */}
        <h2
          className="mb-2"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 600,
            color: '#2C2421',
          }}
        >
          {VENUE_NAME}
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <span className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
          <MapPin size={14} style={{ color: '#C4A265' }} />
          <span className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
        </div>

        {/* Address */}
        <p
          className="mb-3 leading-relaxed"
          style={{ fontFamily: 'Lora, serif', fontSize: '1rem', color: '#6E4B3A', fontStyle: 'italic' }}
        >
          {VENUE_ADDRESS}
        </p>

        <p
          className="mb-10 text-sm leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B', maxWidth: '28rem', margin: '0 auto 2.5rem' }}
        >
          All ceremonies — Mehendi, Haldi, and the Wedding day — will be held at this single, beautiful venue in Amravati.
        </p>

        {/* Directions CTA */}
        <a
          href={VENUE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full transition-opacity hover:opacity-80"
          style={{
            background: 'linear-gradient(135deg, #C4A265, #A0824A)',
            color: '#FDF8F0',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(160, 130, 74, 0.35)',
          }}
        >
          <Navigation size={14} />
          Get Directions
        </a>
      </motion.div>
    </section>
  );
};
