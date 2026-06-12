import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { trackPageView } from './components/TrackingScripts';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminClients from './pages/admin/AdminClients';
import AdminMessages from './pages/admin/AdminMessages';
import AdminTeam from './pages/admin/AdminTeam';
import AdminLogin from './pages/admin/AdminLogin';
import AdminTracking from './pages/admin/AdminTracking';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    const pageNames = {
      '/': 'Home',
      '/services': 'Services',
      '/about': 'About',
      '/contact': 'Contact',
      '/pricing': 'Pricing',
      '/portfolio': 'Portfolio',
    };
    const pageName = pageNames[location.pathname] || location.pathname;
    trackPageView(location.pathname, pageName);
  }, [location]);
  return null;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="tracking" element={<AdminTracking />} />
      </Route>
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <PageViewTracker />
      {isAdminRoute ? <AdminRoutes /> : <PublicRoutes />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
