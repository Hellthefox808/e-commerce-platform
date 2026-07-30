# LuxeCommerce — Enterprise Full-Stack E-Commerce Platform

> **Production-Ready Full-Stack Shopping Architecture** built with **Clean Architecture**, **Domain-Driven Design (DDD)**, and **SOLID Principles**. Designed for high conversion, payment tokenization resilience, and enterprise security compliance.

<div align="center">

[![Build Status](https://img.shields.io/github/actions/workflow/status/Hellthefox808/Full-Stack-E-Commerce-Development/ci.yml?branch=main&style=for-the-badge&logo=github&label=CI%2FCD%20Pipeline)](https://github.com/Hellthefox808/Full-Stack-E-Commerce-Development/actions)
[![Version](https://img.shields.io/badge/version-1.0.0-7c3aed.svg?style=for-the-badge&logo=semver)](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/LICENSE)
[![Security Audit](https://img.shields.io/badge/security-OWASP%20Top%2010-10b981.svg?style=for-the-badge&logo=shield)](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/SECURITY.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge&logo=github)](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents
- [1. Executive Summary](#1-executive-summary)
- [2. Project Overview](#2-project-overview)
- [3. Core Features](#3-core-features)
- [4. Visual Previews & Screenshots](#4-visual-previews--screenshots)
- [5. Technology Stack](#5-technology-stack)
- [6. System Architecture](#6-system-architecture)
- [7. Enterprise Directory Sitemap](#7-enterprise-directory-sitemap)
- [8. Installation & Quickstart](#8-installation--quickstart)
- [9. Configuration & Credentials](#9-configuration--credentials)
- [10. Usage Workflow](#10-usage-workflow)
- [11. API Specification](#11-api-specification)
- [12. Security & Compliance](#12-security--compliance)
- [13. Performance & Accessibility](#13-performance--accessibility)
- [14. Quality Assurance & Testing](#14-quality-assurance--testing)
- [15. Docker Deployment](#15-docker-deployment)
- [16. GitHub Collaboration & Contributing](#16-github-collaboration--contributing)
- [17. Roadmap](#17-roadmap)
- [18. License](#18-license)
- [19. Author & Maintainer](#19-author--maintainer)

---

## 1. Executive Summary

### What Problem Does LuxeCommerce Solve?
Monolithic e-commerce codebases frequently struggle with tightly coupled database logic, rigid payment pipelines, vulnerable auth tokens, and opaque audit logs. LuxeCommerce solves these architectural challenges by providing a decoupled, layered Clean Architecture where presentation, business logic, persistence, and payment integrations operate independently.

### Who Is It For?
- **Shoppers**: Enjoy a sub-second responsive storefront with real-time fuzzy search, slide-out cart drawer, saved wishlist, promo code engine, and visual order tracking.
- **Sellers**: Manage store product catalogs, update real-time stock levels, and oversee fulfillment state transitions.
- **Administrators**: Monitor store performance via sales revenue charts, enforce Role-Based Access Control (RBAC), and review immutable audit logs.

### Why Does It Exist?
LuxeCommerce was architected and implemented by **Ravi Ranjan Singh** as a portfolio-grade, enterprise-ready web platform demonstrating modern software engineering principles, dual payment tokenization, and strict documentation synchronization.

---

## 2. Project Overview

### Business Purpose
Deliver a high-conversion, resilient e-commerce infrastructure comparable to small-scale Amazon, Flipkart, or Shopify storefronts, designed for fast page load times and zero-downtime payment authorization.

### Primary Objectives
- **Clean Architecture & DDD**: Strict layer separation across Presentation, Application, Domain, and Infrastructure layers.
- **Dual Payment Resiliency**: Native support for **Stripe API** (Credit Cards, Apple Pay) and **Razorpay API** (UPI, Netbanking, Cards) with live credential mode and offline sandbox simulator.
- **Security & RBAC Matrix**: Access token rotation and role guards (`Guest`, `Customer`, `Seller`, `Admin`, `Super Admin`).
- **Audit Compliance**: Immutable log records capturing every administrative edit, price modification, and user login event.

---

## 3. Core Features

- 🔐 **Authentication & Authorization**: JWT access & refresh tokens, bcrypt password hashing (cost factor 10), role-based route guards.
- 🛍️ **Storefront Catalog**: Real-time fuzzy search, multi-category chips, price range sorting, rating filters, and wishlist synchronization.
- 🛒 **Slide-Out Quick Cart**: Instant drawer panel, quantity steppers, promo code discount engine (`LUXE10` for 10% off), and subtotal breakdown.
- 💳 **Dual Gateway Payment Modal**: Tabbed Stripe & Razorpay payment interface with instant test completion.
- 🚚 **Order Fulfillment & Live Tracking**: Multi-step checkout, stock reservation, visual delivery status timeline (`PENDING` -> `PAID` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED`).
- 📊 **Admin Telemetry Dashboard**: Revenue trend bar graphs (Recharts), low-stock alert tiles, inventory CRUD modal, and security audit log inspector.
- 🌙 **Modern UX & Dark Mode**: HSL design tokens, glassmorphism backdrop blurs, fluid typography, and dark/light theme toggle.

---

## 4. Visual Previews & Screenshots

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

### Interactive Quick Cart Drawer & Dual Payment Gateway Modal
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

| Layer | Technologies & Tools |
| --- | --- |
| **Frontend UI** | React 18, Vite 5, TypeScript, TailwindCSS, Shadcn UI Tokens, Lucide React Icons |
| **Backend REST API** | Node.js 20, Express 4, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS, Morgan |
| **Database & ORM** | Embedded SQLite (`sqlite3`) with Promise query wrapper, auto-schema initialization, and seeder |
| **Payment Adapters** | Stripe Node SDK (`stripe`), Razorpay SDK (`razorpay`), and Interactive Offline Sandbox Gateway |
| **DevOps & Infrastructure** | Docker, Multi-container Docker Compose, GitHub Actions CI/CD (`.github/workflows/ci.yml`) |

---

## 6. System Architecture

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

## 7. Enterprise Directory Sitemap (`/docs`)

All architectural specifications are synchronized in [`/docs`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/):

| Document | Description | Link |
| --- | --- | --- |
| **00 — Project Brief** | Executive Intent & Core Objectives | [`docs/00-project-brief.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/00-project-brief.md) |
| **01 — PRD** | Product Requirements Document | [`docs/01-prd.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/01-prd.md) |
| **02 — BRD** | Business Requirements Document | [`docs/02-brd.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/02-brd.md) |
| **03 — SRS** | Software Requirements Specification | [`docs/03-srs.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/03-srs.md) |
| **04 — User Stories** | Persona Requirements & Acceptance Criteria | [`docs/04-user-stories.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/04-user-stories.md) |
| **05 — Use Cases** | Checkout & Audit Sequence Diagrams | [`docs/05-use-cases.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/05-use-cases.md) |
| **06 — Architecture** | Clean Architecture Layered Topology | [`docs/06-system-architecture.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/06-system-architecture.md) |
| **07 — DDD** | Bounded Contexts & Aggregate Roots | [`docs/07-ddd.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/07-ddd.md) |
| **08 — ER Diagram** | Entity Relationship Diagrams | [`docs/08-er-diagram.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/08-er-diagram.md) |
| **09 — Database Schema** | Table Definitions & Indexing Strategy | [`docs/09-database-schema.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/09-database-schema.md) |
| **10 — OpenAPI Contract** | REST API Yaml Contract | [`docs/10-api-contract.yaml`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/10-api-contract.yaml) |
| **11 — Security Matrix** | OWASP Top 10 Protections | [`docs/11-security.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/11-security.md) |
| **12 — Coding Standards** | TypeScript & SOLID Guidelines | [`docs/12-coding-standards.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/12-coding-standards.md) |
| **13 — Folder Layout** | Directory Hierarchy & Structure | [`docs/13-folder-structure.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/13-folder-structure.md) |
| **14 — UI Guidelines** | Design Tokens & Color Palettes | [`docs/14-ui-guidelines.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/14-ui-guidelines.md) |
| **15 — Design System** | UI Component Tokens | [`docs/15-design-system.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/15-design-system.md) |
| **16 — Testing Strategy** | Unit, Integration & E2E Testing | [`docs/16-testing.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/16-testing.md) |
| **17 — Deployment** | Docker Compose & Cloud Topology | [`docs/17-deployment.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/17-deployment.md) |
| **18 — Monitoring** | Pino Logging & Telemetry | [`docs/18-monitoring.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/18-monitoring.md) |
| **20 — Roadmap** | Feature Pipeline & Future Enhancements | [`docs/20-roadmap.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/20-roadmap.md) |

---

## 8. Installation & Quickstart

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Local Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/Hellthefox808/Full-Stack-E-Commerce-Development.git
cd Full-Stack-E-Commerce-Development

# 2. Install & Seed Backend Server
cd backend
npm install
npm run seed
npm start
# Backend listening on http://localhost:5000

# 3. Install & Launch Frontend Storefront (In a new terminal)
cd ../frontend
npm install
npm run dev
# Frontend listening on http://localhost:3000
```

---

## 9. Configuration & Credentials

### Environment Template ([`.env.example`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/.env.example))
```env
PORT=5000
JWT_SECRET=luxecommerce_super_secret_jwt_key_2026
STRIPE_SECRET_KEY=sk_test_... (Optional)
RAZORPAY_KEY_ID=rzp_test_... (Optional)
```

### Pre-seeded Demo Accounts

| Role | Email | Password | Access Rights |
| --- | --- | --- | --- |
| **System Admin** | `admin@luxemarket.com` | `admin123` | Analytics, Inventory CRUD, Order Status, Audit Logs |
| **Super Admin** | `superadmin@luxemarket.com` | `admin123` | Full system governance & security management |
| **Customer** | `customer@luxemarket.com` | `customer123` | Shopping cart, wishlist, checkout, profile tracking |
| **Seller** | `seller@luxemarket.com` | `seller123` | Product catalog updates & fulfillment tracking |

---

## 10. Usage Workflow

- **Customer Workflow**: Browse Home -> Click Store Catalog -> Filter by Category/Price -> Click Item for Details -> Add to Cart -> Open Cart Drawer -> Enter Promo Code `LUXE10` (10% Off) -> Click "Proceed to Checkout" -> Choose Stripe or Razorpay -> Complete Payment -> View Live Delivery Timeline.
- **Administrator Workflow**: Login as `admin@luxemarket.com` -> Click "Admin Panel" in Navbar -> Inspect Sales Revenue Graphs -> Switch to Inventory Tab to add/edit items -> Switch to Order Fulfillment Tab to update shipment status -> View Immutable Audit Logs.

---

## 11. API Specification

- **Auth**: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`
- **Products**: `GET /api/v1/products`, `GET /api/v1/products/:slug`, `POST /api/v1/products` (Admin), `PUT /api/v1/products/:id`, `DELETE /api/v1/products/:id`
- **Orders**: `POST /api/v1/orders/checkout`, `GET /api/v1/orders/my-orders`, `GET /api/v1/orders/:id`, `PATCH /api/v1/orders/:id/status` (Admin)
- **Payments**: `POST /api/v1/payments/stripe/create-intent`, `POST /api/v1/payments/razorpay/create-order`, `POST /api/v1/payments/verify`
- **Admin**: `GET /api/v1/admin/analytics`, `GET /api/v1/admin/audit-logs`, `GET /api/v1/admin/orders`

Full OpenAPI contract available at [`docs/10-api-contract.yaml`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/docs/10-api-contract.yaml).

---

## 12. Security & Compliance
- **JWT Protection**: Short-lived access tokens + 7-day token rotation.
- **RBAC Matrix**: Declarative middleware guards protecting sensitive endpoints (`requireRole('ADMIN', 'SUPER_ADMIN')`).
- **OWASP Mitigations**: XSS defense headers via Helmet, rate limiting (150 req/15min), parameterized SQL queries preventing SQL/NoSQL injection.
- **Audit Trails**: Immutable log entries storing user action, IP address, and payload timestamps.

---

## 13. Performance & Accessibility
- **Performance**: Sub-2.3s client bundle build, image lazy loading, sub-300ms API response latency.
- **Accessibility**: Keyboard navigable controls, contrast-compliant dark/light themes (`[data-theme]`), ARIA labels on modal triggers.

---

## 14. Quality Assurance & Testing
Run backend automated API verification tests:
```bash
node backend/test/test_suite.js
```
Verifies `/api/health`, `/api/v1/products` status code 200, array data contracts, and error handlers.

---

## 15. Docker Deployment
Launch via Docker Compose:
```bash
docker-compose up --build
```

---

## 16. GitHub Collaboration & Contributing

We welcome contributions to **LuxeCommerce**! Please follow these guidelines:

### Standard GitHub Workflow
1. **Fork the Repository**: Click the **Fork** button at the top right of this repository page.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**: Follow standard commit message conventions (`feat: add new feature`, `fix: resolve issue`).
4. **Push & Create Pull Request**: Push your branch to GitHub and open a Pull Request targeting `main`.

Refer to [`CONTRIBUTING.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/CONTRIBUTING.md) and [`SECURITY.md`](file:///c:/Users/ravir/Desktop/PROJECT/Project/p2/01-Full-Stack-Web/e-commerce-platform/SECURITY.md) for full submission policies.

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

## 19. Author & Maintainer

<div align="center">

### **Ravi Ranjan Singh**
**Software Engineer | Software Architect | Full Stack Developer**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717.svg?style=for-the-badge&logo=github)](https://github.com/raviranjansingh)
[![Repository](https://img.shields.io/badge/GitHub-Repository-7c3aed.svg?style=for-the-badge&logo=github)](https://github.com/Hellthefox808/Full-Stack-E-Commerce-Development)

*Repository Owner & Primary Maintainer: **Ravi Ranjan Singh***

</div>
