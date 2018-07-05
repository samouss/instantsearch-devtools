import * as chrome from 'test/chrome';
import createExtensionApplicationAdapter from '../createExtensionApplicationAdapter';

describe('createExtensionApplicationAdapter', () => {
  it('expect to create a port with the current tabId', () => {
    const context = chrome.createFakeChromeEnvironment();

    context.devtools.inspectedWindow.tabId = 15;
    context.runtime.connect.mockImplementationOnce(() =>
      chrome.createFakeDevToolsPort(context.devtools.inspectedWindow.tabId),
    );

    createExtensionApplicationAdapter(context);

    expect(context.runtime.connect).toHaveBeenCalledWith({
      name: '15',
    });
  });

  it('expect to create a onDisconnect listener', () => {
    const tabId = 15;
    const context = chrome.createFakeChromeEnvironment();
    const port = chrome.createFakeDevToolsPort(tabId);

    context.devtools.inspectedWindow.tabId = tabId;
    context.runtime.connect.mockImplementationOnce(() => port);

    createExtensionApplicationAdapter(context);

    expect(port.onDisconnect.addListener).toHaveBeenCalledWith(expect.any(Function));

    // Simulate disconnect event
    port.onDisconnect.addListener.mock.calls[0][0](port);

    expect(port.disconnect).toHaveBeenCalled();
  });

  describe('connect', () => {
    it('expect to create a onMessage listener', () => {
      const tabId = 15;
      const listener = jest.fn();
      const context = chrome.createFakeChromeEnvironment();
      const port = chrome.createFakeDevToolsPort(tabId);
      const event = { type: 'CHANGE' };

      context.devtools.inspectedWindow.tabId = tabId;
      context.runtime.connect.mockImplementationOnce(() => port);

      const adapter = createExtensionApplicationAdapter(context);

      adapter.connect(listener);

      // Simulate event
      port.onMessage.addListener.mock.calls[0][0](event);

      expect(listener).toHaveBeenCalledWith(event);
    });
  });

  describe('emit', () => {
    it('expect to do nothing', () => {
      const tabId = 15;
      const context = chrome.createFakeChromeEnvironment();
      const port = chrome.createFakeDevToolsPort(tabId);

      context.devtools.inspectedWindow.tabId = tabId;
      context.runtime.connect.mockImplementationOnce(() => port);

      const adapter = createExtensionApplicationAdapter(context);

      adapter.emit({} as any);
    });
  });
});
