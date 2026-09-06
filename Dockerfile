# LuxeCommerce Root Dockerfile Reference
# Frontend and Backend are decoupled into standalone containers:
#   - Backend:  backend/Dockerfile
#   - Frontend: frontend/Dockerfile
#
# To build and run both together:
#   docker-compose up --build

FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./
RUN mkdir -p data
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000
CMD ["node", "server.js"]
