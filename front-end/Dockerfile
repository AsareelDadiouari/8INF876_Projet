FROM node:18.12.1-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
COPY dist .
RUN npm config set legacy-peer-deps true
RUN npm install -g npm@9.6.4
RUN npm install -g @angular/cli
RUN npm install
COPY . .
#RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/front-end /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
