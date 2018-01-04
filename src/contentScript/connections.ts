import { Context } from '../types';

const run = (context: Context) => {
  const port = context.runtime.connect({
    name: 'contentScript',
  });

  // @NOTE: exeplicit cast the event, remove when the definition
  // will be rewrite. Should really do it
  const onMessageFromDevTools = (event: object) => {
    window.postMessage(
      {
        ...event,
        source: 'chrome-devtools-experiments-content-script',
      },
      '*',
    );
  };

  const onMessageFromPage = ({ source, data: message }: MessageEvent) => {
    const isSameSource = source === window;
    const isFromExtension =
      message && message.source === 'chrome-devtools-experiments-hook';

    if (isSameSource && isFromExtension) {
      // @NOTE: exeplicit cast the event, remove when the definition
      // will be rewrite. Should really do it
      port.postMessage(message);
    }
  };

  const onDisconnect = (port: chrome.runtime.Port) => {
    port.onMessage.removeListener(onMessageFromDevTools);
    port.onDisconnect.removeListener(onDisconnect);
    window.removeEventListener('message', onMessageFromPage);
    port.disconnect();
  };

  port.onMessage.addListener(onMessageFromDevTools);
  port.onDisconnect.addListener(onDisconnect);

  window.addEventListener('message', onMessageFromPage);
};

export default run;
