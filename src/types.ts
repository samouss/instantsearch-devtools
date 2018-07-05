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
  on(event: 'change' | 'search', fn: (parameters: JSHelperObject) => void): void;
  on(event: 'result', fn: (results: JSHelperObject, parameters: JSHelperObject) => void): void;
};

// @WEAK - Until the SearchParameters - SearchResults are not typed
export type JSHelperValue = string | number | boolean | undefined | JSHelperArray | JSHelperObject;

// @WEAK - Until the SearchParameters - SearchResults are not typed
export interface JSHelperArray extends Array<JSHelperValue> {}

// @WEAK - Until the SearchParameters - SearchResults are not typed
export type JSHelperObject = {
  [x: string]: JSHelperValue;
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
  parameters: JSHelperObject;
};

export type SearchHookEvent = {
  type: 'SEARCH';
  parameters: JSHelperObject;
};

export type ResultHookEvent = {
  type: 'RESULT';
  parameters: JSHelperObject;
  results: JSHelperObject;
};

export type HookEvent = ReadyHookEvent | ChangeHookEvent | SearchHookEvent | ResultHookEvent;
