import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import { getServices } from '../services/api';

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(r => { setServices(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { icon: <FiUsers />, value: '50+', label: 'Happy Clients' },
    { icon: <FiAward />, value: '100+', label: 'Projects Done' },
    { icon: <FiTrendingUp />, value: '98%', label: 'Client Retention' },
  ];

  const features = [
    'Full-stack development expertise',
    'Data-driven marketing strategies',
    'Transparent communication & reporting',
    'Agile development methodology',
    'Post-launch support & maintenance',
    'Competitive pricing & flexible plans'
  ];

  const highlights = [
    { value: '50+', label: 'Clients Served' },
    { value: '100+', label: 'Projects Delivered' },
    { value: '15+', label: 'Team Members' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 0 60px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)'
      }}>
        {/* Decorative blobs - hidden on mobile */}
        <div className="hero-blob" style={{
          position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(224,192,96,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div className="hero-blob" style={{
          position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(32,160,192,0.06) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Badge */}
            <div className="animate-fade-in-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '50px',
              background: 'rgba(224,192,96,0.1)', border: '1px solid rgba(224,192,96,0.2)',
              marginBottom: '24px'
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%', background: '#40a040',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{ fontSize: '0.8rem', color: '#c9a83c', fontWeight: 600 }}>Trusted by 50+ Businesses</span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in-up delay-1" style={{
              fontSize: 'clamp(2rem, 8vw, 4.5rem)', fontWeight: 900,
              lineHeight: 1.1, marginBottom: '20px', fontFamily: 'Red Hat Display',
              color: '#1a1a2e', opacity: 0
            }}>
              We Build <span className="gradient-text">Digital Solutions</span><br />That Drive Growth
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-2" style={{
              fontSize: 'clamp(0.95rem, 3vw, 1.2rem)', color: '#4a5568', maxWidth: '600px',
              margin: '0 auto 32px', lineHeight: 1.7, opacity: 0, padding: '0 8px'
            }}>
              From custom web applications to data-driven marketing campaigns, we deliver technology solutions that help your business scale.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-3" style={{
              display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', opacity: 0
            }}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', padding: '14px 28px' }}>
                Start a Project <FiArrowRight />
              </Link>
              <Link to="/services" className="btn btn-secondary" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', padding: '14px 28px' }}>
                Our Services
              </Link>
            </div>

            {/* Stats - stack on mobile */}
            <div className="animate-fade-in-up delay-4" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
              marginTop: '48px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto',
              opacity: 0
            }} className="hero-stats">
              {stats.map((s, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '16px 8px', background: '#fff',
                  borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'var(--transition)'
                }}>
                  <div style={{ fontSize: '1.2rem', color: '#c9a83c', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                  <div style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', fontWeight: 800, fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>{s.value}</div>
                  <div style={{ color: '#64748b', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <h2>What We <span className="gradient-text">Do Best</span></h2>
            <p>Comprehensive technology solutions tailored to your business needs</p>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {services.slice(0, 6).map((s, i) => (
                <Link key={s._id} to={`/services/${s.slug}`} className="card animate-fade-in-up" style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'Red Hat Display' }}>{s.title}</h3>
                  <p style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.7 }}>{s.shortDescription}</p>
                  <span style={{ color: '#c9a83c', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Learn more <FiArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginBottom: '20px',
                fontFamily: 'Red Hat Display', color: '#1a1a2e'
              }}>
                Why Choose <span className="gradient-text">Solvence?</span>
              </h2>
              <p style={{ color: '#4a5568', fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.8, marginBottom: '28px' }}>
                We combine technical expertise with business acumen to deliver solutions that don't just work — they drive real results.
              </p>
              {features.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(224,192,96,0.15)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <FiCheck size={14} style={{ color: '#c9a83c' }} />
                  </div>
                  <span style={{ color: '#334155', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: '#fff', borderRadius: '20px', padding: 'clamp(24px, 4vw, 40px)',
              border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  fontSize: 'clamp(2.5rem, 6vw, 3rem)', fontWeight: 900, fontFamily: 'Red Hat Display',
                  background: 'var(--gradient-text)', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>3+</div>
                <div style={{ color: '#64748b', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Years of Experience</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {highlights.map((s, i) => (
                  <div key={i} style={{
                    background: 'rgba(224,192,96,0.08)', borderRadius: '12px',
                    padding: 'clamp(12px, 3vw, 20px)', textAlign: 'center', transition: 'var(--transition)'
                  }}>
                    <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: '#1a1a2e' }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 0', background: '#fff' }}>
        <div className="container">
          <div style={{
            background: 'var(--gradient)', borderRadius: '20px', padding: 'clamp(32px, 6vw, 60px) clamp(20px, 5vw, 40px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden'
          }}>
            <div className="hero-blob" style={{
              position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px',
              background: 'rgba(255,255,255,0.1)', borderRadius: '50%'
            }} />
            <div className="hero-blob" style={{
              position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px',
              background: 'rgba(255,255,255,0.08)', borderRadius: '50%'
            }} />

            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.8rem)', marginBottom: '12px',
              position: 'relative', zIndex: 1, color: '#fff', fontFamily: 'Red Hat Display'
            }}>
              Ready to Start Your Project?
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', opacity: 0.9, maxWidth: '500px',
              margin: '0 auto 28px', position: 'relative', zIndex: 1, color: '#fff'
            }}>
              Let's discuss how we can help transform your business with technology.
            </p>
            <Link to="/contact" className="btn" style={{
              background: '#fff', color: '#c9a83c', border: 'none',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', padding: '14px 28px', position: 'relative', zIndex: 1
            }}>
              Get Free Consultation <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Inline styles for responsive hero */}
      <style>{`
        @media (max-width: 768px) {
          .hero-stats {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 8px !important;
            margin-top: 32px !important;
          }
          .hero-blob {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hero-stats {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </>
  );
}
