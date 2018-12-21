const pn = {
  onSubscribe() {
    return fetch('http://localhost:8123/subscribe', {
      method: 'POST',
      body: JSON.stringify({ path: `some path - ${new Date().getTime()}` }),
      headers:{
        'Content-Type': 'application/json'
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('BAD');
        } else {
          const result = await res.json();
          return result;
        }
      })
      .then((result) => { console.log('result', result); })
      .catch(error => { console.log('error', error) });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.opt-in-button').addEventListener('click', () => {
    pn.onSubscribe();
  });
});

