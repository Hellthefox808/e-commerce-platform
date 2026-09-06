# PROJECT OVERVIEW — LuxeCommerce Platform

## 1. Project Vision
**LuxeCommerce** is an enterprise-ready e-commerce platform architected by **Ravi Ranjan Singh** to deliver a portfolio-quality shopping experience comparable to small-scale Amazon, Flipkart, or Shopify storefronts. Built with **Clean Architecture**, **Domain-Driven Design (DDD)**, and **SOLID Principles**, it bridges the gap between scalable presentation design and resilient backend processing.

## 2. Business Problem & Solution
- **Problem**: Legacy e-commerce codebases often mix UI rendering with SQL queries, leading to security vulnerabilities, brittle payment processing, and high technical debt.
- **Solution**: LuxeCommerce enforces strict boundary separation across presentation, application, domain, and infrastructure layers. It features dual payment gateway fallback for **Stripe** and **Razorpay**, role-based security matrix, and immutable security audit trails.

## 3. Target Users
1. **Shoppers / Customers**: Fast product discovery, multi-criteria filtering, wishlist management, cart checkout with promo codes, and visual order tracking.
2. **Sellers / Merchants**: Product listing management, inventory stock updating, and order fulfillment state management.
3. **Platform Administrators**: Business analytics oversight, KPI performance monitoring, role configuration, and audit trail inspection.

## 4. Architecture Summary
- **Decoupled Topology**: Complete separation of Frontend (`/frontend`) and Backend (`/backend`), each having independent dependencies, Dockerfiles, environment configurations, and release cycles.
- **Presentation**: Standalone React 18 + Vite 5 SPA containerized via Nginx Alpine with HSL design tokens, dark/light theme switching, glassmorphism UI elements, slide-out cart drawer, error boundary resilience, and payment modal.
- **Application & Service Layer**: Standalone Express REST API container handling JWT authentication, input validation, role checks, optional authentication on checkout, and payment provider orchestration.
- **Domain Layer**: Core domain aggregates (`Order`, `Product`, `User`, `AuditLog`).
- **Infrastructure Layer**: SQLite embedded database storage with automated seeding script, Promise query helpers, named volume persistence, and Stripe/Razorpay SDK wrappers.


## 5. Engineering & Scalability Goals
- **API Performance Goal**: Maintain sub-300ms response time on catalog search and order placement.
- **Security Goal**: Enforce OWASP Top 10 mitigations, input sanitization, rate limiting, and immutable audit logs.
- **Maintainability Goal**: Provide complete, synchronized repository documentation inside `/docs` matching mature enterprise GitHub standards.

## 6. Authorship & Maintainer Attribution
- **Author & Architect**: **Ravi Ranjan Singh**
- **Role**: Software Engineer | Software Architect | Full Stack Developer
- **Repository Owner**: **Ravi Ranjan Singh**
