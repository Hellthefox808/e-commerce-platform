# 06 — System Architecture

## Architecture Diagram
```mermaid
graph TD
    Client[Browser / Mobile Client] -->|HTTPS / REST API| Gateway[Express API Gateway / Router]
    
    subgraph Presentation & Application Layers
        Gateway --> AuthMiddleware[Auth & RBAC Middleware]
        AuthMiddleware --> ProductController[Product Controller]
        AuthMiddleware --> OrderController[Order Controller]
        AuthMiddleware --> PaymentController[Payment Controller]
        AuthMiddleware --> AdminController[Admin Controller]
    end

    subgraph Domain & Service Layer
        ProductController --> ProductService[Product Domain Service]
        OrderController --> OrderService[Order Fulfillment Service]
        PaymentController --> StripeRazorpayService[Stripe / Razorpay Payment Adapter]
        AdminController --> AuditService[Audit Logging Service]
    end

    subgraph Infrastructure Layer
        ProductService --> Database[(Prisma / MongoDB / SQLite DB)]
        OrderService --> Database
        OrderService --> RedisCache[(Redis Session & Stock Cache)]
        AuditService --> Database
    end
```

## Architectural Decoupling Principles
- **Presentation Layer**: Express controllers handling HTTP status codes, payload parsing, and response formatting.
- **Application Layer**: Use cases validating inputs via Zod schema contracts and orchestrating domain services.
- **Domain Layer**: Core business models (Order entity state machine, Cart aggregation, Price calculation rules).
- **Infrastructure Layer**: Prisma ORM database repositories, Redis cache connector, Stripe SDK wrapper, and Razorpay API client.
