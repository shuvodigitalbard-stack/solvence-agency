#!/bin/bash
# ============================================
# Solvence Tech Agency - Deployment Script
# ============================================
# This script deploys the app to Render.com
#
# Prerequisites:
# 1. Render account (render.com) - free tier
# 2. MongoDB Atlas cluster (already set up)
#
# Run: bash deploy.sh
# ============================================

echo "🚀 Deploying Solvence Tech Agency..."
echo ""
echo "Option 1: Deploy to Render (Recommended - Free)"
echo "  1. Go to https://dashboard.render.com"
echo "  2. Click 'New +' → 'Web Service'"
echo "  3. Connect GitHub repo: shuvodigitalbard-stack/solvence-agency"
echo "  4. Settings:"
echo "     - Root Directory: backend"
echo "     - Build Command: npm install"
echo "     - Start Command: NODE_ENV=production node server.js"
echo "  5. Add Environment Variables:"
echo "     - NODE_ENV = production"
echo "     - MONGO_URI = mongodb+srv://solvencetech:***@cluster0.vdzarsz.mongodb.net/?appName=Cluster0"
echo "     - JWT_SECRET = solvence_super_secret_key_2026_production"
echo "  6. Click 'Create Web Service'"
echo ""
echo "Option 2: Deploy to Railway (Alternative)"
echo "  1. Go to https://railway.app"
echo "  2. Create New Project → Deploy from GitHub"
echo "  3. Select repo: shuvodigitalbard-stack/solvence-agency"
echo "  4. Set root directory to /backend"
echo "  5. Add env vars (same as above)"
echo ""
echo "Option 2: Deploy to Vercel (Fastest)"
echo "  1. Go to https://vercel.com"
echo "  2. Import GitHub repo"
echo "  3. Set root directory to /frontend"
echo "  4. Add env: VITE_API_URL = your-backend-url.com/api"
echo ""

read -p "Choose option (1/2): " choice

if [ "$choice" = "1" ]; then
  echo ""
  echo "📋 Manual steps for Render:"
  echo "  1. Open https://dashboard.render.com/new/web"
  echo "  2. Connect: shuvodigitalbard-stack/solvence-agency"
  echo "  3. Root Dir: backend"
  echo "  4. Build: npm install"
  echo "  5. Start: NODE_ENV=production node server.js"
  echo "  6. Add 3 env vars"
  echo ""
  echo "  Site will be live at: https://solvence-agency.onrender.com"
fi
