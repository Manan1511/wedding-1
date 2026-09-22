import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { WeddingEvent } from '../types';
import { WEDDING_EVENTS } from '../constants/weddingData';
import { getGoogleCalendarUrl } from '../utils/calendar';

const CEREMONY_IMAGES: Partial<Record<string, string>> = {
  mehendi: '/images/mehendi.jpg',
  haldi:   '/images/haldi.jpg',
  varmala: '/images/varmala.jpg',
  pheras:  '/images/pheras.jpg',
};

const OrnateFrame: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative flex-shrink-0" style={{ width: 'min(280px, 72vw)', aspectRatio: '1' }}>
    {/* Outer gold ring */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: 'linear-gradient(135deg, #C4A265 0%, #E8D5A8 25%, #A0824A 50%, #E8D5A8 75%, #C4A265 100%)',
        padding: '6px',
      }}
    >
      {/* Inner cream buffer */}
      <div className="w-full h-full rounded-full bg-ivory-100 p-1">
        {/* Photo */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          style={{ boxShadow: 'inset 0 4px 16px rgba(100,60,40,0.15)' }}
        />
      </div>
    </div>
    {/* Shadow beneath */}
    <div
      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full"
      style={{ background: 'rgba(100, 60, 40, 0.12)', filter: 'blur(8px)' }}
    />
  </div>
);

const CeremonyCard: React.FC<{ event: WeddingEvent; index: number }> = ({ event, index }) => {
  const imageSrc = CEREMONY_IMAGES[event.id];
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
      className={`flex flex-col ${imageSrc ? (isEven ? 'lg:flex-row' : 'lg:flex-row-reverse') : ''} items-center gap-10 lg:gap-16`}
    >
      {/* Image frame */}
      {imageSrc && <OrnateFrame src={imageSrc} alt={event.title} />}

      {/* Text */}
      <div className={`flex-1 text-center ${imageSrc ? (isEven ? 'lg:text-left' : 'lg:text-right') : ''}`}>
        {/* Marathi subtitle */}
        <p
          className="mb-2 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}
        >
          {event.marathiTitle}
        </p>

        {/* Event name */}
        <h3
          className="mb-3"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 600,
            color: '#2C2421',
            lineHeight: 1.1,
          }}
        >
          {event.title}
        </h3>

        {/* Date & time */}
        <p
          className="mb-4"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#C4A265', letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          {event.date} &nbsp;&bull;&nbsp; {event.time}
        </p>

        {/* Description */}
        <p
          className="mb-3 leading-relaxed"
          style={{ fontFamily: 'Lora, serif', fontSize: '1rem', color: '#6E4B3A', fontStyle: 'italic', maxWidth: '34rem' }}
        >
          "{event.description}"
        </p>

        {/* Attire Callout */}
        <div
          className={`flex ${
            imageSrc ? (isEven ? 'lg:justify-start' : 'lg:justify-end') : 'justify-center'
          } justify-center mb-5`}
        >
          <div
            className="inline-flex items-center flex-wrap gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full transition-all hover:border-[#C4A265]/70"
            style={{
              background: 'linear-gradient(135deg, #FAF4EB 0%, #F5ECDD 100%)',
              border: '1px solid rgba(196, 162, 101, 0.45)',
              boxShadow: '0 2px 10px rgba(100, 60, 40, 0.05)',
            }}
          >
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0"
              style={{
                background: 'rgba(196, 162, 101, 0.16)',
                border: '1px solid rgba(196, 162, 101, 0.3)',
              }}
            >
              <Sparkles size={12} style={{ color: '#8B6834' }} />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'Inter, sans-serif', color: '#8B6834' }}
              >
                Attire
              </span>
            </div>
            <span
              className="text-xs sm:text-[13px] leading-snug font-medium"
              style={{ fontFamily: 'Lora, serif', color: '#3E2A1E', fontStyle: 'italic' }}
            >
              {event.attire}
            </span>
          </div>
        </div>

        {/* Calendar links */}
        <div className={`flex items-center gap-4 flex-wrap ${imageSrc ? (isEven ? 'justify-start' : 'justify-end') : 'justify-center'}`}>
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline underline-offset-2 decoration-dotted transition-opacity hover:opacity-60"
            style={{ fontFamily: 'Inter, sans-serif', color: '#A0824A' }}
          >
            Add to Google Calendar
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export const CeremonyShowcase: React.FC = () => {
  return (
    <section id="timeline" className="py-20 px-6" style={{ background: '#FDF8F0' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}
          >
            The celebrations
          </p>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: '#2C2421',
            }}
          >
            Join Us for Every Sacred Moment
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#C4A265" /></svg>
            <span className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
          </div>
        </motion.div>

        {/* Ceremony cards */}
        <div className="space-y-20 lg:space-y-28">
          {WEDDING_EVENTS.map((event, i) => (
            <CeremonyCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
