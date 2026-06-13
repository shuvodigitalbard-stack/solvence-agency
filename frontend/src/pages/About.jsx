import React, { useState, useEffect } from 'react';
import { FiCheck, FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import { getTeam } from '../services/api';

export default function About() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam()
      .then(r => { setTeam(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const values = [
    { icon: <FiTarget />, title: 'Mission', desc: 'Empowering businesses with innovative technology solutions that drive real growth.' },
    { icon: <FiEye />, title: 'Vision', desc: 'To be the leading technology partner for businesses in Bangladesh and beyond.' },
    { icon: <FiHeart />, title: 'Values', desc: 'Integrity, innovation, and client-first approach in everything we do.' },
  ];

  const highlights = [
    { v: '50+', l: 'Clients' },
    { v: '100+', l: 'Projects' },
    { v: '15+', l: 'Team Members' },
    { v: '99%', l: 'Satisfaction' }
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
            About <span className="gradient-text">Us</span>
          </h1>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'
          }}>
            We're a team of passionate technologists dedicated to helping businesses succeed.
          </p>
        </div>
      </section>

      <section style={{ padding: '32px 0 48px', background: 'var(--card-bg)' }}>
        <div className="container">
          {/* Story + Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2rem)', marginBottom: '20px',
                fontFamily: 'Red Hat Display', color: 'var(--text-primary)'
              }}>Our Story</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                Solvence Tech Agency was founded with a simple mission: to provide businesses with the technology solutions they need to thrive in the digital age.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                From web development to digital marketing, we offer comprehensive services that cover every aspect of your digital presence.
              </p>
              {['Client-first approach', 'Transparent pricing', 'Agile methodology', 'Continuous support'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <FiCheck style={{ color: '#6b9220', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--bg-primary)', borderRadius: '20px', padding: 'clamp(24px, 4vw, 40px)',
              textAlign: 'center', border: '1px solid var(--card-border)'
            }}>
              <div style={{
                fontSize: '3rem', fontWeight: 900, fontFamily: 'Red Hat Display',
                background: 'var(--gradient-text)', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>3+</div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Years of Experience</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {highlights.map((s, i) => (
                  <div key={i} style={{
                    background: 'rgba(224,192,96,0.08)', borderRadius: '12px', padding: '16px'
                  }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{s.v}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission / Vision / Values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'var(--gradient)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.3rem', color: '#fff'
                }}>{v.icon}</div>
                <h3 style={{ marginBottom: '12px', fontFamily: 'Red Hat Display' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          {!loading && team.length > 0 && (
            <>
              <div className="section-header">
                <h2>Our <span className="gradient-text">Team</span></h2>
                <p>The talented people behind Solvence</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                {team.map(m => (
                  <div key={m._id} className="card" style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
                      background: 'var(--gradient)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#fff'
                    }}>
                      {m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontFamily: 'Red Hat Display' }}>{m.name}</h3>
                    <p style={{ color: '#6b9220', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 600 }}>{m.role}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{m.bio}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
