self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('installing worker');
});

self.addEventListener('push', function(event) {
  let notification = {
    title: 'Default Title',
    body: 'Default message body'
  };

  if (event.data) {
    console.log('This push event has data: ', event.data.json());
    ({ notification } = event.data.json());
  } else {
    console.log('This push event has no data.');
  }
  const promiseChain = self.registration.showNotification(notification.title, {
    body: notification.body,
  }).then(result => { console.log('result', result); return result });

  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});