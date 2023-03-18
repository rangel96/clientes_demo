FROM node:18.15-buster-slim

RUN apt update && apt -y upgrade \
    && npm install -g npm@9.6.1 && npm install -g @angular/cli@15.2.2 && npm install -g firebase-tools \
    apt list --upgradable

RUN mkdir /app

COPY src /app

WORKDIR /app

ENTRYPOINT ["/app/entrypoint.sh"]
