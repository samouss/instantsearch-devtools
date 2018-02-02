import createApplicationBridge from '../../bridge/createApplicationBridge';
import createExtensionApplicationAdapter from './createExtensionApplicationAdapter';

const container = document.getElementById('root') as HTMLElement;

// Create the App on each ⌘ + R
chrome.devtools.network.onNavigated.addListener(() => {
  createApplicationBridge(createExtensionApplicationAdapter(), {
    container,
  });
});

createApplicationBridge(createExtensionApplicationAdapter(), {
  container,
});
