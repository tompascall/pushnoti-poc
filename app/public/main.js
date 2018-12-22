const pn = {
  onSubscribe() {
    if (pn.config) {
      return fetch(`${pn.config.pushServerSocketAddres}/subscribe`, {
        method: 'POST',
        body: JSON.stringify({ path: `some path - ${new Date().getTime()}` }),
        headers:{
          'Content-Type': 'application/json'
        },
      })
    } else {
      console.log('WTF');
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
  }
};

const initApp = () => {
  pn.setConfig();
  document.querySelector('.opt-in-button').addEventListener('click', pn.onSubscribe);
};

document.addEventListener('DOMContentLoaded', initApp);

