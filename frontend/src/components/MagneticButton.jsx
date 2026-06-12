import React, { useRef, useState, useCallback } from 'react';

export default function MagneticButton({ children, className = '', style = {}, intensity = 0.3, ...props }) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    setOffset({ x: deltaX, y: deltaY });
  }, [intensity]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={btnRef}
      className={`magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${isHovered ? 1.05 : 1})`,
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out',
        display: 'inline-block',
        cursor: 'pointer',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
