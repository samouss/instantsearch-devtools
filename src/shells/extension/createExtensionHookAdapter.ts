import { Adapter, HookEvent } from '../../types';
import * as NAMESPACES from '../../constants';

export type State = {
  isReady: boolean;
  queue: HookEvent[];
};

const intialState: State = {
  isReady: false,
  queue: [],
};

const createExtensionHookAdapter = (state = intialState): Adapter => {
  const emit = (event: HookEvent) =>
    window.postMessage(
      {
        source: NAMESPACES.HOOK_NAMESPACE,
        ...event,
      },
      '*',
    );

  return {
    connect() {
      window.addEventListener('message', event => {
        const isSameSource = event.source === window;
        const isFromExtension =
          event.data &&
          event.data.source === NAMESPACES.CONTENT_SCRIPT_NAMESPACE;

        if (isSameSource && isFromExtension) {
          const { type } = event.data as HookEvent;

          if (type === 'HOOK_READY') {
            state.queue.forEach(emit);
            state.queue = [];

            state.isReady = true;
          }
        }
      });
    },
    emit(event) {
      if (!state.isReady) {
        state.queue.push(event);
      } else {
        emit(event);
      }
    },
  };
};

export default createExtensionHookAdapter;
