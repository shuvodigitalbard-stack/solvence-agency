import React, { useState, useEffect } from 'react';
import { FiSave, FiCheck, FiSettings, FiCode, FiEye } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminTracking() {
  const { token } = useAuth();
  const [settings, setSettings] = useState({
    gtm_id: '',
    ga4_id: '',
    clarity_id: '',
    gtm_enabled: true,
    ga4_enabled: true,
    clarity_enabled: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('gtm');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings/tracking');
      if (res.ok) {
        const data = await res.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Failed to fetch tracking settings:', err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = [
        fetch('/api/settings/gtm_id', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value: settings.gtm_id, group: 'tracking' }),
        }),
        fetch('/api/settings/ga4_id', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value: settings.ga4_id, group: 'tracking' }),
        }),
        fetch('/api/settings/clarity_id', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value: settings.clarity_id, group: 'tracking' }),
        }),
        fetch('/api/settings/gtm_enabled', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value: settings.gtm_enabled, group: 'tracking' }),
        }),
        fetch('/api/settings/ga4_enabled', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value: settings.ga4_enabled, group: 'tracking' }),
        }),
        fetch('/api/settings/clarity_enabled', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ value: settings.clarity_enabled, group: 'tracking' }),
        }),
      ];
      await Promise.all(updates);
      setSaved(true);
      toast.success('Tracking settings saved!');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      toast.error('Failed to save settings');
    }
    setSaving(false);
  };

  const tabs = [
    { key: 'gtm', label: 'Google Tag Manager', icon: <FiCode />, color: '#20a0c0' },
    { key: 'ga4', label: 'Google Analytics 4', icon: <FiEye />, color: '#e0c060' },
    { key: 'clarity', label: 'Microsoft Clarity', icon: <FiSettings />, color: '#40a040' },
  ];

  const getPlaceholder = (tab) => {
    if (tab === 'gtm') return 'GTM-XXXXXXX (e.g., GTM-ABC123D)';
    if (tab === 'ga4') return 'G-XXXXXXXXXX (e.g., G-ABC123DEF4)';
    return 'XXXXXXXXXX (10 character project ID)';
  };

  const getDocsLink = (tab) => {
    if (tab === 'gtm') return 'https://support.google.com/tagmanager/answer/6103696';
    if (tab === 'ga4') return 'https://support.google.com/analytics/answer/9304153';
    return 'https://docs.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup';
  };

  const getIdValue = (tab) => {
    if (tab === 'gtm') return settings.gtm_id;
    if (tab === 'ga4') return settings.ga4_id;
    return settings.clarity_id;
  };

  const setIdValue = (tab, val) => {
    if (tab === 'gtm') setSettings(prev => ({ ...prev, gtm_id: val }));
    if (tab === 'ga4') setSettings(prev => ({ ...prev, ga4_id: val }));
    if (tab === 'clarity') setSettings(prev => ({ ...prev, clarity_id: val }));
  };

  const isEnabled = (tab) => {
    if (tab === 'gtm') return settings.gtm_enabled;
    if (tab === 'ga4') return settings.ga4_enabled;
    return settings.clarity_enabled;
  };

  const setEnabled = (tab, val) => {
    if (tab === 'gtm') setSettings(prev => ({ ...prev, gtm_enabled: val }));
    if (tab === 'ga4') setSettings(prev => ({ ...prev, ga4_enabled: val }));
    if (tab === 'clarity') setSettings(prev => ({ ...prev, clarity_enabled: val }));
  };

  const isValidId = (tab) => {
    const val = getIdValue(tab);
    if (!val) return false;
    if (tab === 'gtm') return val.startsWith('GTM-') && val.length > 4;
    if (tab === 'ga4') return val.startsWith('G-') && val.length > 2;
    return val.length >= 8;
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'Red Hat Display', fontWeight: 900, color: 'var(--text-primary)' }}>
            Tracking & Analytics
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Configure GTM, Google Analytics 4, and Microsoft Clarity tracking codes
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
          style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {saved ? <><FiCheck /> Saved!</> : saving ? 'Saving...' : <><FiSave /> Save All</>}
        </button>
      </div>

      {/* Info Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(224,192,96,0.08), rgba(32,160,192,0.08))',
        border: '1px solid rgba(224,192,96,0.2)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
      }}>
        <FiSettings style={{ color: '#c9a83c', fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <strong>How it works:</strong> Enter your tracking IDs below. The codes will be automatically injected into your website's header and body. 
            You can also set environment variables (<code style={{ background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>VITE_GTM_ID</code>, <code style={{ background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>VITE_GA4_ID</code>, <code style={{ background: 'var(--bg-tertiary)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>VITE_CLARITY_ID</code>) for production builds.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '12px' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === tab.key ? tab.color + '15' : 'transparent',
              color: activeTab === tab.key ? tab.color : '#64748b',
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabs.map(tab => (
        activeTab === tab.key && (
          <div key={tab.key} className="card" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: tab.color + '15', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: tab.color, fontSize: '1.2rem',
                }}>
                  {tab.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Red Hat Display', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{tab.label}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {tab.key === 'gtm' && 'Manages all tracking tags from one place'}
                    {tab.key === 'ga4' && 'Tracks website traffic and user behavior'}
                    {tab.key === 'clarity' && 'Heatmaps, session recordings & user insights'}
                  </p>
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Enabled</span>
                <div
                  onClick={() => setEnabled(tab.key, !isEnabled(tab.key))}
                  style={{
                    width: '44px', height: '24px', borderRadius: '12px',
                    background: isEnabled(tab.key) ? tab.color : '#cbd5e1',
                    position: 'relative', transition: 'background 0.3s',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'var(--card-bg)', position: 'absolute', top: '2px',
                    left: isEnabled(tab.key) ? '22px' : '2px',
                    transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }} />
                </div>
              </label>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                {tab.key === 'gtm' && 'Container ID'}
                {tab.key === 'ga4' && 'Measurement ID'}
                {tab.key === 'clarity' && 'Project ID'}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={getIdValue(tab.key)}
                  onChange={e => setIdValue(tab.key, e.target.value)}
                  placeholder={getPlaceholder(tab.key)}
                  style={{
                    paddingLeft: '42px',
                    borderColor: getIdValue(tab.key) ? (isValidId(tab.key) ? '#40a040' : '#ef4444') : undefined,
                  }}
                />
                <FiCode style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--text-muted)',
                }} />
                {getIdValue(tab.key) && (
                  <div style={{
                    position: 'absolute', right: '14px', top: '50%',
                    transform: 'translateY(-50%)',
                    color: isValidId(tab.key) ? '#40a040' : '#ef4444',
                  }}>
                    {isValidId(tab.key) ? <FiCheck /> : '⚠'}
                  </div>
                )}
              </div>
              {getIdValue(tab.key) && !isValidId(tab.key) && (
                <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                  Invalid format. {tab.key === 'gtm' && 'Should start with GTM-'}
                  {tab.key === 'ga4' && 'Should start with G-'}
                  {tab.key === 'clarity' && 'Should be at least 8 characters'}
                </span>
              )}
            </div>

            {/* Code Preview */}
            <div style={{
              background: '#1a1a2e', borderRadius: '10px', padding: '16px',
              fontFamily: 'monospace', fontSize: '0.8rem', color: '#e2e8f0',
              overflow: 'auto', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: '8px', right: '8px',
                background: 'rgba(255,255,255,0.1)', padding: '2px 8px',
                borderRadius: '4px', fontSize: '0.7rem', color: 'var(--text-muted)',
              }}>
                Code Preview
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {tab.key === 'gtm' && `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${getIdValue(tab.key) || 'GTM-XXXXXXX'}');</script>`}

                {tab.key === 'ga4' && `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${getIdValue(tab.key) || 'G-XXXXXXXXXX'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${getIdValue(tab.key) || 'G-XXXXXXXXXX'}');
</script>`}

                {tab.key === 'clarity' && `<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${getIdValue(tab.key) || 'XXXXXXXXXX'}");
</script>`}
              </pre>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href={getDocsLink(tab.key)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: tab.color, fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                📖 Setup Documentation →
              </a>
              {getIdValue(tab.key) && isValidId(tab.key) && (
                <span style={{ color: '#40a040', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiCheck /> Ready to track
                </span>
              )}
            </div>
          </div>
        )
      ))}

      {/* Quick Actions */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(224,192,96,0.05), rgba(32,160,192,0.05))' }}>
        <h3 style={{ fontFamily: 'Red Hat Display', color: 'var(--text-primary)', marginBottom: '12px', fontSize: '1rem' }}>
          Quick Setup Guide
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { step: '1', title: 'Create Accounts', desc: 'Sign up for GA4, GTM, and Clarity' },
            { step: '2', title: 'Get IDs', desc: 'Copy your tracking/measurement IDs' },
            { step: '3', title: 'Paste Here', desc: 'Enter IDs in the fields above' },
            { step: '4', title: 'Save & Verify', desc: 'Save and check real-time data' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'var(--gradient)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
              }}>{item.step}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{item.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
