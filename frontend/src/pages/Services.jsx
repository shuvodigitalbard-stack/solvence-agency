import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { getServices } from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getServices(filter === 'all' ? '' : filter)
      .then(r => { setServices(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filter]);

  const categories = [
    { key: 'all', label: 'All Services' },
    { key: 'web', label: 'Web Dev' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'design', label: 'Design' },
    { key: 'consulting', label: 'Consulting' }
  ];

  return (
    <>
      {/* Hero */}
      <section style={{
        padding: '80px 0 32px', textAlign: 'center', background: 'var(--bg-primary)'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px',
            fontFamily: 'Red Hat Display', fontWeight: 900, color: 'var(--text-primary)'
          }}>
            Our <span className="gradient-text">Services</span>
          </h1>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 28px'
          }}>
            Comprehensive technology solutions to help your business grow
          </p>

          {/* Filter buttons */}
          <div style={{
            display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap',
            maxWidth: '700px', margin: '0 auto'
          }}>
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className="btn"
                style={{
                  padding: '10px 24px', fontSize: '0.9rem', borderRadius: 'var(--radius-full)',
                  background: filter === c.key ? 'var(--gradient)' : '#fff',
                  color: filter === c.key ? '#fff' : '#4a5568',
                  border: filter === c.key ? 'none' : '1px solid rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '32px 0 48px', background: 'var(--card-bg)' }}>
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <div className="spinner" />
            </div>
          ) : services.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No services found</h3>
              <p>Try selecting a different category</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {services.map((s, i) => (
                <Link key={s._id} to={`/services/${s.slug}`}
                  className="card animate-fade-in-up"
                  style={{ opacity: 0, animationDelay: `${i * 0.08}s`, display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontFamily: 'Red Hat Display' }}>{s.title}</h3>
                  <p style={{
                    color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px',
                    lineHeight: 1.7, flex: 1
                  }}>{s.shortDescription}</p>

                  {s.features && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {s.features.slice(0, 3).map((f, j) => (
                        <span key={j} className="tag" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>{f}</span>
                      ))}
                      {s.features.length > 3 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '4px 0' }}>
                          +{s.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <span style={{
                    color: '#c9a83c', fontSize: '0.85rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto'
                  }}>
                    Learn more <FiArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
