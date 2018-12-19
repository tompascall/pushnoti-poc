const pn = {
  onSubscribe() {
    console.log('onSubscribing');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.opt-in-button').addEventListener('click', () => {
    pn.onSubscribe();
  });
});

