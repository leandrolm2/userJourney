FROM node:20.11.1-alpine3.19 AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
COPY .env .env
RUN npm run build

FROM nginx:1.25.4-alpine3.18
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

EXPOSE 4000
ENTRYPOINT ["nginx", "-g", "daemon off;"]


