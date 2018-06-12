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

const reducer = (state: State, event: HookEvent): State => {
  switch (event.type) {
    case 'CHANGE': {
      const action = createChangeAction(event);

      return {
        ...state,
        actionIds: [action.id].concat(state.actionIds),
        actionById: state.actionById.set(action.id, action),
      };
    }

    case 'SEARCH': {
      const action = createSearchAction(event);

      return {
        ...state,
        actionIds: [action.id].concat(state.actionIds),
        actionById: state.actionById.set(action.id, action),
      };
    }

    case 'RESULT': {
      const action = createResultAction(event);

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
