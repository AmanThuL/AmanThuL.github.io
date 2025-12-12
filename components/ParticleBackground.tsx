
import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Defined Brighter Palette for better visibility against dark bg
    // Warm (Pink), Cool 1 (Cyan), Cool 2 (Indigo), White
    const colors = ['#FF2A6D', '#05D9E8', '#6366F1', '#ffffff'];

    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; flashSpeed: number; flashOffset: number }> = [];
    const mouse = { x: -1000, y: -1000 };
    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Increased density: divide area by a smaller number
      const particleCount = Math.floor((width * height) / 8000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slight horizontal drift
          vy: Math.random() * 0.8 + 0.2, // Faster falling rain effect
          size: Math.random() > 0.95 ? Math.random() * 2 + 2 : Math.random() * 1.5 + 0.5, // Varied sizes
          color: colors[Math.floor(Math.random() * colors.length)],
          flashSpeed: Math.random() * 0.1 + 0.02,
          flashOffset: Math.random() * 100
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time++;

      // Update and draw particles
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        // Reset to top
        if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        // Mouse interaction: push away
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (dist < interactionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (interactionRadius - dist) / interactionRadius;
            const pushX = Math.cos(angle) * force * 2;
            const pushY = Math.sin(angle) * force * 2;
            p.x -= pushX;
            p.y -= pushY;
        }

        // Draw square pixels
        // Opacity oscillation
        const opacityBase = (Math.sin(time * p.flashSpeed + p.flashOffset) + 1) / 2; // 0 to 1
        const opacity = opacityBase * 0.6 + 0.3; // Min 0.3, Max 0.9

        ctx.fillStyle = p.color;
        // Brighter near mouse
        ctx.globalAlpha = dist < 200 ? 1 : opacity;

        // Snap to grid for "digital" feel
        const snap = 4; // Smaller grid for smoother look but still pixelated
        const drawX = Math.round(p.x / snap) * snap;
        const drawY = Math.round(p.y / snap) * snap;

        ctx.fillRect(drawX, drawY, p.size, p.size);

        // Occasional connecting lines for nearby particles (network effect)
        // Optimization: only check a few neighbors or random chance to avoid O(N^2)
        if (Math.random() > 0.999) {
             ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
             ctx.fillRect(drawX, 0, 1, height); // Matrix rain trace artifact
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    const visibilityCheck = () => {
      // Defer rendering until the element is in the DOM and sized
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        requestAnimationFrame(visibilityCheck);
        return;
      }
      draw();
    };

    visibilityCheck();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Removed opacity-40 to make it more visible, using direct alpha control in canvas
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-20 opacity-50"
    />
  );
};
