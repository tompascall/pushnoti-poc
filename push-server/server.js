const express = require('express');
const bodyParser = require('body-parser');
const DataBaseHandler = require('./utils/database-handler');
const config = require('./config');

const dataBaseHandler = new DataBaseHandler();

const PORT = config.get('pushServerPort');
const HOST = config.get('pushServerHost');

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('push server is running');
});

app.post('/subscribe', (req, res) => {
  const { body: {
    path
  } } = req;
  const connection = dataBaseHandler.createConnection();
  connection.query(`INSERT INTO DEVICE (id, path)
  VALUES (0, ?)`,[path],
  (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json(error)
    }
    res.send(JSON.stringify({ data: 'trallali' }));
    connection.end();
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
