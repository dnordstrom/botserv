FROM node:10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN yarn
COPY . .
CMD yarn start
EXPOSE 3000