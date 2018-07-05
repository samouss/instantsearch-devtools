import * as chrome from 'test/chrome';
import * as NAMESPACES from '../../../../constants';
import createContentScriptChannel from '../createContentScriptChannel';

describe('createContentScriptChannel', () => {
  it('expect to create a connection', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeContentScriptPort(tabId);

    window.addEventListener = jest.fn();

    context.runtime.connect.mockImplementation(() => port);

    createContentScriptChannel(context);

    expect(context.runtime.connect).toHaveBeenCalledWith({
      name: 'contentScript',
    });

    expect(port.onMessage.addListener).toHaveBeenCalledWith(expect.any(Function));

    expect(port.onDisconnect.addListener).toHaveBeenCalledWith(expect.any(Function));

    expect(window.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));
  });

  it('expect to destroy the connection', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeContentScriptPort(tabId);

    window.removeEventListener = jest.fn();

    context.runtime.connect.mockImplementation(() => port);

    createContentScriptChannel(context);

    // Simulate the message devTools => hook
    port.onDisconnect.addListener.mock.calls[0][0](port);

    expect(port.onMessage.removeListener).toHaveBeenCalledWith(expect.any(Function));

    expect(port.onDisconnect.removeListener).toHaveBeenCalledWith(expect.any(Function));

    expect(window.removeEventListener).toHaveBeenCalledWith('message', expect.any(Function));

    expect(port.disconnect).toHaveBeenCalled();
  });

  it('expect to forward the message from devTools to the hook', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeContentScriptPort(tabId);
    const message = { source: 'devTools', receiver: 'contentScript' };

    window.postMessage = jest.fn();

    context.runtime.connect.mockImplementation(() => port);

    createContentScriptChannel(context);

    // Simulate the message devTools => hook
    port.onMessage.addListener.mock.calls[0][0](message);

    expect(window.postMessage).toHaveBeenCalledWith(
      {
        ...message,
        source: NAMESPACES.CONTENT_SCRIPT_NAMESPACE,
      },
      '*',
    );
  });

  it('expect to forward the message from hook to the devTools', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeContentScriptPort(tabId);
    const event = {
      source: window,
      data: {
        source: NAMESPACES.HOOK_NAMESPACE,
        receiver: 'devTools',
      },
    };

    window.addEventListener = jest.fn();

    context.runtime.connect.mockImplementation(() => port);

    createContentScriptChannel(context);

    // Simulate the message hook => devTools
    (window.addEventListener as jest.Mock).mock.calls[0][1](event);

    expect(port.postMessage).toHaveBeenLastCalledWith(event.data);
  });

  it('expect to forward only message coming from the hook', () => {
    const tabId = 150;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeContentScriptPort(tabId);
    const event = {
      source: window,
      data: {
        source: 'other-extension-not-allowed',
        receiver: 'devTools',
      },
    };

    window.addEventListener = jest.fn();

    context.runtime.connect.mockImplementation(() => port);

    createContentScriptChannel(context);

    // Simulate the message hook => devTools
    (window.addEventListener as jest.Mock).mock.calls[0][1](event);

    expect(port.postMessage).not.toHaveBeenLastCalledWith(event.data);
  });
});
