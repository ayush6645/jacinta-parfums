# JΛCINTΛ Luxury Parfums 🧴✨

A high-contemporary, production-grade e-commerce platform for artisanal fragrances. Built with a focus on luxury aesthetics, molecular excellence, and seamless commerce orchestration.

## 🚀 Live Product Features

- **Luxury UI/UX**: Immersive dark-mode experience with glassmorphism, parallax scrolling, and artisanal animations (Motion/React).
- **Identity & Security**: Secure JWT-based authentication system with persistent sessions.
- **Dynamic Catalog**: Real-time product discovery with complex variant handling (50ml/100ml) and olfactory note mapping.
- **Artisanal Shopping Bag**: Fully synchronized backend-driven cart system.
- **Razorpay Integration**: End-to-end secure payment orchestration with server-side signature verification.
- **Member Collective**: User profile management with acquisition history and status tracking.

## 🛠️ Technical Architecture

### Frontend (The Atelier)
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (Luxury Design System)
- **Animation**: Motion (formerly Framer Motion)
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend (The Essence)
- **Framework**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL (Hosted on Neon)
- **ORM**: SQLAlchemy 2.0
- **Security**: Jose (JWT), Passlib (Bcrypt)
- **Payments**: Razorpay SDK

## 📦 Deployment Configuration

### Environment Variables

Create a `.env` file in the root and backend directories based on `.env.example`:

```env
# Backend
DATABASE_URL=postgresql://user:pass@host/db
SECRET_KEY=your_secret_key
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Frontend
VITE_API_URL=https://your-backend-url.com/api/v1
```

### Installation

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
npm install
npm run dev
```

## 📜 Artisanal Philosophy
Every line of code in JΛCINTΛ is hand-crafted to mirror the precision of our master perfumers. From the molecular structure of our fragrances to the signature verification of our payments, quality is non-negotiable.

---

© 2026 JΛCINTΛ Parfums. All Rights Reserved.
