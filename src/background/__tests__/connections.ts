import * as chrome from 'test/chrome';
import { createListener } from '../connections';

describe('connections', () => {
  it('expect to create a connection for the devTools', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeDevToolsPort(tabId);
    const state = new Map();

    createListener(context, state)(port);

    expect(state.get(tabId).devTools).toEqual(port);
    expect(context.tabs.executeScript).toHaveBeenCalledWith(tabId, {
      file: './contentScript.js',
    });
  });

  it('expect to create a connection for the contentScript', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeContentScriptPort(tabId);
    const state = new Map();

    createListener(context, state)(port);

    expect(state.get(tabId).contentScript).toEqual(port);
    expect(context.tabs.executeScript).not.toHaveBeenCalled();
  });

  it('expect to create the channel between the devTools & contentScript', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const devToolsPort = chrome.createFakeDevToolsPort(tabId);
    const contentScriptPort = chrome.createFakeContentScriptPort(tabId);
    const state = new Map();

    createListener(context, state)(devToolsPort);
    createListener(context, state)(contentScriptPort);

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
      type: 'CHANNEL_READY',
    });
  });

  it('expect to destroy the channel between the devTools & contentScript on devTools disconnect', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const devToolsPort = chrome.createFakeDevToolsPort(tabId);
    const contentScriptPort = chrome.createFakeContentScriptPort(tabId);
    const state = new Map();

    createListener(context, state)(devToolsPort);
    createListener(context, state)(contentScriptPort);

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
    const context = chrome.createFakeChromeEnvironment();
    const devToolsPort = chrome.createFakeDevToolsPort(tabId);
    const contentScriptPort = chrome.createFakeContentScriptPort(tabId);
    const state = new Map();

    createListener(context, state)(devToolsPort);
    createListener(context, state)(contentScriptPort);

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
    const context = chrome.createFakeChromeEnvironment();
    const devToolsPort = chrome.createFakeDevToolsPort(tabId);
    const contentScriptPort = chrome.createFakeContentScriptPort(tabId);
    const state = new Map();

    createListener(context, state)(devToolsPort);
    createListener(context, state)(contentScriptPort);

    // Simulate the message devTools => contentScript
    devToolsPort.onMessage.addListener.mock.calls[0][0](message);

    expect(contentScriptPort.postMessage).toHaveBeenCalledWith(message);
  });

  it('expect to forward the message from contentScript to devTools', () => {
    const tabId = 150;
    const message = { source: 'contentScript', receiver: 'devTools' };
    const context = chrome.createFakeChromeEnvironment();
    const devToolsPort = chrome.createFakeDevToolsPort(tabId);
    const contentScriptPort = chrome.createFakeContentScriptPort(tabId);
    const state = new Map();

    createListener(context, state)(devToolsPort);
    createListener(context, state)(contentScriptPort);

    // Simulate the message contentScript => devTools
    contentScriptPort.onMessage.addListener.mock.calls[0][0](message);

    expect(devToolsPort.postMessage).toHaveBeenCalledWith(message);
  });
});
