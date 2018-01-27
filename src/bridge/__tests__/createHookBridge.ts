import { Bridge, JSHelper } from '../../types';
import createHelperListeners from '../../hook/createHelperListeners';
import createMessageHelperHandler from '../../hook/createMessageHelperHandler';
import createHookBridge from '../createHookBridge';

jest.mock('../../hook/createHelperListeners');
jest.mock('../../hook/createMessageHelperHandler');

describe('createHookBridge', () => {
  const createFakeHelper = (): JSHelper => ({
    on: jest.fn(),
  });

  const fakeBridgeAdapter = jest.fn((): Bridge => ({
    connect: jest.fn(),
    emit: jest.fn(),
  }));

  it('expect to create & bind the bridge to the listeners', () => {
    const bridge = {
      connect: jest.fn(),
    };

    fakeBridgeAdapter.mockImplementationOnce(() => bridge);

    const helper = createFakeHelper();
    const hookBrigde = createHookBridge(fakeBridgeAdapter);

    hookBrigde(helper);

    expect(createHelperListeners).toHaveBeenLastCalledWith(bridge, helper);
  });

  it('expect to create & bind the bridge to the handler', () => {
    const bridge = {
      connect: jest.fn(),
    };

    fakeBridgeAdapter.mockImplementationOnce(() => bridge);

    const fakeOnMessageHelperHandler = jest.fn();
    const createFakeMessageHelperHandler = jest.fn(
      () => fakeOnMessageHelperHandler,
    );
    (createMessageHelperHandler as jest.Mock).mockImplementationOnce(
      createFakeMessageHelperHandler,
    );

    const helper = createFakeHelper();
    const hookBrigde = createHookBridge(fakeBridgeAdapter);

    hookBrigde(helper);

    // Simulate a message
    bridge.connect.mock.calls[0][0]({
      type: 'CHANGE',
      parameters: {},
    });

    expect(createFakeMessageHelperHandler).toHaveBeenLastCalledWith(helper);
    expect(fakeOnMessageHelperHandler).toHaveBeenLastCalledWith({
      type: 'CHANGE',
      parameters: {},
    });
  });
});
