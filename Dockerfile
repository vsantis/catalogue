FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
ENV BROWSER none
ENV REACT_APP_BACK_URL http://localhost:3001/products
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]