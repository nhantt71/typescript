FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies and required type definitions
RUN npm install && \
    npm install --save-dev @types/express @types/body-parser @types/cors

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy only production files
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

EXPOSE 3001

CMD ["node", "dist/server.js"]

# #Use an official Node.js image as the base
# FROM node:18-alpine

# #Set the working directory
# WORKDIR /usr/src/app

# #Install Git (required for some npm packages)
# RUN apk add --no-cache git

# #Copy package files
# COPY package*.json ./

# #Install dependencies (including `ts-node` for TypeScript runtime)
# RUN npm install

# #Copy all project files into the container
# COPY . .

# #Expose the application port
# EXPOSE 3001

# #Start the application using `ts-node`
# CMD ["npx", "ts-node", "src/server.ts"]
