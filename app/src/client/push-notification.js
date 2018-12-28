import { urlBase64ToUint8Array } from './utils';

export default (app) => {
  const pushnoti = {
    isSupported: ('serviceWorker' in navigator) && ('PushManager' in window),
    serviceWorkerRegistration: null,
    hasPermission: null,

    registerServiceWorker() {
      if (pushnoti.registration) {
        return Promise.resolve(pushnoti.registration);
      }
      return navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service worker successfully registered.');
        pushnoti.registration = registration;
        return registration;
      })
      .catch(function(err) {
        console.error('Unable to register service worker.', err);
      });
    },

    askPermission() {
      return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
          resolve(result);
        });

        if (permissionResult) {
          permissionResult.then(resolve, reject);
        }
      })
      .then(function(permissionResult) {
        console.log('permission', permissionResult)
        if (permissionResult !== 'granted') {
          throw new Error('We weren\'t granted permission.');
        }
        pushnoti.hasPermission = true;
        console.log('HAVE PERMISSION')
      });
    },

    subscribeUserToPush() {
      return pushnoti.registerServiceWorker()
      .then(function(registration) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(app.config.pushServerVapidPublicKey),
        };
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then((pushSubscription) => {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
      })
      .catch((error) => {
        console.log('Something bad happened during push subscription', error)
      });
    },

    sendSubscriptionToBackEnd(subscription) {
      return fetch(`${app.config.pushApiUrl}/save-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Bad status code from server.');
        }
        return response.json();
      })
      .then(function(responseData) {
        if (!(responseData.data && responseData.data.success)) {
          throw new Error('Bad response from server.');
        }
      });
    },

    onSubscribe: (onSuccess, onError) => async () => {
      try {
        await pushnoti.askPermission();
        const subscription = await pushnoti.subscribeUserToPush();
        await pushnoti.sendSubscriptionToBackEnd(subscription);
        onSuccess();
      } catch(e) {
        console.log(e);
      }
    },
  };
  return pushnoti;
};