FROM node:lts

ARG PORT=8080
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY . ./

EXPOSE $PORT

RUN ["npm", "run", "start"]
