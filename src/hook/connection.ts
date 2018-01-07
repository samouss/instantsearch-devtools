import { ChannelEvent } from '../types';

export type State = {
  isConnectionReady: boolean;
  queue: ChannelEvent[];
};

const intialState: State = {
  isConnectionReady: false,
  queue: [],
};

const postMessageFromHook = (event: ChannelEvent) =>
  window.postMessage(
    {
      source: 'chrome-devtools-experiments-hook',
      ...event,
    },
    '*',
  );

const createHookConnection = (state = intialState) => {
  window.addEventListener('message', (event: MessageEvent) => {
    const isSameSource = event.source === window;
    const isFromExtension =
      event.data &&
      event.data.source === 'chrome-devtools-experiments-content-script';

    if (isSameSource && isFromExtension) {
      const { type } = event.data;

      if (type === 'CHANNEL_READY') {
        state.queue.forEach(postMessageFromHook);
        state.queue = [];

        state.isConnectionReady = true;
      }
    }
  });

  const postMessageIfConnectionIsReady = (event: ChannelEvent) => {
    if (!state.isConnectionReady) {
      state.queue.push(event);
    } else {
      postMessageFromHook(event);
    }
  };

  return {
    postMessage: postMessageIfConnectionIsReady,
  };
};

export default createHookConnection;
