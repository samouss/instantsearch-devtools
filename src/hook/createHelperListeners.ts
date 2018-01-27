import { Bridge, JSHelper } from '../types';

const createHelperListeners = (bridge: Bridge, helper: JSHelper) => {
  helper.on('change', parameters => {
    bridge.emit({
      type: 'CHANGE',
      parameters,
    });
  });

  helper.on('search', parameters => {
    bridge.emit({
      type: 'SEARCH',
      parameters,
    });
  });

  helper.on('result', (results, parameters) => {
    bridge.emit({
      type: 'RESULT',
      parameters,
      results,
    });
  });
};

export default createHelperListeners;
