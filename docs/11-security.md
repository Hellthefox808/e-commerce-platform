# 11 — Security Specification

## Security Protocols & Protections
1. **Authentication & JWT Token Management**:
   - Access Tokens: Short-lived HMAC SHA-256 JWTs (15-minute expiry).
   - Refresh Tokens: Stored in HTTP-only `SameSite=Strict` secure cookies with DB validation.
2. **Role-Based Access Control (RBAC)**:
   - Declarative route guards (`requireRole(['ADMIN', 'SUPER_ADMIN'])`).
3. **OWASP Top 10 Protections**:
   - **XSS Protection**: Content-Security-Policy headers via Helmet.js, input sanitization.
   - **CSRF Mitigation**: Anti-CSRF token verification on state-changing requests.
   - **NoSQL / SQL Injection**: Parameterized SQL queries / Prisma ORM abstraction.
   - **Rate Limiting**: 100 requests per 15-minute window per IP on standard endpoints, 5 requests per 15-minute window on `/api/v1/auth/login`.
4. **Audit Logging**:
   - Every administrative write, inventory change, price modification, and login event is recorded immutably in `audit_logs`.
