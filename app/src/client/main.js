require('../style/main.css');

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const pn = (app) => {
  const pushnoti = {
    isSupported: ('serviceWorker' in navigator) && ('PushManager' in window),
    serviceWorkerRegistration: null,
    hasPermission: null,

    registerServiceWorker() {
      return navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service worker successfully registered.');
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
      return fetch(`${app.config.pushServerSocketAddress}/save-subscription`, {
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

    onSubscribe: async () => {
      try {
        await pushnoti.askPermission();
        const subscription = await pushnoti.subscribeUserToPush();
        return pushnoti.sendSubscriptionToBackEnd(subscription);
      } catch(e) {
        console.log(e);
      }
    },
  };
  return pushnoti;
};

const pnApp = {
  setConfig: async function () {
    return await fetch(`${location.origin}/api-config`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Cannot fetch config');
        } else {
          pnApp.config = await res.json();
          console.log(pnApp.config)
        }
      });
  },
};

const setupView = ({ supported, pushnoti } = {}) => {
  if (supported) {
    document.querySelector('.opt-in-button').addEventListener('click', pushnoti.onSubscribe);
  } else {
    document.querySelector('body').classList.add('unsupported');
  }
};

const start = (pushnoti) => async () => {
  if (pushnoti.isSupported) {
    setupView({supported: true, pushnoti });
    await pnApp.setConfig();
  } else {
    setupView({ supported: false })
  }
};

document.addEventListener('DOMContentLoaded', start(pn(pnApp)));

