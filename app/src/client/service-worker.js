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
  const { title, body, icon, actions, requireInteraction } = notification;
  const promiseChain = self.registration.showNotification(title, {
    body,
    icon,
    actions,
    requireInteraction
  }).then(result => { console.log('result', result); return result });

  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const examplePage = '/personal-page';
  const promiseChain = clients.openWindow(examplePage);
  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclose', function(e) {
  console.log('Notification has been closed');
});