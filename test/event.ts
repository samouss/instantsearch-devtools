import {
  ChangeEvent,
  SearchEvent,
  ResultEvent,
} from '../src/application/types';

export const createFakeChangeEvent = (
  props: Partial<ChangeEvent> = {},
): ChangeEvent => ({
  type: 'CHANGE',
  id: 'CHANGE_000',
  time: 1000,
  parameters: {},
  ...props,
});

export const createFakeSearchEvent = (
  props: Partial<SearchEvent> = {},
): SearchEvent => ({
  type: 'SEARCH',
  id: 'SEARCH_000',
  time: 2000,
  parameters: {},
  ...props,
});

export const createFakeResultEvent = (
  props: Partial<ResultEvent> = {},
): ResultEvent => ({
  type: 'RESULT',
  id: 'RESULT_000',
  time: 3000,
  parameters: {},
  results: {},
  ...props,
});
