const express = require('express')
const router = express.Router()
const push = require('../middleware/push');

router.get('/', function (req, res) {
  res.send('Push api is running');
})

router.post('/trigger-push-message', [
  push.triggerPushMessage,
  (req, res) => res.status(200).send('Success!')
]);

router.post('/save-subscription', push.saveSubscription);

module.exports = router;