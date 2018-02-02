import createApplicationBridge from '../../bridge/createApplicationBridge';
import createExtensionApplicationAdapter from './createExtensionApplicationAdapter';

const container = document.getElementById('root') as HTMLElement;
const adapter = createExtensionApplicationAdapter();

// Create the App on each ⌘ + R
chrome.devtools.network.onNavigated.addListener(() => {
  createApplicationBridge(adapter, {
    container,
  });
});

createApplicationBridge(adapter, {
  container,
});
