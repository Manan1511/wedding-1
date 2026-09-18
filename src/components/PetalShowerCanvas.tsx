import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  color: string;
}

// Muted, soft petal palette, not a confetti cannon
const COLORS = ['rgba(212,165,165,', 'rgba(196,162,101,', 'rgba(156,175,136,', 'rgba(232,213,168,'];
const PETAL_COUNT = 14;

export const PetalShowerCanvas: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = (canvas.width  = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const petals: Petal[] = Array.from({ length: PETAL_COUNT }).map(() => ({
      x:        Math.random() * w,
      y:        Math.random() * h,
      size:     Math.random() * 7 + 5,
      speedY:   Math.random() * 0.6 + 0.35,
      speedX:   (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
      alpha:    Math.random() * 0.25 + 0.15,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y        += p.speedY;
        p.x        += Math.sin(p.y * 0.006) * 0.5 + p.speedX;
        p.rotation += p.rotSpeed;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        if (p.x > w + 20) p.x = -20;
        if (p.x < -20)    p.x = w + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = `${p.color}1)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};
