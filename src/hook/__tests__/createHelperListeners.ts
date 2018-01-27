import { JSHelper, Adapter } from '../../types';
import createHelperListeners from '../createHelperListeners';

describe('createHelperListeners', () => {
  const createFakeHelper = (): JSHelper => ({
    on: jest.fn(),
  });

  const createFakeAdapter = (): Adapter => ({
    connect: jest.fn(),
    emit: jest.fn(),
  });

  it('expect to listen for "change" event & post message', () => {
    const adapter = createFakeAdapter();
    const helper = createFakeHelper();
    const parameters = {
      query: 'Apple',
    };

    createHelperListeners(adapter, helper);

    // Simulate change event
    (helper.on as jest.Mock).mock.calls[0][1](parameters);

    expect(helper.on).toHaveBeenCalledWith('change', expect.any(Function));
    expect(adapter.emit).toHaveBeenCalledWith({
      type: 'CHANGE',
      parameters,
    });
  });

  it('expect to listen for "search" event & post message', () => {
    const adapter = createFakeAdapter();
    const helper = createFakeHelper();
    const parameters = {
      query: 'Apple',
    };

    createHelperListeners(adapter, helper);

    // Simulate search event
    (helper.on as jest.Mock).mock.calls[1][1](parameters);

    expect(helper.on).toHaveBeenCalledWith('search', expect.any(Function));
    expect(adapter.emit).toHaveBeenCalledWith({
      type: 'SEARCH',
      parameters,
    });
  });

  it('expect to listen for "result" event & post message', () => {
    const adapter = createFakeAdapter();
    const helper = createFakeHelper();

    const parameters = {
      query: 'Apple',
    };

    const results = {
      nbHits: 3,
      hits: [{ objectID: 123 }, { objectID: 456 }, { objectID: 789 }],
    };

    createHelperListeners(adapter, helper);

    // Simulate search event
    (helper.on as jest.Mock).mock.calls[2][1](results, parameters);

    expect(helper.on).toHaveBeenCalledWith('result', expect.any(Function));
    expect(adapter.emit).toHaveBeenCalledWith({
      type: 'RESULT',
      parameters,
      results,
    });
  });
});
