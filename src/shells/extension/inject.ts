import { WindowWithDevTools } from '../../types';
import createHookBridge from '../../bridge/createHookBridge';
import createExtensionHookAdapter from './createExtensionHookAdapter';

const adapter = createExtensionHookAdapter();
const bridge = createHookBridge(adapter);

(window as WindowWithDevTools).__INSTANT_SEARCH_DEVTOOLS__ = bridge;
