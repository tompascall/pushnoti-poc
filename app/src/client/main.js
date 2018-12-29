import pn from './push-notification';
import app from './app';
import view from './pn-view';
import '../style/main.css';

const pnView = view();
const pnApp = app();

const start = (pushnoti) => async () => {
  if (pushnoti.isSupported) {
    // TODO: set config in pushnoti if needed and remove from here
    await pnApp.setConfig();
    const subscription = await pushnoti.getSubscription();
    if (subscription) {
      pnView.setup({supported: true, hasSubscription: true });
      pushnoti.sendSubscriptionToBackEnd(subscription)
    } else {
      pnView.setup({supported: true, pushnoti });
    }
  } else {
    pnView.setup({ supported: false })
  }
};

document.addEventListener('DOMContentLoaded', start(pn(pnApp)));

