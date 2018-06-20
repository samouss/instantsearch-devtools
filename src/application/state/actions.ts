import { v4 } from 'uuid';
import {
  HookEvent,
  ChangeHookEvent,
  SearchHookEvent,
  ResultHookEvent,
} from '../../types';
import {
  State,
  Action,
  ChangeAction,
  SearchAction,
  ResultAction,
} from '../types';

// @FIXME: Try to destrcuture types

const createChangeAction = (event: ChangeHookEvent): ChangeAction => ({
  type: 'CHANGE',
  id: v4(),
  time: Date.now(),
  parameters: event.parameters,
});

const createSearchAction = (event: SearchHookEvent): SearchAction => ({
  type: 'SEARCH',
  id: v4(),
  time: Date.now(),
  parameters: event.parameters,
});

const createResultAction = (event: ResultHookEvent): ResultAction => ({
  type: 'RESULT',
  id: v4(),
  time: Date.now(),
  parameters: event.parameters,
  results: event.results,
});

export const createActionFromEvent = (event: HookEvent): Action => {
  switch (event.type) {
    case 'CHANGE': {
      return createChangeAction(event);
    }

    case 'SEARCH': {
      return createSearchAction(event);
    }

    case 'RESULT': {
      return createResultAction(event);
    }

    default: {
      throw new Error(`Event "${event.type}" is not supported.`);
    }
  }
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE': {
      return {
        ...state,
        actionIds: [action.id].concat(state.actionIds),
        actionById: state.actionById.set(action.id, action),
      };
    }

    case 'SEARCH': {
      return {
        ...state,
        actionIds: [action.id].concat(state.actionIds),
        actionById: state.actionById.set(action.id, action),
      };
    }

    case 'RESULT': {
      return {
        ...state,
        actionIds: [action.id].concat(state.actionIds),
        actionById: state.actionById.set(action.id, action),
      };
    }

    default: {
      return state;
    }
  }
};

export const getActions = (state: State): Action[] => {
  return state.actionIds.map(id => {
    return state.actionById.get(id) as Action;
  });
};

export default reducer;
