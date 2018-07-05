import { v4 } from 'uuid';
import head from 'lodash/head';
import { HookEvent, ChangeHookEvent, SearchHookEvent, ResultHookEvent } from '../../types';
import { Id, State, Event, ChangeEvent, SearchEvent, ResultEvent } from '../types';
import { collectEventDifferences } from './differences';

const START = Date.now();

const createChangeEvent = (event: ChangeHookEvent): ChangeEvent => ({
  type: 'CHANGE',
  id: v4(),
  time: Date.now() - START,
  parameters: event.parameters,
  differences: [],
});

const createSearchEvent = (event: SearchHookEvent): SearchEvent => ({
  type: 'SEARCH',
  id: v4(),
  time: Date.now() - START,
  parameters: event.parameters,
  differences: [],
});

const createResultEvent = (event: ResultHookEvent): ResultEvent => ({
  type: 'RESULT',
  id: v4(),
  time: Date.now() - START,
  parameters: event.parameters,
  results: event.results,
  differences: [],
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
      const latestChangeEvent = getLatestChangeEvent(state);
      // @TODO: move when we create the event
      const nextEvent = latestChangeEvent
        ? {
            ...event,
            differences: collectEventDifferences(latestChangeEvent.parameters, event.parameters),
          }
        : event;

      return {
        ...state,
        changeEventIds: [event.id].concat(state.changeEventIds),
        eventIds: [event.id].concat(state.eventIds),
        eventById: state.eventById.set(event.id, nextEvent),
      };
    }

    case 'SEARCH': {
      const latestEvent = getLatestSearchEvent(state);
      // @TODO: move when we create the event
      const nextEvent = latestEvent
        ? {
            ...event,
            differences: collectEventDifferences(latestEvent.parameters, event.parameters),
          }
        : event;

      return {
        ...state,
        searchEventIds: [event.id].concat(state.searchEventIds),
        eventIds: [event.id].concat(state.eventIds),
        eventById: state.eventById.set(event.id, nextEvent),
      };
    }

    case 'RESULT': {
      // @TODO: support both changes
      const latestEvent = getLatestResultEvent(state);
      // @TODO: move when we create the event
      const nextEvent = latestEvent
        ? {
            ...event,
            differences: collectEventDifferences(latestEvent.parameters, event.parameters),
          }
        : event;

      return {
        ...state,
        resultEventIds: [event.id].concat(state.resultEventIds),
        eventIds: [event.id].concat(state.eventIds),
        eventById: state.eventById.set(event.id, nextEvent),
      };
    }

    default: {
      return state;
    }
  }
};

export const getEvents = (state: State): Event[] => {
  return state.eventIds.map(id => {
    return state.eventById.get(id)!;
  });
};

export const getSelectedEvent = (state: State, id: Id): Event => {
  return state.eventById.get(id)!;
};

export const getLatestChangeEvent = (state: State): ChangeEvent | undefined => {
  const lastEventId = head(state.changeEventIds);

  return lastEventId ? (state.eventById.get(lastEventId) as ChangeEvent) : undefined;
};

export const getLatestSearchEvent = (state: State): SearchEvent | undefined => {
  const lastEventId = head(state.searchEventIds);

  return lastEventId ? (state.eventById.get(lastEventId) as SearchEvent) : undefined;
};

export const getLatestResultEvent = (state: State): ResultEvent | undefined => {
  const lastEventId = head(state.resultEventIds);

  return lastEventId ? (state.eventById.get(lastEventId) as ResultEvent) : undefined;
};

export default reducer;
