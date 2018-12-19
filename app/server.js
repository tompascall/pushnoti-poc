const express = require('express');
const path = require('path');

const PORT = 8124;
const HOST = '0.0.0.0';

const app = express();
app.use('/assets', express.static('public'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
