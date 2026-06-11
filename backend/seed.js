const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Service = require('./models/Service');
const TeamMember = require('./models/TeamMember');
const Client = require('./models/Client');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/solvence_agency';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Service.deleteMany({});
  await TeamMember.deleteMany({});
  await Client.deleteMany({});

  // Create admin user
  const admin = await User.create({
    name: 'Wali Ullah Shuvo',
    email: 'admin@solvence.com',
    password: 'admin123',
    role: 'admin'
  });
  console.log('✅ Admin user created: admin@solvence.com / admin123');

  // Create services
  const services = await Service.create([
    {
      title: 'Web Development',
      slug: 'web-development',
      shortDescription: 'Custom websites, web apps, and e-commerce solutions built with modern technologies.',
      fullDescription: 'We build responsive, high-performance websites and web applications using React, Node.js, MongoDB, and more. From landing pages to complex SaaS platforms.',
      icon: '🌐',
      category: 'web',
      features: ['React / Next.js', 'Node.js / Express', 'MongoDB / PostgreSQL', 'REST & GraphQL APIs', 'Cloud Deployment', 'SEO Optimized'],
      price: { type: 'custom' },
      order: 1
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-development',
      shortDescription: 'Cross-platform mobile apps for iOS and Android using Flutter and React Native.',
      fullDescription: 'We create beautiful, performant mobile applications that work seamlessly on both iOS and Android devices using Flutter and React Native.',
      icon: '📱',
      category: 'mobile',
      features: ['Flutter / Dart', 'React Native', 'iOS & Android', 'Push Notifications', 'App Store Submission', 'API Integration'],
      price: { type: 'custom' },
      order: 2
    },
    {
      title: 'Google Ads & PPC',
      slug: 'google-ads',
      shortDescription: 'Data-driven Google Ads campaigns that deliver measurable ROI and conversions.',
      fullDescription: 'Our Google Ads experts create and optimize campaigns across Search, Display, Shopping, and YouTube to maximize your return on ad spend.',
      icon: '📊',
      category: 'marketing',
      features: ['Search Campaigns', 'Display Ads', 'Shopping Ads', 'YouTube Ads', 'Conversion Tracking', 'A/B Testing'],
      price: { type: 'custom' },
      order: 3
    },
    {
      title: 'SEO & Content Marketing',
      slug: 'seo-marketing',
      shortDescription: 'Organic growth strategies to boost your search rankings and online visibility.',
      fullDescription: 'We help businesses rank higher on Google through technical SEO, content marketing, link building, and data-driven optimization.',
      icon: '🔍',
      category: 'marketing',
      features: ['Technical SEO', 'Keyword Research', 'Content Strategy', 'Link Building', 'Local SEO', 'Analytics & Reports'],
      price: { type: 'custom' },
      order: 4
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'User-centered design that creates engaging digital experiences.',
      fullDescription: 'Our design team creates intuitive, beautiful interfaces that delight users and drive conversions. From wireframes to high-fidelity prototypes.',
      icon: '🎨',
      category: 'design',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Figma / Adobe XD', 'Design Systems', 'Usability Testing'],
      price: { type: 'custom' },
      order: 5
    },
    {
      title: 'IT Consulting',
      slug: 'it-consulting',
      shortDescription: 'Strategic technology consulting to help your business grow and scale.',
      fullDescription: 'We provide expert guidance on technology stack selection, architecture design, team building, and digital transformation strategies.',
      icon: '💡',
      category: 'consulting',
      features: ['Tech Stack Advisory', 'Architecture Design', 'Team Building', 'Digital Transformation', 'Code Review', 'Performance Audit'],
      price: { type: 'hourly', amount: 75 },
      order: 6
    }
  ]);
  console.log(`✅ ${services.length} services created`);

  // Create team members
  const team = await TeamMember.create([
    {
      name: 'Wali Ullah Shuvo',
      role: 'Founder & CEO',
      bio: 'Digital marketing expert and full-stack developer with 3+ years of experience. Specializes in Google Ads, MERN stack, and OSINT.',
      email: 'shuvo.digitalbard@gmail.com',
      linkedin: 'https://linkedin.com/in/wali-ullah-shuvo',
      github: 'https://github.com/StarsWarrior',
      skills: ['Google Ads', 'React', 'Node.js', 'Flutter', 'SEO', 'OSINT'],
      order: 1
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Designer',
      bio: 'Creative UI/UX designer with a passion for user-centered design and beautiful interfaces.',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping', 'Design Systems'],
      order: 2
    },
    {
      name: 'Michael Chen',
      role: 'Senior Developer',
      bio: 'Full-stack developer specializing in scalable web applications and cloud architecture.',
      skills: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      order: 3
    }
  ]);
  console.log(`✅ ${team.length} team members created`);

  // Create sample clients
  const clients = await Client.create([
    { name: 'Dental Care Plus', company: 'Dental Care Plus', serviceType: ['google-ads', 'seo-marketing'], status: 'active', projectValue: 15000 },
    { name: 'Hort Properties', company: 'Hort Properties LLC', serviceType: ['web-development', 'google-ads'], status: 'active', projectValue: 25000 },
    { name: 'TaxPro Solutions', company: 'TaxPro Inc', serviceType: ['google-ads', 'seo-marketing'], status: 'active', projectValue: 8000 },
    { name: 'PetCare Hub', company: 'PetCare Hub', serviceType: ['web-development', 'ui-ux-design'], status: 'completed', projectValue: 12000 }
  ]);
  console.log(`✅ ${clients.length} clients created`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('📧 Admin login: admin@solvence.com / admin123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
