import pn from './push-notification';
import app from './app';
import view from './pn-view';
import '../style/main.css';

const pnView = view();
const pnApp = app();

const start = (pushnoti) => async () => {
  if (pushnoti.isSupported) {
    pnView.setup({supported: true, pushnoti });
    pushnoti.registerServiceWorker();
    await pnApp.setConfig();
  } else {
    pnView.setup({ supported: false })
  }
};

document.addEventListener('DOMContentLoaded', start(pn(pnApp)));

