import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Adapter, HookEvent } from '../types';
import App from '../application/App';

type Configuration = {
  container: Element;
};

type RendererArgs = {
  container: Element;
  emit: (event: HookEvent) => void;
};

type Props = {
  event?: HookEvent;
};

const renderer = ({ container, emit }: RendererArgs) => (props: Props = {}) =>
  render(createElement(App, { emit, ...props }), container);

const createApplicationBridge = (adapter: Adapter, params: Configuration) => {
  const { container } = params;

  const render = renderer({
    emit: event => adapter.emit(event),
    container,
  });

  adapter.connect(event => {
    render({
      event,
    });
  });

  unmountComponentAtNode(container);

  render();
};

export default createApplicationBridge;
