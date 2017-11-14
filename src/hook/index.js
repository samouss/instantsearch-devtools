import { setup, postMessage } from './connection';

// type EventTypes =
//   | 'CHANGE'
//   | 'SEARCH'
//   | 'RESULT'

const hook = helper => {
  setup();

  helper.on('change', parameters => {
    postMessage({
      type: 'CHANGE',
      payload: {
        parameters,
      },
    });
  });

  helper.on('search', parameters => {
    postMessage({
      type: 'SEARCH',
      payload: {
        parameters,
      },
    });
  });

  helper.on('result', (results, parameters) => {
    postMessage({
      type: 'RESULT',
      payload: {
        results,
        parameters,
      },
    });
  });
};

// eslint-disable-next-line no-underscore-dangle
window.__DEVTOOLS_EXPERIMENTS_HOOK__ = hook;
