export type Id = string;

export type ChangeEvent = {
  type: 'CHANGE';
  id: Id;
  time: number;
  parameters: object;
};

export type SearchEvent = {
  type: 'SEARCH';
  id: Id;
  time: number;
  parameters: object;
};

export type ResultEvent = {
  type: 'RESULT';
  id: Id;
  time: number;
  parameters: object;
  results: object;
};

export type Event = ChangeEvent | SearchEvent | ResultEvent;

export type State = {
  eventIds: Id[];
  eventById: Map<Id, Event>;
};
