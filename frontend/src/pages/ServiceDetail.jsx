import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { getService } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    getService(slug).then(r => setService(r.data)).catch(() => {});
  }, [slug]);

  if (!service) return <div style={{ padding: '200px 0', textAlign: 'center' }}>Loading...</div>;

  return (
    <>
      <section style={{ padding: '140px 0 60px' }}>
        <div className="container">
          <Link to="/services" style={{ color: '#818cf8', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <FiArrowLeft /> Back to Services
          </Link>
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{service.icon}</div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px', fontFamily: 'Space Grotesk' }}>
                {service.title}
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px' }}>
                {service.fullDescription || service.shortDescription}
              </p>
              <Link to="/contact" className="btn btn-primary">Get Started</Link>
            </div>
            <div>
              {service.features && (
                <div className="card">
                  <h3 style={{ marginBottom: '20px' }}>What's Included</h3>
                  {service.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <FiCheck style={{ color: '#10b981', flexShrink: 0 }} />
                      <span>{f}</span>
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
