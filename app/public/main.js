const pn = {
  isSupported: ('serviceWorker' in navigator) && ('PushManager' in window),
  onSubscribe() {
    if (pn.config) {
      return fetch(`${pn.config.pushServerSocketAddress}/subscribe`, {
        method: 'POST',
        body: JSON.stringify({ path: `some path - ${new Date().getTime()}` }),
        headers:{
          'Content-Type': 'application/json'
        },
      })
    } else {
      console.log('Config has not been loaded yet...')
      return null;
    }
  },

  setConfig: async function () {
    await fetch(`${location.origin}/api-config`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('BAD');
        } else {
          pn.config = await res.json();
        }
      })
  },
};

const setupView = () => {
  if (!pn.isSupported) {
    document.querySelector('.opt-in-button').addEventListener('click', pn.onSubscribe);
  } else {
    document.querySelector('body').classList.add('unsupported');
  }
};

const initApp = () => {
  pn.setConfig();
  setupView();
};

document.addEventListener('DOMContentLoaded', initApp);

