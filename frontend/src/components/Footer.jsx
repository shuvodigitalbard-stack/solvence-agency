import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0f1a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '60px 0 30px' }}>
      <div className="container">
        <div className="grid grid-4" style={{ marginBottom: '40px' }}>
          <div>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Space Grotesk', display: 'block', marginBottom: '16px' }}>
              <span className="gradient-text">Solvence</span>
              <span style={{ color: '#94a3b8', fontWeight: 400 }}> Tech</span>
            </Link>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Empowering businesses with cutting-edge technology solutions. From web development to digital marketing.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Web Development</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Mobile Apps</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Google Ads</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>SEO Marketing</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ color: '#64748b', fontSize: '0.9rem' }}>About Us</Link>
              <Link to="/services" style={{ color: '#64748b', fontSize: '0.9rem' }}>Services</Link>
              <Link to="/contact" style={{ color: '#64748b', fontSize: '0.9rem' }}>Contact</Link>
              <Link to="/admin/login" style={{ color: '#64748b', fontSize: '0.9rem' }}>Admin</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMail /> info@solvence.com</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiPhone /> +880 1303-118600</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> Dhaka, Bangladesh</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <a href="https://github.com/StarsWarrior" target="_blank" style={{ color: '#64748b', fontSize: '1.2rem' }}><FiGithub /></a>
              <a href="https://linkedin.com/in/wali-ullah-shuvo" target="_blank" style={{ color: '#64748b', fontSize: '1.2rem' }}><FiLinkedin /></a>
              <a href="#" style={{ color: '#64748b', fontSize: '1.2rem' }}><FiTwitter /></a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Solvence Tech Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
