import { v4 } from 'uuid';

// type MessageTypes =
//   | 'CHANGE'
//   | 'SEARCH'
//   | 'RESULT'

const messages = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE': {
      const item = {
        id: v4(),
        type: 'CHANGE',
        time: Date.now(),
        parameters: action.payload.parameters,
      };

      return [item].concat(state);
    }

    case 'SEARCH': {
      const item = {
        id: v4(),
        type: 'SEARCH',
        time: Date.now(),
        parameters: action.payload.parameters,
      };

      return [item].concat(state);
    }

    case 'RESULT': {
      const item = {
        id: v4(),
        type: 'RESULT',
        time: Date.now(),
        parameters: action.payload.parameters,
        results: action.payload.results,
      };

      return [item].concat(state);
    }

    default: {
      return state;
    }
  }
};

export default messages;

export const getMessages = state => state.messages;
