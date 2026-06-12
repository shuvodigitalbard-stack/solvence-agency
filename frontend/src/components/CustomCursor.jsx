import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      // Dot follows instantly
      dotX = mouseX;
      dotY = mouseY;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], .btn, input, textarea, select, .magnetic')) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], .btn, input, textarea, select, .magnetic')) {
        setHovering(false);
      }
    };

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

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
      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: '-4px',
          left: '-4px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--primary, #e0c060)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          mixBlendMode: 'difference',
          ...(clicking && { width: '4px', height: '4px' }),
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: '-20px',
          left: '-20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid var(--primary, #e0c060)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s, transform 0.1s',
          opacity: 0.6,
          ...(hovering && {
            width: '56px',
            height: '56px',
            top: '-28px',
            left: '-28px',
            borderColor: 'var(--secondary, #20a0c0)',
            opacity: 0.9,
          }),
          ...(clicking && {
            width: '30px',
            height: '30px',
            top: '-15px',
            left: '-15px',
          }),
        }}
      />
    </>
  );
}
