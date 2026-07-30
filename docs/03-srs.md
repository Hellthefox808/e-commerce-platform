# 03 — Software Requirements Specification (SRS)

## 1. System Interfaces
- **User Interface**: Web Application (React/Next.js) supporting desktop, tablet, and mobile viewpoints (responsive viewport down to 320px width).
- **Payment Interface**: HTTPS REST API communication with Stripe API (`v1/payment_intents`) and Razorpay API (`v1/orders`).
- **Storage Interface**: Cloudinary REST API / S3 SDK for image uploads with client-side preview.

## 2. Non-Functional Requirements
- **Performance**: 95th percentile response time < 300ms for read requests, < 500ms for order placement.
- **Availability**: 99.9% uptime target with zero data loss for completed transactions.
- **Security**: TLS 1.3 encryption in transit, AES-256 for sensitive data at rest, bcrypt password hashing with salt factor 10, JWT secret expiration (15m access token, 7d refresh token).
- **Scalability**: Stateless backend API instances capable of horizontal scaling behind a reverse proxy (Nginx / Vercel / Docker Compose).
