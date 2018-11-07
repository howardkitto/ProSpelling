FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

CMD npm install

# CMD npm run server

EXPOSE 8080