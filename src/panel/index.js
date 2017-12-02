import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import configureStore from './store/configureStore';
import App from './App';
import './index.css';

const createListenerAndApp = () => {
  const container = document.getElementById('root');
  const store = configureStore();

  const onMessageFromPage = event => {
    // console.group('Panel: onMessageFromPage');
    // console.log('Event', event);
    // console.groupEnd();

    store.dispatch(event);
  };

  const onDisconnect = port => {
    port.onMessage.removeListener(onMessageFromPage);
    port.onDisconnect.removeListener(onDisconnect);

    port.disconnect();
  };

  const port = chrome.runtime.connect({
    name: chrome.devtools.inspectedWindow.tabId.toString(),
  });

  port.onMessage.addListener(onMessageFromPage);
  port.onDisconnect.removeListener(onDisconnect);

  port.postMessage({
    source: 'chrome-devtools-experiments-panel',
    payload: {
      name: 'revert',
    },
  });

  unmountComponentAtNode(container);

  render(<App store={store} />, container);
};

chrome.devtools.network.onNavigated.addListener(createListenerAndApp);

createListenerAndApp();
