const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const { initDB } = require('./config/db');

const app = express();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/team', require('./routes/team'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'sqlite', timestamp: new Date().toISOString() });
});

// Debug: check admin password hash (remove after fix)
app.get('/api/debug/admin', (req, res) => {
  try {
    const { getOne } = require('./config/db');
    const user = getOne('SELECT id, email, password FROM users WHERE email = ?', ['admin@solvence.agency']);
    const bcrypt = require('bcryptjs');
    const match = user ? bcrypt.compareSync('admin123', user.password) : false;
    res.json({ exists: !!user, hash: user?.password?.substring(0, 30), match });
  } catch(e) { res.json({ error: e.message }); }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/avatar', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'avatar.html');
    res.sendFile(filePath);
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  seed().then(() => {
    updateFeatures(); // Fix existing data with empty features
    app.listen(PORT, () => {
      console.log(`🚀 Solvence Agency running on port ${PORT}`);
    });
  }).catch(err => { console.error('Seed failed:', err); app.listen(PORT, () => console.log(`🚀 Server running (no seed) on port ${PORT}`)); });
}).catch(err => { console.error('DB init failed:', err); process.exit(1); });

// Seed data
async function seed() {
  const bcrypt = require('bcryptjs');
  const { getOne, run } = require('./config/db');

  const existing = getOne('SELECT id FROM users WHERE email = ?', ['admin@solvence.agency']);
  if (existing) { console.log('Seed data already exists'); return; }

  console.log('Seeding database...');

  // Admin user
  const adminPass = bcrypt.hashSync('admin123', 12);
  run('INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)', ['Admin', 'admin@solvence.agency', adminPass, 'admin']);

  // Services with real features
  const services = [
    ['Web Development', 'web-development', 'Custom websites and web applications built with modern technologies', 'Full-stack web development using React, Node.js, and more. We build responsive, scalable, and secure web applications tailored to your business needs.', '🌐', '["React & Next.js","Node.js & Express","Database Design","API Development","Responsive UI","Performance Optimization"]', 'fixed', 2500, 'USD', 'web', 1],
    ['Mobile App Development', 'mobile-app', 'Native and cross-platform mobile applications', 'iOS and Android apps using React Native and Flutter. From concept to App Store deployment.', '📱', '["React Native","Flutter","iOS Development","Android Development","App Store Deployment","Push Notifications"]', 'fixed', 5000, 'USD', 'mobile', 2],
    ['Digital Marketing', 'digital-marketing', 'SEO, SEM, social media marketing and content strategy', 'Comprehensive digital marketing solutions to grow your brand and reach your target audience.', '📈', '["SEO Optimization","Google Ads","Social Media Marketing","Content Strategy","Email Marketing","Analytics & Reporting"]', 'hourly', 150, 'USD', 'marketing', 3],
    ['UI/UX Design', 'ui-ux-design', 'Beautiful and intuitive user interface design', 'User-centered design for web and mobile applications that delights users and drives conversions.', '🎨', '["User Research","Wireframing","Prototyping","Visual Design","Usability Testing","Design Systems"]', 'fixed', 1500, 'USD', 'design', 4],
    ['IT Consulting', 'it-consulting', 'Strategic technology consulting for your business', 'Expert advice on technology stack, architecture, and digital transformation.', '💼', '["Tech Stack Selection","Architecture Review","Cloud Migration","Security Audit","Performance Review","Digital Strategy"]', 'hourly', 200, 'USD', 'consulting', 5],
    ['E-Commerce Solutions', 'ecommerce', 'Complete e-commerce platform development', 'Online stores with payment integration, inventory management, and analytics.', '🛒', '["Custom Storefront","Payment Gateway","Inventory System","Order Management","Analytics Dashboard","Multi-vendor Support"]', 'fixed', 3500, 'USD', 'web', 6],
  ];
  services.forEach(s => {
    run('INSERT INTO services (title, slug, short_description, full_description, icon, features, price_type, price_amount, price_currency, category, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?)', s);
  });

  // Team
  const team = [
    ['Shuvo', 'Founder & CEO', 'Full-stack developer with 5+ years of experience building scalable web and mobile applications.', '', 1],
    ['Rahim', 'Lead Developer', 'Senior backend engineer specializing in Node.js, cloud architecture, and microservices.', '', 2],
    ['Fatima', 'UI/UX Designer', 'Creative designer focused on user experience and modern design systems for web and mobile.', '', 3],
    ['Karim', 'Marketing Head', 'Digital marketing expert with proven results in SEO, SEM, and social media campaigns.', '', 4],
  ];
  team.forEach(t => {
    run('INSERT INTO team (name, role, bio, avatar, sort_order) VALUES (?,?,?,?,?)', t);
  });

  // Settings
  run('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', ['site_name', 'Solvence Agency']);
  run('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', ['contact_email', 'hello@solvence.agency']);
  run('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', ['phone', '+880 1234-567890']);

  console.log('Seed complete!');
}

// Fix existing services with empty features
function updateFeatures() {
  const { getAll, run } = require('./config/db');
  const defaultFeatures = {
    'web-development': '["React & Next.js","Node.js & Express","Database Design","API Development","Responsive UI","Performance Optimization"]',
    'mobile-app': '["React Native","Flutter","iOS Development","Android Development","App Store Deployment","Push Notifications"]',
    'digital-marketing': '["SEO Optimization","Google Ads","Social Media Marketing","Content Strategy","Email Marketing","Analytics & Reporting"]',
    'ui-ux-design': '["User Research","Wireframing","Prototyping","Visual Design","Usability Testing","Design Systems"]',
    'it-consulting': '["Tech Stack Selection","Architecture Review","Cloud Migration","Security Audit","Performance Review","Digital Strategy"]',
    'ecommerce': '["Custom Storefront","Payment Gateway","Inventory System","Order Management","Analytics Dashboard","Multi-vendor Support"]',
  };
  const services = getAll('SELECT id, slug, features FROM services');
  let updated = 0;
  services.forEach(s => {
    try {
      const parsed = JSON.parse(s.features);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const newFeatures = defaultFeatures[s.slug] || '[]';
        run('UPDATE services SET features = ? WHERE id = ?', [newFeatures, s.id]);
        updated++;
      }
    } catch(e) {
      const newFeatures = defaultFeatures[s.slug] || '[]';
      run('UPDATE services SET features = ? WHERE id = ?', [newFeatures, s.id]);
      updated++;
    }
  });
  if (updated > 0) console.log(`Updated features for ${updated} services`);
}

module.exports = app;
