# Use Python 3.10 slim image
FROM python:3.10-slim

# Set working directory
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

# Copy pre-built frontend
COPY frontend/build/ ./frontend/build/

# Set working directory to backend
WORKDIR /app/backend

# Expose port (Railway will override with $PORT)
EXPOSE 8001

# Start command
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
