import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getServices } from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getServices(filter === 'all' ? '' : filter).then(r => setServices(r.data)).catch(() => {});
  }, [filter]);

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'web', label: 'Web' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'design', label: 'Design' },
    { key: 'consulting', label: 'Consulting' }
  ];

  return (
    <>
      <section style={{ padding: '140px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px', fontFamily: 'Space Grotesk' }}>
            Our <span className="gradient-text">Services</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px' }}>
            Comprehensive technology solutions to help your business grow
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c.key} onClick={() => setFilter(c.key)} className="btn" style={{
                padding: '10px 24px', fontSize: '0.9rem',
                background: filter === c.key ? 'var(--gradient)' : 'var(--dark-light)',
                color: '#fff', border: filter === c.key ? 'none' : '1px solid rgba(255,255,255,0.1)'
              }}>{c.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {services.map(s => (
              <Link key={s._id} to={`/services/${s.slug}`} className="card">
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.7 }}>{s.shortDescription}</p>
                {s.features && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {s.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="tag" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>{f}</span>
                    ))}
                  </div>
                )}
                <span style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <FiArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
