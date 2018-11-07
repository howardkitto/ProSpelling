FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

ENV MONGO_HOST="mongodb://ProSpellingMongoCloud:ed3c1a55-95a0-4844-80ad-250da9746ad6@prospelling-shard-00-00-iqype.mongodb.net:27017,prospelling-shard-00-01-iqype.mongodb.net:27017,prospelling-shard-00-02-iqype.mongodb.net:27017/test?ssl=true&replicaSet=ProSpelling-shard-0&authSource=admin&retryWrites=true"

RUN npm install

CMD npm run server

EXPOSE 5000