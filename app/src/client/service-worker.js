console.log('Service worker is loaded');

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
  });

  event.waitUntil(promiseChain);
});