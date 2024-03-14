FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production && npm cache clean --force

RUN npm install -g @nestjs/cli

COPY . .

RUN npx prisma generate

EXPOSE 4000