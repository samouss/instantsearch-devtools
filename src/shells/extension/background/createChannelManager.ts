import { Context, DevToolsPort, ContentScriptPort } from '../../../types';

type Tunnel = {
  devTools?: DevToolsPort;
  contentScript?: ContentScriptPort;
};

type State = Map<number, Tunnel>;

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

const createTunnelChannel = (
  state: State,
  devTools: DevToolsPort,
  contentScript: ContentScriptPort,
) => {
  const onMessageFromDevTools = (event: object) =>
    contentScript.postMessage(event);

  const onMessageFromContentScript = (event: object) =>
    devTools.postMessage(event);

  const onDisconnect = (port: DevToolsPort | ContentScriptPort) => {
    devTools.onMessage.removeListener(onMessageFromDevTools);
    contentScript.onMessage.removeListener(onMessageFromContentScript);

    devTools.onDisconnect.removeListener(onDisconnect);
    contentScript.onDisconnect.removeListener(onDisconnect);

    devTools.disconnect();
    contentScript.disconnect();

    state.delete(extractTabIdFromPort(port));
  };

  devTools.onMessage.addListener(onMessageFromDevTools);
  contentScript.onMessage.addListener(onMessageFromContentScript);

  devTools.onDisconnect.addListener(onDisconnect);
  contentScript.onDisconnect.addListener(onDisconnect);
};

const createChannelManager = (
  context: Context = chrome,
  state: State = new Map(),
) => {
  return (port: DevToolsPort | ContentScriptPort) => {
    const isContentScript = isContentScriptPort(port);
    const tabId = extractTabIdFromPort(port);
    const tabName: keyof Tunnel = !isContentScript
      ? 'devTools'
      : 'contentScript';

    if (!isContentScript) {
      installContentScript(context, tabId);
    }

    state.set(tabId, {
      ...state.get(tabId),
      [tabName]: port,
    });

    const tunnel = state.get(tabId);
    const devToolsPort = tunnel && tunnel.devTools;
    const contentScriptPort = tunnel && tunnel.contentScript;

    if (tunnel && devToolsPort && contentScriptPort) {
      createTunnelChannel(state, devToolsPort, contentScriptPort);

      // @TODO: rename to Tunnel
      contentScriptPort.postMessage({ type: 'HOOK_READY' });
    }
  };
};

export default createChannelManager;
