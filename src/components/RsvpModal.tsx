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
    const finalForm = {
      ...form,
      numberOfGuests: Math.max(1, form.numberOfGuests || 1),
    };
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 }, colors: ['#C4A265', '#D4A5A5', '#9CAF88'] });
    window.open(generateWhatsAppRsvpUrl(finalForm), '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          style={{ background: 'rgba(44, 36, 33, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[420px] rounded-2xl sm:rounded-3xl my-auto overflow-hidden flex flex-col max-h-[92vh]"
            style={{
              background: 'linear-gradient(145deg, #FEFCF8 0%, #F9F2E8 100%)',
              boxShadow: '0 24px 80px rgba(44, 36, 33, 0.28), 0 0 0 1px rgba(196, 162, 101, 0.35)',
            }}
          >
            {/* Gold top accent line */}
            <div className="h-1 flex-shrink-0" style={{ background: 'linear-gradient(to right, #C4A265, #E8D5A8, #C4A265)' }} />

            {/* Scrollable body */}
            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full transition-colors hover:bg-black/5 cursor-pointer z-10"
                style={{ color: '#8B7D6B' }}
                aria-label="Close RSVP modal"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="text-center mb-4 sm:mb-5">
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}>
                  Will you join us?
                </p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.55rem', fontWeight: 600, color: '#2C2421', lineHeight: 1.15 }}>
                  RSVP for Sayali &amp; Travis
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Guest Name */}
                <div>
                  <label className="block text-[11px] tracking-widest uppercase mb-1.5 font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name or family name"
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl outline-none transition-shadow text-sm focus:shadow-[0_0_0_2px_rgba(196,162,101,0.4)]"
                    style={{
                      fontFamily: 'Lora, serif',
                      color: '#2C2421',
                      background: '#FDFAF5',
                      border: '1px solid rgba(196,162,101,0.3)',
                    }}
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] tracking-widest uppercase font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                      Number of Guests
                    </label>
                    <span className="text-[11px] text-[#8B7D6B]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {form.numberOfGuests === 1 ? '1 guest' : `${form.numberOfGuests || 1} guests`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, numberOfGuests: Math.max(1, (prev.numberOfGuests || 1) - 1) }))}
                      className="w-10 h-9 sm:w-11 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer hover:bg-[#F5EDE0] active:scale-95 select-none"
                      style={{
                        background: '#FDFAF5',
                        border: '1px solid rgba(196,162,101,0.3)',
                        color: '#6E4B3A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.2rem',
                        lineHeight: 1,
                      }}
                      aria-label="Decrease guest count"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      required
                      placeholder="e.g. 2"
                      value={form.numberOfGuests || ''}
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === '') {
                          setForm((prev) => ({ ...prev, numberOfGuests: 0 }));
                        } else {
                          const val = parseInt(raw, 10);
                          if (!isNaN(val)) {
                            setForm((prev) => ({ ...prev, numberOfGuests: Math.max(1, val) }));
                          }
                        }
                      }}
                      onBlur={() => {
                        if (!form.numberOfGuests || form.numberOfGuests < 1) {
                          setForm((prev) => ({ ...prev, numberOfGuests: 1 }));
                        }
                      }}
                      className="flex-1 px-3 py-2 text-center rounded-xl outline-none transition-shadow text-sm sm:text-base font-medium focus:shadow-[0_0_0_2px_rgba(196,162,101,0.4)]"
                      style={{
                        fontFamily: 'Lora, serif',
                        color: '#2C2421',
                        background: '#FDFAF5',
                        border: '1px solid rgba(196,162,101,0.3)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, numberOfGuests: (prev.numberOfGuests || 0) + 1 }))}
                      className="w-10 h-9 sm:w-11 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer hover:bg-[#F5EDE0] active:scale-95 select-none"
                      style={{
                        background: '#FDFAF5',
                        border: '1px solid rgba(196,162,101,0.3)',
                        color: '#6E4B3A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.2rem',
                        lineHeight: 1,
                      }}
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Attending Events */}
                <div>
                  <label className="block text-[11px] tracking-widest uppercase mb-1.5 font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    Attending
                  </label>
                  <div className="space-y-1.5">
                    {allEvents.map((ev) => {
                      const on = form.attendingEvents.includes(ev);
                      return (
                        <div
                          key={ev}
                          onClick={() => toggle(ev)}
                          className="flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl cursor-pointer transition-all select-none"
                          style={{
                            background: on ? 'rgba(196,162,101,0.12)' : '#FDFAF5',
                            border: `1px solid ${on ? 'rgba(196,162,101,0.55)' : 'rgba(196,162,101,0.22)'}`,
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
                          <span style={{ fontFamily: 'Lora, serif', fontSize: '0.86rem', color: '#4A3728' }}>
                            {ev}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Note for the Couple */}
                <div>
                  <label className="block text-[11px] tracking-widest uppercase mb-1 font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#8B7D6B' }}>
                    A note for the couple <span style={{ color: '#C4A265' }}>(optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="A blessing or a warm wish..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl outline-none resize-none transition-shadow text-xs sm:text-sm focus:shadow-[0_0_0_2px_rgba(196,162,101,0.4)]"
                    style={{
                      fontFamily: 'Lora, serif',
                      color: '#2C2421',
                      background: '#FDFAF5',
                      border: '1px solid rgba(196,162,101,0.3)',
                    }}
                  />
                </div>

                {/* Submit button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #6B2737, #4D1B27)',
                      color: '#FFF2C6',
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      border: '1px solid rgba(229, 193, 120, 0.4)',
                      boxShadow: '0 4px 18px rgba(107, 39, 55, 0.28)',
                    }}
                  >
                    <Send size={15} style={{ color: '#E5C178' }} />
                    Send via WhatsApp
                  </button>
                  <p className="text-center text-[11px] text-[#8B7D6B] mt-2.5 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    RSVP: {DISPLAY_PHONE}
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
