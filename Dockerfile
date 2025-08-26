# Multi-stage Docker build
FROM node:18-alpine AS frontend-build

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Backend setup
FROM node:18-alpine AS backend-setup

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Final production image
FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S weather -u 1001

# Set working directory
WORKDIR /app

# Copy backend
COPY --from=backend-setup --chown=weather:nodejs /app/backend ./backend

# Copy built frontend
COPY --from=frontend-build --chown=weather:nodejs /app/frontend/build ./frontend/build

# Create static file serving setup
RUN mkdir -p ./backend/public && \
    cp -r ./frontend/build/* ./backend/public/ && \
    chown -R weather:nodejs ./backend/public

# Expose port
EXPOSE 5000

# Switch to non-root user
USER weather

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "backend/server.js"]