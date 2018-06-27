export type Id = string;

export type ChangeEvent = {
  type: 'CHANGE';
  id: Id;
  time: number;
  parameters: object; // @WEAK
};

export type SearchEvent = {
  type: 'SEARCH';
  id: Id;
  time: number;
  parameters: object; // @WEAK
};

export type ResultEvent = {
  type: 'RESULT';
  id: Id;
  time: number;
  parameters: object; // @WEAK
  results: object; // @WEAK
};

export type Event = ChangeEvent | SearchEvent | ResultEvent;

export type State = {
  eventIds: Id[];
  eventById: Map<Id, Event>;
  selectedEventId?: Id;
  previousPropEvent?: Event;
};
