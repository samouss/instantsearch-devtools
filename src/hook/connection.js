const state = {
  isConnectionReady: false,
  queue: [],
};

const postMessageFromHook = event =>
  window.postMessage(
    {
      source: 'chrome-devtools-experiments-hook',
      ...event,
    },
    '*',
  );

const onMessageFromDevTools = event => {
  const isSameSource = event.source === window;
  const isFromExtension =
    event.data &&
    event.data.source === 'chrome-devtools-experiments-content-script';

  if (isSameSource && isFromExtension) {
    const { type } = event.data;
    // const { type, payload } = event.data;

    // Only for debugging
    // console.group('hook: onMessageFromDevTools');
    // console.log('Type', type);
    // console.log('Payload', payload);
    // console.groupEnd();

    if (type === 'CONNECTION_READY') {
      state.queue.forEach(postMessageFromHook);

      state.isConnectionReady = true;
    }
  }
};

const postMessageIfConnectionIsReady = event => {
  if (!state.isConnectionReady) {
    state.queue.push(event);
  } else {
    postMessageFromHook(event);
  }
};

export const setup = () => {
  window.addEventListener('message', onMessageFromDevTools);
};

export { postMessageIfConnectionIsReady as postMessage };
