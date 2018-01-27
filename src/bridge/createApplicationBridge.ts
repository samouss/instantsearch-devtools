import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Adapter } from '../types';
import configureStore from '../application/store/configureStore';
import App from '../application/App';
import '../application/index.css';

type Configuration = {
  container: Element;
};

const createApplicationBridge = (adapter: Adapter, params: Configuration) => {
  const { container } = params;
  // const emmiter = createEmitter ...
  // const store = configureStore({ emitter });
  const store = configureStore();

  adapter.connect(event => {
    store.dispatch(event);
  });

  // emitter.addListener(event => {
  //   adapter.emit(event);
  // });

  unmountComponentAtNode(container);

  render(
    createElement(App, {
      store,
    }),
    container,
  );
};

export default createApplicationBridge;
