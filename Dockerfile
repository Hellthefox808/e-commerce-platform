# Multi-stage Dockerfile for LuxeCommerce Backend & Static Production Build
FROM node:20-alpine AS base
WORKDIR /app

# Backend stage
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend/ ./backend/

# Expose API Port
EXPOSE 5000

CMD ["node", "backend/server.js"]
