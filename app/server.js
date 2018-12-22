const express = require('express');
const path = require('path');
const config = require('./config');

const PORT = config.get('appServerPort');
const HOST = config.get('appServerHost');


const app = express();
app.use('/assets', express.static('public'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api-config', (req, res) => {
  res.send(JSON.stringify({
    pushServerSocketAddress: config.get('pushServerSocketAddress'),
  }));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
