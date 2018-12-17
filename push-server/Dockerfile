FROM node:8
WORKDIR /usr/src/push-server
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8123
CMD ["npm", "start"]
