import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { getBackgroundAudio } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(() => !getBackgroundAudio().paused);
  const [muted,   setMuted]   = useState<boolean>(false);

  useEffect(() => {
    const audio = getBackgroundAudio();
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggle = async () => {
    const audio = getBackgroundAudio();
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.muted = muted;
      await audio.play().catch(() => null);
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = getBackgroundAudio();
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  };

  return (
    <div
      className="fixed bottom-6 right-5 z-40 flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        background: 'rgba(253,248,240,0.88)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(196,162,101,0.35)',
        boxShadow: '0 4px 20px rgba(100,70,40,0.14)',
      }}
    >
      {/* Subtle live bars when playing */}
      {playing && !muted && (
        <div className="flex items-end gap-0.5 h-3.5 mr-1">
          {[1, 0.6, 1, 0.7].map((h, i) => (
            <span
              key={i}
              className="w-0.5 rounded-full"
              style={{
                height: `${h * 14}px`,
                background: '#C4A265',
                animation: `floatSlow ${1.2 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Play/pause */}
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
        style={{ fontFamily: 'Inter, sans-serif', color: '#6E4B3A' }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <Music size={13} style={{ color: '#C4A265' }} />
        <span>{playing ? 'Pause' : 'Music'}</span>
      </button>

      <span style={{ width: '1px', height: '14px', background: 'rgba(196,162,101,0.4)' }} />

      {/* Mute */}
      <button
        onClick={toggleMute}
        className="transition-opacity hover:opacity-70"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted
          ? <VolumeX size={14} style={{ color: '#B8AFA8' }} />
          : <Volume2 size={14} style={{ color: '#C4A265' }} />
        }
      </button>
    </div>
  );
};
