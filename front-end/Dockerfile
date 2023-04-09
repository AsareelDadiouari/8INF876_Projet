FROM node:18.12.1 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY . .
RUN npm config set legacy-peer-deps true
RUN npm install && node_modules/.bin/ng build --configuration production

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/poa-front-end /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
