type Context = typeof chrome;

type DevToolsPort = chrome.runtime.Port;
type ContentScriptPort = chrome.runtime.Port & {
  sender: chrome.runtime.MessageSender & {
    tab: chrome.tabs.Tab & {
      id: number;
    };
  };
};

type Connection = {
  devTools?: DevToolsPort;
  contentScript?: ContentScriptPort;
};

type ConnectionTypes = keyof Connection;
type Connections = Map<number, Connection>;

const isContentScriptPort = (
  port: DevToolsPort | ContentScriptPort,
): port is ContentScriptPort => {
  return !!port.sender && !!port.sender.tab;
};

const extractTabIdFromPort = (
  port: DevToolsPort | ContentScriptPort,
): number => {
  if (isContentScriptPort(port)) {
    return port.sender.tab.id;
  }

  return parseInt(port.name, 10);
};

const installContentScript = (context: Context, tabId: number) => {
  context.tabs.executeScript(tabId, {
    file: './contentScript.js',
  });
};

const createChannel = (
  state: Connections,
  devTools: DevToolsPort,
  contentScript: ContentScriptPort,
) => {
  const onDevToolsMessagePostToContentScript = (event: object) =>
    contentScript.postMessage(event);

  const onContentScriptMessagePostToDevTools = (event: object) =>
    devTools.postMessage(event);

  const onDisconnect = (port: DevToolsPort | ContentScriptPort) => {
    devTools.onMessage.removeListener(onDevToolsMessagePostToContentScript);
    contentScript.onMessage.removeListener(
      onContentScriptMessagePostToDevTools,
    );

    devTools.onDisconnect.removeListener(onDisconnect);
    contentScript.onDisconnect.removeListener(onDisconnect);

    devTools.disconnect();
    contentScript.disconnect();

    state.delete(extractTabIdFromPort(port));
  };

  devTools.onMessage.addListener(onDevToolsMessagePostToContentScript);
  contentScript.onMessage.addListener(onContentScriptMessagePostToDevTools);

  devTools.onDisconnect.addListener(onDisconnect);
  contentScript.onDisconnect.addListener(onDisconnect);
};

export const createListener = (context: Context, state: Connections) => {
  return (port: DevToolsPort | ContentScriptPort) => {
    const isContentScript = isContentScriptPort(port);
    const tabId = extractTabIdFromPort(port);
    const tabName: ConnectionTypes = !isContentScript
      ? 'devTools'
      : 'contentScript';

    if (!isContentScript) {
      installContentScript(context, tabId);
    }

    state.set(tabId, {
      ...state.get(tabId),
      [tabName]: port,
    });

    const connection = state.get(tabId);
    const devToolsConnection = connection && connection.devTools;
    const contentScriptConnection = connection && connection.contentScript;

    if (connection && devToolsConnection && contentScriptConnection) {
      createChannel(state, devToolsConnection, contentScriptConnection);

      contentScriptConnection.postMessage({ type: 'CONNECTION_READY' });
    }
  };
};

export default (context: Context, state: Connections) => {
  chrome.runtime.onConnect.addListener(createListener(context, state));
};
