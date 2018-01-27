import { Bridge, ChannelEvent } from '../../types';
import createApplicationBridge from '../../bridge/createApplicationBridge';

const container = document.getElementById('root') as HTMLElement;

const adapter = (): Bridge => ({
  connect(fn) {
    // @TODO: think about a solution for this `any`
    window.addEventListener('message', event => {
      if (event.source === window.parent) {
        fn(event.data as ChannelEvent);
      }
    });
  },
  emit() {
    // TODO: to implement
  },
});

createApplicationBridge(adapter, {
  container,
});
