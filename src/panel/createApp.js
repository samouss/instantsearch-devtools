import React from 'react';
import { Provider } from 'react-redux';
import VisibleEventList from './containers/VisibleEventList';

const createApp = store => (
  <Provider store={store}>
    <VisibleEventList />
  </Provider>
);

export default createApp;
