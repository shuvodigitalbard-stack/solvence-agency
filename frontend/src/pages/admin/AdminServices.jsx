import React, { useState, useEffect } from 'react';
import { getAllServices, createService, updateService, deleteService } from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', shortDescription: '', fullDescription: '', icon: '🚀', category: 'web', features: '', priceType: 'custom', isActive: true });

  useEffect(() => { load(); }, []);
  const load = () => getAllServices().then(r => setServices(r.data)).catch(() => {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, features: form.features.split(',').map(f => f.trim()).filter(Boolean) };
    try {
      if (editing) { await updateService(editing._id, data); toast.success('Service updated'); }
      else { await createService(data); toast.success('Service created'); }
      setEditing(null);
      setForm({ title: '', slug: '', shortDescription: '', fullDescription: '', icon: '🚀', category: 'web', features: '', priceType: 'custom', isActive: true });
      load();
    } catch { toast.error('Error saving service'); }
  };

  const handleEdit = (s) => { setEditing(s); setForm({ ...s, features: s.features?.join(', ') || '' }); };
  const handleDelete = async (id) => { if (!confirm('Delete this service?')) return; try { await deleteService(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px', fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e' }}>Services</h1>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Red Hat Display' }}>{editing ? 'Edit Service' : 'Add New Service'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required /></div>
        </div>
        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Short Description</label><input value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} required /></div>
        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Full Description</label><textarea value={form.fullDescription} onChange={e => setForm({...form, fullDescription: e.target.value})} rows={3} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Icon (emoji)</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="web">Web</option><option value="mobile">Mobile</option><option value="marketing">Marketing</option><option value="design">Design</option><option value="consulting">Consulting</option><option value="other">Other</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Features (comma separated)</label><input value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="React, Node.js, MongoDB" /></div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ title: '', slug: '', shortDescription: '', fullDescription: '', icon: '🚀', category: 'web', features: '', priceType: 'custom', isActive: true }); }}>Cancel</button>}
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {services.map(s => (
          <div key={s._id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
              <div><div style={{ fontWeight: 600, color: '#1a1a2e' }}>{s.title}</div><div style={{ color: '#64748b', fontSize: '0.8rem' }}>{s.category} • {s.isActive ? 'Active' : 'Inactive'}</div></div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(s)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Edit</button>
              <button onClick={() => handleDelete(s._id)} className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
