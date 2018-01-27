import createApplicationBridge from '../../bridge/createApplicationBridge';
import createIframeApplicationAdapter from './createIframeApplicationAdapter';

const container = document.getElementById('root') as HTMLElement;
const adapter = createIframeApplicationAdapter();

createApplicationBridge(adapter, {
  container,
});
