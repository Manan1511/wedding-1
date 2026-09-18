import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CountdownTimeLeft } from '../types';

const TARGET = '2026-11-26T09:30:00+05:30';

const calc = (target: string): CountdownTimeLeft => {
  const diff = +new Date(target) - +new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
  return {
    days:        Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:       Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes:     Math.floor((diff / 1000 / 60) % 60),
    seconds:     Math.floor((diff / 1000) % 60),
    isCompleted: false,
  };
};

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>(() => calc(TARGET));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days',    marathi: 'दिवस',   value: timeLeft.days },
    { label: 'Hours',   marathi: 'तास',     value: timeLeft.hours },
    { label: 'Minutes', marathi: 'मिनिटे',  value: timeLeft.minutes },
    { label: 'Seconds', marathi: 'सेकंद',   value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 px-6" style={{ background: '#FDF8F0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p
          className="mb-8 text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}
        >
          Counting down to the wedding day
        </p>

        <div className="grid grid-cols-4 gap-3 sm:gap-5">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center py-5 px-2 rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, #FEFCF8, #F5EDE0)',
                boxShadow: '0 2px 16px rgba(100, 70, 40, 0.09)',
                border: '1px solid rgba(196, 162, 101, 0.25)',
              }}
            >
              {/* Top gold accent */}
              <span
                className="block w-8 h-px mb-3"
                style={{ background: 'linear-gradient(to right, transparent, #C4A265, transparent)' }}
              />
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                  fontWeight: 600,
                  color: '#2C2421',
                  lineHeight: 1,
                }}
              >
                {String(u.value).padStart(2, '0')}
              </span>
              <span className="mt-2 text-[11px] tracking-wider" style={{ fontFamily: 'Inter, sans-serif', color: '#C4A265' }}>
                {u.marathi}
              </span>
              <span className="text-[10px] tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Inter, sans-serif', color: '#B8AFA8' }}>
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-sm italic"
          style={{ fontFamily: 'Lora, serif', color: '#8B7D6B' }}
        >
          Until the varmala at Enrise by Sayaji, Amravati
        </p>
      </motion.div>
    </section>
  );
};
