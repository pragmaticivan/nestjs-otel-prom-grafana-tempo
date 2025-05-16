FROM node:22-alpine
EXPOSE 5555

RUN mkdir /app

COPY package.json package-lock.json /app/
RUN cd /app && npm install

WORKDIR /app

COPY . /app

RUN npm run build

CMD [ "npm", "run" ,"start" ]
