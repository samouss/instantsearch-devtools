// @NOTE: exeplicit cast the event, remove when the definition
// will be rewrite. Should really do it

export const createFakeChromeEnvironment = (): any => ({
  runtime: {
    connect: jest.fn(),
    onConnect: {
      addListener: jest.fn(),
    },
  },
  tabs: {
    executeScript: jest.fn(),
  },
});

export const createFakeEvent = (): any => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

export const createFakeDevToolsPort = (tabId: number): any => ({
  name: tabId.toString(),
  postMessage: jest.fn(),
  disconnect: jest.fn(),
  onMessage: createFakeEvent(),
  onDisconnect: createFakeEvent(),
});

export const createFakeContentScriptPort = (tabId: number): any => ({
  ...createFakeDevToolsPort(tabId),
  name: 'contentScript',
  sender: {
    tab: {
      id: tabId,
    },
  },
});
