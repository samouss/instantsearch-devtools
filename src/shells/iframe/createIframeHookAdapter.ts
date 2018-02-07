import { Adapter } from '../../types';

const createIframeHookAdapter = (): Adapter => {
  const iframe =
    document.querySelector('iframe') || document.createElement('iframe');

  return {
    connect() {
      // TODO: to implement
    },
    emit(event) {
      iframe.contentWindow.postMessage(event, '*');
    },
  };
};

export default createIframeHookAdapter;