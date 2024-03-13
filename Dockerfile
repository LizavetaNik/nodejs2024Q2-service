FROM node:18-alpine

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install --production && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE 4000