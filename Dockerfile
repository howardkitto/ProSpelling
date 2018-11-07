FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

CMD npm run server

EXPOSE 5000