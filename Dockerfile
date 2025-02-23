# Estágio base com dependências compartilhadas
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./

# Estágio de desenvolvimento
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Estágio de build
FROM base AS builder
ENV NODE_ENV=production
RUN npm install
COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:alpine AS production
ENV NODE_ENV=production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]