# SHAT Development & Growth Platform — Production Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy application source code
COPY . .

# Build production assets using Vite
RUN npm run build

# Expose dedicated API and frontend port
EXPOSE 3001

# Production environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Start the full-stack server
CMD ["node", "server/server.js"]
