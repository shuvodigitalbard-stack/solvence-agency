# 🚀 Deployment Guide — Solvence Tech Agency

## Option 1: Render (Recommended — Free)

### Step 1: Deploy Backend + Frontend Together

1. Go to **[render.com](https://dashboard.render.com)** and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub: **shuvodigitalbard-stack/solvence-agency**
4. Configure:
   - **Name:** `solvence-agency`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `NODE_ENV=production node server.js`
   - **Plan:** Free

5. Add **Environment Variables**:
   ```
   NODE_ENV = production
   MONGO_URI = mongodb+srv://solvencetech:***@cluster0.vdzarsz.mongodb.net/?appName=Cluster0
   JWT_SECRET = solvence_super_secret_key_2026_production
   ```

6. Click **"Create Web Service"**

✅ **Your site will be live at:** `https://solvence-agency.onrender.com`

### Step 2: Access Admin Panel

- URL: `https://solvence-agency.onrender.com/admin/login`
- Email: `admin@solvence.com`
- Password: `admin123`

---

## Option 2: Vercel (Frontend) + Render (Backend)

### Backend (Render):
Same as Option 1 above.

### Frontend (Vercel):
1. Go to **[vercel.com](https://vercel.com)** and sign up/login
2. Click **"Add New"** → **"Project"**
3. Import: **shuvodigitalbard-stack/solvence-agency**
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL = https://solvence-agency.onrender.com/api
   ```
6. Click **"Deploy"**

✅ **Your site will be live at:** `https://solvence-agency.vercel.app`

---

## Option 3: Railway (Alternative)

1. Go to **[railway.app](https://railway.app)** and sign up/login
2. **"New Project"** → **"Deploy from GitHub repo"**
3. Select: **shuvodigitalbard-stack/solvence-agency**
4. Set root directory: `backend`
5. Add env vars (same as Render)
6. Deploy!

---

## 🔧 After Deployment

1. **Seed the database** (run once):
   ```bash
   # SSH into your Render service and run:
   node seed.js
   ```

2. **Test the contact form** — submit a message and check your Telegram

3. **Login to admin** at `/admin/login`

4. **Customize content** — add your own services, team members, clients

---

## 📝 Notes

- The free Render tier sleeps after 15 minutes of inactivity (takes ~30s to wake up)
- MongoDB Atlas free tier: 512MB storage
- All data persists across deploys
- The contact form sends messages to your Telegram bot
