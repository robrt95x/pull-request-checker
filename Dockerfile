# Use Node.js LTS Alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code and build assets
COPY . .

# Build TypeScript
RUN npm run build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S reviewer -u 1001

# Change ownership of the app directory
RUN chown -R reviewer:nodejs /app

# Switch to non-root user
USER reviewer

# Expose port (if needed for future web interface)
EXPOSE 3000

# Set the default command
CMD ["npm", "run", "start"]
