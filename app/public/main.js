const pn = {
  onSubscribe() {
    return fetch('http://localhost:8123/subscribe', {
      method: 'POST',
      body: JSON.stringify({ id: 'user' }),
      headers:{
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((result) => { console.log(result); })
      .catch(error => { console.log(error) });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.opt-in-button').addEventListener('click', () => {
    pn.onSubscribe();
  });
});

