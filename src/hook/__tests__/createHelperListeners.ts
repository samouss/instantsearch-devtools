import { JSHelper, Bridge } from '../../types';
import createHelperListeners from '../createHelperListeners';

describe('createHelperListeners', () => {
  const createFakeHelper = (): JSHelper => ({
    on: jest.fn(),
  });

  const createFakeBrige = (): Bridge => ({
    postMessage: jest.fn(),
    onMessage: jest.fn(),
  });

  it('expect to listen for "change" event & post message', () => {
    const bridge = createFakeBrige();
    const helper = createFakeHelper();
    const parameters = {
      query: 'Apple',
    };

    createHelperListeners(bridge, helper);

    // Simulate change event
    (helper.on as jest.Mock).mock.calls[0][1](parameters);

    expect(helper.on).toHaveBeenCalledWith('change', expect.any(Function));
    expect(bridge.postMessage).toHaveBeenCalledWith({
      type: 'CHANGE',
      parameters,
    });
  });

  it('expect to listen for "search" event & post message', () => {
    const bridge = createFakeBrige();
    const helper = createFakeHelper();
    const parameters = {
      query: 'Apple',
    };

    createHelperListeners(bridge, helper);

    // Simulate search event
    (helper.on as jest.Mock).mock.calls[1][1](parameters);

    expect(helper.on).toHaveBeenCalledWith('search', expect.any(Function));
    expect(bridge.postMessage).toHaveBeenCalledWith({
      type: 'SEARCH',
      parameters,
    });
  });

  it('expect to listen for "result" event & post message', () => {
    const bridge = createFakeBrige();
    const helper = createFakeHelper();

    const parameters = {
      query: 'Apple',
    };

    const results = {
      nbHits: 3,
      hits: [{ objectID: 123 }, { objectID: 456 }, { objectID: 789 }],
    };

    createHelperListeners(bridge, helper);

    // Simulate search event
    (helper.on as jest.Mock).mock.calls[2][1](results, parameters);

    expect(helper.on).toHaveBeenCalledWith('result', expect.any(Function));
    expect(bridge.postMessage).toHaveBeenCalledWith({
      type: 'RESULT',
      parameters,
      results,
    });
  });
});
