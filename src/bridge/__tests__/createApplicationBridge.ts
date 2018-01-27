import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Adapter } from '../../types';
import configureStore from '../../application/store/configureStore';
import createApplicationBridge from '../createApplicationBridge';

jest.mock('react');
jest.mock('react-dom');
jest.mock('../../application/store/configureStore');

describe('createApplicationBridge', () => {
  const createFakeAdapter = (): Adapter => ({
    connect: jest.fn(),
    emit: jest.fn(),
  });

  it('expect to create & bind the bridge to the store', () => {
    const adapter = createFakeAdapter();

    const store = {
      dispatch: jest.fn(),
    };

    (configureStore as jest.Mock).mockImplementationOnce(() => store);

    createApplicationBridge(adapter, {
      container: document.createElement('div'),
    });

    // Simulate a message
    (adapter.connect as jest.Mock).mock.calls[0][0]({
      type: 'CHANGE',
      parameters: {},
    });

    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: 'CHANGE',
      parameters: {},
    });
  });

  it('expect to unmount & render the application', () => {
    const container = document.createElement('div');
    const adapter = createFakeAdapter();

    (createElement as jest.Mock).mockImplementationOnce(x => x);

    createApplicationBridge(adapter, {
      container,
    });

    expect(unmountComponentAtNode).toHaveBeenCalledWith(container);
    expect(render).toHaveBeenCalledWith(expect.any(Function), container);
  });
});
