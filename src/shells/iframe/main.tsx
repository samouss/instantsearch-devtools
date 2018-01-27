import React from 'react';
import { render } from 'react-dom';
import algoliasearch from 'algoliasearch/lite';
import algoliasearchHelper from 'algoliasearch-helper';
import App from '../../../example/src/App';
import { WindowWithDevTools } from '../../types';
import createHookBridge from '../../bridge/createHookBridge';
import createIframeHookAdapter from './createIframeHookAdapter';

const client = algoliasearch('latency', '3d9875e51fbd20c7754e65422f7ce5e1');
const helper = algoliasearchHelper(client, 'bestbuy');

const onIframeLoaded = () => {
  const adapter = createIframeHookAdapter();
  const bridge = createHookBridge(adapter);

  // This step is useless but we keep it for the constistency, performing
  // the side effect on the window page like in a real application
  (window as WindowWithDevTools).__DEVTOOLS_EXPERIMENTS_HOOK__ = bridge;
  (window as WindowWithDevTools).__DEVTOOLS_EXPERIMENTS_HOOK__(helper);

  render(
    <App client={client} helper={helper} />,
    document.getElementById('root'),
  );
};

const iframe = document.createElement('iframe');

iframe.style.display = 'block';
iframe.style.margin = '50px auto';
iframe.style.width = '760px';
iframe.style.height = '510px';
iframe.style.border = '5px solid';

document.body.insertBefore(iframe, document.getElementById('root'));

iframe.onload = onIframeLoaded;
iframe.src = 'iframe.html';
