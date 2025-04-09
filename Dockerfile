# === Frontend build stage ===
FROM node:18 AS frontend

WORKDIR /app
COPY cricket/ ./cricket
WORKDIR /app/cricket

RUN npm install
RUN npm run build

# === Backend stage ===
FROM node:18 AS backend

WORKDIR /app

# Copy backend files
COPY Backend/ ./Backend
WORKDIR /app/Backend

# Install backend dependencies
RUN npm install

# Copy built frontend to backend's public folder
COPY --from=frontend /app/cricket/build ./public

# Expose API port
EXPOSE 5000

CMD ["node", "index.js"]
