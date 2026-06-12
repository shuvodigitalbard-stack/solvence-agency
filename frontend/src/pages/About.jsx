import React, { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { getTeam } from '../services/api';

export default function About() {
  const [team, setTeam] = useState([]);
  useEffect(() => { getTeam().then(r => setTeam(r.data)).catch(() => {}); }, []);

  return (
    <>
      <section style={{ padding: '140px 0 60px', textAlign: 'center', background: 'var(--bg-primary)' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px', fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e' }}>
            About <span className="gradient-text">Us</span>
          </h1>
          <p style={{ color: '#4a5568', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            We're a team of passionate technologists dedicated to helping businesses succeed.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, background: '#fff' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>Our Story</h2>
              <p style={{ color: '#4a5568', lineHeight: 1.8, marginBottom: '16px' }}>
                Solvence Tech Agency was founded with a simple mission: to provide businesses with the technology solutions they need to thrive in the digital age.
              </p>
              <p style={{ color: '#4a5568', lineHeight: 1.8, marginBottom: '24px' }}>
                From web development to digital marketing, we offer comprehensive services that cover every aspect of your digital presence.
              </p>
              {['Client-first approach', 'Transparent pricing', 'Agile methodology', 'Continuous support'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <FiCheck style={{ color: '#c9a83c', flexShrink: 0 }} />
                  <span style={{ color: '#334155' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-primary)', borderRadius: '20px', padding: '40px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Red Hat Display', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3+</div>
              <div style={{ color: '#64748b', marginBottom: '24px' }}>Years of Experience</div>
              <div className="grid grid-2" style={{ gap: '16px' }}>
                {[{ v: '50+', l: 'Clients' }, { v: '100+', l: 'Projects' }, { v: '15+', l: 'Team Members' }, { v: '99%', l: 'Satisfaction' }].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(224,192,96,0.08)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a2e' }}>{s.v}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {team.length > 0 && (
            <>
              <div className="section-header">
                <h2>Our <span className="gradient-text">Team</span></h2>
              </div>
              <div className="grid grid-3">
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
                    <p style={{ color: '#c9a83c', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 600 }}>{m.role}</p>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{m.bio}</p>
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
