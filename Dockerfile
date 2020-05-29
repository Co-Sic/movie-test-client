FROM node:13.12
WORKDIR /usr/src/app

COPY tsconfig.json package.json package-lock.json ./
COPY public ./public
COPY src ./src

RUN npm ci

# fixing bug of react dev server with ipv6, see: https://github.com/facebook/create-react-app/issues/8806
RUN sed -i 's/window\.location\.hostname,$/window.location.hostname.replace(\/^\\[(.*)\\]$\/, "$1"),/' node_modules/react-dev-utils/webpackHotDevClient.js

ENTRYPOINT ["npm", "start", "--"]
