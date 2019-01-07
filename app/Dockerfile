FROM node:8-alpine
WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
ARG TEST_PAGE_URL=http://localhost:8123/test-push
RUN npm run build
CMD ["node", "src/server/start.js"]

