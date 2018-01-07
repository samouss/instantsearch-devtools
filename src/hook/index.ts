import createHook, { JSHelper } from './createHook';

type CustomWindow = Window & {
  __DEVTOOLS_EXPERIMENTS_HOOK__: (helper: JSHelper) => void;
};

(window as CustomWindow).__DEVTOOLS_EXPERIMENTS_HOOK__ = createHook;
