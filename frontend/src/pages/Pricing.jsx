import React from 'react';
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/project',
    description: 'Perfect for small businesses getting started',
    popular: false,
    features: [
      { text: 'Single page website', included: true },
      { text: 'Mobile responsive', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Contact form', included: true },
      { text: '1 week support', included: true },
      { text: 'E-commerce (3 products)', included: false },
      { text: 'Custom animations', included: false },
      { text: 'Admin dashboard', included: false },
    ]
  },
  {
    name: 'Growth',
    price: '$1,499',
    period: '/project',
    description: 'For businesses ready to scale',
    popular: true,
    features: [
      { text: 'Multi-page website (up to 10)', included: true },
      { text: 'Mobile responsive', included: true },
      { text: 'Advanced SEO optimization', included: true },
      { text: 'Contact form + integrations', included: true },
      { text: '4 weeks support', included: true },
      { text: 'E-commerce (50 products)', included: true },
      { text: 'Custom animations', included: true },
      { text: 'Admin dashboard', included: false },
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-scale digital solutions',
    popular: false,
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Mobile + Desktop apps', included: true },
      { text: 'Full SEO + Content strategy', included: true },
      { text: 'CRM & API integrations', included: true },
      { text: '12 months support', included: true },
      { text: 'Full e-commerce platform', included: true },
      { text: 'Premium animations & 3D', included: true },
      { text: 'Full admin dashboard', included: true },
    ]
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '80px 0 32px', textAlign: 'center', background: 'var(--bg-primary)' }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px',
            fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e'
          }}>
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p style={{ color: '#4a5568', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 28px' }}>
            No hidden fees. No surprises. Choose the plan that fits your needs.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#fff', borderRadius: '50px', padding: '6px', border: '1px solid rgba(0,0,0,0.08)' }}>
            <button onClick={() => setAnnual(false)} style={{
              padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: !annual ? 'var(--gradient)' : 'transparent',
              color: !annual ? '#fff' : '#4a5568', fontWeight: 600, fontSize: '0.9rem', transition: 'var(--transition)'
            }}>Per Project</button>
            <button onClick={() => setAnnual(true)} style={{
              padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: annual ? 'var(--gradient)' : 'transparent',
              color: annual ? '#fff' : '#4a5568', fontWeight: 600, fontSize: '0.9rem', transition: 'var(--transition)'
            }}>Monthly <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Save 20%</span></button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '32px 0 60px', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '20px', padding: '32px 28px',
                border: plan.popular ? '2px solid #e0c060' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: plan.popular ? '0 8px 30px rgba(224,192,96,0.15)' : '0 2px 10px rgba(0,0,0,0.04)',
                position: 'relative', transition: 'var(--transition)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gradient)', color: '#fff', padding: '4px 16px',
                    borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px'
                  }}>MOST POPULAR</div>
                )}

                <h3 style={{ fontSize: '1.3rem', marginBottom: '4px', fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>{plan.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>{plan.description}</p>

                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Red Hat Display', color: '#1a1a2e' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{plan.period}</span>
                </div>

                <Link to="/contact" className="btn" style={{
                  display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '24px',
                  padding: '12px', fontSize: '0.95rem',
                  background: plan.popular ? 'var(--gradient)' : 'transparent',
                  color: plan.popular ? '#fff' : '#1a1a2e',
                  border: plan.popular ? 'none' : '2px solid rgba(0,0,0,0.1)',
                  boxShadow: plan.popular ? '0 4px 15px rgba(224,192,96, 0.3)' : 'none'
                }}>
                  Get Started <FiArrowRight />
                </Link>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {f.included ? (
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(64,160,64,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FiCheck size={12} style={{ color: '#40a040' }} />
                        </div>
                      ) : (
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(148,163,184,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FiX size={12} style={{ color: '#94a3b8' }} />
                        </div>
                      )}
                      <span style={{ color: f.included ? '#334155' : '#94a3b8', fontSize: '0.85rem' }}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section style={{ padding: '48px 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{
            background: 'var(--gradient)', borderRadius: '20px', padding: 'clamp(28px, 5vw, 40px)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: '8px', color: '#fff', fontFamily: 'Red Hat Display', fontWeight: 800 }}>
              Not sure which plan fits?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '20px', fontSize: '0.95rem' }}>
              Let's discuss your project and find the perfect solution.
            </p>
            <Link to="/contact" className="btn" style={{ background: '#fff', color: '#c9a83c', border: 'none', padding: '12px 28px' }}>
              Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
