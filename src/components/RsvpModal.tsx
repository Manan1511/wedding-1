import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { RSVPFormData } from '../types';
import { generateWhatsAppRsvpUrl } from '../utils/whatsapp';
import { DISPLAY_PHONE } from '../constants/weddingData';

interface RsvpSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpSectionProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<RSVPFormData>({
    guestName:       '',
    numberOfGuests:  2,
    attendingEvents: ['Mehendi (24th Nov)', 'Haldi (25th Nov)', 'Wedding Day (26th Nov)'],
    message:         '',
  });

  const allEvents = ['Mehendi (24th Nov)', 'Haldi (25th Nov)', 'Wedding Day (26th Nov)'];

  const toggle = (e: string) => {
    setForm((f) => ({
      ...f,
      attendingEvents: f.attendingEvents.includes(e)
        ? f.attendingEvents.filter((x) => x !== e)
        : [...f.attendingEvents, e],
    }));
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!form.guestName.trim()) return;
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 }, colors: ['#C4A265', '#D4A5A5', '#9CAF88'] });
    window.open(generateWhatsAppRsvpUrl(form), '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ background: 'rgba(44, 36, 33, 0.55)', backdropFilter: 'blur(6px)' }}>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl my-8 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #FEFCF8 0%, #F9F2E8 100%)',
              boxShadow: '0 24px 80px rgba(44, 36, 33, 0.22)',
              border: '1px solid rgba(196, 162, 101, 0.3)',
            }}
          >
            {/* Gold top bar */}
            <div className="h-1" style={{ background: 'linear-gradient(to right, #C4A265, #E8D5A8, #C4A265)' }} />

            <div className="px-8 py-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-full transition-colors hover:bg-black/5"
                style={{ color: '#8B7D6B' }}
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}>
                  Will you join us?
                </p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 600, color: '#2C2421' }}>
                  RSVP for Sayali &amp; Travis
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name or family name"
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(196,162,101,0.4)]"
                    style={{
                      fontFamily: 'Lora, serif',
                      fontSize: '0.95rem',
                      color: '#2C2421',
                      background: '#FDFAF5',
                      border: '1px solid rgba(196,162,101,0.3)',
                    }}
                  />
                </div>

                {/* Guest count */}
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    Party Size
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, '5+'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm({ ...form, numberOfGuests: typeof n === 'number' ? n : 5 })}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          background: form.numberOfGuests === (typeof n === 'number' ? n : 5)
                            ? 'linear-gradient(135deg, #C4A265, #A0824A)' : '#FDFAF5',
                          color: form.numberOfGuests === (typeof n === 'number' ? n : 5) ? '#FDF8F0' : '#8B7D6B',
                          border: '1px solid rgba(196,162,101,0.3)',
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Events */}
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    Attending
                  </label>
                  <div className="space-y-2">
                    {allEvents.map((ev) => {
                      const on = form.attendingEvents.includes(ev);
                      return (
                        <div
                          key={ev}
                          onClick={() => toggle(ev)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
                          style={{
                            background: on ? 'rgba(196,162,101,0.10)' : '#FDFAF5',
                            border: `1px solid ${on ? 'rgba(196,162,101,0.5)' : 'rgba(196,162,101,0.2)'}`,
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                            style={{
                              background: on ? '#C4A265' : 'transparent',
                              border: `1.5px solid ${on ? '#C4A265' : 'rgba(196,162,101,0.5)'}`,
                            }}
                          >
                            {on && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l3 3 5-6" stroke="#FDF8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span style={{ fontFamily: 'Lora, serif', fontSize: '0.9rem', color: '#4A3728' }}>
                            {ev}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    A note for the couple <span style={{ color: '#C4A265' }}>(optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="A blessing or a warm wish..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none resize-none transition-shadow focus:shadow-[0_0_0_2px_rgba(196,162,101,0.4)]"
                    style={{
                      fontFamily: 'Lora, serif',
                      fontSize: '0.9rem',
                      color: '#2C2421',
                      background: '#FDFAF5',
                      border: '1px solid rgba(196,162,101,0.3)',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 transition-opacity hover:opacity-85 mt-2 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #6B2737, #4D1B27)',
                    color: '#E8D5A8',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 18px rgba(107, 39, 55, 0.30)',
                  }}
                >
                  <Send size={15} />
                  Send via WhatsApp
                </button>
                <p className="text-center text-[11px] text-[#8B7D6B] mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  RSVP: {DISPLAY_PHONE}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
