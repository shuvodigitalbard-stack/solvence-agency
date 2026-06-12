// Tracking & Analytics Configuration
// ===================================
// Place your IDs below or set via environment variables / admin panel

const TRACKING_CONFIG = {
  // Google Tag Manager
  gtm: {
    enabled: true,
    id: import.meta.env.VITE_GTM_ID || 'GTM-XXXXXXX', // Replace with your GTM ID
  },
  // Google Analytics 4
  ga4: {
    enabled: true,
    id: import.meta.env.VITE_GA4_ID || 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
  },
  // Microsoft Clarity
  clarity: {
    enabled: true,
    id: import.meta.env.VITE_CLARITY_ID || 'XXXXXXXXXX', // Replace with your Clarity Project ID
  },
};

export default TRACKING_CONFIG;
