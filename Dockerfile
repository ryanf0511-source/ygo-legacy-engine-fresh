# Use Node 18 for building, then Python for runtime
FROM node:18-slim AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package.json ./
COPY frontend/yarn.lock* ./

# Install dependencies
RUN yarn install --network-timeout 100000

# Copy rest of frontend
COPY frontend/ ./

# Build frontend
RUN yarn build

# Python runtime stage
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates

# Copy backend requirements
COPY backend/requirements.txt ./backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/frontend/build/ ./frontend/build/

# Set working directory to backend
WORKDIR /app/backend

# Expose port
EXPOSE 8001

# Start command
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
