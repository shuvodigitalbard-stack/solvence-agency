# 🚀 Solvence Tech Agency

A complete agency website with a fully manageable MERN stack backend.

## 📁 Project Structure

```
solvence-agency/
├── backend/                 # Express.js API
│   ├── models/              # MongoDB models
│   │   ├── User.js          # Admin users
│   │   ├── Service.js       # Services offered
│   │   ├── Client.js        # Clients
│   │   ├── Message.js       # Contact form submissions
│   │   ├── TeamMember.js    # Team members
│   │   └── Setting.js       # Site settings
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication
│   │   ├── services.js      # Services CRUD
│   │   ├── clients.js       # Clients CRUD
│   │   ├── messages.js      # Messages CRUD
│   │   ├── team.js          # Team CRUD
│   │   └── settings.js      # Settings
│   ├── middleware/
│   │   └── auth.js          # JWT protection
│   ├── server.js            # Express server
│   ├── seed.js              # Database seeder
│   └── package.json
│
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── pages/           # Public pages
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/       # Admin pages
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminServices.jsx
│   │   │       ├── AdminClients.jsx
│   │   │       ├── AdminMessages.jsx
│   │   │       └── AdminTeam.jsx
│   │   ├── components/      # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js        # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router, Axios, React Icons, React Hot Toast
- **Backend:** Express.js, MongoDB (Mongoose), JWT, bcrypt
- **Styling:** Custom CSS (dark theme, gradient accents)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
cd solvence-agency
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment Setup

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/solvence_agency
JWT_SECRET=your_super_secret_key_here
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
cd backend
node seed.js
```

This creates:
- **Admin user:** `admin@solvence.com` / `admin123`
- **6 services** (Web Dev, Mobile, Google Ads, SEO, UI/UX, Consulting)
- **3 team members**
- **4 sample clients**

### 4. Run Development

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Admin Panel:** http://localhost:5173/admin/login

## 📊 Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Overview stats, quick access |
| **Services** | Create, edit, delete services with features & pricing |
| **Clients** | Manage client accounts, status, project value |
| **Messages** | View contact form submissions, mark as read/replied |
| **Team** | Add/edit team members with social links |
| **Auth** | JWT-based login, role-based access |

## 🌐 Deployment

### Option 1: Vercel (Frontend) + Render (Backend)

**Backend on Render:**
1. Push to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Build command: `cd backend && npm install`
5. Start command: `cd backend && npm start`

**Frontend on Vercel:**
1. Import GitHub repo
2. Set root directory: `frontend`
3. Add env: `VITE_API_URL=https://your-render-url.onrender.com/api`

### Option 2: Single Server (VPS)

```bash
# Build frontend
cd frontend && npm run build

# Copy build to backend
cp -r build ../backend/public

# Set NODE_ENV=production in backend/.env
# The server will serve the frontend automatically
```

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/login | Login | Public |
| POST | /api/auth/register | Register user | Admin |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/services | Get active services | Public |
| POST | /api/services | Create service | Admin |
| PUT | /api/services/:id | Update service | Admin |
| DELETE | /api/services/:id | Delete service | Admin |
| GET | /api/clients | Get active clients | Public |
| POST | /api/clients | Create client | Admin |
| PUT | /api/clients/:id | Update client | Admin |
| DELETE | /api/clients/:id | Delete client | Admin |
| POST | /api/messages | Submit contact form | Public |
| GET | /api/messages | Get all messages | Admin |
| PUT | /api/messages/:id | Update message | Admin |
| DELETE | /api/messages/:id | Delete message | Admin |
| GET | /api/team | Get active team | Public |
| POST | /api/team | Add team member | Admin |
| PUT | /api/team/:id | Update team member | Admin |
| DELETE | /api/team/:id | Delete team member | Admin |

## 📝 License

MIT
