FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV MONGO_HOST=${MONGO_HOST}

RUN echo ${MONGO_HOST}

CMD npm run server

EXPOSE 5000