import React, { useState, useEffect } from 'react';
import { FiUsers, FiBriefcase, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { getMessageStats } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, new: 0, replied: 0 });
  useEffect(() => { getMessageStats().then(r => setStats(r.data)).catch(() => {}); }, []);

  const cards = [
    { icon: <FiMessageSquare />, label: 'Total Messages', value: stats.total, color: '#8db53a' },
    { icon: <FiTrendingUp />, label: 'New Messages', value: stats.new, color: '#e8c547' },
    { icon: <FiUsers />, label: 'Replied', value: stats.replied, color: '#2d8a4e' },
    { icon: <FiBriefcase />, label: 'Services', value: 6, color: '#3b82f6' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px', fontFamily: 'Red Hat Display', fontWeight: 900, color: 'var(--text-primary)' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {cards.map((c, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: c.color }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Red Hat Display', color: 'var(--text-primary)' }}>{c.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{ marginBottom: '16px', fontFamily: 'Red Hat Display' }}>Welcome to Solvence Admin</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Use the sidebar to manage your services, clients, team members, and messages. The contact form submissions from your website will appear in the Messages section.</p>
      </div>
    </div>
  );
}
