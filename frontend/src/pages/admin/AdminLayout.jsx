import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiBriefcase, FiUsers, FiMessageSquare, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { to: '/admin/services', icon: <FiBriefcase />, label: 'Services' },
    { to: '/admin/clients', icon: <FiUsers />, label: 'Clients' },
    { to: '/admin/messages', icon: <FiMessageSquare />, label: 'Messages' },
    { to: '/admin/team', icon: <FiSettings />, label: 'Team' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px', background: 'var(--dark-light)', borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '24px 0', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '0 20px', marginBottom: '32px' }}>
          <Link to="/" style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'Space Grotesk' }}>
            <span className="gradient-text">Solvence</span>
          </Link>
        </div>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
              color: location.pathname === item.to ? '#818cf8' : '#64748b',
              background: location.pathname === item.to ? 'rgba(99,102,241,0.1)' : 'transparent',
              borderRight: location.pathname === item.to ? '3px solid #818cf8' : '3px solid transparent',
              fontSize: '0.9rem', fontWeight: 500
            }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
              {user?.name?.charAt(0)}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{user?.role}</div>
            </div>
            <button onClick={handleLogout} style={{ background: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1rem' }}><FiLogOut /></button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
