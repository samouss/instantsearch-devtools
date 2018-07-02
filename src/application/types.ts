export type Id = string;

export type Diff = {
  attribute: string;
  previous: any; // @WEAK - JSValue
  next: any; // @WEAK - JSValue
};

export type JSObject = {
  [index: string]: any; // @WEAK - JSValue
};

export type ChangeEvent = {
  type: 'CHANGE';
  id: Id;
  time: number;
  parameters: JSObject;
  diffs: Diff[];
};

export type SearchEvent = {
  type: 'SEARCH';
  id: Id;
  time: number;
  parameters: JSObject;
  diffs: Diff[];
};

export type ResultEvent = {
  type: 'RESULT';
  id: Id;
  time: number;
  parameters: JSObject;
  results: JSObject;
  diffs: Diff[];
};

export type Event = ChangeEvent | SearchEvent | ResultEvent;

export type State = {
  changeEventIds: Id[];
  searchEventIds: Id[];
  resultEventIds: Id[];
  eventIds: Id[];
  eventById: Map<Id, Event>;
  selectedEventId?: Id;
  previousPropEvent?: Event;
};
