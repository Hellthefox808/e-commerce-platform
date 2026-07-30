# 13 — Enterprise Folder Structure

```
e-commerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/              # Env & database configuration
│   │   ├── controllers/         # Express REST API controllers
│   │   ├── middleware/          # JWT auth, RBAC guard, logger, error handler
│   │   ├── models/              # Prisma / SQLite schema models
│   │   ├── routes/              # Express API route modules
│   │   ├── services/            # Stripe/Razorpay payment & business logic
│   │   └── server.js            # Server bootstrapping
│   ├── package.json
│   └── prisma/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI elements (Navbar, CartDrawer, PaymentModal, AdminCharts)
│   │   ├── context/             # React Auth, Cart, Wishlist, and Theme contexts
│   │   ├── pages/               # Home, Catalog, Details, Cart, Checkout, Profile, Admin
│   │   ├── services/            # Axios API client functions
│   │   ├── styles/              # Design tokens & glassmorphism CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── docs/                        # 22 Documentation Specifications
├── docker-compose.yml
├── README.md
└── LICENSE
```
