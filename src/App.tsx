import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Share2, Check, MailOpen } from 'lucide-react';
import { EnvelopeReveal }    from './components/EnvelopeReveal';
import { PetalShowerCanvas } from './components/PetalShowerCanvas';
import { MusicPlayer }       from './components/MusicPlayer';
import { FormalInvitation }  from './components/FormalInvitation';
import { WithLoveSection }   from './components/WithLoveSection';
import { CountdownTimer }    from './components/CountdownTimer';
import { MarqueeBanner }     from './components/MarqueeBanner';
import { CeremonyShowcase }  from './components/CeremonyShowcase';
import { VenueSection }      from './components/VenueSection';
import { RsvpModal }         from './components/RsvpModal';
import { COUPLE_DATA, COPY } from './constants/weddingData';
import './App.css';

const App: React.FC = () => {
  const [opened,    setOpened]    = useState<boolean>(false);
  const [rsvpOpen,  setRsvpOpen]  = useState<boolean>(false);
  const [copied,    setCopied]    = useState<boolean>(false);

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sayali & Travis — Wedding Invitation',
        url:   window.location.href,
      }).catch(() => null);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ background: '#FDF8F0', minHeight: '100vh', color: '#2C2421' }}>
      {/* Ambient petal canvas */}
      <PetalShowerCanvas />

      {/* Floating music control */}
      <MusicPlayer />

      {/* Wax seal envelope reveal (fullscreen overlay) */}
      <AnimatePresence>
        {!opened && <EnvelopeReveal onOpenInvite={() => setOpened(true)} />}
      </AnimatePresence>

      {/* Sticky header — visible after invite is opened */}
      <AnimatePresence>
        {opened && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-30 px-6 py-4"
            style={{
              background:   'rgba(253, 248, 240, 0.85)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(196,162,101,0.2)',
            }}
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              {/* Logo mark */}
              <div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#2C2421',
                }}>
                  {COUPLE_DATA.brideName.split(' ')[0]}
                  <span style={{ fontFamily: 'Pinyon Script, cursive', fontSize: '1.3rem', color: '#C4A265', margin: '0 6px' }}>&</span>
                  {COUPLE_DATA.groomName.split(' ')[0]}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#8B7D6B', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '-2px' }}>
                  November 2026 · Amravati
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#6E4B3A', border: '1px solid rgba(196,162,101,0.35)' }}
                >
                  {copied ? <Check size={13} style={{ color: '#9CAF88' }} /> : <Share2 size={13} style={{ color: '#C4A265' }} />}
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => setOpened(false)}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#6E4B3A', border: '1px solid rgba(196,162,101,0.35)' }}
                  title="Replay envelope opening"
                >
                  <MailOpen size={13} style={{ color: '#C4A265' }} />
                  <span className="hidden sm:inline">Replay</span>
                </button>

                <button
                  onClick={() => setRsvpOpen(true)}
                  className="text-xs px-5 py-1.5 rounded-full transition-opacity hover:opacity-85"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    background: 'linear-gradient(135deg, #6B2737, #4D1B27)',
                    color: '#E8D5A8',
                    letterSpacing: '0.05em',
                    boxShadow: '0 2px 12px rgba(107,39,55,0.25)',
                  }}
                >
                  RSVP
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main content — only shown after envelope is opened */}
      <AnimatePresence>
        {opened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Section 1: Formal invitation */}
            <FormalInvitation onScrollToTimeline={scrollToTimeline} />

            {/* Section 2: Marquee ticker */}
            <MarqueeBanner />

            {/* Section 3: With Love from us */}
            <WithLoveSection />

            {/* Section 4: Countdown */}
            <CountdownTimer />

            {/* Section 5: Ceremony showcase with watercolor illustrations */}
            <CeremonyShowcase />

            {/* Section 6: Venue */}
            <VenueSection />

            {/* Footer */}
            <footer
              className="py-16 px-6 text-center"
              style={{
                background: 'linear-gradient(180deg, #F5EDE0 0%, #EDE0CC 100%)',
                borderTop:  '1px solid rgba(196,162,101,0.2)',
              }}
            >
              <div className="max-w-md mx-auto space-y-5">
                {/* Diamond divider */}
                <div className="flex items-center justify-center gap-4">
                  <span className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
                  <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,5 5,10 0,5" fill="#C4A265" /></svg>
                  <span className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
                </div>

                <p style={{ fontFamily: 'Pinyon Script, cursive', fontSize: '2.2rem', color: '#6E4B3A', lineHeight: 1.2 }}>
                  {COPY.ganesh}
                </p>

                <p style={{ fontFamily: 'Lora, serif', fontSize: '0.85rem', color: '#8B7D6B', fontStyle: 'italic', lineHeight: 1.8 }}>
                  "We look forward to welcoming you with open hearts and warm arms as we begin this beautiful journey together."
                </p>

                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, color: '#4A3728' }}>
                  {COPY.families}
                </p>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <span className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #C4A265)' }} />
                  <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#C4A265" /></svg>
                  <span className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, #C4A265)' }} />
                </div>

                {/* RSVP footer CTA */}
                <div className="pt-4">
                  <button
                    onClick={() => setRsvpOpen(true)}
                    className="text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                  >
                    Confirm Your Attendance
                  </button>
                </div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <RsvpModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </div>
  );
};

export default App;
