# 16 — Testing Strategy

## Test Coverage Layers
- **Unit Testing**: Jest / Vitest for utility functions, price calculations, promo code validation logic.
- **Integration Testing**: Supertest for REST API route tests (`/api/v1/products`, `/api/v1/auth/login`, `/api/v1/orders`).
- **E2E Testing**: Cypress / Playwright user checkout flow simulation.
- **Security Testing**: Automated OWASP ZAP vulnerability scans and ESLint security plugin rules.
