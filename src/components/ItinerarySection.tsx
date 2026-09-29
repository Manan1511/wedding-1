import React from 'react';
import { Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const ITINERARY_DOWNLOAD_URL = '/downloads/wedding-itinerary.pdf';

export const ItinerarySection: React.FC = () => (
  <section id="itinerary" className="px-6 py-16" style={{ background: 'linear-gradient(180deg, #F5EDE0 0%, #FDF8F0 100%)' }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="max-w-xl mx-auto text-center rounded-3xl px-6 py-10 sm:px-10"
      style={{ background: 'rgba(255,255,255,0.48)', border: '1px solid rgba(196,162,101,0.35)', boxShadow: '0 12px 36px rgba(100,60,40,0.08)' }}
    >
      <FileText size={22} className="mx-auto mb-4" style={{ color: '#C4A265' }} />
      <p className="mb-2 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}>
        Plan your celebrations
      </p>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: '#2C2421' }}>
        Wedding Itinerary
      </h2>
      <p className="mt-3 mb-7 leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6E4B3A', fontStyle: 'italic' }}>
        Keep every ceremony, time, and venue close at hand.
      </p>
      <a
        href={ITINERARY_DOWNLOAD_URL}
        download="sayali-travis-wedding-itinerary.pdf"
        className="inline-flex items-center gap-2 rounded-full px-7 py-3 transition-opacity hover:opacity-85"
        style={{ background: 'linear-gradient(135deg, #6B2737, #4D1B27)', color: '#FFF2C6', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.08em', boxShadow: '0 5px 18px rgba(107,39,55,0.25)' }}
      >
        <Download size={16} style={{ color: '#E5C178' }} />
        Download Itinerary (PDF)
      </a>
    </motion.div>
  </section>
);
