import React from 'react';
import { Provider } from 'react-redux';
import MessageList from './containers/MessageList';

const createApp = store => (
  <Provider store={store}>
    <MessageList />
  </Provider>
);

export default createApp;
