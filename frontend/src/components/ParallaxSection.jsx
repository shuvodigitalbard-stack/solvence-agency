import React, { useRef, useState, useCallback, useEffect } from 'react';

export default function ParallaxSection({ children, className = '', style = {}, speed = 0.3, mouseEffect = true }) {
  const sectionRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!mouseEffect || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = ((e.clientX - centerX) / rect.width) * 20 * speed;
    const offsetY = ((e.clientY - centerY) / rect.height) * 20 * speed;
    setMouseOffset({ x: offsetX, y: offsetY });
  }, [mouseEffect, speed]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / rect.height;
      setScrollOffset(scrollProgress * 30 * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`parallax-section ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        ...style,
        transform: `translate(${mouseOffset.x}px, ${mouseOffset.y + scrollOffset}px)`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}
