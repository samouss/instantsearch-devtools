import { v4 } from 'uuid';
import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

// type EventType =
//   | 'CHANGE'
//   | 'SEARCH'
//   | 'RESULT'

const list = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE': {
      const item = {
        id: v4(),
        type: 'CHANGE',
        time: Date.now(),
        parameters: action.parameters,
      };

      return [item].concat(state);
    }

    case 'SEARCH': {
      const item = {
        id: v4(),
        type: 'SEARCH',
        time: Date.now(),
        parameters: action.parameters,
      };

      return [item].concat(state);
    }

    case 'RESULT': {
      const item = {
        id: v4(),
        type: 'RESULT',
        time: Date.now(),
        parameters: action.parameters,
        results: action.results,
      };

      return [item].concat(state);
    }

    default: {
      return state;
    }
  }
};

const selected = (state = '', action) => {
  switch (action.type) {
    case actionTypes.EVENT_SELECT: {
      return action.id;
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  list,
  selected,
});

export const getEvents = state => state.events.list;
export const getSelected = state => state.events.selected;

export const getEvent = state =>
  getEvents(state).find(_ => _.id === getSelected(state));
