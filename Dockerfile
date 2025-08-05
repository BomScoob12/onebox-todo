# Multi-stage build for fullstack Todo app
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Build stage - Build React app
FROM base AS build
COPY client/ ./client/
RUN cd client && npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Copy server files
COPY server/ ./server/

# Copy built React app from build stage
COPY --from=build /app/client/dist ./server/public

# Install only production dependencies for server
WORKDIR /app/server
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"] 