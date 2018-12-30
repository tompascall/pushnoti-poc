const store = require('./store');
const webpush = require('web-push');
const config = require('../config');
const aws = require('../utils/aws');

aws.getPushServerKey

  .then(vapidServerKey => {
    console.log('GOT VAPID PRIVATE KEY', vapidServerKey)
    webpush.setVapidDetails(
      `mailto:${config.get('pushServerMailto')}`,
      config.get('pushServerVapidPublicKey'),
      vapidServerKey
    );
  })
  .catch(e => {
    throw e;
  });

const initWebpush = async () => {
  try {
  } catch (e) {
    throw e;
  }
};

exports.saveSubscription = async (req, res, next) => {
  const { body: {
    endpoint,
    keys,
  } } = req;
  const connection = store.createConnection();
  try {
    await connection.query(`INSERT INTO DEVICE (id, endpoint, p256dh, auth)
      SELECT 0, ?, ?, ?
      FROM dual
      WHERE NOT EXISTS (SELECT 1 FROM DEVICE WHERE endpoint=?)`,
      [endpoint, keys.p256dh, keys.auth, endpoint],
    (error, results, fields) => {
      if (error) {
        console.log(error)
        res.json(error)
      }
      res.send(JSON.stringify({ data: { success: true } }));
      connection.end();
    });
  } catch(e) {
    next(e);
  }
};

const parseMessage = (req, res) => {
  const { body } = req;
  try {
    JSON.parse(body.msg);
    return body.msg;
  }
  catch(e) {
    res.status(400).send(`Badly formatted JSON error: ${e.message}`)
  }
};

const getSubscriptions = () => {
  const connection = store.createConnection();
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM DEVICE LIMIT 1;`,
    (error, results, fields) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve(results);
      connection.end();
    });
  });
};

const deleteSubscriptionFromStore = (id) => {
  console.log('SHOULD BE DELETED:', id);
};

const sendMessageToSubscriber = (subscription, message) => {
  return webpush.sendNotification(subscription, message )
  .then((result) => { console.log('SEND MESSAGE TO SUBSCRIBER', result) })
  .catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromStore(subscription);
    } else {
      console.log('Subscription is no longer valid: ', err);
    }
  });
}

const formatSubscription = (subscription) => ({
  endpoint: subscription.endpoint,
  keys: {
    auth: subscription.auth,
    p256dh: subscription.p256dh
  }
});

exports.triggerPushMessage = async (req, res, next) => {
  const message = parseMessage(req, res);
  const subscriptions = await getSubscriptions();
  let queue = Promise.resolve();

    subscriptions.forEach((subscription, i) => {
      queue = queue.then(() => {
        return sendMessageToSubscriber(formatSubscription(subscription), message);
      });
    });

    queue
      .then(() => next())
      .catch((e) => { throw e; })
};
