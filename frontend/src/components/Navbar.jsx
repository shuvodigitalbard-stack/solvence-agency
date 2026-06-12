import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import logoUrl from '../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'var(--bg-secondary)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--card-border)' : 'none',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? 'var(--card-shadow)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoUrl} alt="Solvence Tech" style={{ height: '40px', width: 'auto' }} />
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links-desktop" style={{ display: 'none', gap: '32px', alignItems: 'center' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: isActive(l.to) ? 'var(--primary-dark)' : 'var(--text-secondary)',
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

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="desktop-theme-toggle"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid var(--card-border)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'var(--transition)',
                fontSize: '1.1rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'var(--card-border)';
              }}
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Get Started
            </Link>
          </div>

          {/* Mobile Buttons Row */}
          <div className="nav-mobile-buttons" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid var(--card-border)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '1rem',
              }}
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none', color: 'var(--text-primary)', fontSize: '1.6rem',
                display: 'flex', cursor: 'pointer', padding: '4px', border: 'none',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay" style={{ background: 'var(--bg-primary)' }}>
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className={`animate-fade-in-up delay-${i + 1}`}
              style={{
                fontSize: '1.5rem', fontWeight: 600,
                color: isActive(l.to) ? 'var(--primary-dark)' : 'var(--text-primary)',
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
