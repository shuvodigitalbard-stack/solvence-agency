import React, { useState, useEffect } from 'react';
import { getAllClients, createClient, updateClient, deleteClient } from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', website: '', status: 'active', notes: '', projectValue: 0 });

  useEffect(() => { load(); }, []);
  const load = () => getAllClients().then(r => setClients(r.data)).catch(() => {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateClient(editing._id, form); toast.success('Client updated'); }
      else { await createClient(form); toast.success('Client created'); }
      setEditing(null);
      setForm({ name: '', email: '', phone: '', company: '', website: '', status: 'active', notes: '', projectValue: 0 });
      load();
    } catch { toast.error('Error saving client'); }
  };

  const handleEdit = (c) => { setEditing(c); setForm(c); };
  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await deleteClient(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px', fontFamily: 'Space Grotesk' }}>Clients</h1>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>{editing ? 'Edit Client' : 'Add Client'}</h3>
        <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>
        <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Company</label><input value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
        </div>
        <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Website</label><input value={form.website} onChange={e => setForm({...form, website: e.target.value})} /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="active">Active</option><option value="inactive">Inactive</option><option value="prospect">Prospect</option><option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '4px', color: '#94a3b8', fontSize: '0.85rem' }}>Notes</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={2} /></div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', email: '', phone: '', company: '', website: '', status: 'active', notes: '', projectValue: 0 }); }}>Cancel</button>}
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {clients.map(c => (
          <div key={c._id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{c.company} • {c.status} • ${c.projectValue?.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(c)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Edit</button>
              <button onClick={() => handleDelete(c._id)} className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
