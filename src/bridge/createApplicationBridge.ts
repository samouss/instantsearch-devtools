import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BridgeAdapter } from '../types';
import configureStore from '../application/store/configureStore';
import App from '../application/App';
import '../application/index.css';

type Configuration = {
  container: Element;
};

const createApplicationBridge = (
  adapter: BridgeAdapter,
  { container }: Configuration,
) => {
  // const emmiter = createEmitter ...
  // const store = configureStore({ emitter });
  const store = configureStore();

  const bridge = adapter();

  bridge.onMessage(event => {
    store.dispatch(event);
  });

  // emitter.addListener(event => {
  //   bridge.postMessage(event);
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
