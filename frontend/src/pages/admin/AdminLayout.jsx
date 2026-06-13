import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiBriefcase, FiUsers, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiBarChart2, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logoUrl from '../../assets/logo.png';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { to: '/admin/services', icon: <FiBriefcase />, label: 'Services' },
    { to: '/admin/clients', icon: <FiUsers />, label: 'Clients' },
    { to: '/admin/messages', icon: <FiMessageSquare />, label: 'Messages' },
    { to: '/admin/team', icon: <FiSettings />, label: 'Team' },
    { to: '/admin/tracking', icon: <FiBarChart2 />, label: 'Tracking' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        width: '240px', background: 'var(--bg-dark)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '24px 0', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '0 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={logoUrl} alt="Solvence" style={{ height: '32px', width: 'auto' }} />
        </div>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.to} to={item.to} onClick={() => setSidebarOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
              color: isActive(item.to) ? 'var(--primary)' : 'var(--text-muted)',
              background: isActive(item.to) ? 'rgba(224,192,96,0.1)' : 'transparent',
              borderRight: isActive(item.to) ? '3px solid #8db53a' : '3px solid transparent',
              fontSize: '0.9rem', fontWeight: 500, transition: 'var(--transition)'
            }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        {/* Theme Toggle in Sidebar */}
        <div style={{ padding: '0 20px', marginBottom: '12px' }}>
          <button
            onClick={toggle}
            style={{
              width: '100%', padding: '10px 16px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: dark ? 'rgba(224,192,96,0.1)' : 'rgba(255,255,255,0.05)',
              color: dark ? '#8db53a' : '#94a3b8',
              display: 'flex', alignItems: 'center', gap: '10px',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(224,192,96,0.15)';
              e.currentTarget.style.borderColor = 'rgba(224,192,96,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = dark ? 'rgba(224,192,96,0.1)' : 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div style={{ padding: '0 20px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--gradient)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '0.8rem', color: '#fff', flexShrink: 0
            }}>{user?.name?.charAt(0)}</div>
            <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
              <div style={{
                fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
              }}>{user?.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.role}</div>
            </div>
            <button onClick={handleLogout} style={{
              background: 'none', color: '#64748b', cursor: 'pointer',
              fontSize: '1rem', border: 'none', padding: '4px'
            }}><FiLogOut /></button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main" style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Mobile header */}
        <div className="admin-mobile-header" style={{
          display: 'none', alignItems: 'center', gap: '12px',
          marginBottom: '20px', paddingBottom: '16px',
          borderBottom: '1px solid var(--card-border)'
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none', border: '1px solid var(--card-border)',
              borderRadius: '8px', padding: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', color: 'var(--text-primary)'
            }}
          >
            <FiMenu size={20} />
          </button>
          <span style={{ fontWeight: 700, fontFamily: 'Red Hat Display', color: 'var(--text-primary)' }}>
            Solvence Admin
          </span>
          <button
            onClick={toggle}
            style={{
              marginLeft: 'auto', width: '36px', height: '36px', borderRadius: '50%',
              border: '1px solid var(--card-border)', background: 'var(--card-bg)',
              color: 'var(--text-primary)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', fontSize: '1rem',
            }}
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
