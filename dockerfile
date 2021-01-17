FROM node:15.5.1-alpine3.10 as builder
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install npm@7.4.0
RUN npm run build

FROM nginx:1.19-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/aida-next /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]