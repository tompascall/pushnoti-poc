const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8123;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('push server is running');
});

app.post('/subscribe', (req, res) => {
  console.log(req.body);
  res.json({ data: 'abrakadabra' });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
