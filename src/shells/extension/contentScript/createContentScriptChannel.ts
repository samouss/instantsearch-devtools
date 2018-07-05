import { Context } from '../../../types';
import * as NAMESPACES from '../../../constants';

const createContentScriptChannel = (context: Context = chrome) => {
  const port = context.runtime.connect({
    name: 'contentScript',
  });

  // @NOTE: explicitlty cast the event, remove when the definition
  // will be rewrite. Should really do it
  const onMessageFromDevTools = (event: object) => {
    window.postMessage(
      {
        ...event,
        source: NAMESPACES.CONTENT_SCRIPT_NAMESPACE,
      },
      '*',
    );
  };

  const onMessageFromPage = ({ source, data: message }: MessageEvent) => {
    const isSameSource = source === window;
    const isFromExtension = message && message.source === NAMESPACES.HOOK_NAMESPACE;

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

export default createContentScriptChannel;
