# Estágio 1: Build do frontend
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Estágio 2: Apache servindo arquivos estáticos
FROM alpine:3.20

RUN apk add --no-cache apache2 apache2-utils

RUN mkdir -p /var/www/html

COPY --from=build /app/dist /var/www/html

EXPOSE 80

CMD ["httpd", "-D", "FOREGROUND"]
