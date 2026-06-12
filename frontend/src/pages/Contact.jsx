import React, { useState } from 'react';
import { FiSend, FiMapPin, FiPhone, FiMail, FiCheck } from 'react-icons/fi';
import { sendMessage } from '../services/api';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', service: '', budget: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email';
    if (!form.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) { toast.error('Please fix the errors below'); return; }
    setSending(true);
    try {
      await sendMessage(form);
      setSent(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '', service: '', budget: '' });
      setTouched({});
      setTimeout(() => setSent(false), 5000);
    } catch { toast.error('Failed to send. Please try again.'); }
    setSending(false);
  };

  const inputStyle = (field) => ({
    borderColor: touched[field] && errors[field] ? '#ef4444' : undefined,
    boxShadow: touched[field] && errors[field] ? '0 0 0 3px rgba(239,68,68,0.1)' : undefined
  });

  return (
    <>
      {/* Hero */}
      <section style={{
        padding: '80px 0 32px', textAlign: 'center', background: 'var(--bg-primary)'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px',
            fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e'
          }}>
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p style={{
            color: '#4a5568', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto'
          }}>
            Ready to start your project? Let's discuss how we can help.
          </p>
        </div>
      </section>

      <section style={{ padding: '32px 0 48px', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Form */}
            <div>
              {sent && (
                <div style={{
                  background: 'rgba(64,160,64,0.1)', border: '1px solid rgba(64,160,64,0.2)',
                  borderRadius: 'var(--radius)', padding: '16px 20px', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', gap: '10px', color: '#40a040'
                }}>
                  <FiCheck size={20} /> Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontSize: '0.85rem' }}>
                      Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text" value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your name" required
                      style={inputStyle('name')}
                    />
                    {touched.name && errors.name && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontSize: '0.85rem' }}>
                      Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email" value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="your@email.com" required
                      style={inputStyle('email')}
                    />
                    {touched.email && errors.email && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontSize: '0.85rem' }}>Phone</label>
                    <input type="text" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+880..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontSize: '0.85rem' }}>Service</label>
                    <select value={form.service} onChange={e => handleChange('service', e.target.value)}>
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="google-ads">Google Ads</option>
                      <option value="seo">SEO Marketing</option>
                      <option value="design">UI/UX Design</option>
                      <option value="consulting">IT Consulting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontSize: '0.85rem' }}>Subject</label>
                  <input type="text" value={form.subject} onChange={e => handleChange('subject', e.target.value)} placeholder="Project inquiry" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#4a5568', fontSize: '0.85rem' }}>
                    Message <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell us about your project..." rows={5} required
                    style={inputStyle('message')}
                  />
                  {touched.message && errors.message && (
                    <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={sending} style={{ justifyContent: 'center', padding: '16px' }}>
                  {sending ? (
                    <><span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} /> Sending...</>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '20px', fontFamily: 'Red Hat Display' }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: <FiMail />, label: 'Email', value: 'info@solvence.com' },
                    { icon: <FiPhone />, label: 'Phone', value: '+880 1303-118600' },
                    { icon: <FiMapPin />, label: 'Location', value: 'Dhaka, Bangladesh' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: 'rgba(224,192,96,0.1)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        {React.cloneElement(item.icon, { style: { color: '#c9a83c' } })}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</div>
                        <div style={{ color: '#1a1a2e' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px', fontFamily: 'Red Hat Display' }}>Working Hours</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#4a5568' }}>{h.day}</span>
                      <span style={{ color: '#1a1a2e', fontWeight: 500 }}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{
                background: 'var(--gradient)', color: '#fff', border: 'none'
              }}>
                <h3 style={{ marginBottom: '8px', fontFamily: 'Red Hat Display' }}>Quick Response</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  We typically respond within 24 hours. For urgent inquiries, call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
