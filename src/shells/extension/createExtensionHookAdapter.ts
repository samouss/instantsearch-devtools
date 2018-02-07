import { Adapter, ChannelEvent } from '../../types';

export type State = {
  isReady: boolean;
  queue: ChannelEvent[];
};

const intialState: State = {
  isReady: false,
  queue: [],
};

const createExtensionHookAdapter = (state = intialState): Adapter => {
  const emit = (event: ChannelEvent) =>
    window.postMessage(
      {
        source: 'chrome-devtools-experiments-hook',
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
          event.data.source === 'chrome-devtools-experiments-content-script';

        if (isSameSource && isFromExtension) {
          const { type } = event.data;

          if (type === 'CHANNEL_READY') {
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