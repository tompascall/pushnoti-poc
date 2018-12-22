FROM node:8-alpine
WORKDIR /usr/src/push-server
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
