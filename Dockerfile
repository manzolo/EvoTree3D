# syntax=docker/dockerfile:1

# --- Stage 1: dependencies ---
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# --- Stage 2: development (Vite dev server with HMR) ---
FROM node:24-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --- Stage 3: production build ---
FROM node:24-alpine AS build
WORKDIR /app
ARG VITE_BASE=/
ENV VITE_BASE=${VITE_BASE}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Stage 4: static nginx server ---
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
