import { JSHelper } from '../types';
import createConnection from './connection';

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
