import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { getService } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  useEffect(() => { getService(slug).then(r => setService(r.data)).catch(() => {}); }, [slug]);

  if (!service) return <div style={{ padding: '200px 0', textAlign: 'center', color: '#64748b' }}>Loading...</div>;

  return (
    <>
      <section style={{ padding: '140px 0 60px', background: 'var(--bg-primary)' }}>
        <div className="container">
          <Link to="/services" style={{ color: '#c9a83c', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
            <FiArrowLeft /> Back to Services
          </Link>
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{service.icon}</div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px', fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e' }}>{service.title}</h1>
              <p style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px' }}>{service.fullDescription || service.shortDescription}</p>
              <Link to="/contact" className="btn btn-primary">Get Started</Link>
            </div>
            <div>
              {service.features && (
                <div className="card">
                  <h3 style={{ marginBottom: '20px', fontFamily: 'Red Hat Display' }}>What's Included</h3>
                  {service.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <FiCheck style={{ color: '#c9a83c', flexShrink: 0 }} />
                      <span style={{ color: '#334155' }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
