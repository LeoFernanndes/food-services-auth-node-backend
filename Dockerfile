FROM node:18 as build-stage

WORKDIR /usr/src/root

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

RUN npm run test || exit 1

RUN rm -rf ./src

EXPOSE 3000

ENTRYPOINT ["node", "/usr/src/root/dist/index.js"]