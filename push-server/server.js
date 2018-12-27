const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const pushApiRoute = require('./route/push-api');

const PORT = config.get('pushServerPort');
const HOST = config.get('pushServerHost');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/push-api', pushApiRoute);

app.get('/test-push', (req, res) => {
  res.sendFile(path.join(__dirname + '/test-push.html'));
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
