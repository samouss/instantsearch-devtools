import { Adapter, HookEvent } from '../../types';

const createIframeApplicationAdapter = (): Adapter => ({
  connect(fn) {
    // @TODO: think about a solution for this `any`
    window.addEventListener('message', event => {
      if (event.source === window.parent) {
        fn(event.data as HookEvent);
      }
    });
  },
  emit() {
    // TODO: to implement
  },
});

export default createIframeApplicationAdapter;
