FROM node:20-alpine AS builder
ENV VITE_BASE_URL=djblog-latest.onrender.com
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm cache clean --force
RUN npm install --verbose \
    --prefer-offline \
    --no-audit \
    --legacy-peer-deps \
    --force

COPY . .
RUN npm rebuild

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine3.20-slim

ENV VITE_BASE_URL=djblog-latest.onrender.com
# Install security updates and clean up
RUN apk update && \
    apk upgrade --no-cache && \
    rm -rf /var/cache/apk/* && \
    rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder --chown=nginx:nginx /app/dist/ /usr/share/nginx/html

# Add security headers
RUN echo 'add_header X-Frame-Options "SAMEORIGIN";' >> /etc/nginx/conf.d/default.conf && \
    echo 'add_header X-Content-Type-Options "nosniff";' >> /etc/nginx/conf.d/default.conf && \
    echo 'add_header X-XSS-Protection "1; mode=block";' >> /etc/nginx/conf.d/default.conf && \
    echo 'add_header Content-Security-Policy "default-src '\''self'\''; img-src '\''self'\'' data: https:; style-src '\''self'\'' '\''unsafe-inline'\''; script-src '\''self'\'' '\''unsafe-inline'\'' '\''unsafe-eval'\''; connect-src '\''self'\'' https:;";' >> /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]