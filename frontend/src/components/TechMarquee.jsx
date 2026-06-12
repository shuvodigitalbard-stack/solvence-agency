import React from 'react';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Flutter', icon: '💙' },
  { name: 'Google Ads', icon: '🎯' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Express', icon: '🚂' },
  { name: 'Figma', icon: '🎨' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Firebase', icon: '🔥' },
];

export default function TechMarquee() {
  // Duplicate for seamless loop
  const items = [...techStack, ...techStack];

  return (
    <section style={{ padding: '40px 0', background: '#fff', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '8px',
          fontFamily: 'Red Hat Display', color: '#1a1a2e', fontWeight: 800
        }}>
          Our <span className="gradient-text">Tech Stack</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Technologies we use to build amazing products
        </p>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(90deg, #fff, transparent)', zIndex: 2, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(-90deg, #fff, transparent)', zIndex: 2, pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex', gap: '24px',
          animation: 'marquee 30s linear infinite',
          width: 'max-content'
        }}>
          {items.map((tech, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '50px',
              background: 'rgba(224,192,96,0.06)', border: '1px solid rgba(224,192,96,0.12)',
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'var(--transition)', cursor: 'default'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(224,192,96,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(224,192,96,0.06)'; e.currentTarget.style.transform = ''; }}
            >
              <span style={{ fontSize: '1.2rem' }}>{tech.icon}</span>
              <span style={{ color: '#334155', fontWeight: 600, fontSize: '0.9rem' }}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        }
      `}</style>
    </section>
  );
}
