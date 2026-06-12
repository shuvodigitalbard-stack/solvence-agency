import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi';
import logoUrl from '../assets/logo.png';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--card-border)', padding: '60px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <img src={logoUrl} alt="Solvence Tech" style={{ height: '48px', width: 'auto' }} />
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Empowering businesses with cutting-edge technology solutions. From web development to digital marketing.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <a href="https://github.com/StarsWarrior" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/wali-ullah-shuvo" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                <FiLinkedin />
              </a>
              <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-light)', fontFamily: 'Red Hat Display' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Web Development</Link>
              <Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mobile Apps</Link>
              <Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Google Ads</Link>
              <Link to="/services" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>SEO Marketing</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-light)', fontFamily: 'Red Hat Display' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>About Us</Link>
              <Link to="/portfolio" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Portfolio</Link>
              <Link to="/pricing" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pricing</Link>
              <Link to="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-light)', fontFamily: 'Red Hat Display' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMail /> info@solvence.com</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiPhone /> +880 1303-118600</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--card-border)', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Solvence Tech Agency. All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none', color: 'var(--text-muted)', cursor: 'pointer',
              fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px',
              border: '1px solid var(--card-border)', borderRadius: '50px',
              padding: '6px 14px', transition: 'var(--transition)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1);'; }}
          >
            Back to top <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
