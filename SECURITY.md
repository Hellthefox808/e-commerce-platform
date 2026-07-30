# Security Policy & Vulnerability Disclosure

## 1. Reporting Security Vulnerabilities
If you discover a security vulnerability or potential credential exposure in **LuxeCommerce**, please do **NOT** create a public issue. Instead, disclose the issue directly to the repository maintainer:

- **Maintainer**: **Ravi Ranjan Singh**
- **Security Contact**: Contact via GitHub Profile ([github.com/raviranjansingh](https://github.com/raviranjansingh))

## 2. Secrets Management & Credential Safety
- All API keys, JWT secrets, and payment credentials MUST be passed via environment variables (see `.env.example`).
- Never commit real private keys, database passwords, or payment API tokens into version control.
- Hardcoded fallback secrets in development environments must be replaced with production environment variables before deployment.

## 3. Supported Security Protections
- **Authentication**: JWT token rotation with bcrypt password hashing (cost factor 10).
- **Access Control**: Role-Based Access Control matrix (`Guest`, `Customer`, `Seller`, `Admin`, `Super Admin`).
- **OWASP Mitigations**: Rate limiting (150 requests/15min window), XSS defense headers, SQL/NoSQL query parameterization, and immutable audit logging.
