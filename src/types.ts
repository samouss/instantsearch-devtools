export type Context = typeof chrome;
export type DevToolsPort = chrome.runtime.Port;
export type ContentScriptPort = chrome.runtime.Port & {
  sender: chrome.runtime.MessageSender & {
    tab: chrome.tabs.Tab & {
      id: number;
    };
  };
};

export type ChannelReadyEvent = {
  type: 'CHANNEL_READY';
  source: string;
};

export type ChannelEvent = ChannelReadyEvent;
