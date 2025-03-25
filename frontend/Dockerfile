# Используем Node.js 23 для сборки фронтенда
FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

# Собираем React
RUN npm run build

# Используем Nginx для раздачи фронта
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Открываем порт 80 (чтобы фронт был доступен)
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
