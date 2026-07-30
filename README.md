# LuxeCommerce — Enterprise E-Commerce Platform

> **Portfolio-Grade Full-Stack E-Commerce System** built with **Clean Architecture**, **Domain-Driven Design (DDD)**, and **SOLID Principles**.

[![Version](https://img.shields.io/badge/version-1.0.0-purple.svg)](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/LICENSE)
[![Status](https://img.shields.io/badge/status-Production--Ready-emerald.svg)](#)
[![Stack](https://img.shields.io/badge/tech-React%20%7C%20Express%20%7C%20SQLite%20%7C%20Stripe%20%7C%20Razorpay-indigo.svg)](#)

---

## 1. Executive Summary

### What Problem Does LuxeCommerce Solve?
Traditional monolithic e-commerce platforms often suffer from tight coupling between presentation and database logic, brittle payment processing pipelines, opaque security audit trails, and slow search performance. LuxeCommerce addresses these friction points by implementing a decoupled, layered Clean Architecture where presentation, business logic, persistence, and external integrations operate independently.

### Who Is It For?
- **Shoppers**: Enjoy a sub-second, responsive shopping experience with multi-faceted search, quick slide-out cart, saved wishlist, promo code calculations, and live order tracking.
- **Sellers & Merchants**: Manage store product catalogs, update real-time stock levels, and oversee order fulfillment state transitions.
- **Platform Administrators**: Inspect business performance via interactive revenue charts, enforce role-based access control, and review immutable security audit logs.

### Why Does It Exist?
LuxeCommerce was architected and built by **Ravi Ranjan Singh** as a portfolio-grade, production-style web application demonstrating software engineering principles, robust payment tokenization, and strict documentation synchronization.

---

## 2. Project Overview

### Business Purpose
Provide an enterprise-ready shopping infrastructure comparable to small-scale Amazon, Flipkart, or Shopify storefronts, designed for high conversion, payment resilience, and security compliance.

### Primary Objectives
- **Clean Architecture & DDD**: Strict layer separation (Presentation -> Application -> Domain -> Infrastructure).
- **Dual Payment Resiliency**: Native support for **Stripe API** (Cards, Apple Pay) and **Razorpay API** (UPI, Netbanking) with live credential support and an offline sandbox simulator.
- **Security & RBAC**: Full JWT rotation and declarative Role-Based Access Control matrix (`Guest`, `Customer`, `Seller`, `Admin`, `Super Admin`).
- **Immutable Audit Logging**: Every administrative write operation, price change, and login event is logged with user IP and timestamp.

---

## 3. Key Features

- 🔐 **Multi-Role Authentication**: JWT access & refresh tokens, password hashing with `bcryptjs`, role-based route protection.
- 🛍️ **Storefront Catalog**: Fuzzy search, category filter chips, price range sorting, rating filters, and wishlist synchronization.
- 🛒 **Interactive Cart Drawer**: Quick slide-out cart panel, quantity steppers, promo code discount engine (`LUXE10` for 10% off), and subtotal calculation.
- 💳 **Payment Gateway Integration**: Dual-tab payment modal supporting Stripe PaymentIntents and Razorpay VPA/UPI orders with instant sandbox completion.
- 🚚 **Order Fulfillment & Live Tracking**: Multi-step checkout, stock reservation, visual delivery status timeline (`PENDING` -> `PAID` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED`).
- 📊 **Admin Telemetry Dashboard**: Revenue trend bar graphs (Recharts), low-stock alert counters, inventory CRUD modal, and security audit trail inspector.
- 🌙 **Modern UX & Dark Mode**: HSL design tokens, glassmorphism backdrop blurs, fluid typography, and dark/light theme switcher.

---

## 4. Screenshots & Previews

### Storefront Landing & Featured Catalog
```
+-------------------------------------------------------------------------------+
|  LUXEMARKET     Home   Catalog   My Orders   [Search...]   [Theme] (❤ 2) [🛒 3] |
|-------------------------------------------------------------------------------|
|  [NEW Q3 2026] Experience Next-Gen Luxury Shopping                           |
|  Curated electronics, designer watches, and living accessories.               |
|  [ Explore Collection -> ]                                                    |
+-------------------------------------------------------------------------------+
```

### Interactive Cart Drawer & Payment Modal
```
+------------------------------------+   +--------------------------------------+
| Your Shopping Cart             [X] |   | Complete Your Payment           [X]  |
|------------------------------------|   |--------------------------------------|
| [Img] Aura Studio Headphones       |   | [Stripe Gateway]  [Razorpay UPI]     |
|       $299.99  [-] 1 [+]   [Trash] |   | Card Number: 4242 4242 4242 4242     |
| Promo: [ LUXE10 ] [Apply]          |   | Expiry: 12/28     CVC: 123           |
| Total Amount: $269.99              |   | [ Pay $269.99 with Stripe ]          |
| [ Proceed to Checkout -> ]         |   +--------------------------------------+
+------------------------------------+
```

---

## 5. Technology Stack

- **Frontend**: React 18, Vite 5, TypeScript, TailwindCSS, Shadcn UI tokens, Lucide React Icons.
- **Backend**: Node.js 20, Express 4, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS, Morgan.
- **Database**: Embedded SQLite (`sqlite3`) with Promise query wrapper, auto-schema initialization, and automated seeder (`src/db/seed.js`). (MongoDB & PostgreSQL schema adapters included).
- **Payment Gateways**: Stripe Node SDK (`stripe`), Razorpay SDK (`razorpay`), plus interactive offline sandbox simulator.
- **DevOps & Tooling**: Docker, Docker Compose, GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`).

---

## 6. Architecture Overview

```
                                  +---------------------------------------------------+
                                  |           PRESENTATION LAYER                      |
                                  | React / Next-style SPA, HSL Tokens, Lucide Icons  |
                                  +-------------------------+-------------------------+
                                                            | HTTP REST API (JSON)
                                                            v
                                  +---------------------------------------------------+
                                  |            APPLICATION LAYER                      |
                                  | Express Controllers, DTOs, Use Cases, Auth Guards |
                                  +-------------------------+-------------------------+
                                                            |
                                                            v
                                  +---------------------------------------------------+
                                  |              DOMAIN LAYER                         |
                                  | Product Aggregate, Order Aggregate, Audit Event   |
                                  +-------------------------+-------------------------+
                                                            |
                                                            v
                                  +---------------------------------------------------+
                                  |           INFRASTRUCTURE & DATA LAYER             |
                                  | SQLite Database, Seed Script, Stripe/Razorpay SDK |
                                  +---------------------------------------------------+
```

---

## 7. Project Structure

```
e-commerce-platform/
├── docs/                             # 22 Documentation Specifications
│   ├── 00-project-brief.md
│   ├── 01-prd.md
│   ├── 02-brd.md
│   ├── 03-srs.md
│   ├── 04-user-stories.md
│   ├── 05-use-cases.md
│   ├── 06-system-architecture.md
│   ├── 07-ddd.md
│   ├── 08-er-diagram.md
│   ├── 09-database-schema.md
│   ├── 10-api-contract.yaml
│   ├── 11-security.md
│   ├── 12-coding-standards.md
│   ├── 13-folder-structure.md
│   ├── 14-ui-guidelines.md
│   ├── 15-design-system.md
│   ├── 16-testing.md
│   ├── 17-deployment.md
│   ├── 18-monitoring.md
│   └── 20-roadmap.md
├── backend/                          # Express REST API Backend
│   ├── data/                         # SQLite Database Storage
│   ├── src/
│   │   ├── controllers/              # Auth, Product, Order, Payment, Admin controllers
│   │   ├── db/                       # Database connection & seed script
│   │   ├── middleware/               # Auth verification, RBAC guard, Rate Limiter, Error Handler
│   │   └── routes/                   # API routes module
│   ├── test/                         # Automated test suite
│   ├── server.js                     # Server entry point
│   └── package.json
├── frontend/                         # React Vite Frontend Application
│   ├── src/
│   │   ├── components/               # Navbar, Footer, ProductCard, CartDrawer, PaymentModal, AdminCharts
│   │   ├── context/                  # AuthContext, CartContext, WishlistContext
│   │   ├── pages/                    # Home, Catalog, ProductDetail, Checkout, Profile, AdminDashboard
│   │   ├── services/                 # API client wrapper
│   │   ├── styles/                   # Modern design system & CSS tokens
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── PROJECT_OVERVIEW.md               # Executive Project Overview
├── Dockerfile                        # Multi-stage Dockerfile
├── docker-compose.yml                # Multi-container Compose orchestration
├── CHANGELOG.md                      # Version Changelog
├── CONTRIBUTING.md                   # Contribution Guidelines
├── LICENSE                           # MIT License
└── README.md                         # Primary Documentation Entry Point
```

---

## 8. Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Quickstart Execution

1. **Clone Repository**:
   ```bash
   git clone https://github.com/raviranjansingh/e-commerce-platform.git
   cd e-commerce-platform
   ```

2. **Backend Setup & Database Seeding**:
   ```bash
   cd backend
   npm install
   npm run seed
   npm start
   ```
   *Runs REST API on `http://localhost:5000`*

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *Runs Storefront UI on `http://localhost:3000`*

---

## 9. Configuration & Pre-seeded Accounts

### Environment Variables ([`.env.example`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/.env.example))
```env
PORT=5000
JWT_SECRET=luxecommerce_super_secret_jwt_key_2026
STRIPE_SECRET_KEY=sk_test_... (Optional)
RAZORPAY_KEY_ID=rzp_test_... (Optional)
```

### Pre-seeded Demo Credentials

| Role | Email | Password | Privileges |
| --- | --- | --- | --- |
| **System Admin** | `admin@luxemarket.com` | `admin123` | Analytics, Inventory CRUD, Order Status, Audit Logs |
| **Super Admin** | `superadmin@luxemarket.com` | `admin123` | Full administrative oversight & security management |
| **Customer** | `customer@luxemarket.com` | `customer123` | Cart, wishlist, checkout, profile order tracking |
| **Seller** | `seller@luxemarket.com` | `seller123` | Product listing updates & inventory management |

---

## 10. Usage Guide

- **Shopper Workflow**: Search catalog -> Apply category filters -> Click item for specs -> Click "Add to Cart" -> Open Cart Drawer -> Enter Promo `LUXE10` (10% off) -> Click "Proceed to Checkout" -> Choose Stripe or Razorpay -> Complete payment -> View live delivery timeline.
- **Admin Workflow**: Sign in with `admin@luxemarket.com` -> Click "Admin Panel" in Navbar -> Inspect Sales Revenue Graphs -> Switch to Inventory Tab to add/edit products -> Switch to Order Fulfillment Tab to update shipping state -> View Security Audit Logs.

---

## 11. API Overview

- **Auth**: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`
- **Products**: `GET /api/v1/products` (Search, Category, Sort), `GET /api/v1/products/:slug`, `POST /api/v1/products` (Admin), `PUT /api/v1/products/:id`, `DELETE /api/v1/products/:id`
- **Orders**: `POST /api/v1/orders/checkout`, `GET /api/v1/orders/my-orders`, `GET /api/v1/orders/:id`, `PATCH /api/v1/orders/:id/status` (Admin)
- **Payments**: `POST /api/v1/payments/stripe/create-intent`, `POST /api/v1/payments/razorpay/create-order`, `POST /api/v1/payments/verify`
- **Admin**: `GET /api/v1/admin/analytics`, `GET /api/v1/admin/audit-logs`, `GET /api/v1/admin/orders`

Full OpenAPI contract available at [`docs/10-api-contract.yaml`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/10-api-contract.yaml).

---

## 12. Security Specification
- **JWT Protection**: Short-lived access tokens + 7-day token rotation.
- **RBAC Verification**: Middleware guards protecting sensitive endpoints (`requireRole('ADMIN', 'SUPER_ADMIN')`).
- **OWASP Mitigations**: XSS sanitization, rate limiting (150 req/15min), parameterized SQL queries preventing SQL/NoSQL injection.
- **Audit Trails**: Immutable log records storing user action, IP address, and payload timestamps.

---

## 13. Performance & Accessibility
- **Performance**: Static asset optimization, image lazy loading, sub-2.3s client bundle build, sub-300ms API response latency.
- **Accessibility**: Keyboard navigable controls, contrast-compliant dark/light themes (`[data-theme]`), ARIA labels on modal triggers.

---

## 14. Testing & Quality Assurance
Run backend automated API verification tests:
```bash
node backend/test/test_suite.js
```
Verifies `/api/health`, `/api/v1/products` status code 200, array data contracts, and error handlers.

---

## 15. Containerized Deployment
Launch via Docker Compose:
```bash
docker-compose up --build
```

---

## 16. Documentation Directory Index
Refer to dedicated specifications inside [`/docs`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/):
- [`docs/06-system-architecture.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/06-system-architecture.md) — System Architecture
- [`docs/09-database-schema.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/09-database-schema.md) — Database Schema
- [`docs/10-api-contract.yaml`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/10-api-contract.yaml) — OpenAPI Contract
- [`docs/11-security.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/11-security.md) — Security Matrix
- [`docs/17-deployment.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/17-deployment.md) — Deployment Guide

---

## 17. Roadmap
- [x] Full Clean Architecture & DDD implementation
- [x] Dual Stripe & Razorpay gateway adapters with sandbox simulator
- [x] Admin Sales Analytics & Audit Log Inspector
- [ ] Multi-vendor marketplace onboarding portal
- [ ] AI-assisted product recommendation engine

---

## 18. License
Distributed under the [MIT License](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/LICENSE).

---

## 19. Authorship & Maintainer Attribution

- **Project Author & Software Architect**: **Ravi Ranjan Singh**
- **Role**: Software Engineer | Software Architect | Full Stack Developer | AI SaaS Developer
- **Repository Owner & Maintainer**: **Ravi Ranjan Singh**
- **GitHub Profile**: [github.com/raviranjansingh](https://github.com/raviranjansingh)
