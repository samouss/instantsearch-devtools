import { JSHelperValue, JSHelperObject } from '../types';

export type Id = string;

type RawDifferences = {
  previous: JSHelperValue;
  next: JSHelperValue;
};

type ViewDifferences = {
  previous: JSHelperValue;
  next: JSHelperValue;
};

export type Differences = {
  attribute: string;
  raw: RawDifferences;
  view: ViewDifferences;
};

export type ChangeEvent = {
  type: 'CHANGE';
  id: Id;
  time: number;
  parameters: JSHelperObject;
  differences: Differences[];
};

export type SearchEvent = {
  type: 'SEARCH';
  id: Id;
  time: number;
  parameters: JSHelperObject;
  differences: Differences[];
};

export type ResultEvent = {
  type: 'RESULT';
  id: Id;
  time: number;
  parameters: JSHelperObject;
  results: JSHelperObject;
  differences: Differences[];
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
