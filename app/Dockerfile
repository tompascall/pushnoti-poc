FROM node:8-alpine
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]

