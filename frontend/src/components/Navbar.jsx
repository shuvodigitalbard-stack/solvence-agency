import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(15,23,42,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Space Grotesk' }}>
          <span className="gradient-text">Solvence</span>
          <span style={{ color: '#94a3b8', fontWeight: 400 }}> Tech</span>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              color: location.pathname === l.to ? '#818cf8' : '#94a3b8',
              fontWeight: 500, fontSize: '0.95rem'
            }}>{l.label}</Link>
          ))}
          <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', color: '#fff', fontSize: '1.5rem', display: 'none' }} className="mobile-toggle">
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.98)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '32px', zIndex: 999
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{ fontSize: '1.5rem', fontWeight: 600 }}>{l.label}</Link>
          ))}
          <Link to="/contact" className="btn btn-primary">Get Started</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
