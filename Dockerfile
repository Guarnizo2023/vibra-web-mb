FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy project files
COPY . .

# Expose port for Expo
EXPOSE 19000 19001 19002 19006

# Set environment to development by default
ENV NODE_ENV=development

# Start Expo server
CMD ["npm", "run", "web"]