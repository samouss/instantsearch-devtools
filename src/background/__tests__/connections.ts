import { listener } from '../connections';

const createFakeChromeEnvironment = () => {
  const chrome = {
    runtime: {
      onConnect: {
        addListener: jest.fn(),
      },
    },
    tabs: {
      executeScript: jest.fn(),
    },
  };

  (global as NodeJS.Global & { chrome: object }).chrome = chrome;

  return chrome;
};

const createFakeEvent = () => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

const createFakeDevToolsPort = (tabId: number): any => ({
  name: tabId.toString(),
  postMessage: jest.fn(),
  disconnect: jest.fn(),
  onMessage: createFakeEvent(),
  onDisconnect: createFakeEvent(),
});

const createFakeContentScriptPort = (tabId: number): any => ({
  ...createFakeDevToolsPort(tabId),
  name: 'contentScript',
  sender: {
    tab: {
      id: tabId,
    },
  },
});

describe('connections', () => {
  it('expect to create a connection for the devTools', () => {
    const tabId = 150;
    const chrome = createFakeChromeEnvironment();
    const port = createFakeDevToolsPort(tabId);
    const state = new Map();

    listener(state)(port);

    expect(state.get(tabId).devTools).toEqual(port);
    expect(chrome.tabs.executeScript).toHaveBeenCalledWith(tabId, {
      file: './contentScript.js',
    });
  });

  it('expect to create a connection for the contentScript', () => {
    const tabId = 150;
    const chrome = createFakeChromeEnvironment();
    const port = createFakeContentScriptPort(tabId);
    const state = new Map();

    listener(state)(port);

    expect(state.get(tabId).contentScript).toEqual(port);
    expect(chrome.tabs.executeScript).not.toHaveBeenCalled();
  });

  it('expect to create the channel between the devTools & contentScript', () => {
    const tabId = 150;
    const devToolsPort = createFakeDevToolsPort(tabId);
    const contentScriptPort = createFakeContentScriptPort(tabId);
    const state = new Map();

    listener(state)(devToolsPort);
    listener(state)(contentScriptPort);

    expect(devToolsPort.onMessage.addListener).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(contentScriptPort.onMessage.addListener).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(devToolsPort.onDisconnect.addListener).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(contentScriptPort.onDisconnect.addListener).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(contentScriptPort.postMessage).toHaveBeenCalledWith({
      type: 'CONNECTION_READY',
    });
  });

  it('expect to destroy the channel between the devTools & contentScript on devTools disconnect', () => {
    const tabId = 150;
    const devToolsPort = createFakeDevToolsPort(tabId);
    const contentScriptPort = createFakeContentScriptPort(tabId);
    const state = new Map();

    listener(state)(devToolsPort);
    listener(state)(contentScriptPort);

    devToolsPort.onDisconnect.addListener.mock.calls[0][0](devToolsPort);

    expect(devToolsPort.onMessage.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(contentScriptPort.onMessage.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(devToolsPort.onDisconnect.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(contentScriptPort.onDisconnect.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(devToolsPort.disconnect).toHaveBeenCalled();
    expect(contentScriptPort.disconnect).toHaveBeenCalled();

    expect(state.size).toBe(0);
  });

  it('expect to destroy the channel between the devTools & contentScript on contentScript disconnect', () => {
    const tabId = 150;
    const devToolsPort = createFakeDevToolsPort(tabId);
    const contentScriptPort = createFakeContentScriptPort(tabId);
    const state = new Map();

    listener(state)(devToolsPort);
    listener(state)(contentScriptPort);

    contentScriptPort.onDisconnect.addListener.mock.calls[0][0](
      contentScriptPort,
    );

    expect(devToolsPort.onMessage.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(contentScriptPort.onMessage.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(devToolsPort.onDisconnect.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(contentScriptPort.onDisconnect.removeListener).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(devToolsPort.disconnect).toHaveBeenCalled();
    expect(contentScriptPort.disconnect).toHaveBeenCalled();

    expect(state.size).toBe(0);
  });

  it('expect to forward the message from devTools to contentScript', () => {
    const tabId = 150;
    const message = { source: 'devTools', receiver: 'contentScript' };
    const devToolsPort = createFakeDevToolsPort(tabId);
    const contentScriptPort = createFakeContentScriptPort(tabId);
    const state = new Map();

    listener(state)(devToolsPort);
    listener(state)(contentScriptPort);

    // Simulate the message devTools => contentScript
    devToolsPort.onMessage.addListener.mock.calls[0][0](message);

    expect(contentScriptPort.postMessage).toHaveBeenCalledWith(message);
  });

  it('expect to forward the message from contentScript to devTools', () => {
    const tabId = 150;
    const message = { source: 'contentScript', receiver: 'devTools' };
    const devToolsPort = createFakeDevToolsPort(tabId);
    const contentScriptPort = createFakeContentScriptPort(tabId);
    const state = new Map();

    listener(state)(devToolsPort);
    listener(state)(contentScriptPort);

    // Simulate the message contentScript => devTools
    contentScriptPort.onMessage.addListener.mock.calls[0][0](message);

    expect(devToolsPort.postMessage).toHaveBeenCalledWith(message);
  });
});
