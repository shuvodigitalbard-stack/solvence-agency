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

  // Services
  const services = [
    ['Web Development', 'web-development', 'Custom websites and web applications built with modern technologies', 'Full-stack web development using React, Node.js, and more', '🌐', '[]', 'fixed', 2500, 'USD', 'web', 1],
    ['Mobile App Development', 'mobile-app', 'Native and cross-platform mobile applications', 'iOS and Android apps using React Native and Flutter', '📱', '[]', 'fixed', 5000, 'USD', 'mobile', 2],
    ['Digital Marketing', 'digital-marketing', 'SEO, SEM, social media marketing and content strategy', 'Comprehensive digital marketing solutions to grow your brand', '📈', '[]', 'hourly', 150, 'USD', 'marketing', 3],
    ['UI/UX Design', 'ui-ux-design', 'Beautiful and intuitive user interface design', 'User-centered design for web and mobile applications', '🎨', '[]', 'fixed', 1500, 'USD', 'design', 4],
    ['IT Consulting', 'it-consulting', 'Strategic technology consulting for your business', 'Expert advice on technology stack, architecture, and digital transformation', '💼', '[]', 'hourly', 200, 'USD', 'consulting', 5],
    ['E-Commerce Solutions', 'ecommerce', 'Complete e-commerce platform development', 'Online stores with payment integration, inventory management, and analytics', '🛒', '[]', 'fixed', 3500, 'USD', 'web', 6],
  ];
  services.forEach(s => {
    run('INSERT INTO services (title, slug, short_description, full_description, icon, features, price_type, price_amount, price_currency, category, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?)', s);
  });

  // Team
  const team = [
    ['Shuvo', 'Founder & CEO', 'Full-stack developer with 5+ years of experience', '', 1],
    ['Rahim', 'Lead Developer', 'Senior backend engineer specializing in scalable systems', '', 2],
    ['Fatima', 'UI/UX Designer', 'Creative designer focused on user experience', '', 3],
    ['Karim', 'Marketing Head', 'Digital marketing expert with proven results', '', 4],
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

module.exports = app;
