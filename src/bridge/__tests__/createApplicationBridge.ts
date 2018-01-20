import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Bridge } from '../../types';
import configureStore from '../../application/store/configureStore';
import createApplicationBridge from '../createApplicationBridge';

jest.mock('react');
jest.mock('react-dom');
jest.mock('../../application/store/configureStore');

describe('createApplicationBridge', () => {
  const fakeBridgeAdapter = jest.fn<Bridge>(() => ({
    onMessage: jest.fn(),
    postMessage: jest.fn(),
  }));

  it('expect to create & bind the bridge to the store', () => {
    const bridge = {
      onMessage: jest.fn(),
    };

    fakeBridgeAdapter.mockImplementationOnce(() => bridge);

    const store = {
      dispatch: jest.fn(),
    };

    (configureStore as jest.Mock).mockImplementationOnce(() => store);

    createApplicationBridge(fakeBridgeAdapter, {
      container: document.createElement('div'),
    });

    // Simulate a message
    bridge.onMessage.mock.calls[0][0]({
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

    (createElement as jest.Mock).mockImplementationOnce(x => x);

    createApplicationBridge(fakeBridgeAdapter, {
      container,
    });

    expect(unmountComponentAtNode).toHaveBeenCalledWith(container);
    expect(render).toHaveBeenCalledWith(expect.any(Function), container);
  });
});
