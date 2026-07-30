# 12 — Coding Standards & Guidelines

## General Principles
- **TypeScript Strict Mode**: `strict: true` across both frontend and backend configurations.
- **Explicit Type Definitions**: Avoid `any` types; create explicit interface and type DTO definitions.
- **Error Handling**: Use custom application error classes (`AppError`, `UnauthorizedError`, `ValidationError`, `NotFoundError`) mapped to HTTP status codes via global error handling middleware.
- **Clean Code & SOLID**:
  - Single Responsibility: Keep controllers thin, delegate business rules to service objects.
  - Dependency Injection: Inject database repositories and payment provider clients into service constructors.
