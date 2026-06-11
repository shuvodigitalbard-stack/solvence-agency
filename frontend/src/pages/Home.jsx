import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import { getServices } from '../services/api';

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(r => setServices(r.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 0 80px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px', borderRadius: '50px',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              marginBottom: '32px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 500 }}>Trusted by 50+ Businesses</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
              lineHeight: 1.1, marginBottom: '24px', fontFamily: 'Space Grotesk'
            }}>
              We Build <span className="gradient-text">Digital Solutions</span><br />That Drive Growth
            </h1>

            <p style={{
              fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px',
              margin: '0 auto 40px', lineHeight: 1.8
            }}>
              From custom web applications to data-driven marketing campaigns, we deliver technology solutions that help your business scale.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
                Start a Project <FiArrowRight />
              </Link>
              <Link to="/services" className="btn btn-secondary" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>
                Our Services
              </Link>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
              marginTop: '80px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto'
            }}>
              {[
                { icon: <FiUsers />, value: '50+', label: 'Happy Clients' },
                { icon: <FiAward />, value: '100+', label: 'Projects Done' },
                { icon: <FiTrendingUp />, value: '98%', label: 'Client Retention' }
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', color: '#818cf8', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Space Grotesk' }}>{s.value}</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="section-header">
            <h2>What We <span className="gradient-text">Do Best</span></h2>
            <p>Comprehensive technology solutions tailored to your business needs</p>
          </div>
          <div className="grid grid-3">
            {services.slice(0, 6).map(s => (
              <Link key={s._id} to={`/services/${s.slug}`} className="card">
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.7 }}>
                  {s.shortDescription}
                </p>
                <span style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <FiArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="btn btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '24px' }}>
                Why Choose <span className="gradient-text">Solvence?</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                We combine technical expertise with business acumen to deliver solutions that don't just work — they drive real results.
              </p>
              {[
                'Full-stack development expertise',
                'Data-driven marketing strategies',
                'Transparent communication & reporting',
                'Agile development methodology',
                'Post-launch support & maintenance',
                'Competitive pricing & flexible plans'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(99,102,241,0.2)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <FiCheck size={14} style={{ color: '#818cf8' }} />
                  </div>
                  <span style={{ color: '#cbd5e1' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{
              background: 'var(--dark-light)', borderRadius: '20px', padding: '40px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'Space Grotesk', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3+</div>
                <div style={{ color: '#94a3b8' }}>Years of Experience</div>
              </div>
              <div className="grid grid-2" style={{ gap: '20px' }}>
                {[
                  { value: '50+', label: 'Clients Served' },
                  { value: '100+', label: 'Projects Delivered' },
                  { value: '15+', label: 'Team Members' },
                  { value: '99%', label: 'Client Satisfaction' }
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(99,102,241,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            background: 'var(--gradient)', borderRadius: '24px', padding: '60px 40px',
            textAlign: 'center', position: 'relative', overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px', margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
              Let's discuss how we can help transform your business with technology.
            </p>
            <Link to="/contact" className="btn" style={{
              background: '#fff', color: '#6366f1', border: 'none',
              fontSize: '1.05rem', padding: '16px 36px', position: 'relative', zIndex: 1
            }}>
              Get Free Consultation <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
