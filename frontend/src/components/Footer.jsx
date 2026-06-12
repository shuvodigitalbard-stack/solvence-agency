import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: '#1a1a2e', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '60px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Red Hat Display', display: 'block', marginBottom: '16px' }}>
              <span className="gradient-text">Solvence</span>
              <span style={{ color: '#94a3b8', fontWeight: 400 }}> Tech</span>
            </Link>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Empowering businesses with cutting-edge technology solutions. From web development to digital marketing.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <a href="https://github.com/StarsWarrior" target="_blank" rel="noopener noreferrer"
                style={{ color: '#64748b', fontSize: '1.2rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = '#e0c060'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/wali-ullah-shuvo" target="_blank" rel="noopener noreferrer"
                style={{ color: '#64748b', fontSize: '1.2rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = '#e0c060'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                <FiLinkedin />
              </a>
              <a href="#" style={{ color: '#64748b', fontSize: '1.2rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = '#e0c060'}
                onMouseLeave={e => e.target.style.color = '#64748b'}>
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: '#fff', fontFamily: 'Red Hat Display' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Web Development</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Mobile Apps</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Google Ads</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>SEO Marketing</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: '#fff', fontFamily: 'Red Hat Display' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ color: '#64748b', fontSize: '0.9rem' }}>About Us</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Services</Link>
              <Link to="/contact" style={{ color: '#64748b', fontSize: '0.9rem' }}>Contact</Link>
              <Link to="/admin/login" style={{ color: '#64748b', fontSize: '0.9rem' }}>Admin</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: '#fff', fontFamily: 'Red Hat Display' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMail /> info@solvence.com</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiPhone /> +880 1303-118600</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <span style={{ color: '#475569', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Solvence Tech Agency. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none', color: '#64748b', cursor: 'pointer',
              fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px',
              padding: '6px 14px', transition: 'var(--transition)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e0c060'; e.currentTarget.style.borderColor = '#e0c060'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1);'; }}
          >
            Back to top <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
