import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiArrowRight } from 'react-icons/fi';
import { getService } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getService(slug)
      .then(r => { setService(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', paddingTop: '100px'
      }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingTop: '140px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😕</div>
        <h2 style={{ marginBottom: '8px', fontFamily: 'Red Hat Display' }}>Service Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>The service you're looking for doesn't exist.</p>
        <Link to="/services" className="btn btn-secondary">View All Services</Link>
      </div>
    );
  }

  return (
    <>
      <section style={{ padding: '80px 0 32px', background: 'var(--bg-primary)' }}>
        <div className="container">
          <Link to="/services" style={{
            color: '#c9a83c', display: 'inline-flex', alignItems: 'center',
            gap: '8px', marginBottom: '24px', fontWeight: 600,
            padding: '8px 16px', borderRadius: '50px',
            background: 'rgba(224,192,96,0.1)', width: 'fit-content'
          }}>
            <FiArrowLeft /> Back to Services
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '16px' }}>{service.icon}</div>
              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px',
                fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e'
              }}>{service.title}</h1>
              <p style={{
                color: '#4a5568', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px'
              }}>{service.fullDescription || service.shortDescription}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">
                  Get Started <FiArrowRight />
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  All Services
                </Link>
              </div>
            </div>

            <div>
              {service.features && service.features.length > 0 && (
                <div className="card">
                  <h3 style={{ marginBottom: '20px', fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>
                    What's Included
                  </h3>
                  {service.features.map((f, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      marginBottom: '14px', paddingBottom: '14px',
                      borderBottom: i < service.features.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
                    }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'rgba(224,192,96,0.15)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <FiCheck size={14} style={{ color: '#c9a83c' }} />
                      </div>
                      <span style={{ color: '#334155' }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', background: '#fff' }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-primary)', borderRadius: '20px', padding: 'clamp(24px, 4vw, 40px)',
            textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '12px',
              fontFamily: 'Red Hat Display', color: '#1a1a2e'
            }}>
              Interested in {service.title}?
            </h2>
            <p style={{ color: '#4a5568', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              Let's discuss your project and how we can help you achieve your goals.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
