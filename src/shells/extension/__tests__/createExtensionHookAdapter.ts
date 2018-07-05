import { HookEvent } from '../../../types';
import * as NAMESPACES from '../../../constants';
import createExtensionHookAdapter, { State } from '../createExtensionHookAdapter';

describe('createExtensionHookAdapter', () => {
  const createFakeState = (next?: Partial<State>) => ({
    isReady: false,
    queue: [],
    ...next,
  });

  describe('connect', () => {
    it('expect to create a listener on window', () => {
      const state = createFakeState();

      window.addEventListener = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.connect(() => null);

      expect(window.addEventListener).toHaveBeenCalledWith('message', expect.any(Function));

      expect(state.isReady).toBe(false);
    });

    it('expect adapter to be ready on HOOK_READY', () => {
      const state = createFakeState();
      const event = {
        source: window,
        data: {
          source: NAMESPACES.CONTENT_SCRIPT_NAMESPACE,
          type: 'HOOK_READY',
        },
      };

      window.addEventListener = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.connect(() => null);

      // Simulate the event
      (window.addEventListener as jest.Mock).mock.calls[0][1](event);

      expect(state.isReady).toBe(true);
    });

    it('expect adapter to be ready & flush the queue on HOOK_READY', () => {
      const state = createFakeState({
        queue: [
          { type: 'CHANGE', parameters: {} },
          { type: 'SEARCH', parameters: {} },
          { type: 'RESULT', parameters: {}, results: {} },
        ],
      });

      const event = {
        source: window,
        data: {
          source: NAMESPACES.CONTENT_SCRIPT_NAMESPACE,
          type: 'HOOK_READY',
        },
      };

      window.addEventListener = jest.fn();
      window.postMessage = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.connect(() => null);

      // Simulate the event
      (window.addEventListener as jest.Mock).mock.calls[0][1](event);

      expect(window.postMessage).toHaveBeenCalledTimes(3);
      expect(state.isReady).toBe(true);
      expect(state.queue).toEqual([]);
    });

    it('expect adapter to not be ready when message come from a different window', () => {
      const state = createFakeState();
      const event = {
        source: { ...window },
        data: {
          source: NAMESPACES.CONTENT_SCRIPT_NAMESPACE,
          type: 'HOOK_READY',
        },
      };

      window.addEventListener = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.connect(() => null);

      // Simulate the event
      (window.addEventListener as jest.Mock).mock.calls[0][1](event);

      expect(state.isReady).toBe(false);
    });

    it('expect adapter to not be ready when message come from an other extension', () => {
      const state = createFakeState();
      const event = {
        source: window,
        data: {
          source: 'other-extension-not-allowed',
          type: 'HOOK_READY',
        },
      };

      window.addEventListener = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.connect(() => null);

      // Simulate the event
      (window.addEventListener as jest.Mock).mock.calls[0][1](event);

      expect(state.isReady).toBe(false);
    });
  });

  describe('emit', () => {
    it('expect to emit when adapter is ready', () => {
      const state = createFakeState({
        isReady: true,
      });

      const event: HookEvent = {
        type: 'CHANGE',
        parameters: {},
      };

      window.postMessage = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.emit(event);

      expect(window.postMessage).toHaveBeenCalledTimes(1);
    });

    it('expect to queue the message when adapter is not ready', () => {
      const state = createFakeState();
      const event: HookEvent = {
        type: 'CHANGE',
        parameters: {},
      };

      window.postMessage = jest.fn();

      const adapter = createExtensionHookAdapter(state);

      adapter.emit(event);

      expect(window.postMessage).not.toHaveBeenCalled();
      expect(state.queue).toEqual([event]);
    });
  });
});
