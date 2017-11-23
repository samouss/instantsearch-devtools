import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

const configureStore = () => {
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares),
  );
};

export default configureStore;
