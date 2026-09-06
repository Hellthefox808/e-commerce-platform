# LuxeCommerce Standalone Production Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies (only production)
COPY package*.json ./
RUN npm install --omit=dev

# Copy backend source code
COPY . .

# Ensure data directory exists for persistent SQLite database
RUN mkdir -p data

# Default environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose API port
EXPOSE 5000

# Health check against health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start backend server
CMD ["node", "server.js"]
