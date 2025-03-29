# Use a lightweight Node.js image
FROM node:22.11.0-alpine AS build

# Set the working directory
WORKDIR /app

# Copy lockfile and package.json
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source files and build the application
COPY . .
RUN npm run build:cron

# Use a minimal runtime image
FROM node:22.11.0-alpine

# Set the working directory
WORKDIR /app

# Copy only the production artifacts from the build stage
COPY --from=build /app ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/cron.js"]
