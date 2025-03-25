# Используем Node.js 23
FROM node:23-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
RUN npm install
COPY . .

# Указываем порт (5000)
EXPOSE 5000

# Запускаем сервер
CMD ["node", "server.js"]
