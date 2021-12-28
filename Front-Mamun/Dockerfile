# Build #
FROM node:16.13-alpine AS build
WORKDIR /src/app
COPY package.json ./
RUN npm install
COPY . .
npm run build

# Run #
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/app/dist/MamunFront /usr/share/nginx/html
EXPOSE 8080
