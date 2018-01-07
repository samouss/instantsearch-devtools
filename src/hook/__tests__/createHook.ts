import createHook, { JSHelper } from '../createHook';
import createConnection from '../connection';

jest.mock('../connection');

describe('createHook', () => {
  const createFakeHelper = (): JSHelper => ({
    on: jest.fn(),
  });

  it('expect to listen for "change" event & post message', () => {
    const postMessage = jest.fn();
    const helper = createFakeHelper();
    const parameters = {
      query: 'Apple',
    };

    (createConnection as jest.Mock).mockImplementationOnce(() => ({
      postMessage,
    }));

    createHook(helper);

    // Simulate change event
    (helper.on as jest.Mock).mock.calls[0][1](parameters);

    expect(helper.on).toHaveBeenCalledWith('change', expect.any(Function));
    expect(postMessage).toHaveBeenCalledWith({
      type: 'CHANGE',
      parameters,
    });
  });

  it('expect to listen for "search" event & post message', () => {
    const postMessage = jest.fn();
    const helper = createFakeHelper();
    const parameters = {
      query: 'Apple',
    };

    (createConnection as jest.Mock).mockImplementationOnce(() => ({
      postMessage,
    }));

    createHook(helper);

    // Simulate search event
    (helper.on as jest.Mock).mock.calls[1][1](parameters);

    expect(helper.on).toHaveBeenCalledWith('search', expect.any(Function));
    expect(postMessage).toHaveBeenCalledWith({
      type: 'SEARCH',
      parameters,
    });
  });

  it('expect to listen for "search" event & post message', () => {
    const postMessage = jest.fn();
    const helper = createFakeHelper();

    const parameters = {
      query: 'Apple',
    };

    const results = {
      nbHits: 3,
      hits: [{ objectID: 123 }, { objectID: 456 }, { objectID: 789 }],
    };

    (createConnection as jest.Mock).mockImplementationOnce(() => ({
      postMessage,
    }));

    createHook(helper);

    // Simulate search event
    (helper.on as jest.Mock).mock.calls[2][1](results, parameters);

    expect(helper.on).toHaveBeenCalledWith('result', expect.any(Function));
    expect(postMessage).toHaveBeenCalledWith({
      type: 'RESULT',
      parameters,
      results,
    });
  });
});
