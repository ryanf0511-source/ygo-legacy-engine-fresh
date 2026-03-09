# Simple Python runtime - NO building
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates

# Copy and install backend dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy PRE-BUILT frontend
COPY frontend/build/ ./frontend/build/

# Set working directory
WORKDIR /app/backend

# Start server
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
