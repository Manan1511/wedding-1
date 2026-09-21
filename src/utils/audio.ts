// Audio utilities: Tactile wax snap, paper slide swoosh, resonant chime cascade, and background instrumental
let backgroundAudioInstance: HTMLAudioElement | null = null;

const BACKGROUND_MUSIC_URL = '/audio/wedding-music.mp3';
const DEFAULT_MUSIC_VOLUME = 0.45;
const CHIME_VOLUME = 0.08;
const CRACK_VOLUME = 0.25;
const PAPER_VOLUME = 0.06;

// Auspicious Raag Yaman notes (Sa, Re, Ga, Pa, Dha, Sa') for celebratory shimmer
const AUSPICIOUS_CHIME_FREQUENCIES: readonly number[] = [
  523.25, // C5 (Sa)
  587.33, // D5 (Re)
  659.25, // E5 (Ga)
  783.99, // G5 (Pa)
  880.0,  // A5 (Dha)
  1046.5, // C6 (Sa')
];

export const getBackgroundAudio = (): HTMLAudioElement => {
  if (!backgroundAudioInstance) {
    backgroundAudioInstance = new Audio(BACKGROUND_MUSIC_URL);
    backgroundAudioInstance.loop = true;
    backgroundAudioInstance.volume = DEFAULT_MUSIC_VOLUME;
  }
  return backgroundAudioInstance;
};

export const startBackgroundMusic = async (): Promise<void> => {
  try {
    const audio = getBackgroundAudio();
    if (audio.paused) {
      await audio.play();
    }
  } catch {
    // Autoplay policy fallback
  }
};

/**
 * Creates and returns an AudioContext, supporting webkit prefix if needed.
 */
const getAudioContext = (): AudioContext | null => {
  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return null;
    return new AudioCtxClass();
  } catch {
    return null;
  }
};

/**
 * Generates a realistic tactile mechanical wax seal crack / fracture sound.
 * Uses high-frequency bandpass-filtered noise for the crisp fracture,
 * combined with an impulse thump for physical release.
 */
const playWaxCrack = (ctx: AudioContext, startTime: number): void => {
  const bufferSize = Math.floor(ctx.sampleRate * 0.08); // 80ms buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // Decaying white noise
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  // Bandpass filter centered around 2400Hz for crisp brittle wax snap
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2400, startTime);
  filter.Q.setValueAtTime(3.0, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(CRACK_VOLUME, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseSource.start(startTime);
  noiseSource.stop(startTime + 0.08);

  // Sub thump for the seal breaking free
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'triangle';
  thump.frequency.setValueAtTime(160, startTime);
  thump.frequency.exponentialRampToValueAtTime(45, startTime + 0.06);

  thumpGain.gain.setValueAtTime(CRACK_VOLUME * 0.8, startTime);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

  thump.connect(thumpGain);
  thumpGain.connect(ctx.destination);

  thump.start(startTime);
  thump.stop(startTime + 0.08);
};

/**
 * Generates an organic paper-slide / flap-unfolding swoosh sound.
 */
const playPaperSlide = (ctx: AudioContext, startTime: number): void => {
  const duration = 0.25;
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const progress = i / bufferSize;
    // Smooth bell-curve envelope for gentle swoosh
    const envelope = Math.sin(progress * Math.PI);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, startTime);
  filter.frequency.linearRampToValueAtTime(800, startTime + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(PAPER_VOLUME, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseSource.start(startTime);
  noiseSource.stop(startTime + duration);
};

/**
 * Plays a rich, resonant multi-octave acoustic chime cascade.
 */
const playHarmonicChime = (ctx: AudioContext, startTime: number): void => {
  const noteInterval = 0.09;

  AUSPICIOUS_CHIME_FREQUENCIES.forEach((freq, idx) => {
    const noteTime = startTime + idx * noteInterval;

    // Fundamental oscillator (sine)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteTime);

    // Overtone oscillator (triangle for acoustic warmth)
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, noteTime);

    gain.gain.setValueAtTime(0.001, noteTime);
    gain.gain.exponentialRampToValueAtTime(CHIME_VOLUME, noteTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.2);

    overtoneGain.gain.setValueAtTime(0.001, noteTime);
    overtoneGain.gain.exponentialRampToValueAtTime(CHIME_VOLUME * 0.35, noteTime + 0.015);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);
    overtone.connect(overtoneGain);
    overtoneGain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + 1.3);
    overtone.start(noteTime);
    overtone.stop(noteTime + 0.9);
  });
};

/**
 * Complete orchestrated soundscape for the envelope & wax seal opening:
 * 1. Immediate tactile wax seal fracture snap (0ms)
 * 2. Paper flap sliding swoosh (~380ms)
 * 3. Auspicious golden chime cascade (~450ms)
 */
export const playWaxSealOpeningSequence = (): void => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => null);
  }

  const now = ctx.currentTime;
  playWaxCrack(ctx, now);
  playPaperSlide(ctx, now + 0.85);
  playHarmonicChime(ctx, now + 1.9);
};
