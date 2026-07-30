# 05 — Use Cases

## Use Case UC-01: Complete Customer Checkout Workflow
```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Frontend
    participant Backend API
    participant Payment Gateway (Stripe/Razorpay)
    participant Database

    Customer->>Frontend: Click "Proceed to Checkout"
    Frontend->>Backend API: POST /api/v1/orders/checkout (Items, Address, Promo)
    Backend API->>Database: Validate Stock & Calculate Total
    Backend API-->>Frontend: Return Order Summary & Gateway Token
    Customer->>Frontend: Select Payment Gateway & Enter Details
    Frontend->>Payment Gateway: Authorize Payment
    Payment Gateway-->>Frontend: Payment Success Confirmation
    Frontend->>Backend API: POST /api/v1/payments/verify (Signature / Intent ID)
    Backend API->>Database: Mark Order status = PAID & Reserve Stock
    Backend API->>Database: Record Audit Log Entry
    Backend API-->>Frontend: Return Order Confirmation & Invoice ID
```

## Use Case UC-02: Admin Inventory Update & Audit Logging
1. Admin logs into platform (`admin@luxemarket.com`).
2. Admin navigates to Admin Panel -> Inventory Management.
3. Admin selects product and updates price/stock count.
4. Backend verifies Admin JWT token and updates database record.
5. Backend creates an entry in `audit_logs` table recording `action: PRODUCT_UPDATE`, `user_id`, `timestamp`, and `details`.
