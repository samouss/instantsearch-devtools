import { v4 } from 'uuid';
import {
  HookEvent,
  ChangeHookEvent,
  SearchHookEvent,
  ResultHookEvent,
} from '../../types';
import {
  Id,
  State,
  Event,
  ChangeEvent,
  SearchEvent,
  ResultEvent,
} from '../types';

const START = Date.now();

const createChangeEvent = (event: ChangeHookEvent): ChangeEvent => ({
  type: 'CHANGE',
  id: v4(),
  time: Date.now() - START,
  parameters: event.parameters,
});

const createSearchEvent = (event: SearchHookEvent): SearchEvent => ({
  type: 'SEARCH',
  id: v4(),
  time: Date.now() - START,
  parameters: event.parameters,
});

const createResultEvent = (event: ResultHookEvent): ResultEvent => ({
  type: 'RESULT',
  id: v4(),
  time: Date.now() - START,
  parameters: event.parameters,
  results: event.results,
});

export const createEventFromHookEvent = (event: HookEvent): Event => {
  switch (event.type) {
    case 'CHANGE': {
      return createChangeEvent(event);
    }

    case 'SEARCH': {
      return createSearchEvent(event);
    }

    case 'RESULT': {
      return createResultEvent(event);
    }

    default: {
      throw new Error(`Event "${event.type}" is not supported.`);
    }
  }
};

const reducer = (state: State, event: Event): State => {
  switch (event.type) {
    case 'CHANGE': {
      return {
        ...state,
        eventIds: [event.id].concat(state.eventIds),
        eventById: state.eventById.set(event.id, event),
      };
    }

    case 'SEARCH': {
      return {
        ...state,
        eventIds: [event.id].concat(state.eventIds),
        eventById: state.eventById.set(event.id, event),
      };
    }

    case 'RESULT': {
      return {
        ...state,
        eventIds: [event.id].concat(state.eventIds),
        eventById: state.eventById.set(event.id, event),
      };
    }

    default: {
      return state;
    }
  }
};

export const getEvents = (state: State): Event[] => {
  return state.eventIds.map(id => {
    return state.eventById.get(id) as Event;
  });
};

export const getSelectedEvent = (state: State, id: Id): Event => {
  return state.eventById.get(id) as Event;
};

export default reducer;
