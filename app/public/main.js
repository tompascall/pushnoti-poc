const pn = (app) => {
  const pushnoti = {
    isSupported: ('serviceWorker' in navigator) && ('PushManager' in window),
    serviceWorkerRegistration: null,
    hasPermission: null,

    registerServiceWorker() {
      return navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service worker successfully registered.');
        pn.serviceWorkerRegistration = registration;
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
        if (permissionResult !== 'granted') {
          throw new Error('We weren\'t granted permission.');
        }
        pushnoti.hasPermission = true;
        console.log('HAS PERMISION')
      });
    },

    onSubscribe: async () => {
      try {
        await pushnoti.askPermission();
        return fetch(`${app.config.pushServerSocketAddress}/subscribe`, {
          method: 'POST',
          body: JSON.stringify({ path: `some path - ${new Date().getTime()}` }),
          headers:{
            'Content-Type': 'application/json'
          },
        })
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
          throw new Error('BAD');
        } else {
          pnApp.config = await res.json();
          console.log(pnApp.config)
        }
      })
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
    pushnoti.registerServiceWorker();
  } else {
    setupView({ supported: false })
  }
};

document.addEventListener('DOMContentLoaded', start(pn(pnApp)));

