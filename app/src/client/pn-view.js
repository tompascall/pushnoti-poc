import vanillatoasts from 'vanillatoasts';
import 'vanillatoasts/vanillatoasts.css';
import pushNotification from './push-notification';

const view = () => {
  const pnView = {
    setup({ supported, pushnoti, hasSubscription } = {}) {
      pnView.setupSupport(supported);
      pnView.setupSubscription(hasSubscription, pushnoti);
    },

    setupSupport(supported) {
      (supported) ?
        document.querySelector('body').classList.add('pn-supported') :
        document.querySelector('body').classList.add('pn-unsupported');
    },

    setupSubscription(hasSubscription, pushnoti) {
      (hasSubscription) ?
        document.querySelector('body').classList.add('pn-has-subscription') :
        document.querySelector('.pn-subscribe-button')
          .addEventListener('click', pushnoti.onSubscribe(pnView.toastCb({
            type: 'success',
            title: 'Wow',
            text: 'You have successfully subscribed!'
          })));
    },

    onSubscribe() {
      pnView.setupSubscription(true);
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