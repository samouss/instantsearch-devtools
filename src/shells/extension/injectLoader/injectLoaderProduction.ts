const scriptSync = document.createElement('script');
// tslint:disable-next-line no-var-requires
scriptSync.textContent = require('!raw-loader!../../../../dist/inject.js');
document.documentElement.appendChild(scriptSync);
scriptSync.remove();
