import createHookConnection, { State, HookEvent } from '../connection';

describe('connections', () => {
  const createFakeState = (next?: Partial<State>) => ({
    isConnectionReady: false,
    queue: [],
    ...next,
  });

  it('expect to create a connection', () => {
    const state = createFakeState();

    window.addEventListener = jest.fn();

    createHookConnection(state);

    expect(window.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });

  it('expect to setup the connection on CHANNEL_READY', () => {
    const state = createFakeState();
    const event = {
      source: window,
      data: {
        source: 'chrome-devtools-experiments-content-script',
        type: 'CHANNEL_READY',
      },
    };

    window.addEventListener = jest.fn();

    createHookConnection(state);

    // Simulate the event
    (window.addEventListener as jest.Mock).mock.calls[0][1](event);

    expect(state.isConnectionReady).toBe(true);
  });

  it('expect to setup the connection & flush the queue on CHANNEL_READY', () => {
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
        source: 'chrome-devtools-experiments-content-script',
        type: 'CHANNEL_READY',
      },
    };

    window.addEventListener = jest.fn();
    window.postMessage = jest.fn();

    createHookConnection(state);

    // Simulate the event
    (window.addEventListener as jest.Mock).mock.calls[0][1](event);

    expect(window.postMessage).toHaveBeenCalledTimes(3);
    expect(state.isConnectionReady).toBe(true);
    expect(state.queue).toEqual([]);
  });

  it('expect to not setup the connection when message come from a different window', () => {
    const state = createFakeState();
    const event = {
      source: { ...window },
      data: {
        source: 'chrome-devtools-experiments-content-script',
        type: 'CHANNEL_READY',
      },
    };

    window.addEventListener = jest.fn();

    createHookConnection(state);

    // Simulate the event
    (window.addEventListener as jest.Mock).mock.calls[0][1](event);

    expect(state.isConnectionReady).toBe(false);
  });

  it('expect to not setup the connection when message come from an other extension', () => {
    const state = createFakeState();
    const event = {
      source: window,
      data: {
        source: 'other-extension-not-allowed',
        type: 'CHANNEL_READY',
      },
    };

    window.addEventListener = jest.fn();

    createHookConnection(state);

    // Simulate the event
    (window.addEventListener as jest.Mock).mock.calls[0][1](event);

    expect(state.isConnectionReady).toBe(false);
  });

  describe('postMessage', () => {
    it('expect to post the message when connection is ready', () => {
      const state = createFakeState({
        isConnectionReady: true,
      });

      const event: HookEvent = {
        type: 'CHANGE',
        parameters: {},
      };

      window.postMessage = jest.fn();

      const connection = createHookConnection(state);

      connection.postMessage(event);

      expect(window.postMessage).toHaveBeenCalledTimes(1);
    });

    it('expect to queue the message when connection is not ready', () => {
      const state = createFakeState();
      const event: HookEvent = {
        type: 'CHANGE',
        parameters: {},
      };

      window.postMessage = jest.fn();

      const connection = createHookConnection(state);

      connection.postMessage(event);

      expect(window.postMessage).not.toHaveBeenCalled();
      expect(state.queue).toEqual([event]);
    });
  });
});
