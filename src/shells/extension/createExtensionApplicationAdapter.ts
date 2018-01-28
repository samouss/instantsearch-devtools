import { Context, Adapter } from '../../types';

// prettier-ignore
const createExtensionApplicationAdapter = (context: Context = chrome): Adapter => {
  const port = context.runtime.connect({
    name: context.devtools.inspectedWindow.tabId.toString(),
  });

  port.onDisconnect.addListener(port => port.disconnect());

  return {
    connect(fn) {
      port.onMessage.addListener(fn);
    },
    emit() {
      // TODO: to implement
    },
  };
};

export default createExtensionApplicationAdapter;
