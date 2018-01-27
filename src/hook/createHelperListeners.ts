import { Adapter, JSHelper } from '../types';

const createHelperListeners = (adapter: Adapter, helper: JSHelper) => {
  helper.on('change', parameters => {
    adapter.emit({
      type: 'CHANGE',
      parameters,
    });
  });

  helper.on('search', parameters => {
    adapter.emit({
      type: 'SEARCH',
      parameters,
    });
  });

  helper.on('result', (results, parameters) => {
    adapter.emit({
      type: 'RESULT',
      parameters,
      results,
    });
  });
};

export default createHelperListeners;
