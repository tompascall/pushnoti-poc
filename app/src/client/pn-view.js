import vanillatoasts from 'vanillatoasts';
import 'vanillatoasts/vanillatoasts.css';

const view = () => {
  const pnView = {
    setup({ supported, pushnoti } = {}) {
      if (supported) {
        document.querySelector('.opt-in-button')
          .addEventListener('click', pushnoti.onSubscribe(pnView.toastCb({
            type: 'success',
            title: 'Wow',
            text: 'You have successfully subscribed!'
          })));
      } else {
        document.querySelector('body').classList.add('unsupported');
      }
    },
    toastCb: ({ type, text, title } = {}) => () => {
      vanillatoasts.create({
        type,
        text,
        title,
        timeout: 5000,
      });
    },
  };
  return pnView;
};

export default view;