FROM node:13.12 as build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY public ./public

RUN npm run build

FROM nginx

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
