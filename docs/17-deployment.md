# 17 — Deployment Guide

## Production Deployment Topology
- **Docker Compose**: Containerized setup linking `frontend`, `backend`, `redis`, and `mongodb` / `postgres`.
- **Hosting Recommendations**:
  - Frontend: Vercel / Netlify / AWS CloudFront.
  - Backend: Railway / AWS ECS / Render.
  - Database: MongoDB Atlas / AWS RDS PostgreSQL / SQLite File Volume.
