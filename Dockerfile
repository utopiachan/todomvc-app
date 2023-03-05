#stage 1
FROM node:latest as node
WORKDIR /app
COPY ./package*.json

RUN npm ci

COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/todomvc-app /usr/share/nginx/html
