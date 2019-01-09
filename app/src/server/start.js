const express = require('express');
const path = require('path');
const config = require('../config');

const PORT = config.get('appServerPort');
const HOST = config.get('appServerHost');


const app = express();
app.use('/assets', express.static('public'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../../public/index.html'));
});

app.get('/personal-page', (req, res) => {
  res.status(200).send('Personal Page');
});

app.get('/api-config', (req, res) => {
  res.send(JSON.stringify({
    pushApiUrl: config.get('pushApiUrl'),
    pushServerVapidPublicKey: config.get('pushServerVapidPublicKey'),
  }));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
