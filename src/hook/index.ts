import { JSHelper } from '../types';
import createHook from './createHook';

type WindowWithDevTools = Window & {
  __DEVTOOLS_EXPERIMENTS_HOOK__: (helper: JSHelper) => void;
};

(window as WindowWithDevTools).__DEVTOOLS_EXPERIMENTS_HOOK__ = createHook;
