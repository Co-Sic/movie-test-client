FROM node:13.12 as build
WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY public ./public
COPY .env* ./

RUN ls -lA

RUN npm run build

FROM nginx

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
