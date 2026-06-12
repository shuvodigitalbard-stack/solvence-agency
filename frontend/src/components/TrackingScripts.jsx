import { useEffect } from 'react';
import TRACKING_CONFIG from '../config/tracking';

export default function TrackingScripts() {
  useEffect(() => {
    // ========== GOOGLE TAG MANAGER ==========
    if (TRACKING_CONFIG.gtm.enabled && TRACKING_CONFIG.gtm.id && !TRACKING_CONFIG.gtm.id.includes('XXXXX')) {
      // GTM DataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

      // GTM Script
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${TRACKING_CONFIG.gtm.id}`;
      document.head.appendChild(gtmScript);

      console.log('[Tracking] GTM initialized:', TRACKING_CONFIG.gtm.id);
    }

    // ========== GOOGLE ANALYTICS 4 ==========
    if (TRACKING_CONFIG.ga4.enabled && TRACKING_CONFIG.ga4.id && !TRACKING_CONFIG.ga4.id.includes('XXXXX')) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.ga4.id}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', TRACKING_CONFIG.ga4.id, {
        page_title: document.title,
        page_path: window.location.pathname,
      });

      console.log('[Tracking] GA4 initialized:', TRACKING_CONFIG.ga4.id);
    }

    // ========== MICROSOFT CLARITY ==========
    if (TRACKING_CONFIG.clarity.enabled && TRACKING_CONFIG.clarity.id && !TRACKING_CONFIG.clarity.id.includes('XXXXX')) {
      const clarityScript = document.createElement('script');
      clarityScript.type = 'text/javascript';
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${TRACKING_CONFIG.clarity.id}");
      `;
      document.head.appendChild(clarityScript);

      console.log('[Tracking] MS Clarity initialized:', TRACKING_CONFIG.clarity.id);
    }
  }, []);

  // ========== GTM NOSCRIPT (injected into body via JSX) ==========
  if (TRACKING_CONFIG.gtm.enabled && TRACKING_CONFIG.gtm.id && !TRACKING_CONFIG.gtm.id.includes('XXXXX')) {
    return (
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${TRACKING_CONFIG.gtm.id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    );
  }

  return null;
}

// Helper function to push events to dataLayer (for custom tracking)
export function trackEvent(eventName, eventData = {}) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
  // Also push to GA4 gtag if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventData);
  }
}

// Helper function to track page views (for SPA navigation)
export function trackPageView(pagePath, pageTitle) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('config', TRACKING_CONFIG.ga4.id, {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
}
