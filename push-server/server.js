const express = require('express');
const bodyParser = require('body-parser');
const DataBaseHandler = require('./utils/database-handler');
const config = require('./config');
const path = require('path');

const dataBaseHandler = new DataBaseHandler();

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

app.get('/', (req, res) => {
  res.send('push server is running');
});

app.get('/test-push', (req, res) => {
  res.sendFile(path.join(__dirname + '/test-push.html'));
});

app.post('/trigger-push-message', (req, res) => {
  const { body } = req;
  try {
    const message = JSON.parse(body.msg);
    res.status(200).send('Success!');
  }
  catch(e) {
    res.status(400).send(`Badly formatted JSON error: ${e.message}`)
  }
});

app.post('/save-subscription', (req, res) => {
  const { body: {
    endpoint,
    keys,
  } } = req;
  const connection = dataBaseHandler.createConnection();
  connection.query(`INSERT INTO DEVICE (id, endpoint, p256dh, auth)
  VALUES (0, ?, ?, ?)`,[endpoint, keys.p256dh, keys.auth],
  (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json(error)
    }
    res.send(JSON.stringify({ data: { success: true } }));
    connection.end();
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
