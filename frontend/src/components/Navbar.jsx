import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logoUrl from '../assets/logo.jpg';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(248, 249, 250, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoUrl} alt="Solvence Tech" style={{ height: '40px', width: 'auto' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Red Hat Display' }}>
              <span className="gradient-text">Solvence</span>
              <span style={{ color: '#64748b', fontWeight: 400 }}> Tech</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: isActive(l.to) ? '#c9a83c' : '#4a5568',
                fontWeight: isActive(l.to) ? 600 : 500,
                fontSize: '0.95rem',
                position: 'relative'
              }}>
                {l.label}
                {isActive(l.to) && (
                  <span style={{
                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                    height: '2px', background: 'var(--gradient)', borderRadius: '2px'
                  }} />
                )}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-toggle"
            style={{
              background: 'none', color: '#1a1a2e', fontSize: '1.5rem',
              display: 'none', cursor: 'pointer', padding: '4px'
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className={`animate-fade-in-up delay-${i + 1}`}
              style={{
                fontSize: '1.5rem', fontWeight: 600,
                color: isActive(l.to) ? '#c9a83c' : '#1a1a2e',
                opacity: 0
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary animate-fade-in-up delay-5"
            style={{ opacity: 0 }}
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}
