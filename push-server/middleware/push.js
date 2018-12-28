const store = require('./store');
const webpush = require('web-push');
const config = require('../config');
const aws = require('../utils/aws');

aws.getPushServerKey

  .then(vapidServerKey => {
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

exports.saveSubscription = (req, res) => {
  const { body: {
    endpoint,
    keys,
  } } = req;
  const connection = store.createConnection();
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

const parseMessage = (req, res) => {
  const { body } = req;
  try {
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
  return webpush.sendNotification(subscription, message)
  .catch((err) => {
    if (err.statusCode === 410) {
      return deleteSubscriptionFromStore(subscription.id);
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
      .catch(next)
};
