import React from 'react';
import { FiMessageSquare, FiPenTool, FiCode, FiZap } from 'react-icons/fi';
import { useInView } from '../hooks/useAnimations';

const steps = [
  {
    icon: <FiMessageSquare />,
    title: 'Discovery Call',
    description: 'We discuss your vision, goals, and requirements to understand your project inside out.',
    color: '#e0c060'
  },
  {
    icon: <FiPenTool />,
    title: 'Strategy & Design',
    description: 'Our team creates wireframes, mockups, and a detailed project roadmap.',
    color: '#20a0c0'
  },
  {
    icon: <FiCode />,
    title: 'Development',
    description: 'We build your solution using modern technologies with clean, scalable code.',
    color: '#40a040'
  },
  {
    icon: <FiRocket />,
    title: 'Launch & Support',
    description: 'We deploy, test, and provide ongoing support to ensure everything runs smoothly.',
    color: '#8b5cf6'
  },
];

export default function ProcessTimeline() {
  const { inView, ref } = useInView(0.15);

  return (
    <section style={{ padding: '48px 0 60px', background: '#fff' }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '10px',
            fontFamily: 'Red Hat Display', color: '#1a1a2e', fontWeight: 800
          }}>
            How We <span className="gradient-text">Work</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '500px', margin: '0 auto' }}>
            A proven process that delivers results, every time
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center', padding: '28px 20px', borderRadius: '16px',
                background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.5s ease',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 150}ms`
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)'; }}
            >
              {/* Step number */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: step.color + '15', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 16px',
                fontSize: '1.3rem', color: step.color
              }}>
                {step.icon}
              </div>
              <div style={{
                display: 'inline-block', padding: '2px 10px', borderRadius: '50px',
                background: step.color + '15', color: step.color,
                fontSize: '0.7rem', fontWeight: 700, marginBottom: '10px',
                letterSpacing: '0.5px'
              }}>
                STEP {i + 1}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>
                {step.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
