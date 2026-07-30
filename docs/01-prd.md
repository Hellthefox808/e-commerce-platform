# 01 — Product Requirements Document (PRD)

## 1. Objectives & Goals
- Provide an intuitive end-to-end shopping interface for consumers with < 200ms API response time.
- Empower sellers to list items, monitor inventory levels, and process orders efficiently.
- Give platform administrators full governance, security audit control, and business analytics.

## 2. Target Persona & User Roles
| Role | Description | Key Capabilities |
| --- | --- | --- |
| **Guest** | Unauthenticated site visitor | Browse catalog, view product details, search, add items to temporary cart |
| **Customer** | Registered shopper | Checkout, save addresses, track order status, review products, manage wishlist |
| **Seller** | Product vendor | Manage product listings, update inventory, manage fulfillment states |
| **Admin** | Store manager | Manage catalog taxonomy, manage promotions/coupons, review order analytics |
| **Super Admin** | System owner | Manage RBAC roles, inspect system audit logs, configure global settings |

## 3. High-Level Requirements
1. **Authentication**: Email/Password JWT auth with access token + refresh token rotation; Google OAuth support.
2. **Catalog Management**: Hierarchical categories, brand filters, attribute tags, stock reservation, low stock alerts.
3. **Cart & Checkout**: Real-time price calculation, promo code application (`LUXE10` 10% discount), shipping tax estimation, multi-payment gateway selection (Stripe & Razorpay).
4. **Order Management**: Order state machine (`PENDING` -> `PAID` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED` -> `CANCELLED`), order cancellation, invoice generation.
5. **Analytics & Auditing**: Track sales revenue by timeframe, top selling products, customer registration metrics, and security audit logs.
