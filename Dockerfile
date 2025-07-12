# Use Node.js LTS Alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only and create non-root user
RUN npm ci --only=production && npm cache clean --force && \
    addgroup -g 1001 -S nodejs && \
    adduser -S netball -u 1001

# Copy application files
COPY . .

# Change ownership to non-root user
RUN chown -R netball:nodejs /app

# Switch to non-root user
USER netball

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
