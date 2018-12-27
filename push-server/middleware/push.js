const dataBaseHandler = new (require('../utils/database-handler'))();

exports.saveSubscription = (req, res) => {
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
};

exports.parseMessage = (req, res, next) => {
  const { body } = req;
  try {
    res.locals.pushMessage = JSON.parse(body.msg);
    res.status(200).send('Success!');
  }
  catch(e) {
    res.status(400).send(`Badly formatted JSON error: ${e.message}`)
  }
};