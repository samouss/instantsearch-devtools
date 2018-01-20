import { Bridge, JSHelper } from '../types';

const createHelperListeners = (bridge: Bridge, helper: JSHelper) => {
  helper.on('change', parameters => {
    bridge.postMessage({
      type: 'CHANGE',
      parameters,
    });
  });

  helper.on('search', parameters => {
    bridge.postMessage({
      type: 'SEARCH',
      parameters,
    });
  });

  helper.on('result', (results, parameters) => {
    bridge.postMessage({
      type: 'RESULT',
      parameters,
      results,
    });
  });
};

export default createHelperListeners;
