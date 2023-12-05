FROM node:18-alpine  AS front-build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm update

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
