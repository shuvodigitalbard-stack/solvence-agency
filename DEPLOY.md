# 🚀 Deployment Guide — Solvence Tech Agency

## What You Need To Do (Step by Step)

### Step 1: Create MongoDB Atlas Database (Free)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and sign up (free)
2. Create a new cluster → Choose **M0 FREE** tier
3. **IP Access List** → Add `0.0.0.0/0` (allows all IPs) — this is needed so your backend server can connect from anywhere
4. Create a database user (username + password) — save these!
5. Click **Connect** → **Connect your application** → Copy the connection string
6. It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/solvence_agency?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render (Free)

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **New** → **Web Service**
3. Connect your `solvence-agency` repo
4. Settings:
   - **Name:** `solvence-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/solvence_agency?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_here_2026
   NODE_ENV=production
   ```
6. Click **Create Web Service**
7. Wait for deployment (2-3 minutes)
8. Copy the URL: `https://solvence-api.onrender.com`

### Step 3: Deploy Frontend to Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New** → **Project**
3. Import `solvence-agency` repo
4. Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://solvence-api.onrender.com/api
   ```
6. Click **Deploy**
7. Your site will be live at: `https://solvence-agency.vercel.app`

### Step 4: Seed the Database

After backend is deployed, run the seed:

```bash
# Locally, with your MONGO_URI set:
cd backend
node seed.js
```

Or use Render's Shell:
1. Go to your Render dashboard → `solvence-api`
2. Click **Shell**
3. Run: `node seed.js`

### Step 5: Test Everything

1. Visit your Vercel URL → Homepage should load
2. Go to `/admin/login` → Login with:
   - Email: `admin@solvence.com`
   - Password: `admin123`
3. Test the contact form → Check your Telegram for the message
4. Add/edit services, clients, team members from admin

### Step 6: Connect Custom Domain (Optional)

1. In Vercel: Settings → Domains → Add your domain
2. In Render: Settings → Custom Domain → Add your domain
3. Update DNS records as instructed

## 🔑 Important Notes

- **MongoDB IP:** Use `0.0.0.0/0` for the IP access list — this allows connections from any server (needed for Render/Vercel)
- **Free tier limits:** Render free tier spins down after 15 min inactivity (takes ~30s to wake up). Vercel has no sleep.
- **Admin credentials:** Change the default admin password after first login!
- **Telegram bot:** The contact form sends messages to your Telegram. Make sure the bot token is correct in the backend.
