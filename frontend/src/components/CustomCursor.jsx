import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!cursor || !ring || !glow) {
      console.error('[CustomCursor] refs not found!');
      return;
    }

    console.log('[CustomCursor] MOUNTED ✅', { cursor, ring, glow });

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let glowX = 0, glowY = 0;
    let hovering = false;
    let clicking = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => { clicking = true; };
    const handleMouseUp = () => { clicking = false; };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .btn, input, textarea, select, .magnetic')) {
        hovering = true;
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .btn, input, textarea, select, .magnetic')) {
        hovering = false;
      }
    };

    let animId;
    const animate = () => {
      // Smooth follow
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;

      // Dot (instant follow, centered on 8px)
      cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      // Ring (centered on its size)
      const ringSize = hovering ? 56 : 40;
      ring.style.transform = `translate3d(${ringX - ringSize / 2}px, ${ringY - ringSize / 2}px, 0)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;

      // Glow halo
      const glowSize = hovering ? 140 : 90;
      glow.style.transform = `translate3d(${glowX - glowSize / 2}px, ${glowY - glowSize / 2}px, 0)`;
      glow.style.width = `${glowSize}px`;
      glow.style.height = `${glowSize}px`;

      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animId = requestAnimationFrame(animate);

    console.log('[CustomCursor] Event listeners attached, animation started');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
      console.log('[CustomCursor] UNMOUNTED');
    };
  }, []);

  return (
    <>
      {/* Large outer glow halo */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99996,
          background: 'radial-gradient(circle, rgba(224,192,96,0.18) 0%, rgba(32,160,192,0.1) 40%, transparent 70%)',
          filter: 'blur(10px)',
          willChange: 'transform, width, height',
        }}
      />

      {/* Animated ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          boxShadow: '0 0 12px rgba(224,192,96,0.4), 0 0 24px rgba(224,192,96,0.15), 0 0 40px rgba(32,160,192,0.08)',
          willChange: 'transform, width, height',
        }}
      >
        {/* SVG spinning ring */}
        <svg
          viewBox="0 0 40 40"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            animation: 'cursorRingSpin 6s linear infinite',
          }}
        >
          <defs>
            <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke="url(#cursorGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
        </svg>

        {/* Pulsing inner ring */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            right: '8px',
            bottom: '8px',
            borderRadius: '50%',
            border: '0.5px solid rgba(224, 192, 96, 0.25)',
            animation: 'cursorPulse 2.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Center dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #86efac, #4ade80)',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 8px rgba(224,192,96,0.7), 0 0 16px rgba(224,192,96,0.35), 0 0 28px rgba(224,192,96,0.15)',
          animation: 'cursorDotGlow 2s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </>
  );
}
