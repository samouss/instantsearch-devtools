import { Adapter, JSHelper } from '../../types';
import createHelperListeners from '../../hook/createHelperListeners';
import createMessageHelperHandler from '../../hook/createMessageHelperHandler';
import createHookBridge from '../createHookBridge';

jest.mock('../../hook/createHelperListeners');
jest.mock('../../hook/createMessageHelperHandler');

describe('createHookBridge', () => {
  const createFakeHelper = (): JSHelper => ({
    on: jest.fn(),
  });

  const createFakeAdapter = (): Adapter => ({
    connect: jest.fn(),
    emit: jest.fn(),
  });

  it('expect to create & bind the bridge to the listeners', () => {
    const adapter = createFakeAdapter();
    const helper = createFakeHelper();
    const hookBrigde = createHookBridge(adapter);

    hookBrigde(helper);

    expect(createHelperListeners).toHaveBeenLastCalledWith(adapter, helper);
  });

  it('expect to create & bind the bridge to the handler', () => {
    const adapter = createFakeAdapter();
    const fakeOnMessageHelperHandler = jest.fn();
    const createFakeMessageHelperHandler = jest.fn(() => fakeOnMessageHelperHandler);

    (createMessageHelperHandler as jest.Mock).mockImplementationOnce(
      createFakeMessageHelperHandler,
    );

    const helper = createFakeHelper();
    const hookBrigde = createHookBridge(adapter);

    hookBrigde(helper);

    // Simulate a message
    (adapter.connect as jest.Mock).mock.calls[0][0]({
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
