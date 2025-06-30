FROM node:22-alpine
EXPOSE 5556

RUN mkdir /app

COPY package.json package-lock.json /app/
RUN cd /app && npm install

WORKDIR /app

CMD [ "npm", "run" ,"start:dev" ]
