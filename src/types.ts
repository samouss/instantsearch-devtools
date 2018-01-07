export type Context = typeof chrome;
export type DevToolsPort = chrome.runtime.Port;
export type ContentScriptPort = chrome.runtime.Port & {
  sender: chrome.runtime.MessageSender & {
    tab: chrome.tabs.Tab & {
      id: number;
    };
  };
};

export type JSHelper = {
  on(event: 'change' | 'search', fn: (parameters: object) => void): void;
  on(event: 'result', fn: (results: object, parameters: object) => void): void;
};

export type ChannelReadyEvent = {
  type: 'CHANNEL_READY';
  source: string;
};

export type ChangeEvent = {
  type: 'CHANGE';
  parameters: object;
};

export type SearchEvent = {
  type: 'SEARCH';
  parameters: object;
};

export type ResultsEvent = {
  type: 'RESULT';
  parameters: object;
  results: object;
};

export type ChannelEvent =
  | ChannelReadyEvent
  | ChangeEvent
  | SearchEvent
  | ResultsEvent;
