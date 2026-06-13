import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const trailRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const trailPoints = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!visible) setVisible(true);

    // Trail points
    trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (trailPoints.current.length > 12) {
      trailPoints.current.shift();
    }
  }, [visible]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !glow || !trail) return;

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .btn, input, textarea, select, .magnetic, [data-cursor-hover]')) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .btn, input, textarea, select, .magnetic, [data-cursor-hover]')) {
        setHovering(false);
      }
    };

    // Smooth animation loop
    let animId;
    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Ring follows with spring easing
      ringPos.current.x += (mx - ringPos.current.x) * 0.12;
      ringPos.current.y += (my - ringPos.current.y) * 0.12;

      // Glow follows with more lag
      glowPos.current.x += (mx - glowPos.current.x) * 0.06;
      glowPos.current.y += (my - glowPos.current.y) * 0.06;

      // Update dot (instant)
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;

      // Update ring
      const ringSize = hovering ? 52 : 36;
      const ringOffset = ringSize / 2;
      ring.style.transform = `translate(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;

      // Update glow (large laggy blur)
      const glowSize = hovering ? 120 : 80;
      glow.style.transform = `translate(${glowPos.current.x - glowSize / 2}px, ${glowPos.current.y - glowSize / 2}px)`;
      glow.style.width = `${glowSize}px`;
      glow.style.height = `${glowSize}px`;

      // Update trail canvas
      const ctx = trail.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, trail.width, trail.height);
        ctx.globalAlpha = 1;

        const points = trailPoints.current;
        for (let i = 0; i < points.length; i++) {
          points[i].age += 1;
          const alpha = Math.max(0, 1 - points[i].age / 12);
          const size = Math.max(0.5, 3 - points[i].age * 0.2);

          // Gold gradient trail
          ctx.beginPath();
          ctx.arc(points[i].x - trail.getBoundingClientRect().left, points[i].y - trail.getBoundingClientRect().top, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 192, 96, ${alpha * 0.6})`;
          ctx.fill();

          // Teal glow on later points
          if (i > points.length / 2) {
            ctx.beginPath();
            ctx.arc(points[i].x - trail.getBoundingClientRect().left, points[i].y - trail.getBoundingClientRect().top, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(32, 160, 192, ${alpha * 0.15})`;
            ctx.fill();
          }
        }

        // Prune old points
        trailPoints.current = points.filter(p => p.age < 12);
      }

      animId = requestAnimationFrame(animate);
    };

    // Resize trail canvas to full viewport
    const resizeCanvas = () => {
      trail.style.width = '100vw';
      trail.style.height = '100vh';
      trail.width = window.innerWidth;
      trail.height = window.innerHeight;
      trail.style.position = 'fixed';
      trail.style.top = '0';
      trail.style.left = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [visible, hovering, handleMouseMove]);

  // Hide on touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99995,
        }}
      />

      {/* Large outer glow */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99996,
          background: 'radial-gradient(circle, rgba(224,192,96,0.15) 0%, rgba(32,160,192,0.08) 50%, transparent 70%)',
          filter: 'blur(8px)',
          transition: 'width 0.4s, height 0.4s, background 0.4s',
          willChange: 'transform, width, height',
        }}
      />

      {/* Animated ring */}
      <div
        ref={ringRef}
        className={clicking ? 'cursor-ring-clicking' : hovering ? 'cursor-ring-hover' : 'cursor-ring'}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          boxShadow: hovering
            ? '0 0 15px rgba(224,192,96,0.5), 0 0 30px rgba(32,160,192,0.3), 0 0 45px rgba(224,192,96,0.15)'
            : '0 0 10px rgba(224,192,96,0.3), 0 0 20px rgba(224,192,96,0.1)',
          transition: 'box-shadow 0.3s, opacity 0.3s',
          opacity: 0.8,
          willChange: 'transform, width, height',
        }}
      >
        {/* SVG animated ring border */}
        <svg
          viewBox="0 0 36 36"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="url(#cursorGradient)"
            strokeWidth="1.5"
            strokeDasharray={hovering ? "8 4" : "4 6"}
            strokeLinecap="round"
            style={{
              animation: 'cursorRingSpin 4s linear infinite',
            }}
          />
          <defs>
            <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0c060" />
              <stop offset="50%" stopColor="#20a0c0" />
              <stop offset="100%" stopColor="#e0c060" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulsing inner ring */}
        <div
          className="cursor-inner-ring"
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
            borderRadius: '50%',
            border: '0.5px solid rgba(224, 192, 96, 0.2)',
            animation: 'cursorPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className={clicking ? 'cursor-dot-clicking' : 'cursor-dot'}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #f0d88a, #e0c060)',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 6px rgba(224,192,96,0.6), 0 0 12px rgba(224,192,96,0.3), 0 0 18px rgba(224,192,96,0.15)',
          willChange: 'transform, width, height',
        }}
      />

      {/* Click burst effect */}
      {clicking && (
        <div
          style={{
            position: 'fixed',
            top: mousePos.current.y - 25,
            left: mousePos.current.x - 25,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99997,
            animation: 'cursorBurst 0.5s ease-out forwards',
            border: '2px solid rgba(224, 192, 96, 0.6)',
          }}
        />
      )}
    </>
  );
}
