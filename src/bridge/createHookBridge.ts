import { Adapter, JSHelper } from '../types';
import createHelperListeners from '../hook/createHelperListeners';
import createMessageHelperHandler from '../hook/createMessageHelperHandler';

const createHookBridge = (adapter: Adapter) => (helper: JSHelper) => {
  const onMessageHelperHandler = createMessageHelperHandler(helper);

  createHelperListeners(adapter, helper);

  adapter.connect(event => {
    onMessageHelperHandler(event);
  });
};

export default createHookBridge;
