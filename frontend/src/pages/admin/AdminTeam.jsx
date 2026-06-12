import React, { useState, useEffect } from 'react';
import { getAllTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', bio: '', email: '', linkedin: '', github: '', skills: '', isActive: true });
  useEffect(() => { load(); }, []);
  const load = () => getAllTeam().then(r => setMembers(r.data)).catch(() => {});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) { await updateTeamMember(editing._id, data); toast.success('Updated'); }
      else { await createTeamMember(data); toast.success('Created'); }
      setEditing(null); setForm({ name: '', role: '', bio: '', email: '', linkedin: '', github: '', skills: '', isActive: true }); load();
    } catch { toast.error('Error'); }
  };
  const handleEdit = (m) => { setEditing(m); setForm({ ...m, skills: m.skills?.join(', ') || '' }); };
  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await deleteTeamMember(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px', fontFamily: 'Red Hat Display', fontWeight: 900, color: '#1a1a2e' }}>Team Members</h1>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Red Hat Display' }}>{editing ? 'Edit Member' : 'Add Team Member'}</h3>
        <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Role *</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} required /></div>
        </div>
        <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={2} /></div>
        <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>LinkedIn</label><input value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} /></div>
        </div>
        <div className="grid grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>GitHub</label><input value={form.github} onChange={e => setForm({...form, github: e.target.value})} /></div>
          <div><label style={{ display: 'block', marginBottom: '4px', color: '#4a5568', fontSize: '0.85rem' }}>Skills (comma separated)</label><input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="React, Node.js" /></div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', role: '', bio: '', email: '', linkedin: '', github: '', skills: '', isActive: true }); }}>Cancel</button>}
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {members.map(m => (
          <div key={m._id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
              <div><div style={{ fontWeight: 600, color: '#1a1a2e' }}>{m.name}</div><div style={{ color: '#64748b', fontSize: '0.8rem' }}>{m.role} • {m.isActive ? 'Active' : 'Inactive'}</div></div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(m)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Edit</button>
              <button onClick={() => handleDelete(m._id)} className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
