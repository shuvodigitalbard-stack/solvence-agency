import React, { useState, useEffect } from 'react';
import { getMessages, updateMessage, deleteMessage } from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => { load(); }, [filter]);
  const load = () => getMessages(filter).then(r => setMessages(r.data)).catch(() => {});
  const handleStatus = async (id, status) => { try { await updateMessage(id, { status }); toast.success('Updated'); load(); } catch { toast.error('Error'); } };
  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { await deleteMessage(id); toast.success('Deleted'); load(); } catch { toast.error('Error'); } };
  const sc = { new: '#20a0c0', read: '#f59e0b', replied: '#40a040', archived: '#64748b' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'Red Hat Display', fontWeight: 900, color: 'var(--text-primary)' }}>Messages</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['', 'new', 'read', 'replied'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: 'var(--radius-full)', background: filter === s ? 'var(--gradient)' : '#fff', color: filter === s ? '#fff' : '#4a5568', border: filter === s ? 'none' : '1px solid rgba(0,0,0,0.1)' }}>{s || 'All'}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map(m => (
          <div key={m._id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '12px' }}>{m.email}</span></div>
              <span style={{ padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', background: sc[m.status] + '15', color: sc[m.status], fontWeight: 600 }}>{m.status}</span>
            </div>
            {m.subject && <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Subject: {m.subject}</div>}
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>{m.message}</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{new Date(m.createdAt).toLocaleString()}</span>
              <div style={{ flex: 1 }} />
              {m.status === 'new' && <button onClick={() => handleStatus(m._id, 'read')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Mark Read</button>}
              {m.status === 'read' && <button onClick={() => handleStatus(m._id, 'replied')} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Mark Replied</button>}
              <button onClick={() => handleDelete(m._id)} className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No messages yet</div>}
      </div>
    </div>
  );
}
