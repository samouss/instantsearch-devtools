import { Context, Adapter } from '../../types';

// prettier-ignore
const createExtensionApplicationAdapter = (context: Context = chrome): Adapter => {
  const port = context.runtime.connect({
    name: context.devtools.inspectedWindow.tabId.toString(),
  });

  port.onDisconnect.addListener(port => port.disconnect());

  return {
    connect(fn) {
      // @NOTE: exeplicit cast the event, remove when the definition
      // will be rewrite. Should really do it
      port.onMessage.addListener((event: any) => fn(event));
    },
    emit() {
      // TODO: to implement
    },
  };
};

export default createExtensionApplicationAdapter;
