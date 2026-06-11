import React, { useState } from 'react';
import { FiSend, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { sendMessage } from '../services/api';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', service: '', budget: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    try {
      await sendMessage(form);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '', service: '', budget: '' });
    } catch {
      toast.error('Failed to send. Please try again.');
    }
    setSending(false);
  };

  return (
    <>
      <section style={{ padding: '140px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px', fontFamily: 'Space Grotesk' }}>
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Ready to start your project? Let's discuss how we can help.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '40px' }}>
            <div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" required />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid grid-2" style={{ gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>Phone</label>
                    <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+880..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>Service</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
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
                  <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>Subject</label>
                  <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Project inquiry" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your project..." rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={sending} style={{ justifyContent: 'center', padding: '16px' }}>
                  {sending ? 'Sending...' : <><FiSend /> Send Message</>}
                </button>
              </form>
            </div>
            <div>
              <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '20px' }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiMail style={{ color: '#818cf8' }} /></div>
                    <div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Email</div><div>info@solvence.com</div></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiPhone style={{ color: '#818cf8' }} /></div>
                    <div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Phone</div><div>+880 1303-118600</div></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiMapPin style={{ color: '#818cf8' }} /></div>
                    <div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Location</div><div>Dhaka, Bangladesh</div></div>
                  </div>
                </div>
              </div>
              <div className="card">
                <h3 style={{ marginBottom: '12px' }}>Working Hours</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Saturday: 10:00 AM - 4:00 PM</p>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
