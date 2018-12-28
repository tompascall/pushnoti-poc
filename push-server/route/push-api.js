const express = require('express')
const router = express.Router()
const push = require('../middleware/push');

router.get('/', function (req, res) {
  res.send('Push api is running');
})

router.post('/trigger-push-message', [
  push.parseMessage,

]);

router.post('/save-subscription', push.saveSubscription);

module.exports = router;