import React, { useState } from 'react';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'web', label: 'Web Development' },
  { key: 'mobile', label: 'Mobile Apps' },
  { key: 'marketing', label: 'Digital Marketing' },
  { key: 'design', label: 'UI/UX Design' },
];

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'web',
    description: 'Full-stack e-commerce solution with payment gateway, inventory management, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: '#e0c060',
    image: '🛒'
  },
  {
    title: 'Food Delivery App',
    category: 'mobile',
    description: 'Cross-platform mobile app with real-time tracking, push notifications, and in-app payments.',
    tags: ['Flutter', 'Firebase', 'Google Maps'],
    color: '#20a0c0',
    image: '🍔'
  },
  {
    title: 'Google Ads Campaign',
    category: 'marketing',
    description: 'Managed Google Ads campaign that increased client ROI by 340% in 3 months.',
    tags: ['Google Ads', 'Analytics', 'Conversion Tracking'],
    color: '#40a040',
    image: '📈'
  },
  {
    title: 'SaaS Dashboard',
    category: 'web',
    description: 'Analytics dashboard with real-time data visualization, user management, and reporting.',
    tags: ['React', 'D3.js', 'PostgreSQL'],
    color: '#8b5cf6',
    image: '📊'
  },
  {
    title: 'Fitness Tracking App',
    category: 'mobile',
    description: 'Health & fitness app with workout plans, calorie tracking, and social features.',
    tags: ['Flutter', 'HealthKit', 'Node.js'],
    color: '#f59e0b',
    image: '💪'
  },
  {
    title: 'Brand Identity & UI',
    category: 'design',
    description: 'Complete brand identity design including logo, color system, and UI component library.',
    tags: ['Figma', 'Illustrator', 'Design System'],
    color: '#ef4444',
    image: '🎨'
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '80px 0 32px', textAlign: 'center', background: 'var(--bg-primary)' }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px',
            fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e'
          }}>
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p style={{ color: '#4a5568', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 28px' }}>
            Explore our recent projects and see how we've helped businesses grow.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c.key} onClick={() => setFilter(c.key)} style={{
                padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                background: filter === c.key ? 'var(--gradient)' : '#fff',
                color: filter === c.key ? '#fff' : '#4a5568',
                border: filter === c.key ? 'none' : '1px solid rgba(0,0,0,0.08)',
                fontWeight: 600, fontSize: '0.85rem', transition: 'var(--transition)'
              }}>{c.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '32px 0 60px', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {filtered.map((project, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)', transition: 'var(--transition)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Project image area */}
                <div style={{
                  height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
                  fontSize: '4rem'
                }}>
                  {project.image}
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: '50px', fontSize: '0.7rem',
                      fontWeight: 700, background: project.color + '15', color: project.color
                    }}>
                      {categories.find(c => c.key === project.category)?.label}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tags.map((tag, j) => (
                      <span key={j} style={{
                        padding: '3px 10px', borderRadius: '50px', fontSize: '0.7rem',
                        background: 'rgba(0,0,0,0.04)', color: '#64748b', fontWeight: 500
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '0.95rem' }}>
              Have a project in mind? Let's build something amazing together.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              Start Your Project <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
