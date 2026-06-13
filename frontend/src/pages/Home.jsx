import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import { getServices } from '../services/api';
import FloatingParticles from '../components/FloatingParticles';
import ParallaxSection from '../components/ParallaxSection';
import MagneticButton from '../components/MagneticButton';

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(r => { setServices(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
      {/* Hero */}
      <ParallaxSection speed={0.4} mouseEffect={true}>
        <section style={{
          padding: '90px 0 48px', position: 'relative', overflow: 'hidden',
          background: 'var(--bg-primary)'
        }}>
          <FloatingParticles count={50} />
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(224,192,96,0.1) 0%, transparent 60%)',
            borderRadius: '50%', pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(32,160,192,0.08) 0%, transparent 60%)',
            borderRadius: '50%', pointerEvents: 'none'
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <div className="animate-fade-in-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 18px', borderRadius: '50px',
                background: 'rgba(224,192,96,0.1)', border: '1px solid rgba(224,192,96,0.25)',
                marginBottom: '20px'
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2dd4bf', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>Trusted by 50+ Businesses</span>
              </div>
              <h1 className="animate-fade-in-up delay-1" style={{
                fontSize: 'clamp(2.2rem, 7vw, 4.2rem)', fontWeight: 900,
                lineHeight: 1.1, marginBottom: '16px', fontFamily: 'Red Hat Display',
                color: 'var(--text-primary)', letterSpacing: '-0.5px'
              }}>
                We Build <span className="gradient-text">Digital Solutions</span><br />That Drive Growth
              </h1>
              <p className="animate-fade-in-up delay-2" style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: 'var(--text-secondary)',
                maxWidth: '560px', margin: '0 auto 28px', lineHeight: 1.7
              }}>
                From custom web applications to data-driven marketing campaigns, we deliver technology solutions that help your business scale.
              </p>
              <div className="animate-fade-in-up delay-3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
                <MagneticButton intensity={0.4}>
                  <Link to="/contact" className="btn btn-primary" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
                    Start a Project <FiArrowRight />
                  </Link>
                </MagneticButton>
                <MagneticButton intensity={0.4}>
                  <Link to="/services" className="btn btn-secondary" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
                    Our Services
                  </Link>
                </MagneticButton>
              </div>
              <div className="animate-fade-in-up delay-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '560px', margin: '0 auto' }}>
                {[
                  { icon: <FiUsers />, value: '50+', label: 'Happy Clients' },
                  { icon: <FiAward />, value: '100+', label: 'Projects Done' },
                  { icon: <FiTrendingUp />, value: '98%', label: 'Retention' },
                ].map((s, i) => (
                  <div key={i} className="hover-lift" style={{ textAlign: 'center', padding: '14px 8px', background: 'var(--card-bg)', borderRadius: '14px', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#22c55e', marginBottom: '4px', display: 'flex', justifyContent: 'center', fontSize: '1.1rem' }}>{s.icon}</div>
                    <div style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)', fontWeight: 800, fontFamily: 'Red Hat Display', color: 'var(--text-primary)' }}>{s.value}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Services Preview */}
      <section style={{ background: 'var(--card-bg)', padding: '48px 0 60px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '10px', fontFamily: 'Red Hat Display', color: 'var(--text-primary)', fontWeight: 800 }}>
              What We <span className="gradient-text">Do Best</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '500px', margin: '0 auto' }}>
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {services.slice(0, 6).map((s, i) => (
                <Link key={s._id} to={`/services/${s.slug}`}>
                  <div className="card tilt-card hover-lift" style={{ padding: '24px', height: '100%' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontFamily: 'Red Hat Display' }}>{s.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px', lineHeight: 1.6 }}>{s.shortDescription}</p>
                    <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Learn more <FiArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/services" className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '0.9rem' }}>View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'var(--bg-primary)', padding: '48px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '16px', fontFamily: 'Red Hat Display', color: 'var(--text-primary)', fontWeight: 800 }}>
                Why Choose <span className="gradient-text">Solvence?</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.7, marginBottom: '24px' }}>
                We combine technical expertise with business acumen to deliver solutions that don't just work — they drive real results.
              </p>
              {features.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(224,192,96,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiCheck size={12} style={{ color: '#22c55e' }} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: 'clamp(24px, 4vw, 36px)', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: 'clamp(2.2rem, 5vw, 2.8rem)', fontWeight: 900, fontFamily: 'Red Hat Display', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3+</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>Years of Experience</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {highlights.map((s, i) => (
                  <div key={i} style={{ background: 'rgba(224,192,96,0.08)', borderRadius: '12px', padding: 'clamp(10px, 3vw, 16px)', textAlign: 'center' }}>
                    <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.65rem, 1.6vw, 0.75rem)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 0', background: 'var(--card-bg)' }}>
        <div className="container">
          <div style={{
            background: 'var(--gradient)', borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 50px) clamp(20px, 4vw, 40px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', marginBottom: '10px', position: 'relative', zIndex: 1, color: '#fff', fontFamily: 'Red Hat Display', fontWeight: 800 }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', opacity: 0.9, maxWidth: '460px', margin: '0 auto 24px', position: 'relative', zIndex: 1, color: '#fff', lineHeight: 1.6 }}>
              Let's discuss how we can help transform your business with technology.
            </p>
            <Link to="/contact" className="btn" style={{ background: 'var(--card-bg)', color: '#22c55e', border: 'none', fontSize: '0.9rem', padding: '13px 28px', position: 'relative', zIndex: 1 }}>
              Get Free Consultation <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
