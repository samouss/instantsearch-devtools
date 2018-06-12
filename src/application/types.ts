export type Id = string;

export type ChangeAction = {
  type: 'CHANGE';
  id: Id;
  time: number;
  parameters: object;
};

export type SearchAction = {
  type: 'SEARCH';
  id: Id;
  time: number;
  parameters: object;
};

export type ResultAction = {
  type: 'RESULT';
  id: Id;
  time: number;
  parameters: object;
  results: object;
};

export type Action = ChangeAction | SearchAction | ResultAction;

export type State = {
  actionIds: Id[];
  actionById: Map<Id, Action>;
};
