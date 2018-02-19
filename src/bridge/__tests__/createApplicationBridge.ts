import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Adapter } from '../../types';
import createApplicationBridge from '../createApplicationBridge';

jest.mock('react');
jest.mock('react-dom');

describe('createApplicationBridge', () => {
  const createFakeAdapter = (): Adapter => ({
    connect: jest.fn(),
    emit: jest.fn(),
  });

  it('expect to create & bind the bridge to the App', () => {
    const container = document.createElement('div');
    const adapter = createFakeAdapter();

    (createElement as jest.Mock).mockImplementation(x => x);

    createApplicationBridge(adapter, {
      container: document.createElement('div'),
    });

    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenLastCalledWith(expect.any(Function), container);
    expect(createElement).toHaveBeenLastCalledWith(expect.any(Function), {
      emit: expect.any(Function),
    });

    // Simulate a message
    (adapter.connect as jest.Mock).mock.calls[0][0]({
      type: 'CHANGE',
      parameters: {},
    });

    expect(render).toHaveBeenCalledTimes(2);
    expect(render).toHaveBeenLastCalledWith(expect.any(Function), container);
    expect(createElement).toHaveBeenLastCalledWith(expect.any(Function), {
      emit: expect.any(Function),
      event: {
        type: 'CHANGE',
        parameters: {},
      },
    });
  });

  it('expect to unmount & render the application', () => {
    const container = document.createElement('div');
    const adapter = createFakeAdapter();

    (createElement as jest.Mock).mockImplementation(x => x);

    createApplicationBridge(adapter, {
      container,
    });

    expect(unmountComponentAtNode).toHaveBeenLastCalledWith(container);
    expect(render).toHaveBeenLastCalledWith(expect.any(Function), container);
  });
});
