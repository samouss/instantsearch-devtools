import React from 'react';
import { render } from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import algoliasearchHelper from 'algoliasearch-helper';
import App from './src/App';

const client = algoliasearch('latency', '3d9875e51fbd20c7754e65422f7ce5e1');
const helper = algoliasearchHelper(client, 'bestbuy');

const run = () => {
  /* eslint-disable no-underscore-dangle, no-unused-expressions */
  window.__INSTANT_SEARCH_DEVTOOLS__ &&
    window.__INSTANT_SEARCH_DEVTOOLS__(helper);
  /* eslint-enable */

  render(
    <App client={client} helper={helper} />,
    document.getElementById('root'),
  );
};

if (process.env.EXTENSION_ENV !== 'production') {
  // eslint-disable-next-line
  const isHookAlreadyLoaded = !!window.__INSTANT_SEARCH_DEVTOOLS__;

  if (!isHookAlreadyLoaded) {
    // The hook could be laad before the page but it could be load after only
    // in development mode so we need to plug a listener on the loader message
    // in order to run the App after the hook load
    window.addEventListener('message', ({ source, data: message }) => {
      const isSameSource = source === window;
      // @TODO: replace with the constant when the example
      // will be written with TypeScript
      const isFromExtensionLoader =
        message && message.source === 'instantsearch-devtools-loader';

      if (isSameSource && isFromExtensionLoader) {
        run();
      }
    });
  } else {
    run();
  }
} else {
  run();
}
