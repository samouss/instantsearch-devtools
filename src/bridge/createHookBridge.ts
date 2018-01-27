import { BridgeAdapter, JSHelper } from '../types';
import createHelperListeners from '../hook/createHelperListeners';
import createMessageHelperHandler from '../hook/createMessageHelperHandler';

const createHookBridge = (adapter: BridgeAdapter) => (helper: JSHelper) => {
  const bridge = adapter();
  const onMessageHelperHandler = createMessageHelperHandler(helper);

  createHelperListeners(bridge, helper);

  bridge.connect(event => {
    onMessageHelperHandler(event);
  });
};

export default createHookBridge;
