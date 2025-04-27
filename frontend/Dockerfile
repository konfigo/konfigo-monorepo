# Set base image to node:20-slim and create a new stage called 'build'
FROM node:23-slim AS build

# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack
RUN corepack enable

# Set working directory to /app
WORKDIR /app

# Copy all to the working directory
COPY ./ ./

# Install dependencies using pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build

# Expose 4200 port
EXPOSE 4200

# production stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
WORKDIR /app

# Copy nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
