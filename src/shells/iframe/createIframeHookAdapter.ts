import { Adapter } from '../../types';

const createIframeHookAdapter = (): Adapter => {
  const iframe = document.querySelector('iframe') as HTMLIFrameElement;

  return {
    connect() {
      // TODO: to implement
    },
    emit(event) {
      (iframe.contentWindow as Window).postMessage(event, '*');
    },
  };
};

export default createIframeHookAdapter;
