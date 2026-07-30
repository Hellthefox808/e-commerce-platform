# 07 — Domain Driven Design (DDD)

## Bounded Contexts
1. **Identity & Access Context**: User registration, authentication, JWT tokens, RBAC roles (`Customer`, `Seller`, `Admin`).
2. **Catalog & Inventory Context**: Categories, Brands, Products, Stock attributes, Price rules.
3. **Cart & Wishlist Context**: Session-persistent cart, cart item calculation, promo code validation.
4. **Order & Payment Context**: Order aggregate root, order state transitions, Stripe PaymentIntent, Razorpay Order signature verification.
5. **Analytics & Governance Context**: Revenue aggregates, sales trends, security audit logs.

## Domain Entities & Aggregates
- **Order Aggregate**: `Order` (Root) -> contains array of `OrderItem` value objects + `ShippingAddress` value object + `PaymentInfo` value object.
- **Product Aggregate**: `Product` (Root) -> contains `Category` reference, `Brand` reference, `Stock` quantity, `Reviews` collection.
