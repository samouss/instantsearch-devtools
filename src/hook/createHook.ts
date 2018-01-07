import createConnection from './connection';

export type JSHelper = {
  on(event: 'change' | 'search', fn: (parameters: object) => void): void;
  on(event: 'result', fn: (results: object, parameters: object) => void): void;
};

const hook = (helper: JSHelper) => {
  const { postMessage } = createConnection();

  helper.on('change', parameters => {
    postMessage({
      type: 'CHANGE',
      parameters,
    });
  });

  helper.on('search', parameters => {
    postMessage({
      type: 'SEARCH',
      parameters,
    });
  });

  helper.on('result', (results, parameters) => {
    postMessage({
      type: 'RESULT',
      parameters,
      results,
    });
  });
};

export default hook;
