import { WindowWithDevTools } from '../../types';
import createHookBridge from '../../bridge/createHookBridge';
import createExtensionHookAdapter from './createExtensionHookAdapter';

const adapter = createExtensionHookAdapter();
const bridge = createHookBridge(adapter);

(window as WindowWithDevTools).__DEVTOOLS_EXPERIMENTS_HOOK__ = bridge;
