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

export type WindowWithDevTools = Window & {
  __INSTANT_SEARCH_DEVTOOLS__: (helper: JSHelper) => void;
};

export type Adapter = {
  connect(callback: (event: HookEvent) => void): void;
  emit(event: HookEvent): void;
};

export type ReadyHookEvent = {
  type: 'HOOK_READY';
  source: string;
};

export type ChangeHookEvent = {
  type: 'CHANGE';
  parameters: object;
};

export type SearchHookEvent = {
  type: 'SEARCH';
  parameters: object;
};

export type ResultHookEvent = {
  type: 'RESULT';
  parameters: object;
  results: object;
};

export type HookEvent =
  | ReadyHookEvent
  | ChangeHookEvent
  | SearchHookEvent
  | ResultHookEvent;
